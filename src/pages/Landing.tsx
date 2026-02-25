import { useNavigate } from "react-router-dom";
import { ArrowRight, GraduationCap, Shield, Brain, BarChart3, Users } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    { icon: Shield, title: "Secure Multi-College", desc: "Unique code verification for each institution", gradient: "gradient-trust" },
    { icon: Brain, title: "AI-Powered Allocation", desc: "Smart ranking based on merit, need & achievements", gradient: "gradient-tech" },
    { icon: BarChart3, title: "Real-Time Analytics", desc: "Track applications, budgets & scholarship utilization", gradient: "gradient-energy" },
    { icon: Users, title: "Student Support", desc: "Govt schemes + institutional programs in one place", gradient: "gradient-trust" },
  ];

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background orbs */}
      <div className="floating-orb w-96 h-96 bg-[#0052CC] top-[-10%] left-[-5%]" />
      <div className="floating-orb w-72 h-72 bg-[#40DC74] top-[20%] right-[-5%]" style={{ animationDelay: "1s" }} />
      <div className="floating-orb w-64 h-64 bg-[#6C5CE7] bottom-[10%] left-[30%]" style={{ animationDelay: "2s" }} />
      <div className="floating-orb w-48 h-48 bg-[#FFD700] bottom-[5%] right-[10%]" style={{ animationDelay: "3s" }} />

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
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-accent font-medium">Trusted by 10+ AP Institutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-2 text-foreground leading-tight">
            Scholar<span className="gradient-text-brand">Connect</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-black gradient-text-warm mb-6">
            Scholarship Management
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            AI-powered scholarship allocation & management for Andhra Pradesh's leading institutions. Government schemes + College programs — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/select-college")}
              className="gradient-trust px-8 py-4 rounded-full text-white font-semibold text-lg inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-primary/25"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
            <a href="#features" className="px-8 py-4 rounded-full border border-border text-foreground font-semibold text-lg inline-flex items-center justify-center gap-2 hover:bg-secondary/50 transition-all">
              Learn More
            </a>
          </div>
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
          <p className="text-sm text-muted-foreground">© 2024 ScholarConnect — AP Scholarship Platform</p>
          <p className="text-sm text-muted-foreground hidden sm:block">Built for Andhra Pradesh Institutions</p>
        </div>
      </div>
    </div>
  );
}
