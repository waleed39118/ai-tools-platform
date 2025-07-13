import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import ResumeGenerator from "@/pages/resume-generator";
import ArabicCorrection from "@/pages/arabic-correction";
import EmailDrafting from "@/pages/email-drafting";
import PdfSummary from "@/pages/pdf-summary";
import CodeGenerator from "@/pages/code-generator";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resume" component={ResumeGenerator} />
      <Route path="/arabic-correction" component={ArabicCorrection} />
      <Route path="/email-drafting" component={EmailDrafting} />
      <Route path="/pdf-summary" component={PdfSummary} />
      <Route path="/code-generator" component={CodeGenerator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              <Router />
            </main>
            <Footer />
            <Toaster />
          </div>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
