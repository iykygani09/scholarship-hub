import { useAuth } from "@/contexts/AuthContext";
import { getScholarships, getApplications } from "@/data/colleges";
import { GraduationCap, FileText, DollarSign, Users, TrendingUp, TrendingDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";

export default function Dashboard() {
  const { college, adminName } = useAuth();
  const scholarships = getScholarships(college?.id || "");
  const applications = getApplications(college?.id || "");

  const approved = applications.filter((a) => a.status === "Approved").length;
  const pending = applications.filter((a) => a.status === "Pending").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;
  const totalBudget = scholarships.reduce((s, sc) => s + sc.amount * sc.filledSeats, 0);

  const pieData = [
    { name: "Approved", value: approved, color: "#10b981" },
    { name: "Pending", value: pending, color: "#f59e0b" },
    { name: "Rejected", value: rejected, color: "#ef4444" },
  ];

  const trendData = [
    { month: "Aug", apps: 2 }, { month: "Sep", apps: 3 }, { month: "Oct", apps: 4 },
    { month: "Nov", apps: 5 }, { month: "Dec", apps: 6 }, { month: "Jan", apps: 7 },
  ];

  const stats = [
    { title: "Scholarships", value: scholarships.length, trend: "+12%", up: true, icon: GraduationCap, iconClass: "stat-icon-scholarships" },
    { title: "Applications", value: applications.length, trend: "+23%", up: true, icon: FileText, iconClass: "stat-icon-applications" },
    { title: "Budget (₹)", value: `₹${Math.round(totalBudget / 100000)}L`, trend: "-5%", up: false, icon: DollarSign, iconClass: "stat-icon-budget" },
    { title: "Students", value: applications.length, trend: "+8%", up: true, icon: Users, iconClass: "stat-icon-students" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="animate-slide-up">
        <h1 className="text-3xl font-black text-foreground">
          Welcome back, <span className="gradient-text-brand">{adminName}</span>
        </h1>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-muted-foreground">{college?.name}</span>
          <div className="h-0.5 w-32 gradient-primary animate-draw-line rounded-full" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={s.title} className={`glass-card p-5 animate-slide-up stagger-${i + 1} opacity-0`} style={{ animationFillMode: "forwards" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.title}</span>
              <div className={`w-10 h-10 rounded-xl ${s.iconClass} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <p className="text-3xl font-black text-foreground font-mono">{s.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {s.up ? <TrendingUp className="w-4 h-4 text-success" /> : <TrendingDown className="w-4 h-4 text-destructive" />}
              <span className={`text-sm ${s.up ? "text-success" : "text-destructive"}`}>{s.trend}</span>
              <span className="text-xs text-muted-foreground ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
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
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(222 47% 8%)", border: "1px solid hsl(217 33% 18%)", borderRadius: "8px", color: "#fff" }} />
              <Area type="monotone" dataKey="apps" stroke="#6366f1" strokeWidth={2} fill="url(#areaGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
