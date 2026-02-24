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
      c.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (college: typeof colleges[0]) => {
    selectCollege(college);
    navigate(`/verify/${college.id}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-12 left-10 right-10">
          <h2 className="text-5xl font-black text-foreground mb-2">Select your</h2>
          <h3 className="text-5xl font-black gradient-text-brand mb-4">institution</h3>
          <p className="text-muted-foreground">Choose your college from Andhra Pradesh's top institutions to access scholarships and manage applications.</p>
        </div>
      </div>

      {/* Right - College list */}
      <div className="flex-1 bg-background flex flex-col p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ScholarConnect</span>
          </div>
        </div>

        <div className="max-w-lg mx-auto w-full flex-1">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">Choose Institution</h1>
          <p className="text-muted-foreground mb-6">Select your college to continue to the scholarship portal</p>

          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search colleges..." className="input-dark w-full pl-12" />
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-auto pr-2">
            {filtered.map((college) => (
              <button
                key={college.id}
                onClick={() => handleSelect(college)}
                className="glass-card w-full p-4 flex items-center gap-4 hover:border-primary/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold text-xs">{college.shortName}</span>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="font-semibold text-foreground truncate">{college.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {college.location}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">© 2024 ScholarConnect</p>
      </div>
    </div>
  );
}
