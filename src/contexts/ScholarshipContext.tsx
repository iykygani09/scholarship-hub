import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { InternalProgram, Application } from "@/data/colleges";

interface ScholarshipContextType {
  programs: InternalProgram[];
  setPrograms: React.Dispatch<React.SetStateAction<InternalProgram[]>>;
  applications: Application[];
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
}

const ScholarshipContext = createContext<ScholarshipContextType | null>(null);

export function ScholarshipProvider({ children }: { children: ReactNode }) {
  const { college } = useAuth();
  const [programs, setPrograms] = useState<InternalProgram[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  return (
    <ScholarshipContext.Provider value={{ programs, setPrograms, applications, setApplications }}>
      {children}
    </ScholarshipContext.Provider>
  );
}

export function useScholarships() {
  const ctx = useContext(ScholarshipContext);
  if (!ctx) throw new Error("useScholarships must be used within ScholarshipProvider");
  return ctx;
}
