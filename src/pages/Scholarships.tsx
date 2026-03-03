import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getInternalPrograms, type InternalProgram } from "@/data/colleges";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Scholarships() {
  const { college } = useAuth();
  const { toast } = useToast();
  const [programs, setPrograms] = useState<InternalProgram[]>(() => getInternalPrograms(college?.id || ""));
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<InternalProgram | null>(null);
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({ title: "", description: "", category: "merit" as InternalProgram["category"], eligibility: "", benefit: "", amount: 0, totalSeats: 0 });

  const filtered = programs.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => {
    setEditItem(null);
    setForm({ title: "", description: "", category: "merit", eligibility: "", benefit: "", amount: 0, totalSeats: 0 });
    setStep(1);
    setShowModal(true);
  };

  const openEdit = (p: InternalProgram) => {
    setEditItem(p);
    setForm({ title: p.title, description: p.description, category: p.category, eligibility: p.eligibility, benefit: p.benefit, amount: p.amount, totalSeats: p.totalSeats });
    setStep(1);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editItem) {
      setPrograms((prev) => prev.map((p) => p.id === editItem.id ? { ...p, ...form } : p));
      toast({ title: "Program updated successfully" });
    } else {
      const newP: InternalProgram = { id: `ip${Date.now()}`, collegeId: college?.id || "", ...form, filledSeats: 0, status: "Active", icon: "🎓" };
      setPrograms((prev) => [...prev, newP]);
      toast({ title: "Program created successfully" });
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this program?")) {
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Program deleted", variant: "destructive" });
    }
  };

  const categoryColors: Record<string, string> = {
    merit: "gradient-trust", need: "gradient-energy", talent: "gradient-tech", exposure: "gradient-trust", foundation: "gradient-energy"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-foreground">Manage Programs</h1>
        <button onClick={openCreate} className="gradient-trust px-5 py-2.5 rounded-xl text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg">
          <Plus className="w-5 h-5" /> Create New
        </button>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search programs..." className="input-dark w-full pl-12" />
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Program</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Seats</th>
              <th className="text-left p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-right p-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.icon}</span>
                    <div>
                      <p className="font-semibold text-foreground">{p.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">{p.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className={`text-xs px-2 py-1 rounded-full text-white ${categoryColors[p.category]}`}>{p.category}</span>
                </td>
                <td className="p-4 font-mono text-foreground">₹{p.amount.toLocaleString()}</td>
                <td className="p-4 text-muted-foreground hidden md:table-cell">{p.filledSeats}/{p.totalSeats}</td>
                <td className="p-4"><span className="status-active text-xs px-3 py-1 rounded-full">{p.status}</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(p)} className="text-muted-foreground hover:text-primary p-2 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="glass-card max-w-lg w-full p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">{editItem ? "Edit" : "Create"} Program</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "gradient-trust" : "bg-secondary"}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Program Title" className="input-dark w-full" />
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="input-dark w-full h-24 resize-none" />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as InternalProgram["category"] })} className="input-dark w-full">
                  <option value="merit">🏆 Academic & Merit</option>
                  <option value="need">💰 Need-Based</option>
                  <option value="talent">🏅 Talent-Based</option>
                  <option value="exposure">🌍 Premium Exposure</option>
                  <option value="foundation">🧠 Foundation Support</option>
                </select>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div><label className="text-sm text-muted-foreground mb-1 block">Amount (₹)</label><input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: +e.target.value })} className="input-dark w-full" /></div>
                <div><label className="text-sm text-muted-foreground mb-1 block">Total Seats</label><input type="number" value={form.totalSeats} onChange={(e) => setForm({ ...form, totalSeats: +e.target.value })} className="input-dark w-full" /></div>
                <div><label className="text-sm text-muted-foreground mb-1 block">Eligibility Criteria</label><input value={form.eligibility} onChange={(e) => setForm({ ...form, eligibility: e.target.value })} placeholder="e.g., CGPA ≥ 9.0, 90% attendance" className="input-dark w-full" /></div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div><label className="text-sm text-muted-foreground mb-1 block">Benefit Description</label><textarea value={form.benefit} onChange={(e) => setForm({ ...form, benefit: e.target.value })} placeholder="e.g., ₹10,000/year + Certificate" className="input-dark w-full h-24 resize-none" /></div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="px-5 py-2 rounded-lg bg-secondary text-secondary-foreground disabled:opacity-30">Previous</button>
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="gradient-trust px-5 py-2 rounded-lg text-white font-semibold">Next</button>
              ) : (
                <button onClick={handleSave} className="gradient-trust px-5 py-2 rounded-lg text-white font-semibold">{editItem ? "Update" : "Create"}</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
