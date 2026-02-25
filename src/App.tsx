import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import CollegeSelect from "./pages/CollegeSelect";
import CollegeVerify from "./pages/CollegeVerify";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Scholarships from "./pages/Scholarships";
import GovtScholarships from "./pages/GovtScholarships";
import InternalPrograms from "./pages/InternalPrograms";
import Applications from "./pages/Applications";
import AIAllocation from "./pages/AIAllocation";
import AuditLogs from "./pages/AuditLogs";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
    <Route path="/select-college" element={<PublicRoute><CollegeSelect /></PublicRoute>} />
    <Route path="/verify/:collegeId" element={<PublicRoute><CollegeVerify /></PublicRoute>} />
    <Route path="/login/:collegeId" element={<PublicRoute><Login /></PublicRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/internal-programs" element={<ProtectedRoute><InternalPrograms /></ProtectedRoute>} />
    <Route path="/govt-scholarships" element={<ProtectedRoute><GovtScholarships /></ProtectedRoute>} />
    <Route path="/scholarships" element={<ProtectedRoute><Scholarships /></ProtectedRoute>} />
    <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
    <Route path="/ai-allocation" element={<ProtectedRoute><AIAllocation /></ProtectedRoute>} />
    <Route path="/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
