"use client";

import { useState } from "react";
import Web3 from "web3";
import { motion } from "framer-motion";
import CoinFace from "./CoinFace";
import { RingLoader } from "react-spinners";

export default function CoinFlip() {
  const [betAmount, setBetAmount] = useState("");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");
  const [account, setAccount] = useState("");
  const [flipping, setFlipping] = useState(false);
  const [coinSide, setCoinSide] = useState("heads");

  const flipCoin = async () => {
    if (!betAmount || !guess)
      return alert("Please enter bet amount and select heads or tails");

    if (!window.ethereum) return alert("MetaMask not detected!");

    try {
      setFlipping(true);
      setResult(""); // Clear previous result

      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const betAmountInWei = web3.utils.toWei(betAmount, "ether");
      await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[0],
        value: betAmountInWei,
      });

      // Simulate coin flip delay
      setTimeout(() => {
        const random = Math.random() < 0.5 ? "heads" : "tails";
        setCoinSide(random);

        if (random === guess) {
          setResult(`You won!`);
          const doubleAmountInWei = web3.utils.toWei(
            (parseFloat(betAmount) * 2).toString(),
            "ether"
          );
          web3.eth.sendTransaction({
            from: accounts[0],
            to: accounts[0],
            value: doubleAmountInWei,
          });
        } else {
          setResult(`You lost! The coin landed on ${random}`);
        }
        setFlipping(false);
      }, 1000);
    } catch (error) {
      console.error("Error flipping coin:", error);
      setResult("Transaction failed!");
      setFlipping(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-lg shadow-lg max-w-lg mx-auto mt-8 neon">
      <h2 className="text-3xl font-bold mb-8 text-cyan-400 no-neon-text">
        Place Your Bet
      </h2>
      <input
        type="number"
        placeholder="Amount in ETH"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        className="mb-6 p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
        disabled={flipping} // Disable input while flipping
      />
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-8 py-3 rounded-lg font-semibold ${
            guess === "heads"
              ? "bg-cyan-500 text-black"
              : "bg-gray-700 text-gray-300"
          } hover:bg-cyan-400 transition-transform duration-200`}
          onClick={() => setGuess("heads")}
          disabled={flipping} // Disable button while flipping
        >
          Heads
        </button>
        <button
          className={`px-8 py-3 rounded-lg font-semibold ${
            guess === "tails"
              ? "bg-cyan-500 text-black"
              : "bg-gray-700 text-gray-300"
          } hover:bg-cyan-400 transition-transform duration-200`}
          onClick={() => setGuess("tails")}
          disabled={flipping} // Disable button while flipping
        >
          Tails
        </button>
      </div>
      <button
        onClick={flipCoin}
        className="bg-cyan-500 text-black px-8 py-3 rounded-lg font-semibold shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:brightness-110"
        disabled={flipping} // Disable button while flipping
      >
        Flip Coin
      </button>

      {flipping ? (
        <div className="flex flex-col items-center mt-8">
          <RingLoader color="#00bcd4" size={80} /> {/* Loading spinner */}
          <p className="mt-4 text-lg font-semibold text-cyan-300 no-neon-text">
            Flipping the coin...
          </p>
        </div>
      ) : (
        <motion.div
          className="mt-8"
          animate={{ rotateY: flipping ? [0, 180, 360] : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <CoinFace side={coinSide} />
        </motion.div>
      )}
      {result && !flipping && (
        <p className="mt-8 text-lg font-semibold text-cyan-300 no-neon-text">
          {result}
        </p>
      )}
    </div>
  );
}
