"use client";

import { useState } from "react";
import Header from "@/components/Header";
import CoinFlip from "@/components/CoinFlip";

export default function Home() {
  const [showCoinFlip, setShowCoinFlip] = useState(false);

  // Function to handle Header animation completion
  const handleHeaderAnimationComplete = () => {
    setShowCoinFlip(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header onAnimationComplete={handleHeaderAnimationComplete} />
      <div className="flex-grow mt-2 mb-4">{showCoinFlip && <CoinFlip />}</div>
      <div className="bg-gray-900 h-4"></div>
    </div>
  );
}
