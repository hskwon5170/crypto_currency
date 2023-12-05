import { useEffect } from "react";
import { useDarkModeStore } from "./components/commons/ZustandStore/ZustandStore";

const GlobalStyle = () => {
  const dark = useDarkModeStore((state) => state.dark);

  useEffect(() => {
    document.body.style.backgroundColor = dark ? "black" : "white";
    document.body.style.color = dark ? "white" : "black";
  }, [dark]);

  return null;
};

export default GlobalStyle;
