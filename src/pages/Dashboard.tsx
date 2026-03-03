import { useAuth } from "@/contexts/AuthContext";
import { getInternalPrograms, getApplications } from "@/data/colleges";
import { GraduationCap, FileText, DollarSign, Sparkles, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { college, adminName } = useAuth();
  const navigate = useNavigate();
  const programs = getInternalPrograms(college?.id || "");
  const applications = getApplications(college?.id || "");

  const approved = applications.filter((a) => a.status === "Approved").length;
  const pending = applications.filter((a) => a.status === "Pending").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;
  const totalBudget = programs.reduce((s, p) => s + p.amount * p.filledSeats, 0);

  const pieData = [
    { name: "Approved", value: approved, color: "#40DC74" },
    { name: "Pending", value: pending, color: "#FFD700" },
    { name: "Rejected", value: rejected, color: "#ef4444" },
  ];

  const trendData = [
    { month: "Aug", apps: 2 }, { month: "Sep", apps: 4 }, { month: "Oct", apps: 5 },
    { month: "Nov", apps: 6 }, { month: "Dec", apps: 8 }, { month: "Jan", apps: 10 },
  ];

  const stats = [
    { title: "Internal Programs", value: programs.length, trend: "+12%", up: true, icon: Sparkles, iconClass: "stat-icon-scholarships" },
    { title: "Applications", value: applications.length, trend: "+23%", up: true, icon: FileText, iconClass: "stat-icon-applications" },
    { title: "Budget Allocated", value: `₹${Math.round(totalBudget / 100000)}L`, trend: "+8%", up: true, icon: DollarSign, iconClass: "stat-icon-budget" },
    { title: "Active Programs", value: programs.filter(p => p.status === "Active").length, trend: "+5%", up: true, icon: GraduationCap, iconClass: "stat-icon-students" },
  ];

  const quickActions = [
    { label: "Internal Programs", desc: "View all college programs", path: "/internal-programs", gradient: "gradient-trust" },
    { label: "Applications", desc: "Review student applications", path: "/applications", gradient: "gradient-energy" },
    { label: "AI Allocation", desc: "Run smart ranking", path: "/ai-allocation", gradient: "gradient-tech" },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-slide-up">
        <h1 className="text-3xl font-black text-foreground">
          Welcome back, <span className="gradient-text-brand">{adminName}</span>
        </h1>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-muted-foreground">{college?.name}</span>
          <div className="h-0.5 w-32 gradient-trust animate-draw-line rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={s.title} className={`glass-card p-5 card-hover animate-slide-up stagger-${i + 1} opacity-0`} style={{ animationFillMode: "forwards" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.title}</span>
              <div className={`w-10 h-10 rounded-xl ${s.iconClass} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-3xl font-black text-foreground font-mono">{s.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {s.up ? <TrendingUp className="w-4 h-4 text-accent" /> : <TrendingDown className="w-4 h-4 text-destructive" />}
              <span className={`text-sm ${s.up ? "text-accent" : "text-destructive"}`}>{s.trend}</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions.map((qa) => (
          <button key={qa.label} onClick={() => navigate(qa.path)} className={`${qa.gradient} p-5 rounded-xl text-left hover:scale-[1.02] transition-transform shadow-lg group`}>
            <h3 className="text-white font-bold text-lg mb-1">{qa.label}</h3>
            <p className="text-white/70 text-sm mb-3">{qa.desc}</p>
            <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Application Status</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="60%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-sm text-muted-foreground">{d.name}</span>
                  <span className="font-bold text-foreground ml-1">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Application Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052CC" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#40DC74" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 47% 8%)", border: "1px solid hsl(217 33% 18%)", borderRadius: "8px", color: "#fff" }} />
              <Area type="monotone" dataKey="apps" stroke="#0052CC" strokeWidth={2} fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Programs Preview */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Top Internal Programs</h3>
          <button onClick={() => navigate("/internal-programs")} className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></button>
        </div>
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
                <span className="text-xs text-muted-foreground">{p.filledSeats}/{p.totalSeats} seats</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
