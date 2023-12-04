import { create } from "zustand";

interface DarkModeInterface {
  dark: boolean;
  isToggle: boolean;
  toggleDarkMode: () => void;
  setIsToggle: (toggled: boolean) => void;
}

export const useDarkModeStore = create<DarkModeInterface>((set) => ({
  dark: true,
  isToggle: true,
  toggleDarkMode: () => set((state) => ({ dark: !state.dark })),
  // toggleDarkMode: (dark) => set({ dark: !dark }),
  setIsToggle: (value) => set({ isToggle: value }),
}));
