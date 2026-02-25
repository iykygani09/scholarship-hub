import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getGovtScholarships, getApplications, type Application } from "@/data/colleges";
import { Brain, Play, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AIAllocation() {
  const { college } = useAuth();
  const { toast } = useToast();
  const scholarships = getGovtScholarships(college?.id || "");
  const allApplications = getApplications(college?.id || "");
  const [selectedScholarship, setSelectedScholarship] = useState(scholarships[0]?.id || "");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<Application[] | null>(null);
  const [scoreModal, setScoreModal] = useState<Application | null>(null);

  const runAllocation = async () => {
    setRunning(true);
    setProgress(0);
    setResults(null);
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 100));
      setProgress(i);
    }
    const apps = allApplications
      .filter((a) => a.scholarshipId === selectedScholarship)
      .sort((a, b) => b.aiScore - a.aiScore);
    setResults(apps.length > 0 ? apps : allApplications.sort((a, b) => b.aiScore - a.aiScore));
    setRunning(false);
    toast({ title: "AI Allocation complete!" });
  };

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-foreground">AI Allocation</h1>

      <div className="glass-card p-8 max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl gradient-tech flex items-center justify-center mx-auto mb-4 animate-glow">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Select Scholarship</h2>
        <select value={selectedScholarship} onChange={(e) => setSelectedScholarship(e.target.value)} className="input-dark w-full mb-4">
          {scholarships.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
        <p className="text-sm text-muted-foreground mb-6">AI will rank applicants based on academic performance, financial need, extracurriculars, and essay quality.</p>

        {running && (
          <div className="mb-4">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full gradient-tech transition-all duration-200 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
          </div>
        )}

        <button onClick={runAllocation} disabled={running} className="gradient-tech w-full py-4 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-lg">
          <Play className="w-5 h-5" /> Run AI Allocation
        </button>
      </div>

      {results && (
        <div className="glass-card overflow-hidden animate-slide-up">
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
                  <td className="p-4 font-semibold text-foreground">{app.studentName}</td>
                  <td className="p-4 font-mono text-muted-foreground hidden md:table-cell">{app.rollNumber}</td>
                  <td className="p-4 font-mono text-foreground">{app.cgpa}</td>
                  <td className="p-4">
                    <button onClick={() => setScoreModal(app)} className="font-mono text-primary underline">{app.aiScore}</button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button className="px-3 py-1 text-xs rounded-lg bg-accent/20 text-accent hover:bg-accent/30">Approve</button>
                    <button className="px-3 py-1 text-xs rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30">Reject</button>
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
            {[
              { label: "Academic (40%)", value: Math.round(scoreModal.aiScore * 0.4) },
              { label: "Financial Need (30%)", value: Math.round(scoreModal.aiScore * 0.3) },
              { label: "Extracurricular (20%)", value: Math.round(scoreModal.aiScore * 0.2) },
              { label: "Essay Quality (10%)", value: Math.round(scoreModal.aiScore * 0.1) },
            ].map((item) => (
              <div key={item.label} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground font-mono">{item.value}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full gradient-tech rounded-full transition-all duration-1000" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
            <div className="border-t border-border pt-3 mt-3 flex justify-between">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-primary font-mono">{scoreModal.aiScore}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
