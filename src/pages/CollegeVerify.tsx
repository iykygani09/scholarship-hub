import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, ArrowRight, GraduationCap, ArrowLeft, CheckCircle } from "lucide-react";

export default function CollegeVerify() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
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
      setVerified(true);
      await new Promise((r) => setTimeout(r, 600));
      navigate(`/login/${selectedCollege.id}`);
    } else {
      setError("Invalid college code. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] via-[#1a1a2e] to-[#00CEC9]" />
        <div className="floating-orb w-64 h-64 bg-[#6C5CE7] top-[10%] right-[-10%]" />
        <div className="floating-orb w-48 h-48 bg-[#00CEC9] bottom-[20%] left-[-5%]" style={{ animationDelay: "1.5s" }} />
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <div className="text-xs tracking-widest text-white/60 uppercase">Scholarship Management Platform</div>
          <div>
            <h2 className="text-5xl font-black text-white mb-2">Verify</h2>
            <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00CEC9] to-[#6C5CE7] mb-4">{selectedCollege.shortName}</h3>
            <p className="text-white/70">Enter your institution's unique code to access the scholarship portal for {selectedCollege.name}.</p>
          </div>
          <div className="text-white/60 text-sm">Step 2 of 3 — Code Verification</div>
        </div>
      </div>

      <div className="flex-1 bg-background flex flex-col p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-tech flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold gradient-text-brand">ScholarConnect</span>
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

          {verified ? (
            <div className="text-center animate-slide-up">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-black text-foreground">Code Verified!</h2>
              <p className="text-muted-foreground mt-2">Redirecting to login...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl gradient-tech flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-white" />
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

              <button onClick={handleVerify} disabled={loading} className="gradient-tech w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-lg">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Verify & Continue <ArrowRight className="w-5 h-5" /></>
                )}
              </button>

              <p className="text-sm text-muted-foreground mt-4 text-center">Don't have a code? Contact your institution's administration.</p>
            </>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mt-8">
          <span>© 2024 ScholarConnect</span>
          <a href="#" className="hover:text-foreground">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
