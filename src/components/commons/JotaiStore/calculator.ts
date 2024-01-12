import { atom } from "jotai";

export const qqqAtom = atom<number>(0);

// you pay input value atom
export const inputValueAtom = atom<number>(0);

// 현재 usd data currency
export const usdCurrencyAtom = atom<number>(0);

// "usd" ? "krw"?
export const selectCurrencyAtom = atom<string>("usd");
export const updateCurrencyAtom = atom(
  (get) => get(selectCurrencyAtom),
  (_, set, update: string) => {
    set(selectCurrencyAtom, update);
  }
);

// you receive input value atom (계산된결과)
export const calculatedValueAtom = atom<number>(0);
// export const calculateAtom = atom(null, (get, set) => {
//   const inputValue = get(inputValueAtom);
//   const currencyValue = get(usdCurrencyAtom);
//   set(calculatedValueAtom, inputValue * currencyValue);
// });
