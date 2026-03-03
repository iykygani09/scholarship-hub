import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getApplications, type Application } from "@/data/colleges";
import { Search, Eye, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function AIScoreCircle({ score }: { score: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 85 ? "#40DC74" : score >= 70 ? "#FFD700" : "#ef4444";

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="hsl(217 33% 18%)" strokeWidth="3" />
        <circle cx="24" cy="24" r={radius} fill="none" stroke={color} strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <span className="absolute text-xs font-bold text-foreground">{score}</span>
    </div>
  );
}

export default function Applications() {
  const { college } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>(() => getApplications(college?.id || ""));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewApp, setViewApp] = useState<Application | null>(null);

  const filtered = applications.filter((a) => {
    const matchSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) || a.rollNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, status: "Approved" | "Rejected") => {
    setApplications((prev) => prev.map((a) => a.id === id ? { ...a, status } : a));
    toast({ title: `Application ${status.toLowerCase()} successfully` });
  };

  const statuses = ["All", "Pending", "Approved", "Rejected"];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-foreground">Applications</h1>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." className="input-dark w-full pl-12" />
        </div>
        <div className="flex gap-2">
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === s ? "gradient-trust text-white" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((app) => (
          <div key={app.id} className="glass-card p-5 card-hover">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full gradient-trust flex items-center justify-center text-white font-bold text-sm shrink-0">
                {app.studentName.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-foreground">{app.studentName}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${app.status === "Approved" ? "status-approved" : app.status === "Pending" ? "status-pending" : "status-rejected"}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-mono">{app.rollNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">CGPA</p>
                <p className="font-bold text-primary font-mono">{app.cgpa}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Income</p>
                <p className="font-bold text-foreground font-mono">₹{(app.familyIncome / 100000).toFixed(1)}L</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 flex flex-col items-center">
                <p className="text-xs text-muted-foreground">AI Score</p>
                <AIScoreCircle score={app.aiScore} />
              </div>
            </div>

            <div className="mt-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Dept:</strong> {app.department} | Year {app.year}</p>
              <p>Applied for: <strong className="gradient-text-brand">{app.programTitle}</strong></p>
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={() => setViewApp(app)} className="flex-1 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium flex items-center justify-center gap-1 hover:bg-secondary/80 transition-colors">
                <Eye className="w-4 h-4" /> View
              </button>
              {app.status === "Pending" && (
                <>
                  <button onClick={() => updateStatus(app.id, "Approved")} className="px-4 py-2 rounded-lg bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30 transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => updateStatus(app.id, "Rejected")} className="px-4 py-2 rounded-lg bg-destructive/20 text-destructive text-sm font-medium hover:bg-destructive/30 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-card p-16 text-center">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-1">No applications found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {viewApp && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewApp(null)}>
          <div className="glass-card max-w-md w-full p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-foreground">Application Details</h2>
              <button onClick={() => setViewApp(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Student</span><span className="text-foreground font-medium">{viewApp.studentName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Roll Number</span><span className="text-foreground font-mono">{viewApp.rollNumber}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span className="text-foreground">{viewApp.department}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Year</span><span className="text-foreground">{viewApp.year}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">CGPA</span><span className="text-foreground font-mono">{viewApp.cgpa}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Family Income</span><span className="text-foreground font-mono">₹{viewApp.familyIncome.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">AI Score</span><span className="text-foreground font-mono">{viewApp.aiScore}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Program</span><span className="text-foreground">{viewApp.programTitle}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={`text-xs px-2 py-0.5 rounded-full ${viewApp.status === "Approved" ? "status-approved" : viewApp.status === "Pending" ? "status-pending" : "status-rejected"}`}>{viewApp.status}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
