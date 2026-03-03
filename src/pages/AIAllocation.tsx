import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getInternalPrograms, getApplications, type Application } from "@/data/colleges";
import { Brain, Play, X, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AIAllocation() {
  const { college } = useAuth();
  const { toast } = useToast();
  const programs = getInternalPrograms(college?.id || "");
  const allApplications = getApplications(college?.id || "");
  const [selectedProgram, setSelectedProgram] = useState(programs[0]?.id || "");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Application[] | null>(null);
  const [scoreModal, setScoreModal] = useState<Application | null>(null);

  const currentProgram = programs.find(p => p.id === selectedProgram);

  const runAllocation = async () => {
    setRunning(true);
    setProgress(0);
    setResults(null);
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 80));
      setProgress(i);
    }
    const apps = allApplications
      .filter((a) => a.programId === selectedProgram)
      .sort((a, b) => b.aiScore - a.aiScore);
    setResults(apps.length > 0 ? apps : allApplications.sort((a, b) => b.aiScore - a.aiScore));
    setRunning(false);
    toast({ title: "✅ AI Allocation complete!", description: `Ranked ${apps.length || allApplications.length} applicants for ${currentProgram?.title}` });
  };

  const medals = ["🥇", "🥈", "🥉"];

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
        <h2 className="text-xl font-bold text-foreground mb-2">Select Internal Program</h2>
        <p className="text-sm text-muted-foreground mb-4">Choose from all {programs.length} internal programs at {college?.shortName}</p>
        
        <select value={selectedProgram} onChange={(e) => { setSelectedProgram(e.target.value); setResults(null); }} className="input-dark w-full mb-4 text-lg">
          {programs.map((p) => (
            <option key={p.id} value={p.id}>{p.icon} {p.title} — ₹{p.amount.toLocaleString()}</option>
          ))}
        </select>

        {currentProgram && (
          <div className="glass-card p-4 mb-6 text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{currentProgram.icon}</span>
              <h3 className="font-bold text-foreground">{currentProgram.title}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full status-active">{currentProgram.status}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{currentProgram.description}</p>
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
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-bold text-foreground capitalize">{currentProgram.category}</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-6">AI will rank applicants based on academic performance (40%), financial need (30%), extracurriculars (20%), and essay quality (10%).</p>

        {running && (
          <div className="mb-4">
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div className="h-full gradient-tech transition-all duration-200 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-muted-foreground mt-2 font-mono">{progress}% — Analyzing applicant data...</p>
          </div>
        )}

        <button onClick={runAllocation} disabled={running} className="gradient-tech w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-lg">
          <Play className="w-5 h-5" /> Run AI Allocation
        </button>
      </div>

      {results && (
        <div className="glass-card overflow-hidden animate-slide-up">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-foreground">Allocation Results — {results.length} Applicants Ranked</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="p-4 text-left text-sm text-muted-foreground">Rank</th>
                <th className="p-4 text-left text-sm text-muted-foreground">Student</th>
                <th className="p-4 text-left text-sm text-muted-foreground hidden md:table-cell">Roll No</th>
                <th className="p-4 text-left text-sm text-muted-foreground">CGPA</th>
                <th className="p-4 text-left text-sm text-muted-foreground">AI Score</th>
                <th className="p-4 text-right text-sm text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((app, i) => (
                <tr key={app.id} className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${i < 3 ? "bg-secondary/10" : ""}`}>
                  <td className="p-4 text-lg">{i < 3 ? medals[i] : i + 1}</td>
                  <td className="p-4">
                    <p className="font-semibold text-foreground">{app.studentName}</p>
                    <p className="text-xs text-muted-foreground">{app.department} • Year {app.year}</p>
                  </td>
                  <td className="p-4 font-mono text-muted-foreground hidden md:table-cell">{app.rollNumber}</td>
                  <td className="p-4 font-mono text-foreground">{app.cgpa}</td>
                  <td className="p-4">
                    <button onClick={() => setScoreModal(app)} className="font-mono text-primary underline hover:text-primary/80">{app.aiScore}</button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="px-3 py-1 text-xs rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors">Approve</button>
                    <button className="px-3 py-1 text-xs rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {scoreModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setScoreModal(null)}>
          <div className="glass-card max-w-sm w-full p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">AI Score Breakdown</h2>
              <button onClick={() => setScoreModal(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{scoreModal.studentName} — {scoreModal.rollNumber}</p>
            {[
              { label: "Academic (40%)", value: Math.round(scoreModal.aiScore * 0.4), color: "gradient-trust" },
              { label: "Financial Need (30%)", value: Math.round(scoreModal.aiScore * 0.3), color: "gradient-energy" },
              { label: "Extracurricular (20%)", value: Math.round(scoreModal.aiScore * 0.2), color: "gradient-tech" },
              { label: "Essay Quality (10%)", value: Math.round(scoreModal.aiScore * 0.1), color: "gradient-trust" },
            ].map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground font-mono">{item.value}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
            <div className="border-t border-border pt-3 mt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold gradient-text-brand font-mono text-xl">{scoreModal.aiScore}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
