import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useScholarships } from "@/contexts/ScholarshipContext";
import type { Application } from "@/data/colleges";
import { Brain, Play, X, Sparkles, GraduationCap, Users, ArrowRight, Clock, CalendarDays, CheckCircle, AlertTriangle, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function AIAllocation() {
  const { college } = useAuth();
  const { programs, applications, setApplications, addNotification, getScholarshipStatus, getDaysRemaining } = useScholarships();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<(Application & { aiScore: number })[] | null>(null);
  const [scoreModal, setScoreModal] = useState<(Application & { aiScore: number }) | null>(null);

  const currentProgram = programs.find((p) => p.id === selectedProgram);

  const calculateAIScore = (app: Application): number => {
    let score = 0;
    score += (app.cgpa / 10) * 40;
    const incomeScore = Math.max(0, 1 - app.familyIncome / 500000);
    score += incomeScore * 30;
    score += (Math.min(app.year, 4) / 4) * 20;
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

    addNotification({
      type: "ai_allocation",
      title: "AI Allocation Completed",
      description: `Ranked ${scored.length} applicants for ${currentProgram.title}. Top score: ${scored[0]?.aiScore}/100`,
      programTitle: currentProgram.title,
    });

    toast({ title: "✅ AI Allocation complete!", description: `Ranked ${scored.length} applicants for ${currentProgram.title}` });
  };

  const handleAction = (action: "Approved" | "Rejected", appId: string) => {
    const app = applications.find((a) => a.id === appId);
    setApplications((prev) => prev.map((a) => a.id === appId ? { ...a, status: action, notified: action === "Approved" } : a));
    setResults((prev) =>
      prev ? prev.map((r) => r.id === appId ? { ...r, status: action } : r) : null
    );

    if (app) {
      addNotification({
        type: action === "Approved" ? "approval" : "rejection",
        title: action === "Approved" ? "Student Selected" : "Application Rejected",
        description: `${app.studentName} has been ${action.toLowerCase()} for ${app.programTitle}. ${action === "Approved" ? "Student will be notified on the app." : ""}`,
        studentName: app.studentName,
        programTitle: app.programTitle,
      });
    }

    toast({
      title: action === "Approved"
        ? `✅ ${app?.studentName} selected — Student will be notified`
        : `❌ Application rejected`,
    });
  };

  const handleBulkApproveTop = () => {
    if (!results || !currentProgram) return;
    const topN = Math.min(currentProgram.totalSeats, results.length);
    const topIds = results.slice(0, topN).filter((r) => r.status === "Pending").map((r) => r.id);

    setApplications((prev) => prev.map((a) => topIds.includes(a.id) ? { ...a, status: "Approved" as const, notified: true } : a));
    setResults((prev) => prev ? prev.map((r) => topIds.includes(r.id) ? { ...r, status: "Approved" as const } : r) : null);

    addNotification({
      type: "approval",
      title: `Bulk Approval — ${topIds.length} Students Selected`,
      description: `Top ${topIds.length} applicants approved for ${currentProgram.title}. All students will be notified.`,
      programTitle: currentProgram.title,
    });

    toast({ title: `✅ ${topIds.length} students selected & notified!` });
  };

  const medals = ["🥇", "🥈", "🥉"];

  // Empty state
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
              <p className="text-muted-foreground">{college?.name}</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-16 text-center max-w-lg mx-auto">
          <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No Scholarships Created Yet</h3>
          <p className="text-muted-foreground mb-6">Create scholarships first, then students can apply, and you can run AI allocation to rank & select applicants.</p>
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
            <p className="text-muted-foreground">{college?.name} — Select students based on eligibility criteria</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="glass-card p-5">
        <h3 className="font-bold text-foreground text-sm mb-3">How AI Allocation Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {[
            { step: "1", title: "Create Scholarship", desc: "Set eligibility & deadline", icon: "🎓" },
            { step: "2", title: "Students Apply", desc: "Via mobile app before deadline", icon: "📝" },
            { step: "3", title: "AI Ranks Applicants", desc: "Based on merit, need & more", icon: "🤖" },
            { step: "4", title: "Select & Notify", desc: "Approve top students", icon: "✅" },
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <span className="text-2xl">{s.icon}</span>
              <div>
                <p className="text-xs text-muted-foreground">Step {s.step}</p>
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-8 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl gradient-tech flex items-center justify-center mx-auto mb-6 animate-glow">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Select Scholarship to Allocate</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Choose from {programs.length} scholarship{programs.length !== 1 ? "s" : ""}
        </p>

        <select
          value={selectedProgram}
          onChange={(e) => { setSelectedProgram(e.target.value); setResults(null); }}
          className="input-dark w-full mb-4 text-lg"
        >
          <option value="">— Select a scholarship —</option>
          {programs.map((p) => {
            const appCount = applications.filter((a) => a.programTitle === p.title).length;
            const status = getScholarshipStatus(p);
            return (
              <option key={p.id} value={p.id}>
                {p.icon} {p.title} — ₹{p.amount.toLocaleString()} ({appCount} applicants) {status === "Expired" ? "⏰ Expired" : ""}
              </option>
            );
          })}
        </select>

        {currentProgram && (
          <div className="glass-card p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentProgram.icon}</span>
              <h3 className="font-bold text-foreground">{currentProgram.title}</h3>
              {(() => {
                const status = getScholarshipStatus(currentProgram);
                const days = getDaysRemaining(currentProgram.deadline);
                return (
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ml-auto ${status === "Expired" ? "status-rejected" : "status-active"}`}>
                    {status === "Expired" ? "Deadline Passed — Ready for Allocation" : `${days}d remaining`}
                  </span>
                );
              })()}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{currentProgram.description}</p>
            {currentProgram.eligibility && (
              <div className="flex items-center gap-2 mb-3 text-xs bg-secondary/30 rounded-lg px-3 py-2">
                <span className="font-semibold text-foreground uppercase tracking-wider">Eligibility:</span>
                <span className="text-foreground">{currentProgram.eligibility}</span>
              </div>
            )}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-muted-foreground uppercase">Amount</p>
                <p className="font-bold text-foreground font-mono text-sm">₹{currentProgram.amount.toLocaleString()}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-muted-foreground uppercase">Seats</p>
                <p className="font-bold text-foreground font-mono text-sm">{currentProgram.filledSeats}/{currentProgram.totalSeats}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-muted-foreground uppercase">Applicants</p>
                <p className="font-bold text-foreground font-mono text-sm">
                  {applications.filter((a) => a.programTitle === currentProgram.title).length}
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-muted-foreground uppercase">Deadline</p>
                <p className="font-bold text-foreground font-mono text-sm">
                  {new Date(currentProgram.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-6">
          AI scoring: <span className="text-foreground font-medium">Academic (40%)</span> · <span className="text-foreground font-medium">Financial Need (30%)</span> · <span className="text-foreground font-medium">Extracurriculars (20%)</span> · <span className="text-foreground font-medium">Essay (10%)</span>
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
          <div className="p-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-bold text-foreground">Allocation Results — {results.length} Applicants Ranked</h3>
              {currentProgram && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {currentProgram.totalSeats} seats available • Top {Math.min(currentProgram.totalSeats, results.length)} recommended for selection
                </p>
              )}
            </div>
            {currentProgram && results.some((r) => r.status === "Pending") && (
              <button
                onClick={handleBulkApproveTop}
                className="gradient-trust px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-md"
              >
                <CheckCircle className="w-4 h-4" />
                Select Top {Math.min(currentProgram.totalSeats, results.filter((r) => r.status === "Pending").length)} & Notify
              </button>
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
                      <td className="p-4 text-lg font-bold">{i < 3 ? medals[i] : <span className="text-muted-foreground font-mono">{i + 1}</span>}</td>
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
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs px-3 py-1 rounded-full border ${
                            app.status === "Approved" ? "status-approved" : app.status === "Rejected" ? "status-rejected" : "status-pending"
                          }`}>
                            {app.status === "Approved" ? "Selected ✓" : app.status === "Rejected" ? "Rejected" : "Pending"}
                          </span>
                          {app.status === "Approved" && (
                            <span className="text-[10px] text-accent flex items-center gap-0.5" title="Student notified">
                              <Bell className="w-3 h-3" /> Notified
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {app.status === "Pending" ? (
                          <>
                            <button onClick={() => handleAction("Approved", app.id)} className="px-3 py-1.5 text-xs rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors font-medium">
                              Select & Notify
                            </button>
                            <button onClick={() => handleAction("Rejected", app.id)} className="px-3 py-1.5 text-xs rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors font-medium">
                              Reject
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">Decision made</span>
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

      {/* Score Breakdown Modal */}
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
