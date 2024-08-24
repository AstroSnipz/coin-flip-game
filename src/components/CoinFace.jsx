const CoinFace = ({ side }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    className="w-32 h-32"
  >
    <defs>
      <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{ stopColor: "#fff", stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: "#ccc", stopOpacity: 0.8 }} />
      </radialGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#bbb", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#666", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle
      cx="50"
      cy="50"
      r="48"
      stroke="black"
      strokeWidth="2"
      fill="url(#grad1)"
      className="transition-transform duration-500 ease-in-out"
    />
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="18"
      fontWeight="bold"
      fill="black"
      className="transition-opacity duration-500 ease-in-out"
    >
      {side === "heads" ? "Heads" : "Tails"}
    </text>
    <circle
      cx="50"
      cy="50"
      r="40"
      fill="none"
      stroke="url(#grad2)"
      strokeWidth="4"
      className="transition-transform duration-500 ease-in-out"
    />
  </svg>
);

export default CoinFace;
