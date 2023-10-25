/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: true,
  theme: {
    extend: {
      borderRadius: {
        appS: "10px",
        appM: "20px",
        appL: "30px",
      },
      fontSize: {
        title: ["2.375rem", "3.325rem"],
        lg: ["1.125rem", "140%"],
      },
      fontFamily: {
        mono: ["nanumsquare"],
      },
      fontWeight: {
        default: "400",
        bold: "700",
      },
      boxShadow: {
        frame: "1px 1px 4px 0px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        ten: "0.625rem", // 10px,
        ten2: "1.25rem", // 20px,
        main: "1.875rem", // 30px
        main2: "3.75rem", // 60px
        header: "3.125rem", // 50px
        12: "3.125rem", // ...
        45: "11.25rem", // ...
        36: "8.75rem", // ...
        ch: "calc(100vh - 14vh)",
        authw: "62.5%",
      },
      colors: {
        primary: "#007DF9",
        smooth: "#6b7c99",
        middle: "#e3e9f3",
        opacity: "#F5F8FF",
        warning: "#ffcc00",
        highlight: "#007dfe",
        pencil: "#333333",
        grayop: "#E4E7EA",
        "gray-1": "#A8ABAE",
        "gray-2": "#808386",
      },
      screens: {
        sm: { max: "767px" },
        md: { min: "768px", max: "991px" },
        lg: { min: "1080px" },
      },
    },
  },
  plugins: [],
};
