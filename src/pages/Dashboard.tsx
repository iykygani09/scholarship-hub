import { useAuth } from "@/contexts/AuthContext";
import { getInternalPrograms, getApplications } from "@/data/colleges";
import { GraduationCap, FileText, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { college, adminName } = useAuth();
  const navigate = useNavigate();
  const programs = getInternalPrograms(college?.id || "");
  const applications = getApplications(college?.id || "");

  const approved = applications.filter((a) => a.status === "Approved").length;
  const pending = applications.filter((a) => a.status === "Pending").length;

  const stats = [
    { title: "Total Scholarships", value: programs.length, icon: GraduationCap, iconClass: "stat-icon-scholarships" },
    { title: "Total Applications", value: applications.length, icon: FileText, iconClass: "stat-icon-applications" },
    { title: "Pending Applications", value: pending, icon: Clock, iconClass: "stat-icon-budget" },
    { title: "Approved Applications", value: approved, icon: CheckCircle, iconClass: "stat-icon-students" },
  ];

  return (
    <div className="space-y-8">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-black text-foreground">
          Welcome back, <span className="gradient-text-brand">{adminName}</span>
        </h1>
        <p className="text-muted-foreground mt-1">{college?.name} — Admin Dashboard</p>
      </div>

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

      {/* Recent Programs Preview */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Recent Scholarships</h3>
          <button onClick={() => navigate("/scholarships")} className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></button>
        </div>
        {programs.length === 0 ? (
          <div className="text-center py-10">
            <GraduationCap className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No scholarships available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {programs.slice(0, 3).map((p) => (
              <div key={p.id} className="bg-secondary/30 rounded-xl p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h4 className="font-semibold text-foreground text-sm truncate">{p.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold gradient-text-brand">₹{p.amount.toLocaleString()}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === "Active" ? "status-approved" : "status-pending"}`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
