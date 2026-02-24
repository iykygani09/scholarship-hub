import { useNavigate } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">ScholarConnect</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Features</a>
          <button onClick={() => navigate("/select-college")} className="gradient-cta px-5 py-2.5 rounded-full text-primary-foreground font-semibold text-sm transition-all hover:scale-105">
            Admin Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8">
        <div className="text-center max-w-3xl animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black mb-2 text-foreground leading-tight">
            ScholarConnect
          </h1>
          <h2 className="text-4xl md:text-6xl font-black gradient-text-warm mb-6">
            Scholarships
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Empowering merit & need-based students through education. AI-powered scholarship management for modern institutions.
          </p>
          <button
            onClick={() => navigate("/select-college")}
            className="gradient-primary px-8 py-4 rounded-full text-primary-foreground font-semibold text-lg inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/25"
          >
            Let's Go <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-8 py-6">
        <p className="text-sm text-muted-foreground">
          Trusted by leading institutions for intelligent scholarship allocation since 2024
        </p>
      </div>
    </div>
  );
}
