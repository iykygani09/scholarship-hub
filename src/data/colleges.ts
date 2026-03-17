export interface College {
  id: string;
  name: string;
  shortName: string;
  location: string;
  district: string;
  code: string;
  adminEmail: string;
  adminPassword: string;
  adminName: string;
  established: number;
  affiliatedTo: string;
  accreditation: string;
  ranking: string;
  website: string;
  courses: string[];
  departments: string[];
}

export interface InternalProgram {
  id: string;
  collegeId: string;
  title: string;
  description: string;
  category: "merit" | "need" | "talent" | "exposure" | "foundation";
  eligibility: string;
  benefit: string;
  amount: number;
  totalSeats: number;
  filledSeats: number;
  status: "Active" | "Upcoming" | "Closed";
  icon: string;
}

export interface Application {
  id: string;
  collegeId: string;
  programId: string;
  programTitle: string;
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
  {
    id: "gmrit", name: "GMR Institute of Technology", shortName: "GMRIT",
    location: "Rajam, Srikakulam", district: "Srikakulam", code: "GMRIT-2024",
    adminEmail: "admin@gmrit.edu.in", adminPassword: "admin123", adminName: "Ganesh",
    established: 1997, affiliatedTo: "JNTU Kakinada", accreditation: "NAAC A Grade",
    ranking: "NIRF 201-300 (Engineering)", website: "https://gmrit.edu.in",
    courses: ["B.Tech", "M.Tech", "MBA"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "Chemical", "IT"]
  },
  {
    id: "vignan", name: "Vignan's Institute of Information Technology", shortName: "VIGNAN",
    location: "Duvvada, Visakhapatnam", district: "Visakhapatnam", code: "VIGNAN-2024",
    adminEmail: "admin@vignan.ac.in", adminPassword: "admin123", adminName: "Ravi Kumar",
    established: 2002, affiliatedTo: "JNTU Kakinada", accreditation: "NAAC A Grade",
    ranking: "NIRF 201-300", website: "https://vignan.ac.in",
    courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "AI&DS"]
  },
  {
    id: "srkr", name: "SRKR Engineering College", shortName: "SRKR",
    location: "Bhimavaram", district: "West Godavari", code: "SRKR-2024",
    adminEmail: "admin@srkr.ac.in", adminPassword: "admin123", adminName: "Suresh Babu",
    established: 1980, affiliatedTo: "JNTU Kakinada", accreditation: "NAAC A Grade",
    ranking: "Autonomous College", website: "https://srkrec.edu.in",
    courses: ["B.Tech", "M.Tech"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "Chemical"]
  },
  {
    id: "mvgr", name: "MVGR College of Engineering", shortName: "MVGR",
    location: "Vizianagaram", district: "Vizianagaram", code: "MVGR-2024",
    adminEmail: "admin@mvgrce.edu.in", adminPassword: "admin123", adminName: "Lakshmi Devi",
    established: 1997, affiliatedTo: "JNTU Kakinada", accreditation: "NAAC A Grade",
    ranking: "NBA Accredited", website: "https://mvgrce.edu.in",
    courses: ["B.Tech", "M.Tech"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"]
  },
  {
    id: "vrs", name: "VR Siddhartha Engineering College", shortName: "VRSEC",
    location: "Kanuru, Vijayawada", district: "Krishna", code: "VRSEC-2024",
    adminEmail: "admin@vrsiddhartha.ac.in", adminPassword: "admin123", adminName: "Krishna Rao",
    established: 1977, affiliatedTo: "JNTU Kakinada", accreditation: "NAAC A+ Grade",
    ranking: "NIRF 201-300", website: "https://vrsiddhartha.ac.in",
    courses: ["B.Tech", "M.Tech", "MBA", "MCA"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "AI&ML"]
  },
  {
    id: "auce", name: "Andhra University College of Engineering", shortName: "AUCE",
    location: "Visakhapatnam", district: "Visakhapatnam", code: "AUCE-2024",
    adminEmail: "admin@andhrauniv.edu", adminPassword: "admin123", adminName: "Ramesh",
    established: 1933, affiliatedTo: "Andhra University", accreditation: "NAAC A++ Grade",
    ranking: "NIRF 65 (University)", website: "https://andhrauniversity.edu.in",
    courses: ["B.Tech", "M.Tech", "Ph.D"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "Chemical", "Naval Architecture"]
  },
  {
    id: "jntuk", name: "JNTU College of Engineering Kakinada", shortName: "JNTUK",
    location: "Kakinada", district: "East Godavari", code: "JNTUK-2024",
    adminEmail: "admin@jntuk.edu.in", adminPassword: "admin123", adminName: "Venkata Rao",
    established: 1946, affiliatedTo: "JNTU Kakinada", accreditation: "NAAC A Grade",
    ranking: "NIRF 101-150 (University)", website: "https://jntuk.edu.in",
    courses: ["B.Tech", "M.Tech", "MBA", "MCA", "Ph.D"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT", "Chemical"]
  },
  {
    id: "rgukt", name: "RGUKT IIIT Nuzvid", shortName: "RGUKT",
    location: "Nuzvid", district: "Krishna", code: "RGUKT-2024",
    adminEmail: "admin@rgukt.ac.in", adminPassword: "admin123", adminName: "Srinivas",
    established: 2008, affiliatedTo: "RGUKT (Deemed)", accreditation: "State University",
    ranking: "Top IIIT in AP", website: "https://www.rgukt.ac.in",
    courses: ["B.Tech", "PUC (Integrated)"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "Chemical"]
  },
  {
    id: "klu", name: "KL University (KL Deemed-to-be University)", shortName: "KLU",
    location: "Vaddeswaram, Guntur", district: "Guntur", code: "KLU-2024",
    adminEmail: "admin@kluniversity.in", adminPassword: "admin123", adminName: "Nagaraju",
    established: 1980, affiliatedTo: "Deemed-to-be University", accreditation: "NAAC A++ Grade",
    ranking: "NIRF 48 (University)", website: "https://www.kluniversity.in",
    courses: ["B.Tech", "M.Tech", "MBA", "BBA", "B.Sc"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "AI&DS", "Biotechnology"]
  },
  {
    id: "gvp", name: "Gayatri Vidya Parishad College of Engineering", shortName: "GVPCE",
    location: "Madhurawada, Visakhapatnam", district: "Visakhapatnam", code: "GVPCE-2024",
    adminEmail: "admin@gvpce.ac.in", adminPassword: "admin123", adminName: "Prasad",
    established: 1996, affiliatedTo: "JNTU Kakinada", accreditation: "NAAC A Grade",
    ranking: "NBA Accredited", website: "https://www.gvpce.ac.in",
    courses: ["B.Tech", "M.Tech", "MBA"],
    departments: ["CSE", "ECE", "EEE", "MECH", "CIVIL", "IT"]
  },
];

// Internal & Current Programs — starts empty, admin creates them
export const getInternalPrograms = (_collegeId: string): InternalProgram[] => {
  return [];
};

export const getApplications = (collegeId: string): Application[] => {
  const college = colleges.find(c => c.id === collegeId);
  const dept = college?.departments || ["CSE", "ECE", "EEE", "MECH"];
  const programs = getInternalPrograms(collegeId);

  return [
    { id: "a1", collegeId, programId: programs[0]?.id || "ip1", programTitle: programs[0]?.title || "Merit Scholarship", studentName: "Durga Prasad", rollNumber: "20341A0301", department: dept[0], year: 4, cgpa: 9.5, familyIncome: 180000, aiScore: 96, status: "Approved", appliedDate: "2024-09-15" },
    { id: "a2", collegeId, programId: programs[1]?.id || "ip2", programTitle: programs[1]?.title || "EAPCET Scholarship", studentName: "Lakshmi Narayana", rollNumber: "21341A0201", department: dept[1] || "ECE", year: 3, cgpa: 7.8, familyIncome: 120000, aiScore: 78.5, status: "Approved", appliedDate: "2024-08-20" },
    { id: "a3", collegeId, programId: programs[2]?.id || "ip3", programTitle: programs[2]?.title || "Need-Based Aid", studentName: "Anusha Devi", rollNumber: "21341A0502", department: dept[0], year: 3, cgpa: 8.1, familyIncome: 95000, aiScore: 81.2, status: "Pending", appliedDate: "2024-09-01" },
    { id: "a4", collegeId, programId: programs[3]?.id || "ip4", programTitle: programs[3]?.title || "Sports Scholarship", studentName: "Ravi Teja", rollNumber: "22341A0101", department: dept[3] || "MECH", year: 2, cgpa: 7.5, familyIncome: 90000, aiScore: 75, status: "Approved", appliedDate: "2024-09-10" },
    { id: "a5", collegeId, programId: programs[0]?.id || "ip1", programTitle: programs[0]?.title || "Merit Scholarship", studentName: "Priya Sharma", rollNumber: "20341A0405", department: dept[1] || "ECE", year: 4, cgpa: 9.2, familyIncome: 350000, aiScore: 92, status: "Approved", appliedDate: "2024-09-05" },
    { id: "a6", collegeId, programId: programs[4]?.id || "ip5", programTitle: programs[4]?.title || "Achievement Award", studentName: "Mohammed Irfan", rollNumber: "22341A0503", department: dept[0], year: 2, cgpa: 8.8, familyIncome: 60000, aiScore: 91, status: "Pending", appliedDate: "2024-08-25" },
    { id: "a7", collegeId, programId: programs[5]?.id || "ip6", programTitle: programs[5]?.title || "Exposure Program", studentName: "Sai Krishna", rollNumber: "21341A0301", department: dept[2] || "EEE", year: 3, cgpa: 8.4, familyIncome: 140000, aiScore: 85, status: "Pending", appliedDate: "2024-09-12" },
    { id: "a8", collegeId, programId: programs[2]?.id || "ip3", programTitle: programs[2]?.title || "Need-Based Aid", studentName: "Adilakshmi Valmiki", rollNumber: "22341A0210", department: dept[1] || "ECE", year: 2, cgpa: 7.2, familyIncome: 80000, aiScore: 72, status: "Approved", appliedDate: "2024-08-18" },
    { id: "a9", collegeId, programId: programs[1]?.id || "ip2", programTitle: programs[1]?.title || "EAPCET Scholarship", studentName: "Venkatesh Reddy", rollNumber: "20341A0112", department: dept[0], year: 4, cgpa: 6.8, familyIncome: 220000, aiScore: 62, status: "Rejected", appliedDate: "2024-09-08" },
    { id: "a10", collegeId, programId: programs[0]?.id || "ip1", programTitle: programs[0]?.title || "Merit Scholarship", studentName: "Sneha Patel", rollNumber: "21341A0415", department: dept[3] || "MECH", year: 3, cgpa: 9.1, familyIncome: 110000, aiScore: 89.5, status: "Pending", appliedDate: "2024-09-20" },
  ];
};

export const getAuditLogs = (collegeId: string): AuditLog[] => [
  { id: "l1", collegeId, action: "Login", user: "Admin", details: "Admin logged into the dashboard", timestamp: "2024-09-20T10:30:00", ip: "192.168.1.1" },
  { id: "l2", collegeId, action: "Create", user: "Admin", details: "Created new scholarship: Merit Scholarship", timestamp: "2024-09-19T14:22:00", ip: "192.168.1.1" },
  { id: "l3", collegeId, action: "Update", user: "Admin", details: "Updated application status: Durga Prasad — Approved", timestamp: "2024-09-18T09:15:00", ip: "192.168.1.1" },
  { id: "l4", collegeId, action: "Update", user: "Admin", details: "Ran AI allocation for Sports Scholarship", timestamp: "2024-09-17T16:45:00", ip: "192.168.1.1" },
  { id: "l5", collegeId, action: "Create", user: "Admin", details: "Added new internal program: Paris Internship", timestamp: "2024-09-16T11:00:00", ip: "192.168.1.1" },
  { id: "l6", collegeId, action: "Delete", user: "Admin", details: "Removed expired scholarship program", timestamp: "2024-09-15T13:30:00", ip: "192.168.1.1" },
];
