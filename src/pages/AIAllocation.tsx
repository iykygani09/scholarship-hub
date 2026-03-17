import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useScholarships } from "@/contexts/ScholarshipContext";
import type { Application } from "@/data/colleges";
import { Brain, Play, X, Sparkles, GraduationCap, Users, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function AIAllocation() {
  const { college } = useAuth();
  const { programs, applications, setApplications } = useScholarships();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<(Application & { aiScore: number })[] | null>(null);
  const [scoreModal, setScoreModal] = useState<(Application & { aiScore: number }) | null>(null);

  const currentProgram = programs.find((p) => p.id === selectedProgram);

  // Simulate AI scoring based on eligibility criteria
  const calculateAIScore = (app: Application): number => {
    let score = 0;
    // Academic (40%) — based on CGPA out of 10
    score += (app.cgpa / 10) * 40;
    // Financial Need (30%) — lower income = higher score
    const incomeScore = Math.max(0, 1 - app.familyIncome / 500000);
    score += incomeScore * 30;
    // Extracurricular (20%) — simulated from year and department diversity
    score += (Math.min(app.year, 4) / 4) * 20;
    // Essay Quality (10%) — simulated random but deterministic per student
    const hash = app.studentName.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    score += ((hash % 100) / 100) * 10;
    return Math.round(score * 10) / 10;
  };

  const runAllocation = async () => {
    if (!selectedProgram || !currentProgram) {
      toast({ title: "Please select a scholarship first", variant: "destructive" });
      return;
    }

    const programApps = applications.filter((a) => a.programTitle === currentProgram.title);
    if (programApps.length === 0) {
      toast({ title: "No applications found", description: "No students have applied for this scholarship yet.", variant: "destructive" });
      return;
    }

    setRunning(true);
    setProgress(0);
    setResults(null);

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 80));
      setProgress(i);
    }

    const scored = programApps
      .map((app) => ({ ...app, aiScore: calculateAIScore(app) }))
      .sort((a, b) => b.aiScore - a.aiScore);

    setResults(scored);
    setRunning(false);
    toast({ title: "✅ AI Allocation complete!", description: `Ranked ${scored.length} applicants for ${currentProgram.title}` });
  };

  const handleBulkAction = (action: "Approved" | "Rejected", appId: string) => {
    setApplications((prev) => prev.map((a) => a.id === appId ? { ...a, status: action } : a));
    setResults((prev) =>
      prev ? prev.map((r) => r.id === appId ? { ...r, status: action } : r) : null
    );
    toast({ title: `Application ${action.toLowerCase()}` });
  };

  const medals = ["🥇", "🥈", "🥉"];

  // Empty state — no scholarships created yet
  if (programs.length === 0) {
    return (
      <div className="space-y-6">
        <div className="animate-slide-up">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl gradient-tech flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">AI Smart Allocation</h1>
              <p className="text-muted-foreground">{college?.name} — Intelligent Scholarship Ranking</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-16 text-center max-w-lg mx-auto">
          <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No Scholarships Created Yet</h3>
          <p className="text-muted-foreground mb-6">Create scholarships first, then students can apply, and you can run AI allocation to rank applicants.</p>
          <button onClick={() => navigate("/scholarships")} className="gradient-trust px-6 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" /> Create Scholarships <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl gradient-tech flex items-center justify-center animate-glow">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-foreground">AI Smart Allocation</h1>
            <p className="text-muted-foreground">{college?.name} — Intelligent Scholarship Ranking</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-8 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl gradient-tech flex items-center justify-center mx-auto mb-6 animate-glow">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Select Scholarship</h2>
        <p className="text-sm text-muted-foreground mb-4">Choose from {programs.length} scholarship{programs.length !== 1 ? "s" : ""} at {college?.shortName}</p>

        <select
          value={selectedProgram}
          onChange={(e) => { setSelectedProgram(e.target.value); setResults(null); }}
          className="input-dark w-full mb-4 text-lg"
        >
          <option value="">— Select a scholarship —</option>
          {programs.map((p) => {
            const appCount = applications.filter((a) => a.programTitle === p.title).length;
            return (
              <option key={p.id} value={p.id}>
                {p.icon} {p.title} — ₹{p.amount.toLocaleString()} ({appCount} applicants)
              </option>
            );
          })}
        </select>

        {currentProgram && (
          <div className="glass-card p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentProgram.icon}</span>
              <h3 className="font-bold text-foreground">{currentProgram.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${currentProgram.status === "Active" ? "status-active" : currentProgram.status === "Upcoming" ? "status-pending" : "status-rejected"}`}>{currentProgram.status}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{currentProgram.description}</p>
            <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
              <span className="font-semibold uppercase tracking-wider">Eligibility:</span>
              <span className="text-foreground">{currentProgram.eligibility}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Amount</p>
                <p className="font-bold text-foreground font-mono">₹{currentProgram.amount.toLocaleString()}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Seats</p>
                <p className="font-bold text-foreground font-mono">{currentProgram.filledSeats}/{currentProgram.totalSeats}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Applicants</p>
                <p className="font-bold text-foreground font-mono">
                  <Users className="w-3.5 h-3.5 inline mr-1" />
                  {applications.filter((a) => a.programTitle === currentProgram.title).length}
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-6">
          AI ranks applicants based on: <span className="text-foreground font-medium">Academic (40%)</span>, <span className="text-foreground font-medium">Financial Need (30%)</span>, <span className="text-foreground font-medium">Extracurriculars (20%)</span>, and <span className="text-foreground font-medium">Essay Quality (10%)</span>.
        </p>

        {running && (
          <div className="mb-4">
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div className="h-full gradient-tech transition-all duration-200 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-muted-foreground mt-2 font-mono">{progress}% — Analyzing applicant data...</p>
          </div>
        )}

        <button
          onClick={runAllocation}
          disabled={running || !selectedProgram}
          className="gradient-tech w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-lg"
        >
          <Play className="w-5 h-5" /> Run AI Allocation
        </button>
      </div>

      {results && (
        <div className="glass-card overflow-hidden animate-slide-up">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-foreground">Allocation Results — {results.length} Applicants Ranked</h3>
            {currentProgram && (
              <span className="text-xs text-muted-foreground">
                {currentProgram.totalSeats} seats available • Top {Math.min(currentProgram.totalSeats, results.length)} recommended
              </span>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rank</th>
                  <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Roll No</th>
                  <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">CGPA</th>
                  <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Score</th>
                  <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="p-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((app, i) => {
                  const isRecommended = currentProgram ? i < currentProgram.totalSeats : i < 5;
                  return (
                    <tr key={app.id} className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${isRecommended ? "bg-emerald-500/5" : ""}`}>
                      <td className="p-4 text-lg font-bold">{i < 3 ? medals[i] : i + 1}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full gradient-trust flex items-center justify-center text-white font-bold text-xs shrink-0">
                            {app.studentName.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{app.studentName}</p>
                            <p className="text-xs text-muted-foreground">{app.department} • Year {app.year}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-muted-foreground hidden md:table-cell">{app.rollNumber}</td>
                      <td className="p-4 font-mono text-foreground">{app.cgpa}</td>
                      <td className="p-4">
                        <button onClick={() => setScoreModal(app)} className="font-mono text-primary underline hover:text-primary/80 font-bold">{app.aiScore}</button>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs px-3 py-1 rounded-full border ${
                          app.status === "Approved" ? "status-approved" : app.status === "Rejected" ? "status-rejected" : "status-pending"
                        }`}>
                          {app.status === "Pending" ? "Under Review" : app.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {app.status === "Pending" ? (
                          <>
                            <button onClick={() => handleBulkAction("Approved", app.id)} className="px-3 py-1 text-xs rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors">Approve</button>
                            <button onClick={() => handleBulkAction("Rejected", app.id)} className="px-3 py-1 text-xs rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors">Reject</button>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Decided</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Score Breakdown Modal */}
      {scoreModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setScoreModal(null)}>
          <div className="glass-card max-w-sm w-full p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">AI Score Breakdown</h2>
              <button onClick={() => setScoreModal(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full gradient-trust flex items-center justify-center text-white font-bold text-xs">
                {scoreModal.studentName.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-semibold text-foreground">{scoreModal.studentName}</p>
                <p className="text-xs text-muted-foreground font-mono">{scoreModal.rollNumber}</p>
              </div>
            </div>
            {[
              { label: "Academic (40%)", value: Math.round((scoreModal.cgpa / 10) * 40 * 10) / 10, max: 40, color: "gradient-trust" },
              { label: "Financial Need (30%)", value: Math.round(Math.max(0, 1 - scoreModal.familyIncome / 500000) * 30 * 10) / 10, max: 30, color: "gradient-energy" },
              { label: "Extracurricular (20%)", value: Math.round((Math.min(scoreModal.year, 4) / 4) * 20 * 10) / 10, max: 20, color: "gradient-tech" },
              { label: "Essay Quality (10%)", value: Math.round(((scoreModal.studentName.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % 100) / 100) * 10 * 10) / 10, max: 10, color: "gradient-trust" },
            ].map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground font-mono">{item.value}/{item.max}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${(item.value / item.max) * 100}%` }} />
                </div>
              </div>
            ))}
            <div className="border-t border-border pt-3 mt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total Score</span>
              <span className="font-bold gradient-text-brand font-mono text-xl">{scoreModal.aiScore}/100</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
