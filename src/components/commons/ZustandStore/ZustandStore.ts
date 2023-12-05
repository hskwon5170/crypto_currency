import { create } from "zustand";

interface DarkModeInterface {
  dark: boolean;
  isToggle: boolean;
  // setIsToggle: (toggled: boolean) => void;
  toggleBoth: () => void;
}

export const useDarkModeStore = create<DarkModeInterface>((set) => ({
  dark: true,
  isToggle: true,
  // toggleDarkMode: () => set((state) => ({ dark: !state.dark })),
  // toggleDarkMode: (dark) => set({ dark: !dark }),
  // setIsToggle: (value) => set({ isToggle: value }),
  toggleBoth: () =>
    set((state) => ({ dark: !state.dark, isToggle: !state.isToggle })),
}));
