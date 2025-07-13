import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, Mail, FileImage, Rocket, Shield, Smartphone, Code } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, isRTL } = useLanguage();
  
  const tools = [
    {
      icon: FileText,
      title: t("resumeGenerator"),
      description: t("resumeGeneratorDesc"),
      href: "/resume",
      color: "bg-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: CheckCircle,
      title: t("arabicCorrection"),
      description: t("arabicCorrectionDesc"),
      href: "/arabic-correction",
      color: "bg-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Mail,
      title: t("emailDrafting"),
      description: t("emailDraftingDesc"),
      href: "/email-drafting",
      color: "bg-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: FileImage,
      title: t("pdfSummary"),
      description: t("pdfSummaryDesc"),
      href: "/pdf-summary",
      color: "bg-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      icon: Code,
      title: t("codeGenerator"),
      description: t("codeGeneratorDesc"),
      href: "/code-generator",
      color: "bg-green-600",
      bgColor: "bg-green-100",
    },
  ];

  const features = [
    {
      icon: Rocket,
      title: t("superFast"),
      description: t("superFastDesc"),
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Shield,
      title: t("secureSafe"),
      description: t("secureSafeDesc"),
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Smartphone,
      title: t("smartAI"),
      description: t("smartAIDesc"),
      color: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t("aiToolsPlatform")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t("platformDescription")}
          </p>
          <Link href="/resume">
            <Button size="lg" className="action-btn text-white text-lg px-8 py-4 border-0">
              {t("getStarted")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">{t("features")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} className="tool-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${tool.bgColor} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <tool.icon className={`${tool.color.replace('bg-', 'text-')} text-2xl`} />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-4">{tool.title}</h3>
                  <p className="text-gray-600 text-center mb-6">{tool.description}</p>
                  <Link href={tool.href}>
                    <Button className={`${tool.color} hover:${tool.color}/90 text-white action-btn border-0`}>
                      {t("tryNow")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-neutral-900 mb-12">{t("features")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <feature.icon className={`${feature.iconColor} text-3xl`} />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
