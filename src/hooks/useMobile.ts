import { useEffect, useState } from "react";

function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  // 리사이즈 이벤트를 감지하여 가로 길이에 따라 모바일 여부 결정
  const resizingHandler = () => {
    if (window.innerWidth <= 1023) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // 우선 맨 처음 1023이하면 모바일 처리
  useEffect(() => {
    if (window.innerWidth <= 1023) {
      setIsMobile(true);
    }

    window.addEventListener("resize", resizingHandler);
    return () => {
      // 메모리 누수를 줄이기 위한 removeEvent
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  return isMobile;
}
export default useMobile;
