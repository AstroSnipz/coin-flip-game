"use client";

import { useState } from "react";
import Web3 from "web3";
import { motion } from "framer-motion";

export default function Header({ onAnimationComplete }) {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet.");
      }
    } else {
      alert("MetaMask not detected!");
    }
  };

  return (
    <motion.div
      className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-xl"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.h1
        className="text-4xl font-extrabold tracking-wide text-cyan-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Coin Flip Game
      </motion.h1>
      <motion.button
        onClick={connectWallet}
        className="bg-cyan-500 text-black px-6 py-3 rounded-lg font-medium shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:brightness-110"
      >
        {account ? "Wallet Connected" : "Connect Wallet"}
      </motion.button>
    </motion.div>
  );
}
