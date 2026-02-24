import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getAuditLogs, type AuditLog } from "@/data/colleges";
import { Search, Download, Shield, LogIn, Plus, Pencil, Trash2 } from "lucide-react";

const actionIcons: Record<string, typeof Shield> = { Create: Plus, Update: Pencil, Delete: Trash2, Login: LogIn };

export default function AuditLogs() {
  const { college } = useAuth();
  const logs = getAuditLogs(college?.id || "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = logs.filter((l) => {
    const matchSearch = l.details.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || l.action === filter;
    return matchSearch && matchFilter;
  });

  const exportCSV = () => {
    const headers = "Timestamp,Action,User,IP,Details\n";
    const rows = logs.map((l) => `${l.timestamp},${l.action},${l.user},${l.ip},"${l.details}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "audit-logs.csv";
    a.click();
  };

  const filters = ["All", "Create", "Update", "Delete", "Login"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-foreground">Audit Logs</h1>
        <button onClick={exportCSV} className="gradient-primary px-5 py-2.5 rounded-xl text-primary-foreground font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
          <Download className="w-5 h-5" /> Export CSV
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="input-dark w-full pl-12" />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-bold text-foreground mb-1">No audit logs yet</h3>
            <p className="text-sm text-muted-foreground">Activity will appear here as you use the system</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((log) => {
              const Icon = actionIcons[log.action] || Shield;
              return (
                <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/30 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${log.action === "Create" ? "bg-success/20 text-success" : log.action === "Delete" ? "bg-destructive/20 text-destructive" : log.action === "Login" ? "bg-primary/20 text-primary" : "bg-warning/20 text-warning"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-medium">{log.details}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span>{log.user}</span>
                      <span className="font-mono text-xs">{log.ip}</span>
                      <span>{new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
