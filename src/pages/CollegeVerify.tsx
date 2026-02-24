import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, ArrowRight, GraduationCap, ArrowLeft } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export default function CollegeVerify() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { selectedCollege, verifyCode } = useAuth();
  const navigate = useNavigate();

  if (!selectedCollege) {
    navigate("/select-college", { replace: true });
    return null;
  }

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    if (verifyCode(code)) {
      navigate(`/login/${selectedCollege.id}`);
    } else {
      setError("Invalid college code. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute top-6 left-8 text-xs tracking-widest text-muted-foreground uppercase">Scholarship Management Platform</div>
        <div className="absolute bottom-12 left-10 right-10">
          <h2 className="text-5xl font-black text-foreground mb-2">Verify</h2>
          <h3 className="text-5xl font-black gradient-text-brand mb-4">{selectedCollege.shortName}</h3>
          <p className="text-muted-foreground">Enter your institution's unique code to access the scholarship portal for {selectedCollege.name}.</p>
        </div>
      </div>

      <div className="flex-1 bg-background flex flex-col p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ScholarConnect</span>
          </div>
          <button onClick={() => navigate("/select-college")} className="text-sm text-primary hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Change College
          </button>
        </div>

        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-4 py-1.5 mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm text-accent">{selectedCollege.name}</span>
          </div>

          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">Verify Institution</h1>
          <p className="text-muted-foreground mb-8">
            Enter the college code for <strong className="text-foreground">{selectedCollege.shortName}</strong> to continue
          </p>

          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`College Code (e.g. ${selectedCollege.code})`}
            className={`input-dark w-full mb-2 ${error ? "border-destructive" : ""}`}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          />
          {error && <p className="text-destructive text-sm mb-4">{error}</p>}

          <button onClick={handleVerify} disabled={loading} className="gradient-cta w-full py-4 rounded-xl text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] transition-transform disabled:opacity-50">
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>Verify & Continue <ArrowRight className="w-5 h-5" /></>
            )}
          </button>

          <p className="text-sm text-muted-foreground mt-4 text-center">Don't have a code? Contact your institution's administration.</p>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mt-8">
          <span>© 2024 ScholarConnect</span>
          <a href="#" className="hover:text-foreground">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
