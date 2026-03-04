import { useNavigate } from "react-router-dom";
import { ArrowRight, GraduationCap, Shield, Brain, BarChart3 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: Shield, title: "Secure Multi-College", desc: "Unique code verification for each institution", gradient: "gradient-trust" },
    { icon: Brain, title: "AI-Powered Allocation", desc: "Smart ranking based on merit, need & achievements", gradient: "gradient-tech" },
    { icon: BarChart3, title: "Real-Time Analytics", desc: "Track applications, budgets & scholarship utilization", gradient: "gradient-energy" },
    { icon: GraduationCap, title: "CRUD Management", desc: "Full scholarship & application management system", gradient: "gradient-trust" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg gradient-trust flex items-center justify-center animate-glow">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl gradient-text-brand">ScholarConnect</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Features</a>
          <button onClick={() => navigate("/select-college")} className="gradient-cta px-5 py-2.5 rounded-full text-white font-semibold text-sm transition-all hover:scale-105 shadow-lg">
            Admin Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-8">
        <div className="text-center max-w-3xl animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-black mb-2 text-foreground leading-tight">
            Scholar<span className="gradient-text-brand">Connect</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-black gradient-text-warm mb-6">
            Scholarships
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Empowering merit & need-based students through education. AI-powered scholarship management for modern institutions.
          </p>
          <button
            onClick={() => navigate("/select-college")}
            className="gradient-trust px-8 py-4 rounded-full text-white font-semibold text-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/25"
          >
            Let's Go <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="relative z-10 px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={f.title} className={`glass-card p-6 card-hover animate-slide-up stagger-${i + 1} opacity-0`} style={{ animationFillMode: "forwards" }}>
              <div className={`w-12 h-12 rounded-xl ${f.gradient} flex items-center justify-center mb-4`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-8 py-6 border-t border-border/30">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <p className="text-sm text-muted-foreground">Trusted by leading institutions for intelligent scholarship allocation since 2024</p>
          <p className="text-sm text-muted-foreground hidden sm:block">Built for Andhra Pradesh Institutions</p>
        </div>
      </div>
    </div>
  );
}
