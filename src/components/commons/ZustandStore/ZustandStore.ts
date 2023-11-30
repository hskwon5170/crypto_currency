import { create } from "zustand";

interface DarkModeInterface {
  dark: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeInterface>((set) => ({
  dark: false,
  toggleDarkMode: () => set((state) => ({ dark: !state.dark })),
}));
