import { create } from "zustand";

interface DarkModeInterface {
  dark: boolean;
  toggleDarkMode: () => void;
}

export const useDarkModeStore = create<DarkModeInterface>((set) => ({
  dark: true,
  toggleDarkMode: () => set((state) => ({ dark: !state.dark })),
}));
