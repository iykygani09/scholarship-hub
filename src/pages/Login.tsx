import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, GraduationCap, ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedCollege, codeVerified, login } = useAuth();
  const navigate = useNavigate();

  if (!selectedCollege || !codeVerified) {
    navigate("/select-college", { replace: true });
    return null;
  }

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    if (login(email, password)) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/50" />
        <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
          <div className="text-xs tracking-widest text-muted-foreground uppercase">Scholarship Management Platform</div>
          <div>
            <h2 className="text-5xl font-black text-foreground mb-2">Welcome to</h2>
            <h3 className="text-5xl font-black gradient-text-brand mb-4">{selectedCollege.shortName}</h3>
            <p className="text-muted-foreground">Sign in to manage scholarships, track applications, and access your institution's portal.</p>
          </div>
          <div className="text-muted-foreground text-sm">Step 3 of 3 — Admin Authentication</div>
        </div>
      </div>

      <div className="flex-1 bg-background flex flex-col p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-energy flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold gradient-text-brand">ScholarConnect</span>
          </div>
          <button onClick={() => navigate(`/verify/${selectedCollege.id}`)} className="text-sm text-primary hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm text-accent">{selectedCollege.name}</span>
          </div>

          <div className="w-12 h-12 rounded-xl gradient-energy flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your admin portal</p>

          <div className="space-y-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" type="email" className="input-dark w-full" />
            <div className="relative">
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type={showPw ? "text" : "password"} className="input-dark w-full pr-12" onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}

          {/* Credentials hint */}
          <div className="mt-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Demo credentials for <span className="font-semibold text-foreground">{selectedCollege.shortName}</span>:</p>
            <p className="text-xs font-mono text-foreground">{selectedCollege.adminEmail} / {selectedCollege.adminPassword}</p>
          </div>

          <button onClick={handleLogin} disabled={loading || !email || !password} className="gradient-cta w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-lg">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="w-5 h-5" /></>
            )}
          </button>

          <p className="text-sm text-muted-foreground mt-4 text-center">
            Don't have an account? <span className="text-primary cursor-pointer hover:underline" onClick={() => alert("Sign Up is not available yet. Please use the demo credentials above.")}>Sign Up</span>
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mt-8">
          <span>© 2024 ScholarConnect</span>
          <a href="#" className="hover:text-foreground">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
