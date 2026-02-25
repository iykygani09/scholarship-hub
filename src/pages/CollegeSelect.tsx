import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { colleges } from "@/data/colleges";
import { Building2, Search, MapPin, ArrowRight, GraduationCap, Calendar, Award, Globe } from "lucide-react";

export default function CollegeSelect() {
  const [search, setSearch] = useState("");
  const { selectCollege } = useAuth();
  const navigate = useNavigate();

  const filtered = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.shortName.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (college: typeof colleges[0]) => {
    selectCollege(college);
    navigate(`/verify/${college.id}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0052CC] via-[#1a1a2e] to-[#40DC74]" />
        <div className="floating-orb w-64 h-64 bg-[#40DC74] top-[10%] left-[-10%]" />
        <div className="floating-orb w-48 h-48 bg-[#6C5CE7] bottom-[20%] right-[-5%]" style={{ animationDelay: "1.5s" }} />
        <div className="absolute inset-0 flex flex-col justify-between p-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-trust flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-lg">ScholarConnect</span>
          </div>
          <div>
            <p className="text-xs tracking-widest text-white/60 uppercase mb-4">Andhra Pradesh</p>
            <h2 className="text-5xl font-black text-white mb-2">Select your</h2>
            <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#40DC74] to-[#FFD700] mb-4">institution</h3>
            <p className="text-white/70">Choose from {colleges.length} leading AP institutions to access scholarship management, applications & AI-powered allocation.</p>
          </div>
          <div className="flex gap-6 text-white/60 text-sm">
            <span>{colleges.length} Colleges</span>
            <span>•</span>
            <span>AP State</span>
            <span>•</span>
            <span>Govt + Institutional</span>
          </div>
        </div>
      </div>

      {/* Right - College list */}
      <div className="flex-1 bg-background flex flex-col p-8 overflow-auto">
        <div className="lg:hidden flex items-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-lg gradient-trust flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold gradient-text-brand">ScholarConnect</span>
        </div>

        <div className="max-w-2xl mx-auto w-full flex-1">
          <div className="w-12 h-12 rounded-xl gradient-trust flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">Choose Institution</h1>
          <p className="text-muted-foreground mb-6">Select your college to access the scholarship management portal</p>

          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, location, district..." className="input-dark w-full pl-12" />
          </div>

          <p className="text-sm text-muted-foreground mb-3">{filtered.length} institutions found</p>

          <div className="space-y-3 max-h-[65vh] overflow-auto pr-2">
            {filtered.map((college, i) => (
              <button
                key={college.id}
                onClick={() => handleSelect(college)}
                className={`glass-card w-full p-5 flex items-start gap-4 hover:border-primary/50 transition-all group card-hover animate-slide-up stagger-${Math.min(i + 1, 4)} opacity-0`}
                style={{ animationFillMode: "forwards" }}
              >
                <div className="w-14 h-14 rounded-xl gradient-trust flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">{college.shortName}</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-bold text-foreground text-lg">{college.name}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {college.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Est. {college.established}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{college.accreditation}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{college.affiliatedTo}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">© 2024 ScholarConnect — AP Scholarship Platform</p>
      </div>
    </div>
  );
}
