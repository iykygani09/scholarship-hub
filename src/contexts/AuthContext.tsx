import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { colleges, type College } from "@/data/colleges";

interface AuthState {
  isAuthenticated: boolean;
  college: College | null;
  adminName: string;
}

interface AuthContextType extends AuthState {
  selectCollege: (college: College) => void;
  verifyCode: (code: string) => boolean;
  login: (email: string, password: string) => boolean;
  signOut: () => void;
  selectedCollege: College | null;
  codeVerified: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = sessionStorage.getItem("scholar_auth");
    if (stored) return JSON.parse(stored);
    return { isAuthenticated: false, college: null, adminName: "" };
  });
  const [selectedCollege, setSelectedCollege] = useState<College | null>(() => {
    const s = sessionStorage.getItem("scholar_selected_college");
    return s ? JSON.parse(s) : null;
  });
  const [codeVerified, setCodeVerified] = useState(() => sessionStorage.getItem("scholar_code_verified") === "true");

  useEffect(() => {
    sessionStorage.setItem("scholar_auth", JSON.stringify(auth));
  }, [auth]);

  // Prevent back navigation when authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      const handlePopState = (e: PopStateEvent) => {
        // Push state again to prevent going back
        window.history.pushState(null, "", window.location.href);
      };
      
      // Push initial state
      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);
      
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [auth.isAuthenticated]);

  const selectCollege = useCallback((college: College) => {
    setSelectedCollege(college);
    sessionStorage.setItem("scholar_selected_college", JSON.stringify(college));
  }, []);

  const verifyCode = useCallback((code: string): boolean => {
    if (!selectedCollege) return false;
    if (selectedCollege.code === code.toUpperCase().trim()) {
      setCodeVerified(true);
      sessionStorage.setItem("scholar_code_verified", "true");
      return true;
    }
    return false;
  }, [selectedCollege]);

  const login = useCallback((email: string, password: string): boolean => {
    if (!selectedCollege) return false;
    if (selectedCollege.adminEmail.toLowerCase() === email.toLowerCase().trim() && selectedCollege.adminPassword === password.trim()) {
      setAuth({ isAuthenticated: true, college: selectedCollege, adminName: selectedCollege.adminName });
      return true;
    }
    return false;
  }, [selectedCollege]);

  const signOut = useCallback(() => {
    setAuth({ isAuthenticated: false, college: null, adminName: "" });
    setSelectedCollege(null);
    setCodeVerified(false);
    sessionStorage.removeItem("scholar_auth");
    sessionStorage.removeItem("scholar_selected_college");
    sessionStorage.removeItem("scholar_code_verified");
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, selectCollege, verifyCode, login, signOut, selectedCollege, codeVerified }}>
      {children}
    </AuthContext.Provider>
  );
};
