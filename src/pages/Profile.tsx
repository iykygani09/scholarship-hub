import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Save, Shield, Bell, BellOff, Globe, Award, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { college, adminName } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(adminName);
  const [phone, setPhone] = useState("+91 9876543210");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);

  const handleSave = () => {
    toast({ title: "Profile updated successfully!" });
  };

  const handlePasswordUpdate = () => {
    if (!newPw) return;
    if (newPw !== confirmPw) {
      toast({ title: "Passwords don't match", variant: "destructive" });
      return;
    }
    toast({ title: "Password updated successfully!" });
    setNewPw("");
    setConfirmPw("");
  };

  const strength = newPw.length === 0 ? 0 : newPw.length < 6 ? 1 : newPw.length < 10 ? 2 : 3;
  const strengthLabels = ["", "Weak", "Medium", "Strong"];
  const strengthColors = ["", "bg-destructive", "bg-warning", "bg-accent"];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-foreground">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left - Profile info */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full gradient-trust flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {adminName.charAt(0)}
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="input-dark w-full" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Email</label>
            <input value={college?.adminEmail} disabled className="input-dark w-full opacity-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input-dark w-full" />
          </div>

          {/* College Info */}
          <div className="glass-card p-4 space-y-3">
            <h3 className="font-bold text-foreground flex items-center gap-2"><Award className="w-4 h-4 text-primary" /> College Details</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">College</span><p className="text-foreground font-medium">{college?.name}</p></div>
              <div><span className="text-muted-foreground">Code</span><p className="font-mono text-primary">{college?.code}</p></div>
              <div><span className="text-muted-foreground">Accreditation</span><p className="text-foreground">{college?.accreditation}</p></div>
              <div className="flex items-center gap-1"><Calendar className="w-3 h-3 text-muted-foreground" /><span className="text-foreground">Est. {college?.established}</span></div>
            </div>
            {college?.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary flex items-center gap-1 hover:underline">
                <Globe className="w-3 h-3" /> {college.website}
              </a>
            )}
          </div>

          <button onClick={handleSave} className="gradient-trust w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-lg">
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </div>

        {/* Right */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> Change Password</h2>
            <input value={newPw} onChange={(e) => setNewPw(e.target.value)} type="password" placeholder="New password" className="input-dark w-full" />
            {newPw && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${strengthColors[strength]}`} style={{ width: `${(strength / 3) * 100}%` }} />
                </div>
                <span className="text-xs text-muted-foreground">{strengthLabels[strength]}</span>
              </div>
            )}
            <input value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} type="password" placeholder="Confirm new password" className="input-dark w-full" />
            <button onClick={handlePasswordUpdate} className="gradient-tech w-full py-3 rounded-xl text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg">
              Update Password
            </button>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Notifications</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Email Notifications</span>
              </div>
              <button onClick={() => setEmailNotif(!emailNotif)} className={`w-12 h-6 rounded-full transition-colors relative ${emailNotif ? "gradient-trust" : "bg-secondary"}`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${emailNotif ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellOff className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Push Notifications</span>
              </div>
              <button onClick={() => setPushNotif(!pushNotif)} className={`w-12 h-6 rounded-full transition-colors relative ${pushNotif ? "gradient-trust" : "bg-secondary"}`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${pushNotif ? "left-6" : "left-0.5"}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
