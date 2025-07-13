import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const { t, isRTL } = useLanguage();

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("resumeGenerator"), href: "/resume" },
    { name: t("arabicCorrection"), href: "/arabic-correction" },
    { name: t("emailDrafting"), href: "/email-drafting" },
    { name: t("pdfSummary"), href: "/pdf-summary" },
    { name: t("codeGenerator"), href: "/code-generator" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="flex items-center">
              <Bot className={`text-primary text-2xl ${isRTL ? 'ml-2' : 'mr-2'}`} />
              <span className="text-xl font-bold text-neutral-900">{t("aiToolsPlatform")}</span>
            </div>
          </div>
          
          <div className={`hidden md:flex space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className="text-sm font-medium"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
          
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-neutral-900 hover:text-primary"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className={`block w-full px-3 py-2 text-base font-medium ${isRTL ? 'text-right' : 'text-left'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
