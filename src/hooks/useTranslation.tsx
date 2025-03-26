import { useLanguageStore } from "store";
import TRANSLATIONS from "constants/langguage";

export default function useTranslation() {
  const LanguageType = useLanguageStore((state) => state.LanguageType);

  return (key: keyof typeof TRANSLATIONS) => {
    return TRANSLATIONS[key][LanguageType];
  };
}
