import { create } from "zustand";

interface DarkModeInterface {
  dark: boolean;
  transitionDuration: number;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeInterface>((set) => ({
  dark: false,
  transitionDuration: 3000,
  toggleDarkMode: () => set((state) => ({ dark: !state.dark })),
}));
