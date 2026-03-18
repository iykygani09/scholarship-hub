import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useScholarships } from "@/contexts/ScholarshipContext";
import type { InternalProgram } from "@/data/colleges";
import { Plus, Search, Pencil, Trash2, X, Upload, GraduationCap, Loader2, Users, Eye, Check, AlertTriangle, ArrowLeft, Clock, CalendarDays, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categoryConfig: Record<string, { label: string; emoji: string; gradient: string }> = {
  merit: { label: "Merit", emoji: "🏆", gradient: "gradient-trust" },
  need: { label: "Need-Based", emoji: "💰", gradient: "gradient-energy" },
  talent: { label: "Talent", emoji: "🏅", gradient: "gradient-tech" },
  exposure: { label: "Exposure", emoji: "🌍", gradient: "gradient-trust" },
  foundation: { label: "Foundation", emoji: "🧠", gradient: "gradient-energy" },
};

export default function Scholarships() {
  const { college } = useAuth();
  const { toast } = useToast();
  const { programs, setPrograms, applications, addNotification, getScholarshipStatus, getDaysRemaining } = useScholarships();
  const allApplications = applications;
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<InternalProgram | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<string>("");
  const [viewApplicants, setViewApplicants] = useState<InternalProgram | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "Active" | "Expired">("all");

  const defaultForm = { title: "", description: "", category: "merit" as InternalProgram["category"], eligibility: "", benefit: "", amount: 0, totalSeats: 0, deadline: "" };
  const [form, setForm] = useState(defaultForm);

  const filtered = programs
    .filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      if (filterStatus === "all") return matchSearch;
      return matchSearch && getScholarshipStatus(p) === filterStatus;
    });

  const activeCount = programs.filter((p) => getScholarshipStatus(p) === "Active").length;
  const expiredCount = programs.filter((p) => getScholarshipStatus(p) === "Expired").length;

  const getApplicantCount = (programTitle: string) => allApplications.filter((a) => a.programTitle === programTitle).length;
  const getApplicantsForProgram = (programTitle: string) => allApplications.filter((a) => a.programTitle === programTitle);

  const openCreate = () => { setEditItem(null); setForm(defaultForm); setImageFile(""); setShowModal(true); };
  const openEdit = (p: InternalProgram) => {
    setEditItem(p);
    setForm({ title: p.title, description: p.description, category: p.category, eligibility: p.eligibility, benefit: p.benefit, amount: p.amount, totalSeats: p.totalSeats, deadline: p.deadline?.split("T")[0] || "" });
    setImageFile("");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    if (!form.deadline) { toast({ title: "Deadline is required", variant: "destructive" }); return; }
    if (!form.amount || form.amount <= 0) { toast({ title: "Amount must be greater than 0", variant: "destructive" }); return; }
    if (!form.totalSeats || form.totalSeats <= 0) { toast({ title: "Seats must be greater than 0", variant: "destructive" }); return; }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    if (editItem) {
      setPrograms((prev) => prev.map((p) => p.id === editItem.id ? { ...p, ...form, deadline: new Date(form.deadline).toISOString() } : p));
      toast({ title: "✅ Scholarship updated successfully" });
    } else {
      const catEmoji = categoryConfig[form.category]?.emoji || "🎓";
      const newP: InternalProgram = {
        id: `ip${Date.now()}`,
        collegeId: college?.id || "",
        ...form,
        deadline: new Date(form.deadline).toISOString(),
        createdAt: new Date().toISOString(),
        filledSeats: 0,
        status: "Active",
        icon: catEmoji,
      };
      setPrograms((prev) => [...prev, newP]);
      addNotification({
        type: "scholarship_created",
        title: "New Scholarship Created",
        description: `${form.title} — ₹${form.amount.toLocaleString()} with ${form.totalSeats} seats. Deadline: ${new Date(form.deadline).toLocaleDateString("en-IN")}`,
        programTitle: form.title,
      });
      toast({ title: "🎓 Scholarship created successfully!" });
    }
    setLoading(false);
    setShowModal(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const p = programs.find((x) => x.id === deleteConfirm);
    setPrograms((prev) => prev.filter((x) => x.id !== deleteConfirm));
    if (p) {
      addNotification({
        type: "deadline_passed",
        title: "Scholarship Deleted",
        description: `${p.title} has been permanently removed.`,
        programTitle: p.title,
      });
    }
    toast({ title: "Scholarship deleted", variant: "destructive" });
    setDeleteConfirm(null);
    setLoading(false);
  };

  // Applicants sub-view
  if (viewApplicants) {
    const applicants = getApplicantsForProgram(viewApplicants.title);
    const status = getScholarshipStatus(viewApplicants);
    const statusBadge = (s: string) => {
      const cls = s === "Approved" ? "status-approved" : s === "Pending" ? "status-pending" : "status-rejected";
      return <span className={`text-xs px-3 py-1 rounded-full ${cls}`}>{s}</span>;
    };
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setViewApplicants(null)} className="text-muted-foreground hover:text-foreground p-2 rounded-lg bg-secondary/50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-foreground">{viewApplicants.title}</h1>
            <p className="text-muted-foreground text-sm">{applicants.length} applicant{applicants.length !== 1 ? "s" : ""}</p>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${status === "Expired" ? "status-rejected" : "status-active"}`}>
            {status === "Expired" ? "Deadline Passed" : "Active"}
          </span>
        </div>
        {applicants.length === 0 ? (
          <div className="glass-card p-16 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No students have applied for this scholarship yet</p>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student Name</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Application Date</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((app) => (
                  <tr key={app.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full gradient-trust flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {app.studentName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{app.studentName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{app.rollNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-muted-foreground">
                      {new Date(app.appliedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="p-4">{statusBadge(app.status)}</td>
                    <td className="p-4 text-right">
                      <button className="text-muted-foreground hover:text-primary p-1.5 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      {app.status === "Pending" && (
                        <>
                          <button className="text-muted-foreground hover:text-accent p-1.5 transition-colors" title="Approve"><Check className="w-4 h-4" /></button>
                          <button className="text-muted-foreground hover:text-destructive p-1.5 transition-colors" title="Reject"><X className="w-4 h-4" /></button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground">Manage Scholarships</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {programs.length} total • {activeCount} active • {expiredCount} expired
          </p>
        </div>
        <button onClick={openCreate} className="gradient-trust px-5 py-2.5 rounded-xl text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
          <Plus className="w-5 h-5" /> Create Scholarship
        </button>
      </div>

      {/* Filter Tabs + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2">
          {[
            { key: "all" as const, label: "All", count: programs.length },
            { key: "Active" as const, label: "Active", count: activeCount },
            { key: "Expired" as const, label: "Expired", count: expiredCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                filterStatus === tab.key ? "gradient-trust text-white" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${filterStatus === tab.key ? "bg-white/20" : "bg-secondary"}`}>{tab.count}</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search scholarships..." className="input-dark w-full pl-12" />
        </div>
      </div>

      {/* Empty State */}
      {programs.length === 0 && !search && (
        <div className="glass-card p-16 text-center">
          <div className="w-20 h-20 rounded-2xl gradient-trust flex items-center justify-center mx-auto mb-6 animate-glow">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">No scholarships yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Create your first scholarship program. Once active, students can apply from the mobile app until the deadline passes.
          </p>
          <button onClick={openCreate} className="gradient-trust px-6 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
            <Plus className="w-5 h-5" /> Create First Scholarship
          </button>
        </div>
      )}

      {/* Scholarship Cards Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p, i) => {
            const count = getApplicantCount(p.title);
            const status = getScholarshipStatus(p);
            const daysLeft = getDaysRemaining(p.deadline);
            const cat = categoryConfig[p.category];
            return (
              <div
                key={p.id}
                className={`glass-card overflow-hidden card-hover animate-slide-up opacity-0 ${status === "Expired" ? "opacity-70" : ""}`}
                style={{ animationFillMode: "forwards", animationDelay: `${i * 0.05}s` }}
              >
                {/* Card Header with gradient strip */}
                <div className={`h-1.5 ${cat?.gradient || "gradient-trust"}`} />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span>
                      <div>
                        <h3 className="font-bold text-foreground leading-tight">{p.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${cat?.gradient} text-white`}>
                          {cat?.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(p)} className="text-muted-foreground hover:text-primary p-1.5 rounded-lg hover:bg-secondary/50 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => setDeleteConfirm(p.id)} className="text-muted-foreground hover:text-destructive p-1.5 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.description || "No description provided"}</p>

                  {/* Eligibility */}
                  {p.eligibility && (
                    <div className="text-xs text-muted-foreground mb-3 bg-secondary/30 rounded-lg px-3 py-2">
                      <span className="font-semibold text-foreground">Eligibility:</span> {p.eligibility}
                    </div>
                  )}

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-secondary/40 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase">Amount</p>
                      <p className="font-bold text-foreground font-mono text-sm">₹{p.amount.toLocaleString()}</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase">Seats</p>
                      <p className="font-bold text-foreground font-mono text-sm">{p.filledSeats}/{p.totalSeats}</p>
                    </div>
                    <div className="bg-secondary/40 rounded-lg p-2 text-center">
                      <p className="text-[10px] text-muted-foreground uppercase">Applied</p>
                      <p className="font-bold text-foreground font-mono text-sm">{count}</p>
                    </div>
                  </div>

                  {/* Deadline & Status */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-1.5">
                      {status === "Expired" ? (
                        <>
                          <Clock className="w-3.5 h-3.5 text-destructive" />
                          <span className="text-xs text-destructive font-medium">Deadline Passed</span>
                        </>
                      ) : (
                        <>
                          <CalendarDays className="w-3.5 h-3.5 text-accent" />
                          <span className={`text-xs font-medium ${daysLeft <= 3 ? "text-destructive" : daysLeft <= 7 ? "text-warning" : "text-accent"}`}>
                            {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${status === "Expired" ? "status-rejected" : "status-active"}`}>
                        {status}
                      </span>
                      <button
                        onClick={() => setViewApplicants(p)}
                        className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && search && programs.length > 0 && (
        <div className="glass-card p-12 text-center">
          <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">No scholarships match "<span className="text-foreground">{search}</span>"</p>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="glass-card max-w-lg w-full p-6 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">{editItem ? "Edit Scholarship" : "Create New Scholarship"}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{editItem ? "Update scholarship details" : "This will be visible to students on the app"}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground p-1"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Title <span className="text-destructive">*</span></label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g., Merit Excellence Award" className="input-dark w-full" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the scholarship purpose and benefits..." className="input-dark w-full h-20 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as InternalProgram["category"] })} className="input-dark w-full">
                    {Object.entries(categoryConfig).map(([key, val]) => (
                      <option key={key} value={key}>{val.emoji} {val.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Amount (₹) <span className="text-destructive">*</span></label>
                  <input type="number" value={form.amount || ""} onChange={(e) => setForm({ ...form, amount: +e.target.value })} placeholder="10000" className="input-dark w-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Total Seats <span className="text-destructive">*</span></label>
                  <input type="number" value={form.totalSeats || ""} onChange={(e) => setForm({ ...form, totalSeats: +e.target.value })} placeholder="10" className="input-dark w-full" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Deadline <span className="text-destructive">*</span></label>
                  <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-dark w-full" min={new Date().toISOString().split("T")[0]} />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Eligibility Criteria</label>
                <input value={form.eligibility} onChange={(e) => setForm({ ...form, eligibility: e.target.value })} placeholder="e.g., CGPA ≥ 9.0, 90% attendance" className="input-dark w-full" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Benefit Description</label>
                <input value={form.benefit} onChange={(e) => setForm({ ...form, benefit: e.target.value })} placeholder="e.g., ₹10,000/year + Certificate" className="input-dark w-full" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Scholarship Image</label>
                <label className="input-dark w-full flex items-center gap-3 cursor-pointer">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">{imageFile || "Upload an image..."}</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0]?.name || "")} />
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={loading} className="gradient-trust px-5 py-2.5 rounded-lg text-white font-semibold flex items-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {editItem ? "Update Scholarship" : "Create Scholarship"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="glass-card max-w-sm w-full p-6 animate-slide-up text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-destructive" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Delete Scholarship?</h3>
            <p className="text-sm text-muted-foreground mb-6">This action cannot be undone. All associated data will be removed.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">Cancel</button>
              <button onClick={handleDelete} disabled={loading} className="px-5 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-semibold flex items-center gap-2 hover:bg-destructive/90 disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
