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

export interface Scholarship {
  id: string;
  collegeId: string;
  title: string;
  description: string;
  type: "Merit-based" | "Government" | "Sports" | "Need-based" | "Research" | "Institutional";
  amount: number;
  amountDescription: string;
  totalSeats: number;
  filledSeats: number;
  status: "Active" | "Closed" | "Upcoming";
  cgpaRequired: number;
  maxIncome: number;
  categories: string[];
  eligibility: string;
  startDate: string;
  endDate: string;
  portal: string;
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

// Real AP Government & Institutional Scholarships applicable to engineering colleges
export const getScholarships = (collegeId: string): Scholarship[] => {
  const college = colleges.find(c => c.id === collegeId);
  const shortName = college?.shortName || "College";

  const scholarships: Scholarship[] = [
    // AP Government Scholarships (common to all AP colleges)
    {
      id: "s1", collegeId, title: "Jagananna Vidya Deevena (Post-Matric Fee Reimbursement)",
      description: "AP Government flagship scheme providing full tuition fee reimbursement to eligible SC, ST, BC, EBC, Kapu, Minority & Differently Abled students through Jnanabhumi portal",
      type: "Government", amount: 35000, amountDescription: "Full tuition fee reimbursement (up to ₹35,000/year for engineering)",
      totalSeats: 500, filledSeats: 385, status: "Active", cgpaRequired: 0, maxIncome: 250000,
      categories: ["SC", "ST", "BC", "EBC", "Kapu", "Minority", "Differently Abled"],
      eligibility: "Must be AP domicile, passed 10th class, 75% attendance, family annual income ≤ ₹2.5 Lakhs, no income tax payer in family",
      startDate: "2024-08-01", endDate: "2025-03-31", portal: "jnanabhumi.ap.gov.in"
    },
    {
      id: "s2", collegeId, title: "Jagananna Vasathi Deevena (Hostel/Mess Allowance)",
      description: "AP Government hostel and maintenance allowance for students - ₹20,000/year for degree & engineering students covering hostel, mess and other living expenses",
      type: "Government", amount: 20000, amountDescription: "₹20,000/year for engineering students (₹10,000 per semester)",
      totalSeats: 400, filledSeats: 312, status: "Active", cgpaRequired: 0, maxIncome: 250000,
      categories: ["SC", "ST", "BC", "EBC", "Kapu", "Minority"],
      eligibility: "AP domicile, studying in recognized college, family income ≤ ₹2.5 Lakhs, valid Aadhaar & bank account",
      startDate: "2024-08-01", endDate: "2025-03-31", portal: "jnanabhumi.ap.gov.in"
    },
    {
      id: "s3", collegeId, title: "AP Post-Matric Scholarship for SC Students",
      description: "Central Government scholarship for Scheduled Caste students pursuing post-matric education including engineering, providing maintenance allowance and fee coverage",
      type: "Government", amount: 85000, amountDescription: "Tuition fee + ₹1,200/month maintenance (hosteler) or ₹550/month (day scholar)",
      totalSeats: 120, filledSeats: 98, status: "Active", cgpaRequired: 0, maxIncome: 250000,
      categories: ["SC"],
      eligibility: "Must belong to SC category, AP domicile, family income ≤ ₹2.5 Lakhs, passed previous qualifying exam",
      startDate: "2024-07-01", endDate: "2025-04-30", portal: "scholarships.gov.in"
    },
    {
      id: "s4", collegeId, title: "AP Post-Matric Scholarship for ST Students",
      description: "Tribal welfare scholarship for Scheduled Tribe students in AP, covering tuition fees and maintenance for engineering education",
      type: "Government", amount: 90000, amountDescription: "Full tuition + ₹1,200/month maintenance (hosteler)",
      totalSeats: 60, filledSeats: 42, status: "Active", cgpaRequired: 0, maxIncome: 250000,
      categories: ["ST"],
      eligibility: "Must belong to ST category, AP domicile, family income ≤ ₹2.5 Lakhs",
      startDate: "2024-07-01", endDate: "2025-04-30", portal: "scholarships.gov.in"
    },
    {
      id: "s5", collegeId, title: "AP Post-Matric Scholarship for BC/EBC Students",
      description: "Backward Classes welfare scholarship providing fee reimbursement for BC and EBC category engineering students in Andhra Pradesh",
      type: "Government", amount: 65000, amountDescription: "Tuition fee reimbursement + maintenance allowance",
      totalSeats: 200, filledSeats: 156, status: "Active", cgpaRequired: 0, maxIncome: 200000,
      categories: ["BC-A", "BC-B", "BC-C", "BC-D", "BC-E", "EBC"],
      eligibility: "BC/EBC category, AP domicile, family income ≤ ₹2.0 Lakhs",
      startDate: "2024-07-01", endDate: "2025-04-30", portal: "jnanabhumi.ap.gov.in"
    },
    {
      id: "s6", collegeId, title: "AP Minority Welfare Scholarship",
      description: "Scholarship for minority community students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) pursuing engineering education in AP",
      type: "Government", amount: 55000, amountDescription: "Tuition fee + ₹10,000 maintenance allowance",
      totalSeats: 80, filledSeats: 52, status: "Active", cgpaRequired: 0, maxIncome: 200000,
      categories: ["Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi"],
      eligibility: "Minority community, AP domicile, family income ≤ ₹2.0 Lakhs",
      startDate: "2024-08-01", endDate: "2025-04-30", portal: "jnanabhumi.ap.gov.in"
    },
    {
      id: "s7", collegeId, title: "AP Differently Abled Welfare Scholarship",
      description: "Financial support for differently abled students pursuing engineering education, covering tuition and special assistance",
      type: "Government", amount: 50000, amountDescription: "Full tuition + reader/escort allowance",
      totalSeats: 20, filledSeats: 8, status: "Active", cgpaRequired: 0, maxIncome: 250000,
      categories: ["Differently Abled (40%+ disability)"],
      eligibility: "40% or more disability, valid UDID card, AP domicile",
      startDate: "2024-07-01", endDate: "2025-04-30", portal: "scholarships.gov.in"
    },
  ];

  // College-specific institutional scholarships
  if (collegeId === "gmrit") {
    scholarships.push(
      {
        id: "s8", collegeId, title: "GMRIT Merit Scholarship (EAMCET Rank 1-5000)",
        description: "100% tuition fee waiver + free hostel accommodation for students securing EAMCET rank within top 5000. Must maintain 90% attendance & 8.0 CGPA",
        type: "Institutional", amount: 311000, amountDescription: "100% Tuition Fee (₹3.11L) + Free Hostel + Free Bus",
        totalSeats: 15, filledSeats: 8, status: "Active", cgpaRequired: 8.0, maxIncome: 0,
        categories: ["General", "OBC", "SC", "ST", "EBC"],
        eligibility: "AP EAMCET rank 1-5000, 90% attendance, 8.0 CGPA to continue",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: "gmrit.edu.in"
      },
      {
        id: "s9", collegeId, title: "GMRIT Merit Scholarship (EAMCET Rank 5001-10000)",
        description: "20% tuition fee concession + free hostel accommodation for EAMCET rank 5001-10000 students at GMRIT",
        type: "Institutional", amount: 80000, amountDescription: "20% Tuition Fee + Free Hostel + Free Bus",
        totalSeats: 25, filledSeats: 18, status: "Active", cgpaRequired: 8.0, maxIncome: 0,
        categories: ["General", "OBC", "SC", "ST", "EBC"],
        eligibility: "AP EAMCET rank 5001-10000, 90% attendance, 8.0 CGPA",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: "gmrit.edu.in"
      },
      {
        id: "s10", collegeId, title: "GMRIT Merit Scholarship (EAMCET Rank 10001-15000)",
        description: "10% tuition fee concession + 50% hostel fee waiver for students with EAMCET rank 10001-15000",
        type: "Institutional", amount: 45000, amountDescription: "10% Tuition Fee + 50% Hostel/Bus Free",
        totalSeats: 30, filledSeats: 22, status: "Active", cgpaRequired: 7.5, maxIncome: 0,
        categories: ["General", "OBC", "SC", "ST", "EBC"],
        eligibility: "AP EAMCET rank 10001-15000, 90% attendance, 7.5 CGPA",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: "gmrit.edu.in"
      },
      {
        id: "s11", collegeId, title: "GMRIT Chemical Engineering Scholarship",
        description: "₹30,000 scholarship for Chemical Engineering students with any EAMCET rank admitted to GMRIT",
        type: "Institutional", amount: 30000, amountDescription: "₹30,000/year flat scholarship",
        totalSeats: 60, filledSeats: 35, status: "Active", cgpaRequired: 7.0, maxIncome: 0,
        categories: ["Chemical Engineering students"],
        eligibility: "Admitted to Chemical Engg at GMRIT, any EAMCET rank, 90% attendance, 7.0 CGPA",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: "gmrit.edu.in"
      },
      {
        id: "s12", collegeId, title: "GMRIT Power Engineering Scholarship",
        description: "₹20,000 scholarship for Power Engineering students at GMRIT Rajam",
        type: "Institutional", amount: 20000, amountDescription: "₹20,000/year flat scholarship",
        totalSeats: 60, filledSeats: 28, status: "Active", cgpaRequired: 7.0, maxIncome: 0,
        categories: ["Power Engineering students"],
        eligibility: "Admitted to Power Engg at GMRIT, any EAMCET rank, 90% attendance, 7.0 CGPA",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: "gmrit.edu.in"
      },
      {
        id: "s13", collegeId, title: "GMR Varalakshmi Foundation Need-Based Aid",
        description: "Financial assistance from GMR Varalakshmi Foundation for economically disadvantaged students at GMRIT showing academic promise",
        type: "Need-based", amount: 50000, amountDescription: "Up to ₹50,000 based on need assessment",
        totalSeats: 20, filledSeats: 12, status: "Active", cgpaRequired: 6.5, maxIncome: 150000,
        categories: ["All categories"],
        eligibility: "Family income ≤ ₹1.5 Lakhs, good academic standing, GMRIT student",
        startDate: "2024-08-01", endDate: "2025-03-31", portal: "gmrit.edu.in"
      },
      {
        id: "s14", collegeId, title: "GMRIT Sports Excellence Award",
        description: "Award for students representing GMRIT/University/State/National level in sports competitions",
        type: "Sports", amount: 25000, amountDescription: "₹25,000 + certificate + fee concession",
        totalSeats: 10, filledSeats: 4, status: "Active", cgpaRequired: 6.0, maxIncome: 0,
        categories: ["All categories"],
        eligibility: "Must represent at university/state/national level sports, 6.0+ CGPA",
        startDate: "2024-07-01", endDate: "2025-04-30", portal: "gmrit.edu.in"
      }
    );
  } else if (collegeId === "vrs") {
    scholarships.push(
      {
        id: "s8", collegeId, title: "VRSEC Merit Scholarship - 100% Fee Waiver",
        description: "Full tuition waiver for top EAPCET/JEE rank holders - SEEE First 3 ranks or JEE ≥97% or APEAPCET Rank 1-500",
        type: "Institutional", amount: 250000, amountDescription: "100% of tuition fee (₹2,50,000 for CSE)",
        totalSeats: 10, filledSeats: 5, status: "Active", cgpaRequired: 8.5, maxIncome: 0,
        categories: ["All categories"],
        eligibility: "SEEE 1st 3 Ranks OR JEE ≥97% OR APEAPCET Rank 1-500",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: "siddhartha.edu.in"
      },
      {
        id: "s9", collegeId, title: "VRSEC 70% Fee Concession",
        description: "70% tuition fee concession for SEEE Rank 1-50 or JEE 95-97% or APEAPCET Rank 501-2000",
        type: "Institutional", amount: 175000, amountDescription: "70% of tuition fee",
        totalSeats: 20, filledSeats: 14, status: "Active", cgpaRequired: 8.0, maxIncome: 0,
        categories: ["All categories"],
        eligibility: "SEEE Rank 1-50 OR JEE ≥95% & <97% OR APEAPCET Rank 501-2000",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: "siddhartha.edu.in"
      }
    );
  } else if (collegeId === "klu") {
    scholarships.push(
      {
        id: "s8", collegeId, title: "KLU Academic Excellence Scholarship",
        description: "Merit-based fee concession for students with outstanding JEE/EAPCET/KLUEEE scores",
        type: "Institutional", amount: 200000, amountDescription: "Up to 100% tuition fee waiver",
        totalSeats: 50, filledSeats: 35, status: "Active", cgpaRequired: 8.5, maxIncome: 0,
        categories: ["All categories"],
        eligibility: "Top ranks in KLUEEE/JEE Main/EAPCET, maintain 8.5+ CGPA",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: "kluniversity.in"
      }
    );
  } else {
    // Generic institutional scholarship for other colleges
    scholarships.push(
      {
        id: "s8", collegeId, title: `${shortName} Merit Scholarship`,
        description: `Institutional merit scholarship for top-performing students at ${college?.name}`,
        type: "Institutional", amount: 50000, amountDescription: "Up to ₹50,000 based on EAMCET/EAPCET rank",
        totalSeats: 30, filledSeats: 18, status: "Active", cgpaRequired: 8.0, maxIncome: 0,
        categories: ["All categories"],
        eligibility: "Top EAPCET ranks, maintain 8.0+ CGPA, 90% attendance",
        startDate: "2024-06-01", endDate: "2025-05-31", portal: college?.website || ""
      },
      {
        id: "s9", collegeId, title: `${shortName} Sports & Cultural Award`,
        description: `Recognition award for students excelling in sports/cultural activities at ${college?.name}`,
        type: "Sports", amount: 20000, amountDescription: "₹20,000 + certificate",
        totalSeats: 10, filledSeats: 5, status: "Active", cgpaRequired: 6.0, maxIncome: 0,
        categories: ["All categories"],
        eligibility: "University/state/national level representation",
        startDate: "2024-07-01", endDate: "2025-04-30", portal: college?.website || ""
      }
    );
  }

  return scholarships;
};

export const getApplications = (collegeId: string): Application[] => {
  const college = colleges.find(c => c.id === collegeId);
  const dept = college?.departments || ["CSE", "ECE", "EEE", "MECH"];

  return [
    { id: "a1", collegeId, scholarshipId: "s1", scholarshipTitle: "Jagananna Vidya Deevena", studentName: "Durga Prasad", rollNumber: `20341A0301`, department: dept[0], year: 4, cgpa: 9.5, familyIncome: 180000, aiScore: 96, status: "Approved", appliedDate: "2024-09-15" },
    { id: "a2", collegeId, scholarshipId: "s3", scholarshipTitle: "AP Post-Matric Scholarship (SC)", studentName: "Lakshmi Narayana", rollNumber: `21341A0201`, department: dept[1] || "ECE", year: 3, cgpa: 7.8, familyIncome: 120000, aiScore: 78.5, status: "Approved", appliedDate: "2024-08-20" },
    { id: "a3", collegeId, scholarshipId: "s5", scholarshipTitle: "AP BC/EBC Fee Reimbursement", studentName: "Anusha Devi", rollNumber: `21341A0502`, department: dept[0], year: 3, cgpa: 8.1, familyIncome: 95000, aiScore: 81.2, status: "Pending", appliedDate: "2024-09-01" },
    { id: "a4", collegeId, scholarshipId: "s2", scholarshipTitle: "Jagananna Vasathi Deevena", studentName: "Ravi Teja", rollNumber: `22341A0101`, department: dept[3] || "MECH", year: 2, cgpa: 7.5, familyIncome: 90000, aiScore: 75, status: "Approved", appliedDate: "2024-09-10" },
    { id: "a5", collegeId, scholarshipId: "s8", scholarshipTitle: collegeId === "gmrit" ? "GMRIT Merit Scholarship (EAMCET 1-5000)" : "Institutional Merit Scholarship", studentName: "Priya Sharma", rollNumber: `20341A0405`, department: dept[1] || "ECE", year: 4, cgpa: 9.2, familyIncome: 350000, aiScore: 92, status: "Approved", appliedDate: "2024-09-05" },
    { id: "a6", collegeId, scholarshipId: "s6", scholarshipTitle: "AP Minority Welfare Scholarship", studentName: "Mohammed Irfan", rollNumber: `22341A0503`, department: dept[0], year: 2, cgpa: 8.8, familyIncome: 60000, aiScore: 91, status: "Pending", appliedDate: "2024-08-25" },
    { id: "a7", collegeId, scholarshipId: "s1", scholarshipTitle: "Jagananna Vidya Deevena", studentName: "Sai Krishna", rollNumber: `21341A0301`, department: dept[2] || "EEE", year: 3, cgpa: 8.4, familyIncome: 140000, aiScore: 85, status: "Pending", appliedDate: "2024-09-12" },
    { id: "a8", collegeId, scholarshipId: "s4", scholarshipTitle: "AP Post-Matric Scholarship (ST)", studentName: "Adilakshmi Valmiki", rollNumber: `22341A0210`, department: dept[1] || "ECE", year: 2, cgpa: 7.2, familyIncome: 80000, aiScore: 72, status: "Approved", appliedDate: "2024-08-18" },
    { id: "a9", collegeId, scholarshipId: "s2", scholarshipTitle: "Jagananna Vasathi Deevena", studentName: "Karthik Reddy", rollNumber: `23341A0108`, department: dept[0], year: 1, cgpa: 8.6, familyIncome: 110000, aiScore: 88, status: "Pending", appliedDate: "2024-10-01" },
  ];
};

export const getAuditLogs = (collegeId: string): AuditLog[] => [
  { id: "l1", collegeId, action: "Login", user: "Admin", details: "Admin logged in successfully", timestamp: new Date(Date.now() - 3600000).toISOString(), ip: "192.168.1.100" },
  { id: "l2", collegeId, action: "Create", user: "Admin", details: "Created scholarship: Jagananna Vidya Deevena batch 2024-25", timestamp: new Date(Date.now() - 86400000).toISOString(), ip: "192.168.1.100" },
  { id: "l3", collegeId, action: "Update", user: "Admin", details: "Approved application for Durga Prasad - Vidya Deevena", timestamp: new Date(Date.now() - 172800000).toISOString(), ip: "192.168.1.101" },
  { id: "l4", collegeId, action: "Update", user: "Admin", details: "Updated AP Post-Matric SC scholarship seats from 100 to 120", timestamp: new Date(Date.now() - 259200000).toISOString(), ip: "192.168.1.100" },
  { id: "l5", collegeId, action: "Create", user: "Admin", details: "Added 9 new student applications for Vasathi Deevena", timestamp: new Date(Date.now() - 345600000).toISOString(), ip: "192.168.1.102" },
  { id: "l6", collegeId, action: "Delete", user: "Admin", details: "Removed expired 2023-24 scholarship cycle entries", timestamp: new Date(Date.now() - 604800000).toISOString(), ip: "192.168.1.100" },
  { id: "l7", collegeId, action: "Login", user: "Admin", details: "Admin session refreshed", timestamp: new Date(Date.now() - 864000000).toISOString(), ip: "192.168.1.105" },
];
