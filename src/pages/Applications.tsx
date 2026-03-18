import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useScholarships } from "@/contexts/ScholarshipContext";
import type { Application } from "@/data/colleges";
import { Search, Eye, Check, X, FileText, Loader2, AlertTriangle, Wifi, FileImage, File, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STATUS_TABS = [
  { key: "All", label: "All" },
  { key: "Pending", label: "Under Review", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
  { key: "Approved", label: "Selected", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  { key: "Rejected", label: "Rejected", color: "bg-red-500/15 text-red-400 border-red-500/30" },
];

export default function Applications() {
  const { college } = useAuth();
  const { toast } = useToast();
  const { applications, setApplications, addNotification } = useScholarships();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewApp, setViewApp] = useState<Application | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ id: string; action: "Approved" | "Rejected" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [docPreview, setDocPreview] = useState(false);

  const filtered = applications.filter((a) => {
    const matchSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) || a.rollNumber.toLowerCase().includes(search.toLowerCase()) || a.programTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    All: applications.length,
    Pending: applications.filter((a) => a.status === "Pending").length,
    Approved: applications.filter((a) => a.status === "Approved").length,
    Rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  const handleStatusUpdate = async () => {
    if (!confirmAction) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const app = applications.find((a) => a.id === confirmAction.id);
    setApplications((prev) => prev.map((a) => a.id === confirmAction.id ? { ...a, status: confirmAction.action, notified: confirmAction.action === "Approved" } : a));

    if (app) {
      addNotification({
        type: confirmAction.action === "Approved" ? "approval" : "rejection",
        title: confirmAction.action === "Approved" ? "Student Selected" : "Application Rejected",
        description: `${app.studentName} — ${app.programTitle}. ${confirmAction.action === "Approved" ? "Student notified via app." : ""}`,
        studentName: app.studentName,
        programTitle: app.programTitle,
      });
    }

    toast({ title: `Application ${confirmAction.action === "Approved" ? "selected — Student notified" : "rejected"} successfully` });
    setConfirmAction(null);
    setLoading(false);
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      Approved: "status-approved",
      Pending: "status-pending",
      Rejected: "status-rejected",
    };
    const labels: Record<string, string> = {
      Approved: "Selected ✓",
      Pending: "Under Review",
      Rejected: "Rejected",
    };
    return <span className={`text-xs px-3 py-1 rounded-full border ${map[status] || "status-pending"}`}>{labels[status] || status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground">Manage Applications</h1>
          <p className="text-muted-foreground text-sm mt-1">{applications.length} total • {counts.Pending} pending review</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400">Synced with Student App</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              statusFilter === tab.key ? "gradient-trust text-white" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${statusFilter === tab.key ? "bg-white/20" : "bg-secondary"}`}>
              {counts[tab.key as keyof typeof counts]}
            </span>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by student name, roll number, or scholarship..." className="input-dark w-full pl-12" />
      </div>

      {applications.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No applications yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto">Once students apply from the mobile app, their applications will appear here for your review. Use AI Allocation to rank and select the best candidates.</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Scholarship</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Applied</th>
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
                    <td className="p-4 hidden md:table-cell"><p className="text-sm text-foreground truncate max-w-xs">{app.programTitle}</p></td>
                    <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                      {new Date(app.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        {statusBadge(app.status)}
                        {app.notified && (
                          <span className="text-[10px] text-accent flex items-center gap-0.5" title="Notified">
                            <Bell className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => setViewApp(app)} className="text-muted-foreground hover:text-primary p-1.5 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      {app.status === "Pending" && (
                        <>
                          <button onClick={() => setConfirmAction({ id: app.id, action: "Approved" })} className="text-muted-foreground hover:text-accent p-1.5 transition-colors" title="Select"><Check className="w-4 h-4" /></button>
                          <button onClick={() => setConfirmAction({ id: app.id, action: "Rejected" })} className="text-muted-foreground hover:text-destructive p-1.5 transition-colors" title="Reject"><X className="w-4 h-4" /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground"><Search className="w-8 h-8 mx-auto mb-2 opacity-50" />No applications match your criteria</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Application Detail Modal */}
      {viewApp && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => { setViewApp(null); setDocPreview(false); }}>
          <div className="glass-card max-w-md w-full p-6 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">Application Details</h2>
              <button onClick={() => { setViewApp(null); setDocPreview(false); }} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            {/* Status lifecycle */}
            <div className="flex items-center justify-between mb-6 px-2">
              {["Submitted", "Under Review", "Decision"].map((step, i) => {
                const active = i === 0 || (i === 1 && viewApp.status === "Pending") || (i === 2 && (viewApp.status === "Approved" || viewApp.status === "Rejected"));
                return (
                  <div key={step} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${active ? "gradient-trust text-white" : "bg-secondary text-muted-foreground"}`}>{i + 1}</div>
                    <span className={`text-[10px] ${active ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full gradient-trust flex items-center justify-center text-white font-bold text-lg">
                {viewApp.studentName.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">{viewApp.studentName}</h3>
                <p className="text-sm text-muted-foreground font-mono">{viewApp.rollNumber}</p>
              </div>
              {viewApp.notified && (
                <span className="ml-auto text-xs text-accent flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-full">
                  <Bell className="w-3 h-3" /> Notified
                </span>
              )}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Email</span><span className="text-foreground">{viewApp.rollNumber.toLowerCase()}@{college?.id}.edu.in</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Department</span><span className="text-foreground">{viewApp.department}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Year</span><span className="text-foreground">{viewApp.year}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">CGPA</span><span className="text-foreground font-mono">{viewApp.cgpa}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Scholarship</span><span className="text-foreground text-right max-w-[200px] truncate">{viewApp.programTitle}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Applied On</span><span className="text-foreground">{new Date(viewApp.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>
              <div className="flex justify-between py-2 border-b border-border/30"><span className="text-muted-foreground">Status</span>{statusBadge(viewApp.status)}</div>
            </div>

            {/* Document Preview */}
            <div className="mt-6 p-4 rounded-lg bg-secondary/30 border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Uploaded Documents</p>
                <button onClick={() => setDocPreview(!docPreview)} className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {docPreview ? "Hide" : "Preview"}
                </button>
              </div>
              {docPreview ? (
                <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/30">
                    <File className="w-5 h-5 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-xs text-foreground font-medium">income_certificate.pdf</p>
                      <p className="text-[10px] text-muted-foreground">PDF Document • 245 KB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/30">
                    <FileImage className="w-5 h-5 text-emerald-400" />
                    <div className="flex-1">
                      <p className="text-xs text-foreground font-medium">marksheet_sem6.jpg</p>
                      <p className="text-[10px] text-muted-foreground">Image • 1.2 MB</p>
                    </div>
                  </div>
                  <div className="h-40 rounded-lg bg-muted/30 flex items-center justify-center border border-dashed border-border/50 mt-2">
                    <div className="text-center">
                      <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Document preview area</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-20 rounded-lg bg-secondary/50 flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">2 documents uploaded</p>
                  </div>
                </div>
              )}
            </div>

            {viewApp.status === "Pending" && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => { setViewApp(null); setDocPreview(false); setConfirmAction({ id: viewApp.id, action: "Approved" }); }} className="flex-1 py-2.5 rounded-lg bg-accent/20 text-accent font-semibold text-sm hover:bg-accent/30 transition-colors flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Select & Notify
                </button>
                <button onClick={() => { setViewApp(null); setDocPreview(false); setConfirmAction({ id: viewApp.id, action: "Rejected" }); }} className="flex-1 py-2.5 rounded-lg bg-destructive/20 text-destructive font-semibold text-sm hover:bg-destructive/30 transition-colors flex items-center justify-center gap-2">
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
            <h3 className="text-lg font-bold text-foreground mb-2">{confirmAction.action === "Rejected" ? "Reject Application?" : "Select Student?"}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {confirmAction.action === "Rejected"
                ? "The student will be notified of the rejection on the app."
                : "The student will be selected and notified on the app as approved."}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setConfirmAction(null)} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">Cancel</button>
              <button onClick={handleStatusUpdate} disabled={loading} className={`px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 ${confirmAction.action === "Rejected" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-accent text-accent-foreground hover:bg-accent/90"} disabled:opacity-50`}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {confirmAction.action === "Rejected" ? "Reject" : "Select & Notify"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
