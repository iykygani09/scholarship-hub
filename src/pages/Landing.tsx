import { useNavigate } from "react-router-dom";
import { ArrowRight, GraduationCap, Shield, Brain, BarChart3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useImageLoaded } from "@/hooks/use-image-loaded";

export default function Landing() {
  const navigate = useNavigate();
  const imgLoaded = useImageLoaded(heroBg);

  const features = [
    { icon: Shield, title: "Secure Multi-College", desc: "Unique code verification for each institution", gradient: "gradient-trust" },
    { icon: Brain, title: "AI-Powered Allocation", desc: "Smart ranking based on merit, need & achievements", gradient: "gradient-tech" },
    { icon: BarChart3, title: "Real-Time Analytics", desc: "Track applications, budgets & scholarship utilization", gradient: "gradient-energy" },
    { icon: GraduationCap, title: "CRUD Management", desc: "Full scholarship & application management system", gradient: "gradient-trust" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image with loading */}
      <div className="absolute inset-0 z-0">
        <div className={`w-full h-full transition-opacity duration-700 ${imgLoaded ? "opacity-30" : "opacity-0"}`}>
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
        </div>
        {!imgLoaded && <div className="absolute inset-0 bg-secondary/50 animate-pulse" />}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg gradient-trust flex items-center justify-center animate-glow">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="font-bold text-lg sm:text-xl gradient-text-brand">ScholarConnect</span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block text-sm">Features</a>
          <button onClick={() => navigate("/select-college")} className="gradient-cta px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white font-semibold text-sm transition-all hover:scale-105 shadow-lg">
            Admin Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 py-8">
        <div className="text-center max-w-3xl animate-slide-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-2 text-foreground leading-tight">
            Scholar<span className="gradient-text-brand">Connect</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black gradient-text-warm mb-4 sm:mb-6">
            Scholarships
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto px-4">
            Empowering merit & need-based students through education. AI-powered scholarship management for modern institutions.
          </p>
          <button
            onClick={() => navigate("/select-college")}
            className="gradient-trust px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-base sm:text-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/25"
          >
            Let's Go <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="relative z-10 px-4 sm:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={f.title} className={`glass-card p-5 sm:p-6 card-hover animate-slide-up stagger-${i + 1} opacity-0`} style={{ animationFillMode: "forwards" }}>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${f.gradient} flex items-center justify-center mb-3 sm:mb-4`}>
                <f.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-sm sm:text-base">{f.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-4 sm:px-8 py-4 sm:py-6 border-t border-border/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">Trusted by leading institutions for intelligent scholarship allocation since 2024</p>
          <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Built for Andhra Pradesh Institutions</p>
        </div>
      </div>
    </div>
  );
}
