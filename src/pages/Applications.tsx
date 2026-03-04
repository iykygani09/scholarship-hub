import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getApplications, type Application } from "@/data/colleges";
import { Search, Eye, Check, X, FileText, Loader2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Applications() {
  const { college } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>(() => getApplications(college?.id || ""));
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewApp, setViewApp] = useState<Application | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: "Approved" | "Rejected" } | null>(null);
  const [loading, setLoading] = useState(false);

  const filtered = applications.filter((a) => {
    const matchSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) || a.rollNumber.toLowerCase().includes(search.toLowerCase()) || a.programTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusUpdate = async () => {
    if (!confirmAction) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setApplications((prev) => prev.map((a) => a.id === confirmAction.id ? { ...a, status: confirmAction.action } : a));
    toast({ title: `Application ${confirmAction.action.toLowerCase()} successfully` });
    setConfirmAction(null);
    setLoading(false);
  };

  const statuses = ["All", "Pending", "Approved", "Rejected"];

  const statusBadge = (status: string) => {
    const cls = status === "Approved" ? "status-approved" : status === "Pending" ? "status-pending" : "status-rejected";
    return <span className={`text-xs px-3 py-1 rounded-full ${cls}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-foreground">Manage Applications</h1>
        <p className="text-muted-foreground text-sm mt-1">{applications.length} total applications</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by student name, roll number, or scholarship..." className="input-dark w-full pl-12" />
        </div>
        <div className="flex gap-2">
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === s ? "gradient-trust text-white" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No applications submitted</h3>
          <p className="text-muted-foreground">Student applications will appear here once submitted</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student Name</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Scholarship Title</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Application Date</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => setViewApp(app)}>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-trust flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {app.studentName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{app.studentName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{app.rollNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <p className="text-sm text-foreground truncate max-w-xs">{app.programTitle}</p>
                    </td>
                    <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                      {new Date(app.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="p-4">{statusBadge(app.status)}</td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setViewApp(app)} className="text-muted-foreground hover:text-primary p-1.5 transition-colors" title="View Document">
                        <Eye className="w-4 h-4" />
                      </button>
                      {app.status === "Pending" && (
                        <>
                          <button onClick={() => setConfirmAction({ id: app.id, action: "Approved" })} className="text-muted-foreground hover:text-accent p-1.5 transition-colors" title="Approve">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => setConfirmAction({ id: app.id, action: "Rejected" })} className="text-muted-foreground hover:text-destructive p-1.5 transition-colors" title="Reject">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      No applications match your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {viewApp && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setViewApp(null)}>
          <div className="glass-card max-w-md w-full p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">Application Details</h2>
              <button onClick={() => setViewApp(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full gradient-trust flex items-center justify-center text-white font-bold text-lg">
                {viewApp.studentName.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">{viewApp.studentName}</h3>
                <p className="text-sm text-muted-foreground font-mono">{viewApp.rollNumber}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Email</span><span className="text-foreground">{viewApp.rollNumber.toLowerCase()}@{college?.id}.edu.in</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Department</span><span className="text-foreground">{viewApp.department}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Year</span><span className="text-foreground">{viewApp.year}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">CGPA</span><span className="text-foreground font-mono">{viewApp.cgpa}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Scholarship Applied</span><span className="text-foreground text-right max-w-[200px] truncate">{viewApp.programTitle}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Status</span>{statusBadge(viewApp.status)}</div>
            </div>

            {/* Document Preview Placeholder */}
            <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Uploaded Document</p>
              <div className="h-32 rounded-lg bg-secondary/50 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">document_preview.pdf</p>
                </div>
              </div>
            </div>

            {viewApp.status === "Pending" && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setViewApp(null); setConfirmAction({ id: viewApp.id, action: "Approved" }); }} className="flex-1 py-2.5 rounded-lg bg-accent/20 text-accent font-semibold text-sm hover:bg-accent/30 transition-colors flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button onClick={() => { setViewApp(null); setConfirmAction({ id: viewApp.id, action: "Rejected" }); }} className="flex-1 py-2.5 rounded-lg bg-destructive/20 text-destructive font-semibold text-sm hover:bg-destructive/30 transition-colors flex items-center justify-center gap-2">
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setConfirmAction(null)}>
          <div className="glass-card max-w-sm w-full p-6 animate-slide-up text-center" onClick={(e) => e.stopPropagation()}>
            <div className={`w-14 h-14 rounded-full ${confirmAction.action === "Rejected" ? "bg-destructive/20" : "bg-accent/20"} flex items-center justify-center mx-auto mb-4`}>
              {confirmAction.action === "Rejected" ? <AlertTriangle className="w-7 h-7 text-destructive" /> : <Check className="w-7 h-7 text-accent" />}
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">
              {confirmAction.action === "Rejected" ? "Reject Application?" : "Approve Application?"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              {confirmAction.action === "Rejected" 
                ? "This will reject the student's application. They will be notified of the decision." 
                : "This will approve the student's application and allocate the scholarship."}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setConfirmAction(null)} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Cancel
              </button>
              <button onClick={handleStatusUpdate} disabled={loading} className={`px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 ${confirmAction.action === "Rejected" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-accent text-accent-foreground hover:bg-accent/90"} disabled:opacity-50`}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {confirmAction.action === "Rejected" ? "Reject" : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
