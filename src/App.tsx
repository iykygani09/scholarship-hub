import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ScholarshipProvider } from "@/contexts/ScholarshipContext";
import Landing from "./pages/Landing";
import CollegeSelect from "./pages/CollegeSelect";
import CollegeVerify from "./pages/CollegeVerify";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Scholarships from "./pages/Scholarships";
import Applications from "./pages/Applications";
import AIAllocation from "./pages/AIAllocation";
import DashboardLayout from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return (
    <ScholarshipProvider>
      <DashboardLayout>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scholarships" element={<Scholarships />} />
          <Route path="applications" element={<Applications />} />
          <Route path="ai-allocation" element={<AIAllocation />} />
        </Routes>
      </DashboardLayout>
    </ScholarshipProvider>
  );
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
    <Route path="/*" element={<ProtectedRoutes />} />
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
