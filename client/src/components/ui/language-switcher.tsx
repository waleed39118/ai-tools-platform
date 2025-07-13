import { Button } from "@/components/ui/button";
import { Languages, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 hover:bg-purple-50 hover:text-purple-600 transition-colors"
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium">
        {language === "ar" ? "English" : "العربية"}
      </span>
    </Button>
  );
}