import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useScholarships } from "@/contexts/ScholarshipContext";
import {
  LayoutDashboard, GraduationCap, FileText, LogOut, ChevronLeft, Bell, Search, Menu, X, Brain, Check,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Scholarships", path: "/scholarships", icon: GraduationCap },
  { title: "Manage Applications", path: "/applications", icon: FileText },
  { title: "AI Allocation", path: "/ai-allocation", icon: Brain },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { college, adminName, signOut } = useAuth();
  const { notifications, unreadCount, markNotificationRead, markAllRead } = useScholarships();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/", { replace: true });
  };

  const notifIcon: Record<string, string> = {
    approval: "✅",
    rejection: "❌",
    scholarship_created: "🎓",
    deadline_passed: "⏰",
    ai_allocation: "🤖",
  };

  const getRelativeTime = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <nav className="flex-1 p-3 space-y-1 overflow-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "sidebar-item-active" : ""}`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {(!collapsed || mobileOpen) && <span className="truncate">{item.title}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <button onClick={handleSignOut} className="sidebar-item w-full text-destructive hover:bg-destructive/10">
          <LogOut className="w-5 h-5 shrink-0" />
          {(!collapsed || mobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen w-full">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex glass-sidebar flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-64"} shrink-0`}>
        <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-lg gradient-trust flex items-center justify-center shrink-0 animate-glow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && <span className="font-bold gradient-text-brand text-lg truncate">ScholarConnect</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="ml-auto text-muted-foreground hover:text-foreground transition-colors">
            {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 glass-sidebar flex flex-col z-10 animate-slide-in-left">
            <div className="flex items-center gap-2 p-4 border-b border-sidebar-border">
              <div className="w-9 h-9 rounded-lg gradient-trust flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold gradient-text-brand text-lg">ScholarConnect</span>
              <button onClick={() => setMobileOpen(false)} className="ml-auto text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 sm:h-16 border-b border-border bg-card/40 backdrop-blur-lg flex items-center px-4 sm:px-6 gap-3 sm:gap-4 shrink-0">
          <button onClick={() => setMobileOpen(true)} className="md:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="font-semibold gradient-text-brand text-sm sm:text-lg truncate">{college?.name}</h2>
          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input placeholder="Search..." className="input-dark pl-10 py-2 w-56 text-sm" />
            </div>

            {/* Notification Bell with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative text-muted-foreground hover:text-foreground transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive rounded-full text-[10px] flex items-center justify-center text-destructive-foreground font-bold animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 glass-card border border-border/50 rounded-xl shadow-2xl z-50 overflow-hidden animate-slide-up">
                    <div className="flex items-center justify-between p-4 border-b border-border/50">
                      <h3 className="font-bold text-foreground text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                          <p className="text-sm text-muted-foreground">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.slice(0, 15).map((n) => (
                          <button
                            key={n.id}
                            onClick={() => { markNotificationRead(n.id); }}
                            className={`w-full text-left p-3 border-b border-border/30 hover:bg-secondary/30 transition-colors flex items-start gap-3 ${!n.read ? "bg-primary/5" : ""}`}
                          >
                            <span className="text-lg mt-0.5">{notifIcon[n.type] || "📢"}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm leading-snug ${!n.read ? "text-foreground font-medium" : "text-muted-foreground"}`}>{n.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.description}</p>
                              <p className="text-[10px] text-muted-foreground mt-1">{getRelativeTime(n.timestamp)}</p>
                            </div>
                            {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full gradient-trust flex items-center justify-center text-white font-semibold text-sm">
                {adminName?.charAt(0) || "A"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">{adminName}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
