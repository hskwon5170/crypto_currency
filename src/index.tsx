import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { useDarkModeStore } from "./components/commons/ZustandStore/ZustandStore";

const Root = () => {
  const { dark, transitionDuration } = useDarkModeStore();

  const bodyStyle = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  };

  return (
    <React.StrictMode>
      <App />
      <style>
        {`
          body {
            background-color: ${bodyStyle.backgroundColor};
            color: ${bodyStyle.color};
          }
        `}
      </style>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
