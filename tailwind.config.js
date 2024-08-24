/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "cyan-300": "#00bcd4", // For the text color
        "blue-500": "#3b82f6", // Button background color
        "blue-600": "#2563eb", // Button hover color

        "cyan-400": "#00bcd4",
        "cyan-300": "#00acc1",
      },
    },
  },
  plugins: [],
};
