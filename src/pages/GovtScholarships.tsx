import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getGovtScholarships, type Scholarship } from "@/data/colleges";
import { Search, Landmark, ExternalLink, Users, IndianRupee } from "lucide-react";

export default function GovtScholarships() {
  const { college } = useAuth();
  const scholarships = getGovtScholarships(college?.id || "");
  const [search, setSearch] = useState("");
  const [viewItem, setViewItem] = useState<Scholarship | null>(null);

  const filtered = scholarships.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl gradient-energy flex items-center justify-center">
            <Landmark className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground">Government Scholarships</h1>
            <p className="text-muted-foreground">AP State & Central Government Schemes for {college?.shortName}</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search government scholarships..." className="input-dark w-full pl-12" />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-trust flex items-center justify-center">
              <Landmark className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-foreground font-mono">{scholarships.length}</p>
              <p className="text-sm text-muted-foreground">Active Schemes</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-5 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-energy flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-foreground font-mono">{scholarships.reduce((a, s) => a + s.filledSeats, 0)}</p>
              <p className="text-sm text-muted-foreground">Students Benefited</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-5 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-tech flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-foreground font-mono">₹{Math.round(scholarships.reduce((a, s) => a + s.amount * s.filledSeats, 0) / 100000)}L</p>
              <p className="text-sm text-muted-foreground">Total Disbursed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s, i) => (
          <div key={s.id} className={`glass-card p-5 card-hover animate-slide-up stagger-${Math.min(i + 1, 4)} opacity-0`} style={{ animationFillMode: "forwards" }}>
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-foreground text-lg leading-tight">{s.title}</h3>
              <span className="status-active text-xs px-3 py-1 rounded-full shrink-0 ml-2">{s.status}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="font-bold gradient-text-warm text-lg">{s.amountDescription.split('(')[0]}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">Seats Filled</p>
                <p className="font-bold text-foreground font-mono">{s.filledSeats}/{s.totalSeats}</p>
                <div className="h-1.5 bg-border rounded-full mt-1 overflow-hidden">
                  <div className="h-full gradient-trust rounded-full" style={{ width: `${(s.filledSeats / s.totalSeats) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div><span className="text-muted-foreground">Categories: </span><span className="text-foreground">{s.categories.join(", ")}</span></div>
              <div><span className="text-muted-foreground">Max Income: </span><span className="text-foreground font-mono">₹{s.maxIncome.toLocaleString()}</span></div>
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button onClick={() => setViewItem(s)} className="flex-1 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
                View Details
              </button>
              {s.portal && (
                <a href={`https://${s.portal}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg gradient-trust text-white text-sm font-medium flex items-center gap-1 hover:scale-105 transition-transform">
                  <ExternalLink className="w-4 h-4" /> Portal
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewItem(null)}>
          <div className="glass-card max-w-lg w-full p-6 animate-slide-up max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-foreground mb-4">{viewItem.title}</h2>
            <p className="text-muted-foreground mb-4">{viewItem.description}</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="text-foreground font-semibold">{viewItem.amountDescription}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Categories</span><span className="text-foreground">{viewItem.categories.join(", ")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Max Income</span><span className="text-foreground font-mono">₹{viewItem.maxIncome.toLocaleString()}</span></div>
              <div><span className="text-muted-foreground">Eligibility: </span><span className="text-foreground">{viewItem.eligibility}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Period</span><span className="text-foreground">{viewItem.startDate} to {viewItem.endDate}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Portal</span><span className="text-primary">{viewItem.portal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Seats</span><span className="text-foreground font-mono">{viewItem.filledSeats}/{viewItem.totalSeats}</span></div>
            </div>
            <button onClick={() => setViewItem(null)} className="mt-6 w-full py-3 rounded-lg bg-secondary text-foreground font-semibold hover:bg-secondary/80 transition-colors">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
