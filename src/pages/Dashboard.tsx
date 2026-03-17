import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useScholarships } from "@/contexts/ScholarshipContext";
import { GraduationCap, FileText, Clock, CheckCircle, ArrowRight, Activity, Wifi, Users, Eye, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ActivityItem {
  id: string;
  description: string;
  timestamp: string;
  type: "approved" | "rejected" | "created" | "applied";
}

const getRelativeTime = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

const typeIcon: Record<ActivityItem["type"], string> = {
  approved: "✅",
  rejected: "❌",
  created: "🎓",
  applied: "📝",
};

const typeColor: Record<ActivityItem["type"], string> = {
  approved: "border-emerald-500/30 bg-emerald-500/5",
  rejected: "border-red-500/30 bg-red-500/5",
  created: "border-blue-500/30 bg-blue-500/5",
  applied: "border-amber-500/30 bg-amber-500/5",
};

export default function Dashboard() {
  const { college, adminName } = useAuth();
  const { programs, applications } = useScholarships();
  const navigate = useNavigate();

  const approved = applications.filter((a) => a.status === "Approved").length;
  const pending = applications.filter((a) => a.status === "Pending").length;

  // Generate mock activity from real application data
  const [activities] = useState<ActivityItem[]>(() => {
    const items: ActivityItem[] = [];
    applications.slice(0, 3).forEach((app) => {
      if (app.status === "Approved") {
        items.push({ id: `act-${app.id}-a`, description: `Admin approved application for ${app.programTitle}`, timestamp: app.appliedDate, type: "approved" });
      } else if (app.status === "Rejected") {
        items.push({ id: `act-${app.id}-r`, description: `Admin rejected application for ${app.programTitle}`, timestamp: app.appliedDate, type: "rejected" });
      }
      items.push({ id: `act-${app.id}-s`, description: `${app.studentName} applied for ${app.programTitle}`, timestamp: app.appliedDate, type: "applied" });
    });
    if (programs.length > 0) {
      items.push({ id: "act-create-1", description: `Admin created new scholarship: ${programs[0].title}`, timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), type: "created" });
    }
    return items.slice(0, 8);
  });

  const stats = [
    { title: "Total Scholarships", value: programs.length, icon: GraduationCap, iconClass: "stat-icon-scholarships", color: "text-blue-400" },
    { title: "Total Applications", value: applications.length, icon: FileText, iconClass: "stat-icon-applications", color: "text-emerald-400" },
    { title: "Pending Applications", value: pending, icon: Clock, iconClass: "stat-icon-budget", color: "text-amber-400" },
    { title: "Approved Applications", value: approved, icon: CheckCircle, iconClass: "stat-icon-students", color: "text-purple-400" },
  ];

  // Per-scholarship applicant counts
  const scholarshipApplicants = programs.slice(0, 5).map((p) => ({
    ...p,
    applicantCount: applications.filter((a) => a.programTitle === p.title).length,
  }));

  return (
    <div className="space-y-8">
      {/* Header with live indicator */}
      <div className="flex items-start justify-between animate-slide-up">
        <div>
          <h1 className="text-3xl font-black text-foreground">
            Welcome back, <span className="gradient-text-brand">{adminName}</span>
          </h1>
          <p className="text-muted-foreground mt-1">{college?.name} — Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">Live Updates Enabled</span>
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
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <button onClick={() => navigate("/scholarships")} className="gradient-trust p-6 rounded-xl text-left hover:scale-[1.02] transition-transform shadow-lg group">
          <GraduationCap className="w-8 h-8 text-white mb-3" />
          <h3 className="text-white font-bold text-xl mb-1">Manage Scholarships</h3>
          <p className="text-white/70 text-sm mb-4">Create, edit, and delete scholarship programs</p>
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
        <button onClick={() => navigate("/applications")} className="gradient-energy p-6 rounded-xl text-left hover:scale-[1.02] transition-transform shadow-lg group">
          <FileText className="w-8 h-8 text-white mb-3" />
          <h3 className="text-white font-bold text-xl mb-1">Manage Applications</h3>
          <p className="text-white/70 text-sm mb-4">Review, approve, or reject student applications</p>
          <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-3 glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
          </div>
          {activities.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {activities.map((act) => (
                <div key={act.id} className={`flex items-start gap-3 p-3 rounded-lg border ${typeColor[act.type]} transition-colors`}>
                  <span className="text-lg mt-0.5">{typeIcon[act.type]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{act.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{getRelativeTime(act.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Scholarships by Applicants */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Top Scholarships</h3>
          </div>
          <div className="space-y-3">
            {scholarshipApplicants.map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer" onClick={() => navigate("/scholarships")}>
                <span className="text-xl">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.applicantCount} applicant{s.applicantCount !== 1 ? "s" : ""}</p>
                </div>
                <Eye className="w-4 h-4 text-muted-foreground" />
              </div>
            ))}
          </div>
          <button onClick={() => navigate("/scholarships")} className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 mt-4">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
