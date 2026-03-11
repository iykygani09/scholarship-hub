import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, GraduationCap, ArrowLeft, Eye, EyeOff, LogIn, ShieldCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useImageLoaded } from "@/hooks/use-image-loaded";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedCollege, codeVerified, login } = useAuth();
  const navigate = useNavigate();
  const imgLoaded = useImageLoaded(heroBg);

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
      setError("Invalid email or password. Please check the credentials below.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left - Hero Panel */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div className={`absolute inset-0 transition-opacity duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}>
          <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        {!imgLoaded && <div className="absolute inset-0 bg-secondary animate-pulse" />}
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/50" />
        <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
          <div className="text-xs tracking-widest text-muted-foreground uppercase">Scholarship Management Platform</div>
          <div>
            <h2 className="text-4xl xl:text-5xl font-black text-foreground mb-2">Welcome to</h2>
            <h3 className="text-4xl xl:text-5xl font-black gradient-text-brand mb-4">{selectedCollege.shortName}</h3>
            <p className="text-muted-foreground leading-relaxed">Sign in to manage scholarships, track applications, and access your institution's portal.</p>
          </div>
          <div className="text-muted-foreground text-sm">Step 3 of 3 — Admin Authentication</div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 bg-background flex flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
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
          {/* College indicator - mobile */}
          <div className="lg:hidden inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-4 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm text-accent">{selectedCollege.name}</span>
          </div>

          <div className="w-12 h-12 rounded-xl gradient-energy flex items-center justify-center mb-4">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-1">Admin Sign In</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Sign in to your institution's admin portal</p>

          {/* Credentials hint - prominent */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">Admin Credentials</p>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <p className="text-sm text-foreground"><span className="text-muted-foreground">Email:</span> <span className="font-mono font-medium">{selectedCollege.adminEmail}</span></p>
              <p className="text-sm text-foreground"><span className="text-muted-foreground">Password:</span> <span className="font-mono font-medium">{selectedCollege.adminPassword}</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Email Address</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={selectedCollege.adminEmail} type="email" className="input-dark w-full" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Password</label>
              <div className="relative">
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" type={showPw ? "text" : "password"} className="input-dark w-full pr-12" onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="text-destructive text-sm mt-3 bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">{error}</p>}

          <button onClick={handleLogin} disabled={loading || !email || !password} className="gradient-cta w-full py-3.5 sm:py-4 rounded-xl text-white font-semibold text-base sm:text-lg flex items-center justify-center gap-2 mt-6 hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-lg">
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Sign In <ArrowRight className="w-5 h-5" /></>
            )}
          </button>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            Only authorized college administrators can sign in. Contact your institution for access.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mt-6 sm:mt-8">
          <span>© 2024 ScholarConnect</span>
          <a href="#" className="hover:text-foreground">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
