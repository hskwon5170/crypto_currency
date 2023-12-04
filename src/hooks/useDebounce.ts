import React, { useState, useEffect } from "react";

// 파라미터로 value:string, delay:number를 전달받고
// delay만큼 지연시킨 후 value를 리턴한다

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const callback = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);

    return () => clearTimeout(callback);
  }, [value, delay]);

  return debounceValue;
};
