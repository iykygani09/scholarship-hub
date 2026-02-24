import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getScholarships, type Scholarship } from "@/data/colleges";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Scholarships() {
  const { college } = useAuth();
  const { toast } = useToast();
  const [scholarships, setScholarships] = useState<Scholarship[]>(() => getScholarships(college?.id || ""));
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Scholarship | null>(null);
  const [step, setStep] = useState(1);

  // Form state
  const [form, setForm] = useState({ title: "", description: "", type: "Merit-based" as Scholarship["type"], amount: 0, totalSeats: 0, cgpaRequired: 0, maxIncome: 0, startDate: "", endDate: "" });

  const filtered = scholarships.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => {
    setEditItem(null);
    setForm({ title: "", description: "", type: "Merit-based", amount: 0, totalSeats: 0, cgpaRequired: 0, maxIncome: 0, startDate: "", endDate: "" });
    setStep(1);
    setShowModal(true);
  };

  const openEdit = (s: Scholarship) => {
    setEditItem(s);
    setForm({ title: s.title, description: s.description, type: s.type, amount: s.amount, totalSeats: s.totalSeats, cgpaRequired: s.cgpaRequired, maxIncome: s.maxIncome, startDate: s.startDate, endDate: s.endDate });
    setStep(1);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editItem) {
      setScholarships((prev) => prev.map((s) => s.id === editItem.id ? { ...s, ...form, filledSeats: s.filledSeats } : s));
      toast({ title: "Scholarship updated successfully" });
    } else {
      const newS: Scholarship = { id: `s${Date.now()}`, collegeId: college?.id || "", ...form, filledSeats: 0, status: "Active", categories: ["General"] };
      setScholarships((prev) => [...prev, newS]);
      toast({ title: "Scholarship created successfully" });
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this scholarship?")) {
      setScholarships((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "Scholarship deleted", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-foreground">Scholarships</h1>
        <button onClick={openCreate} className="gradient-primary px-5 py-2.5 rounded-xl text-primary-foreground font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
          <Plus className="w-5 h-5" /> Create New
        </button>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search scholarships..." className="input-dark w-full pl-12" />
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Type</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Seats</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="p-4">
                  <p className="font-semibold text-foreground">{s.title}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-xs">{s.description}</p>
                </td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">{s.type}</td>
                <td className="p-4 font-mono text-foreground">₹{s.amount.toLocaleString()}</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">{s.filledSeats}/{s.totalSeats}</td>
                <td className="p-4"><span className="status-active text-xs px-3 py-1 rounded-full">{s.status}</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(s)} className="text-muted-foreground hover:text-primary p-2 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(s.id)} className="text-muted-foreground hover:text-destructive p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="glass-card max-w-lg w-full p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editItem ? "Edit" : "Create"} Scholarship</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            {/* Step indicators */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "gradient-primary" : "bg-secondary"}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Scholarship Title" className="input-dark w-full" />
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="input-dark w-full h-24 resize-none" />
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Scholarship["type"] })} className="input-dark w-full">
                  <option value="Merit-based">Merit-based</option>
                  <option value="Government">Government</option>
                  <option value="Sports">Sports</option>
                  <option value="Need-based">Need-based</option>
                  <option value="Research">Research</option>
                </select>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Amount (₹)</label>
                  <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: +e.target.value })} className="input-dark w-full" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Total Seats</label>
                  <input type="number" value={form.totalSeats} onChange={(e) => setForm({ ...form, totalSeats: +e.target.value })} className="input-dark w-full" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Min CGPA Required</label>
                  <input type="number" step="0.1" value={form.cgpaRequired} onChange={(e) => setForm({ ...form, cgpaRequired: +e.target.value })} className="input-dark w-full" />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Start Date</label>
                  <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="input-dark w-full" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">End Date</label>
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="input-dark w-full" />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="px-5 py-2 rounded-lg bg-secondary text-secondary-foreground disabled:opacity-30">
                Previous
              </button>
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="gradient-primary px-5 py-2 rounded-lg text-primary-foreground font-semibold">
                  Next
                </button>
              ) : (
                <button onClick={handleSave} className="gradient-primary px-5 py-2 rounded-lg text-primary-foreground font-semibold">
                  {editItem ? "Update" : "Create"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
