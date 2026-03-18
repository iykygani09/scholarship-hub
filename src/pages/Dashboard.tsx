import { useAuth } from "@/contexts/AuthContext";
import { useScholarships } from "@/contexts/ScholarshipContext";
import { GraduationCap, FileText, Clock, CheckCircle, ArrowRight, Activity, Wifi, Users, Eye, Brain, TrendingUp, CalendarDays, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { college, adminName } = useAuth();
  const { programs, applications, notifications, getScholarshipStatus, getDaysRemaining } = useScholarships();
  const navigate = useNavigate();

  const approved = applications.filter((a) => a.status === "Approved").length;
  const pending = applications.filter((a) => a.status === "Pending").length;
  const activeScholarships = programs.filter((p) => getScholarshipStatus(p) === "Active").length;
  const expiredScholarships = programs.filter((p) => getScholarshipStatus(p) === "Expired").length;
  const totalBudget = programs.reduce((sum, p) => sum + p.amount * p.totalSeats, 0);

  const stats = [
    { title: "Active Scholarships", value: activeScholarships, sub: `${expiredScholarships} expired`, icon: GraduationCap, iconClass: "stat-icon-scholarships", color: "text-blue-400" },
    { title: "Total Applications", value: applications.length, sub: `${pending} pending review`, icon: FileText, iconClass: "stat-icon-applications", color: "text-emerald-400" },
    { title: "Approved Students", value: approved, sub: `${applications.length > 0 ? Math.round((approved / applications.length) * 100) : 0}% approval rate`, icon: CheckCircle, iconClass: "stat-icon-students", color: "text-purple-400" },
    { title: "Total Budget", value: `₹${totalBudget > 100000 ? `${(totalBudget / 100000).toFixed(1)}L` : totalBudget.toLocaleString()}`, sub: `${programs.length} programs`, icon: TrendingUp, iconClass: "stat-icon-budget", color: "text-amber-400" },
  ];

  // Scholarships nearing deadline (within 7 days)
  const urgentScholarships = programs
    .filter((p) => {
      const status = getScholarshipStatus(p);
      if (status !== "Active") return false;
      const days = getDaysRemaining(p.deadline);
      return days >= 0 && days <= 7;
    })
    .sort((a, b) => getDaysRemaining(a.deadline) - getDaysRemaining(b.deadline));

  // Top scholarships by applicant count
  const topScholarships = programs
    .map((p) => ({
      ...p,
      applicantCount: applications.filter((a) => a.programTitle === p.title).length,
      liveStatus: getScholarshipStatus(p),
    }))
    .sort((a, b) => b.applicantCount - a.applicantCount)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-black text-foreground">
            Welcome back, <span className="gradient-text-brand">{adminName}</span>
          </h1>
          <p className="text-muted-foreground mt-1">{college?.name} — Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">Live</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={s.title} className={`glass-card p-6 card-hover animate-slide-up stagger-${i + 1} opacity-0`} style={{ animationFillMode: "forwards" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-medium">{s.title}</span>
              <div className={`w-11 h-11 rounded-xl ${s.iconClass} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-4xl font-black text-foreground font-mono">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Urgent Deadlines Banner */}
      {urgentScholarships.length > 0 && (
        <div className="glass-card p-4 border-l-4 border-l-warning animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h3 className="font-bold text-foreground text-sm">Upcoming Deadlines</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {urgentScholarships.map((s) => {
              const days = getDaysRemaining(s.deadline);
              return (
                <button
                  key={s.id}
                  onClick={() => navigate("/scholarships")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/40 hover:bg-secondary/60 transition-colors"
                >
                  <span>{s.icon}</span>
                  <span className="text-sm text-foreground font-medium">{s.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${days <= 2 ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"}`}>
                    {days}d left
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button onClick={() => navigate("/scholarships")} className="gradient-trust p-6 rounded-xl text-left hover:scale-[1.02] transition-transform shadow-lg group">
          <GraduationCap className="w-8 h-8 text-white mb-3" />
          <h3 className="text-white font-bold text-xl mb-1">Manage Scholarships</h3>
          <p className="text-white/70 text-sm mb-4">Create, edit & manage scholarship programs with deadlines</p>
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
        <button onClick={() => navigate("/applications")} className="gradient-energy p-6 rounded-xl text-left hover:scale-[1.02] transition-transform shadow-lg group">
          <FileText className="w-8 h-8 text-white mb-3" />
          <h3 className="text-white font-bold text-xl mb-1">Review Applications</h3>
          <p className="text-white/70 text-sm mb-4">
            {pending > 0 ? `${pending} application${pending > 1 ? "s" : ""} awaiting your review` : "Review student applications from the mobile app"}
          </p>
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
        <button onClick={() => navigate("/ai-allocation")} className="gradient-tech p-6 rounded-xl text-left hover:scale-[1.02] transition-transform shadow-lg group">
          <Brain className="w-8 h-8 text-white mb-3" />
          <h3 className="text-white font-bold text-xl mb-1">AI Allocation</h3>
          <p className="text-white/70 text-sm mb-4">Rank & select students using AI-powered scoring engine</p>
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Recent Notifications */}
        <div className="lg:col-span-3 glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
          </div>
          {notifications.length === 0 ? (
            <div className="text-center py-10">
              <Activity className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-muted-foreground text-sm">No activity yet</p>
              <p className="text-xs text-muted-foreground mt-1">Create a scholarship to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.slice(0, 8).map((n) => {
                const icon: Record<string, string> = { approval: "✅", rejection: "❌", scholarship_created: "🎓", deadline_passed: "⏰", ai_allocation: "🤖" };
                const colors: Record<string, string> = { approval: "border-emerald-500/30 bg-emerald-500/5", rejection: "border-red-500/30 bg-red-500/5", scholarship_created: "border-blue-500/30 bg-blue-500/5", deadline_passed: "border-amber-500/30 bg-amber-500/5", ai_allocation: "border-purple-500/30 bg-purple-500/5" };
                const diff = Date.now() - new Date(n.timestamp).getTime();
                const mins = Math.floor(diff / 60000);
                const time = mins < 1 ? "Just now" : mins < 60 ? `${mins}m ago` : `${Math.floor(mins / 60)}h ago`;
                return (
                  <div key={n.id} className={`flex items-start gap-3 p-3 rounded-lg border ${colors[n.type] || "border-border bg-secondary/10"} transition-colors`}>
                    <span className="text-lg mt-0.5">{icon[n.type] || "📢"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Scholarships */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Scholarships</h3>
          </div>
          {topScholarships.length === 0 ? (
            <div className="text-center py-10">
              <GraduationCap className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-40" />
              <p className="text-sm text-muted-foreground">No scholarships created yet</p>
              <button onClick={() => navigate("/scholarships")} className="text-sm text-primary hover:text-primary/80 mt-2 inline-flex items-center gap-1">
                Create one <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {topScholarships.map((s) => {
                const days = getDaysRemaining(s.deadline);
                return (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => navigate("/scholarships")}>
                    <span className="text-xl">{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{s.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">{s.applicantCount} applicant{s.applicantCount !== 1 ? "s" : ""}</span>
                        <span className="text-muted-foreground">•</span>
                        {s.liveStatus === "Expired" ? (
                          <span className="text-xs text-destructive font-medium">Expired</span>
                        ) : (
                          <span className={`text-xs font-medium ${days <= 3 ? "text-destructive" : "text-accent"}`}>{days}d left</span>
                        )}
                      </div>
                    </div>
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </div>
                );
              })}
            </div>
          )}
          {topScholarships.length > 0 && (
            <button onClick={() => navigate("/scholarships")} className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 mt-4">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
