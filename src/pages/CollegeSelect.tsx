import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { colleges } from "@/data/colleges";
import { Building2, Search, MapPin, ArrowRight, GraduationCap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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
      {/* Left - Hero with background image */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/50" />
        <div className="absolute inset-0 flex flex-col justify-between p-10 z-10">
          <div className="text-xs tracking-widest text-muted-foreground uppercase">Scholarship Management Platform</div>
          <div>
            <h2 className="text-5xl font-black text-foreground mb-2">Select your</h2>
            <h3 className="text-5xl font-black gradient-text-brand mb-4">institution</h3>
            <p className="text-muted-foreground">Choose your college from Andhra Pradesh's top institutions to access scholarships and manage applications.</p>
          </div>
          <div className="flex gap-6 text-muted-foreground text-sm">
            <span>{colleges.length} Colleges</span>
            <span>•</span>
            <span>AP State</span>
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
          <p className="text-muted-foreground mb-6">Select your college to continue to the scholarship portal</p>

          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search colleges..." className="input-dark w-full pl-12" />
          </div>

          <div className="space-y-3 max-h-[65vh] overflow-auto pr-2">
            {filtered.map((college) => (
              <button
                key={college.id}
                onClick={() => handleSelect(college)}
                className="glass-card w-full p-5 flex items-center gap-4 hover:border-primary/50 transition-all group card-hover"
              >
                <div className="w-14 h-14 rounded-xl gradient-trust flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">{college.shortName}</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-bold text-foreground text-lg truncate">{college.name}</p>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="w-3 h-3" /> {college.location}</span>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mt-8">
          <span>© 2024 ScholarConnect</span>
          <a href="#" className="hover:text-foreground">Contact Us</a>
        </div>
      </div>
    </div>
  );
}
