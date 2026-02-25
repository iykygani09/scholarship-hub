import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getInternalPrograms, type InternalProgram } from "@/data/colleges";
import { Search, GraduationCap, Sparkles } from "lucide-react";

const categoryLabels: Record<string, { label: string; gradient: string }> = {
  merit: { label: "🏆 Academic & Merit", gradient: "gradient-trust" },
  need: { label: "💰 Need-Based & Govt Support", gradient: "gradient-energy" },
  talent: { label: "🏅 Talent-Based", gradient: "gradient-tech" },
  exposure: { label: "🌍 Premium Exposure", gradient: "gradient-trust" },
  foundation: { label: "🧠 Foundation Support", gradient: "gradient-energy" },
};

export default function InternalPrograms() {
  const { college } = useAuth();
  const programs = getInternalPrograms(college?.id || "");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = programs.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categories = ["all", ...Array.from(new Set(programs.map((p) => p.category)))];

  const grouped = filtered.reduce<Record<string, InternalProgram[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl gradient-trust flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground">Internal & Current Programs</h1>
            <p className="text-muted-foreground">{college?.name} — Student Support Programs</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search programs..." className="input-dark w-full pl-12" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === c ? "gradient-trust text-white" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              {c === "all" ? "All Programs" : categoryLabels[c]?.label || c}
            </button>
          ))}
        </div>
      </div>

      {/* Programs by Category */}
      {Object.entries(grouped).map(([category, items], idx) => (
        <div key={category} className={`animate-slide-up stagger-${Math.min(idx + 1, 4)} opacity-0`} style={{ animationFillMode: "forwards" }}>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {categoryLabels[category]?.label || category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((program) => (
              <div key={program.id} className="glass-card p-5 card-hover">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{program.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-foreground text-lg">{program.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${program.status === "Active" ? "status-active" : program.status === "Upcoming" ? "status-pending" : "status-rejected"}`}>
                        {program.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[70px]">Eligibility</span>
                        <span className="text-sm text-foreground">{program.eligibility}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[70px]">Benefit</span>
                        <span className="text-sm font-semibold gradient-text-brand">{program.benefit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="glass-card p-16 text-center">
          <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-1">No programs found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
