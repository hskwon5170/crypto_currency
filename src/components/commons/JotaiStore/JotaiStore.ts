import { atom } from "jotai";

export const darkStore = atom(true);
export const toggleStore = atom(true);
// export const updateDarkAtom = atom(
//   (get) => get(darkStore),
//   // (get, set) => set(darkStore, (prev) => !prev)
//   (get, set) => {
//     const currentDark = get(darkStore);
//     const currentToggle = get(toggleStore);

//     set(darkStore, !currentDark);
//     set(toggleStore, !currentToggle);
//   }
// );
export const updateDarkAtom = atom(
  (get) => get(darkStore),
  (get, set) => {
    // const currentDark = get(darkStore);
    // const currentToggle = get(toggleStore);
    set(darkStore, (prev) => !prev);
    set(toggleStore, (prev) => !prev);
  }
);
