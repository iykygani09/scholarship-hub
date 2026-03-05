import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getInternalPrograms, getApplications, type InternalProgram, type Application } from "@/data/colleges";
import { Plus, Search, Pencil, Trash2, X, Upload, GraduationCap, Loader2, Users, Eye, Check, AlertTriangle, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Scholarships() {
  const { college } = useAuth();
  const { toast } = useToast();
  const [programs, setPrograms] = useState<InternalProgram[]>(() => getInternalPrograms(college?.id || ""));
  const allApplications = getApplications(college?.id || "");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<InternalProgram | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<string>("");
  const [viewApplicants, setViewApplicants] = useState<InternalProgram | null>(null);

  const defaultForm = { title: "", description: "", category: "merit" as InternalProgram["category"], eligibility: "", benefit: "", amount: 0, totalSeats: 0, deadline: "" };
  const [form, setForm] = useState(defaultForm);

  const filtered = programs.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));

  const getApplicantCount = (programTitle: string) => allApplications.filter((a) => a.programTitle === programTitle).length;
  const getApplicantsForProgram = (programTitle: string) => allApplications.filter((a) => a.programTitle === programTitle);

  const isDeadlinePassed = (deadline?: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  const openCreate = () => { setEditItem(null); setForm(defaultForm); setImageFile(""); setShowModal(true); };
  const openEdit = (p: InternalProgram) => { setEditItem(p); setForm({ title: p.title, description: p.description, category: p.category, eligibility: p.eligibility, benefit: p.benefit, amount: p.amount, totalSeats: p.totalSeats, deadline: "" }); setImageFile(""); setShowModal(true); };

  const handleSave = async () => {
    if (!form.title.trim()) { toast({ title: "Title is required", variant: "destructive" }); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (editItem) {
      setPrograms((prev) => prev.map((p) => p.id === editItem.id ? { ...p, ...form } : p));
      toast({ title: "Scholarship updated successfully" });
    } else {
      const newP: InternalProgram = { id: `ip${Date.now()}`, collegeId: college?.id || "", ...form, filledSeats: 0, status: "Active", icon: "🎓" };
      setPrograms((prev) => [...prev, newP]);
      toast({ title: "Scholarship created successfully" });
    }
    setLoading(false); setShowModal(false);
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setPrograms((prev) => prev.filter((p) => p.id !== deleteConfirm));
    toast({ title: "Scholarship deleted", variant: "destructive" });
    setDeleteConfirm(null); setLoading(false);
  };

  const categoryColors: Record<string, string> = { merit: "gradient-trust", need: "gradient-energy", talent: "gradient-tech", exposure: "gradient-trust", foundation: "gradient-energy" };

  // Applicants sub-view
  if (viewApplicants) {
    const applicants = getApplicantsForProgram(viewApplicants.title);
    const statusBadge = (status: string) => {
      const cls = status === "Approved" ? "status-approved" : status === "Pending" ? "status-pending" : "status-rejected";
      return <span className={`text-xs px-3 py-1 rounded-full ${cls}`}>{status}</span>;
    };
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => setViewApplicants(null)} className="text-muted-foreground hover:text-foreground p-2 rounded-lg bg-secondary/50 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-foreground">{viewApplicants.title}</h1>
            <p className="text-muted-foreground text-sm">{applicants.length} applicant{applicants.length !== 1 ? "s" : ""}</p>
          </div>
          {viewApplicants.status === "Closed" && (
            <span className="ml-auto text-xs px-3 py-1 rounded-full status-rejected font-semibold">Applications Closed</span>
          )}
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-foreground">Manage Scholarships</h1>
          <p className="text-muted-foreground text-sm mt-1">{programs.length} scholarship programs</p>
        </div>
        <button onClick={openCreate} className="gradient-trust px-5 py-2.5 rounded-xl text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
          <Plus className="w-5 h-5" /> Create Scholarship
        </button>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search scholarships..." className="input-dark w-full pl-12" />
      </div>

      {programs.length === 0 && !search && (
        <div className="glass-card p-16 text-center">
          <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No scholarships available</h3>
          <p className="text-muted-foreground mb-6">Get started by creating your first scholarship program</p>
          <button onClick={openCreate} className="gradient-trust px-6 py-3 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" /> Create Scholarship
          </button>
        </div>
      )}

      {programs.length > 0 && (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Scholarship Title</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Applicants</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const count = getApplicantCount(p.title);
                  return (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{p.icon}</span>
                          <div>
                            <p className="font-semibold text-foreground">{p.title}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-xs">{p.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className={`text-xs px-3 py-1 rounded-full text-white ${categoryColors[p.category]}`}>{p.category}</span>
                      </td>
                      <td className="p-4 font-mono font-bold text-foreground">₹{p.amount.toLocaleString()}</td>
                      <td className="p-4 hidden lg:table-cell">
                        <button onClick={() => setViewApplicants(p)} className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors group">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{count}</span>
                          <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </td>
                      <td className="p-4">
                        {p.status === "Closed" ? (
                          <span className="text-xs px-3 py-1 rounded-full status-rejected font-semibold">Applications Closed</span>
                        ) : (
                          <span className={`text-xs px-3 py-1 rounded-full ${p.status === "Active" ? "status-approved" : "status-pending"}`}>{p.status}</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => openEdit(p)} className="text-muted-foreground hover:text-primary p-2 transition-colors" title="Edit"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(p.id)} className="text-muted-foreground hover:text-destructive p-2 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && search && (
                  <tr><td colSpan={6} className="p-8 text-center text-muted-foreground"><Search className="w-8 h-8 mx-auto mb-2 opacity-50" />No scholarships match "{search}"</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="glass-card max-w-lg w-full p-6 animate-slide-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editItem ? "Edit Scholarship" : "Create Scholarship"}</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="text-sm text-muted-foreground mb-1 block">Title *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Scholarship Title" className="input-dark w-full" /></div>
              <div><label className="text-sm text-muted-foreground mb-1 block">Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the scholarship..." className="input-dark w-full h-20 resize-none" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-muted-foreground mb-1 block">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as InternalProgram["category"] })} className="input-dark w-full"><option value="merit">🏆 Merit</option><option value="need">💰 Need-Based</option><option value="talent">🏅 Talent</option><option value="exposure">🌍 Exposure</option><option value="foundation">🧠 Foundation</option></select></div>
                <div><label className="text-sm text-muted-foreground mb-1 block">Amount (₹)</label><input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: +e.target.value })} className="input-dark w-full" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-muted-foreground mb-1 block">Total Seats</label><input type="number" value={form.totalSeats} onChange={(e) => setForm({ ...form, totalSeats: +e.target.value })} className="input-dark w-full" /></div>
                <div><label className="text-sm text-muted-foreground mb-1 block">Deadline</label><input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="input-dark w-full" /></div>
              </div>
              <div><label className="text-sm text-muted-foreground mb-1 block">Eligibility Criteria</label><input value={form.eligibility} onChange={(e) => setForm({ ...form, eligibility: e.target.value })} placeholder="e.g., CGPA ≥ 9.0, 90% attendance" className="input-dark w-full" /></div>
              <div><label className="text-sm text-muted-foreground mb-1 block">Benefit Description</label><input value={form.benefit} onChange={(e) => setForm({ ...form, benefit: e.target.value })} placeholder="e.g., ₹10,000/year + Certificate" className="input-dark w-full" /></div>
              <div><label className="text-sm text-muted-foreground mb-1 block">Scholarship Image</label><label className="input-dark w-full flex items-center gap-3 cursor-pointer"><Upload className="w-5 h-5 text-muted-foreground" /><span className="text-muted-foreground text-sm">{imageFile || "Upload an image..."}</span><input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0]?.name || "")} /></label></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={loading} className="gradient-trust px-5 py-2.5 rounded-lg text-white font-semibold flex items-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-50">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}{editItem ? "Update" : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="glass-card max-w-sm w-full p-6 animate-slide-up text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-4"><AlertTriangle className="w-7 h-7 text-destructive" /></div>
            <h3 className="text-lg font-bold text-foreground mb-2">Delete Scholarship?</h3>
            <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteConfirm(null)} className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">Cancel</button>
              <button onClick={handleDelete} disabled={loading} className="px-5 py-2.5 rounded-lg bg-destructive text-destructive-foreground font-semibold flex items-center gap-2 hover:bg-destructive/90 disabled:opacity-50">{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
