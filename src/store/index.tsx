import { create } from "zustand";
// type LangaugeType = "ko" | "en"

interface TodoStore {
  LanguageType: string;
  setLanguage: () => void;
}

export const useLanguageStore = create<TodoStore>((set) => ({
  LanguageType: localStorage.getItem("language") || "ko",

  setLanguage: () => {
    set((state) => {
      const newLanguage = state.LanguageType === "ko" ? "en" : "ko";
      localStorage.setItem("language", newLanguage);
      return { LanguageType: newLanguage };
    });
  },
}));
