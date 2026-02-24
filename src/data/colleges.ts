export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  code: string;
  adminEmail: string;
  adminPassword: string;
  adminName: string;
}

export interface Scholarship {
  id: string;
  collegeId: string;
  title: string;
  description: string;
  type: "Merit-based" | "Government" | "Sports" | "Need-based" | "Research";
  amount: number;
  totalSeats: number;
  filledSeats: number;
  status: "Active" | "Closed" | "Upcoming";
  cgpaRequired: number;
  maxIncome: number;
  categories: string[];
  startDate: string;
  endDate: string;
}

export interface Application {
  id: string;
  collegeId: string;
  scholarshipId: string;
  scholarshipTitle: string;
  studentName: string;
  rollNumber: string;
  department: string;
  year: number;
  cgpa: number;
  familyIncome: number;
  aiScore: number;
  status: "Approved" | "Pending" | "Rejected";
  appliedDate: string;
}

export interface AuditLog {
  id: string;
  collegeId: string;
  action: "Create" | "Update" | "Delete" | "Login";
  user: string;
  details: string;
  timestamp: string;
  ip: string;
}

export const colleges: College[] = [
  { id: "gmrit", name: "GMR Institute of Technology", shortName: "GMRIT", location: "Rajam, Srikakulam", code: "GMRIT-2024", adminEmail: "admin@gmrit.edu.in", adminPassword: "admin123", adminName: "Ganesh" },
  { id: "vignan", name: "Vignan's Institute of Information Technology", shortName: "VIGNAN", location: "Visakhapatnam", code: "VIGNAN-2024", adminEmail: "admin@vignan.ac.in", adminPassword: "admin123", adminName: "Ravi Kumar" },
  { id: "srkr", name: "SRKR Engineering College", shortName: "SRKR", location: "Bhimavaram, West Godavari", code: "SRKR-2024", adminEmail: "admin@srkr.ac.in", adminPassword: "admin123", adminName: "Suresh Babu" },
  { id: "mvgr", name: "MVGR College of Engineering", shortName: "MVGR", location: "Vizianagaram", code: "MVGR-2024", adminEmail: "admin@mvgrce.edu.in", adminPassword: "admin123", adminName: "Lakshmi Devi" },
  { id: "vrs", name: "VR Siddhartha Engineering College", shortName: "VRSEC", location: "Vijayawada, Krishna", code: "VRSEC-2024", adminEmail: "admin@vrsiddhartha.ac.in", adminPassword: "admin123", adminName: "Krishna Rao" },
  { id: "auce", name: "Andhra University College of Engineering", shortName: "AUCE", location: "Visakhapatnam", code: "AUCE-2024", adminEmail: "admin@andhrauniv.edu", adminPassword: "admin123", adminName: "Ramesh" },
  { id: "jntuk", name: "Jawaharlal Nehru Technological University", shortName: "JNTUK", location: "Kakinada, East Godavari", code: "JNTUK-2024", adminEmail: "admin@jntuk.edu.in", adminPassword: "admin123", adminName: "Venkata Rao" },
  { id: "rgukt", name: "Rajiv Gandhi University of Knowledge Technologies", shortName: "RGUKT", location: "Nuzvid, Krishna", code: "RGUKT-2024", adminEmail: "admin@rgukt.ac.in", adminPassword: "admin123", adminName: "Srinivas" },
  { id: "klu", name: "KL University", shortName: "KLU", location: "Guntur", code: "KLU-2024", adminEmail: "admin@kluniversity.in", adminPassword: "admin123", adminName: "Nagaraju" },
  { id: "git", name: "Gayatri Vidya Parishad College of Engineering", shortName: "GVPCE", location: "Visakhapatnam", code: "GVPCE-2024", adminEmail: "admin@gvpce.ac.in", adminPassword: "admin123", adminName: "Prasad" },
];

export const getScholarships = (collegeId: string): Scholarship[] => {
  const base: Scholarship[] = [
    { id: "s1", collegeId, title: "Director's Gold Medal Award", description: "Awarded to the top-performing student across all departments", type: "Merit-based", amount: 50000, totalSeats: 5, filledSeats: 3, status: "Active", cgpaRequired: 9.0, maxIncome: 0, categories: ["General", "OBC", "SC", "ST"], startDate: "2024-07-01", endDate: "2025-03-31" },
    { id: "s2", collegeId, title: "AP Govt Post-Matric Scholarship (SC/ST)", description: "Government of Andhra Pradesh scholarship for SC/ST students", type: "Government", amount: 85000, totalSeats: 120, filledSeats: 98, status: "Active", cgpaRequired: 6.0, maxIncome: 250000, categories: ["SC", "ST"], startDate: "2024-06-01", endDate: "2025-04-30" },
    { id: "s3", collegeId, title: "AP Govt EBC Fee Reimbursement", description: "Economically Backward Classes fee reimbursement by AP Government", type: "Government", amount: 65000, totalSeats: 80, filledSeats: 62, status: "Active", cgpaRequired: 5.5, maxIncome: 100000, categories: ["EBC", "General"], startDate: "2024-06-01", endDate: "2025-04-30" },
    { id: "s4", collegeId, title: "Sports Excellence Award", description: "For students representing at university/national level sports", type: "Sports", amount: 30000, totalSeats: 10, filledSeats: 5, status: "Active", cgpaRequired: 6.0, maxIncome: 0, categories: ["General", "OBC", "SC", "ST"], startDate: "2024-08-01", endDate: "2025-02-28" },
    { id: "s5", collegeId, title: "Merit Scholarship - Top 10%", description: "For students in top 10% of their department", type: "Merit-based", amount: 25000, totalSeats: 50, filledSeats: 42, status: "Active", cgpaRequired: 8.5, maxIncome: 0, categories: ["General", "OBC", "SC", "ST", "EBC"], startDate: "2024-07-15", endDate: "2025-03-15" },
    { id: "s6", collegeId, title: "Need-Based Financial Aid", description: "Financial assistance for economically weaker students", type: "Need-based", amount: 40000, totalSeats: 30, filledSeats: 22, status: "Active", cgpaRequired: 5.0, maxIncome: 80000, categories: ["General", "OBC", "SC", "ST", "EBC"], startDate: "2024-07-01", endDate: "2025-05-31" },
    { id: "s7", collegeId, title: "Research Innovation Grant", description: "For students with published research papers or patents", type: "Research", amount: 75000, totalSeats: 8, filledSeats: 3, status: "Active", cgpaRequired: 8.0, maxIncome: 0, categories: ["General", "OBC"], startDate: "2024-09-01", endDate: "2025-03-31" },
    { id: "s8", collegeId, title: "Minority Welfare Scholarship", description: "AP Government scholarship for minority community students", type: "Government", amount: 55000, totalSeats: 40, filledSeats: 28, status: "Active", cgpaRequired: 5.5, maxIncome: 200000, categories: ["Minority"], startDate: "2024-06-15", endDate: "2025-04-15" },
  ];
  if (collegeId === "gmrit") {
    base[0].title = "GMRIT Director's Gold Medal Award";
    base[0].description = "Awarded by GMR Institute of Technology to the top-performing student";
  }
  return base;
};

export const getApplications = (collegeId: string): Application[] => [
  { id: "a1", collegeId, scholarshipId: "s1", scholarshipTitle: "Director's Gold Medal Award", studentName: "Durga Prasad", rollNumber: "20341A0301", department: "EEE", year: 4, cgpa: 9.5, familyIncome: 500000, aiScore: 96, status: "Approved", appliedDate: "2024-09-15" },
  { id: "a2", collegeId, scholarshipId: "s2", scholarshipTitle: "AP Govt Post-Matric Scholarship (SC/ST)", studentName: "Lakshmi Narayana", rollNumber: "21341A0201", department: "MECH", year: 3, cgpa: 7.8, familyIncome: 180000, aiScore: 78.5, status: "Approved", appliedDate: "2024-08-20" },
  { id: "a3", collegeId, scholarshipId: "s3", scholarshipTitle: "AP Govt EBC Fee Reimbursement", studentName: "Anusha Devi", rollNumber: "21341A0502", department: "CSE", year: 3, cgpa: 8.1, familyIncome: 120000, aiScore: 81.2, status: "Pending", appliedDate: "2024-09-01" },
  { id: "a4", collegeId, scholarshipId: "s5", scholarshipTitle: "Merit Scholarship - Top 10%", studentName: "Ravi Teja", rollNumber: "22341A0101", department: "CIVIL", year: 2, cgpa: 7.5, familyIncome: 90000, aiScore: 75, status: "Approved", appliedDate: "2024-09-10" },
  { id: "a5", collegeId, scholarshipId: "s4", scholarshipTitle: "Sports Excellence Award", studentName: "Priya Sharma", rollNumber: "20341A0405", department: "ECE", year: 4, cgpa: 7.2, familyIncome: 350000, aiScore: 82, status: "Pending", appliedDate: "2024-09-05" },
  { id: "a6", collegeId, scholarshipId: "s6", scholarshipTitle: "Need-Based Financial Aid", studentName: "Karthik Reddy", rollNumber: "22341A0503", department: "CSE", year: 2, cgpa: 8.8, familyIncome: 60000, aiScore: 91, status: "Approved", appliedDate: "2024-08-25" },
  { id: "a7", collegeId, scholarshipId: "s7", scholarshipTitle: "Research Innovation Grant", studentName: "Sai Krishna", rollNumber: "21341A0301", department: "EEE", year: 3, cgpa: 9.1, familyIncome: 400000, aiScore: 88, status: "Pending", appliedDate: "2024-09-12" },
];

export const getAuditLogs = (collegeId: string): AuditLog[] => [
  { id: "l1", collegeId, action: "Login", user: "Admin", details: "Admin logged in successfully", timestamp: "2024-09-15T10:30:00Z", ip: "192.168.1.100" },
  { id: "l2", collegeId, action: "Create", user: "Admin", details: "Created scholarship: Director's Gold Medal Award", timestamp: "2024-09-14T14:20:00Z", ip: "192.168.1.100" },
  { id: "l3", collegeId, action: "Update", user: "Admin", details: "Updated application status for Durga Prasad to Approved", timestamp: "2024-09-13T09:15:00Z", ip: "192.168.1.101" },
  { id: "l4", collegeId, action: "Create", user: "Admin", details: "Created scholarship: AP Govt Post-Matric Scholarship", timestamp: "2024-09-12T16:45:00Z", ip: "192.168.1.100" },
  { id: "l5", collegeId, action: "Delete", user: "Admin", details: "Deleted expired scholarship: Summer Research Grant 2023", timestamp: "2024-09-10T11:00:00Z", ip: "192.168.1.102" },
];
