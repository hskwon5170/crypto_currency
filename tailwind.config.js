/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: true,
  theme: {
    extend: {
      backgroundColor: {
        primary: "#DDE9F5",
        coin: "#ffffff",
        card: "#dbe4ff",
        btn: "#f1f3f5",
      },
      textColor: {
        primary: "#2354e6",
      },
      borderColor: {
        theme: "#035FE8",
        accent: "#2354e6",
      },
      gradientColorStops: {
        theme: "#035FE8",
        accent: "#2354e6",
      },
      fontFamily: {
        "nanum-pen": ['"Nanum Pen Script"', "cursive"],
        "yeon-sung": ['"Yeon Sung"', "cursive"],
        "noto-sans": ['"Noto Sans KR"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
