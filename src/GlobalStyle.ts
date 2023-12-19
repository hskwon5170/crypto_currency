import { useEffect } from "react";
import { useAtom } from "jotai";
import { darkStore } from "./components/commons/JotaiStore/JotaiStore";

const GlobalStyle = () => {
  const [dark] = useAtom(darkStore);

  useEffect(() => {
    document.body.style.backgroundColor = dark ? "black" : "white";
    document.body.style.color = dark ? "white" : "black";
  }, [dark]);

  return null;
};

export default GlobalStyle;
