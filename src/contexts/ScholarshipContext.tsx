import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { InternalProgram, Application, Notification } from "@/data/colleges";

interface ScholarshipContextType {
  programs: InternalProgram[];
  setPrograms: React.Dispatch<React.SetStateAction<InternalProgram[]>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  notifications: Notification[];
  addNotification: (n: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: number;
  getScholarshipStatus: (program: InternalProgram) => "Active" | "Expired" | "Upcoming";
  getDaysRemaining: (deadline: string) => number;
}

const ScholarshipContext = createContext<ScholarshipContextType | null>(null);

export function ScholarshipProvider({ children }: { children: ReactNode }) {
  const { college } = useAuth();
  const [programs, setPrograms] = useState<InternalProgram[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((n: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotif: Notification = {
      ...n,
      id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getScholarshipStatus = useCallback((program: InternalProgram): "Active" | "Expired" | "Upcoming" => {
    if (!program.deadline) return "Active";
    const now = new Date();
    const deadline = new Date(program.deadline);
    if (deadline < now) return "Expired";
    return "Active";
  }, []);

  const getDaysRemaining = useCallback((deadline: string): number => {
    const now = new Date();
    const dl = new Date(deadline);
    const diff = dl.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, []);

  return (
    <ScholarshipContext.Provider value={{
      programs, setPrograms,
      applications, setApplications,
      notifications, addNotification, markNotificationRead, markAllRead, unreadCount,
      getScholarshipStatus, getDaysRemaining,
    }}>
      {children}
    </ScholarshipContext.Provider>
  );
}

export function useScholarships() {
  const ctx = useContext(ScholarshipContext);
  if (!ctx) throw new Error("useScholarships must be used within ScholarshipProvider");
  return ctx;
}
