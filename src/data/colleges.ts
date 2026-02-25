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

export interface InternalProgram {
  id: string;
  collegeId: string;
  title: string;
  description: string;
  category: "merit" | "need" | "talent" | "exposure" | "foundation";
  eligibility: string;
  benefit: string;
  status: "Active" | "Upcoming" | "Closed";
  icon: string;
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

// Government Scholarships (common to all AP colleges)
export const getGovtScholarships = (collegeId: string): Scholarship[] => [
  {
    id: "g1", collegeId, title: "Jagananna Vidya Deevena (Post-Matric Fee Reimbursement)",
    description: "AP Government flagship scheme providing full tuition fee reimbursement to eligible SC, ST, BC, EBC, Kapu, Minority & Differently Abled students through Jnanabhumi portal",
    type: "Government", amount: 35000, amountDescription: "Full tuition fee reimbursement (up to ₹35,000/year for engineering)",
    totalSeats: 500, filledSeats: 385, status: "Active", cgpaRequired: 0, maxIncome: 250000,
    categories: ["SC", "ST", "BC", "EBC", "Kapu", "Minority", "Differently Abled"],
    eligibility: "Must be AP domicile, passed 10th class, 75% attendance, family annual income ≤ ₹2.5 Lakhs, no income tax payer in family",
    startDate: "2024-08-01", endDate: "2025-03-31", portal: "jnanabhumi.ap.gov.in"
  },
  {
    id: "g2", collegeId, title: "Jagananna Vasathi Deevena (Hostel/Mess Allowance)",
    description: "AP Government hostel and maintenance allowance for students - ₹20,000/year for degree & engineering students covering hostel, mess and other living expenses",
    type: "Government", amount: 20000, amountDescription: "₹20,000/year for engineering students (₹10,000 per semester)",
    totalSeats: 400, filledSeats: 312, status: "Active", cgpaRequired: 0, maxIncome: 250000,
    categories: ["SC", "ST", "BC", "EBC", "Kapu", "Minority"],
    eligibility: "AP domicile, studying in recognized college, family income ≤ ₹2.5 Lakhs, valid Aadhaar & bank account",
    startDate: "2024-08-01", endDate: "2025-03-31", portal: "jnanabhumi.ap.gov.in"
  },
  {
    id: "g3", collegeId, title: "AP Post-Matric Scholarship for SC Students",
    description: "Central Government scholarship for Scheduled Caste students pursuing post-matric education including engineering, providing maintenance allowance and fee coverage",
    type: "Government", amount: 85000, amountDescription: "Tuition fee + ₹1,200/month maintenance (hosteler) or ₹550/month (day scholar)",
    totalSeats: 120, filledSeats: 98, status: "Active", cgpaRequired: 0, maxIncome: 250000,
    categories: ["SC"],
    eligibility: "Must belong to SC category, AP domicile, family income ≤ ₹2.5 Lakhs, passed previous qualifying exam",
    startDate: "2024-07-01", endDate: "2025-04-30", portal: "scholarships.gov.in"
  },
  {
    id: "g4", collegeId, title: "AP Post-Matric Scholarship for ST Students",
    description: "Tribal welfare scholarship for Scheduled Tribe students in AP, covering tuition fees and maintenance for engineering education",
    type: "Government", amount: 90000, amountDescription: "Full tuition + ₹1,200/month maintenance (hosteler)",
    totalSeats: 60, filledSeats: 42, status: "Active", cgpaRequired: 0, maxIncome: 250000,
    categories: ["ST"],
    eligibility: "Must belong to ST category, AP domicile, family income ≤ ₹2.5 Lakhs",
    startDate: "2024-07-01", endDate: "2025-04-30", portal: "scholarships.gov.in"
  },
  {
    id: "g5", collegeId, title: "AP Post-Matric Scholarship for BC/EBC Students",
    description: "Backward Classes welfare scholarship providing fee reimbursement for BC and EBC category engineering students in Andhra Pradesh",
    type: "Government", amount: 65000, amountDescription: "Tuition fee reimbursement + maintenance allowance",
    totalSeats: 200, filledSeats: 156, status: "Active", cgpaRequired: 0, maxIncome: 200000,
    categories: ["BC-A", "BC-B", "BC-C", "BC-D", "BC-E", "EBC"],
    eligibility: "BC/EBC category, AP domicile, family income ≤ ₹2.0 Lakhs",
    startDate: "2024-07-01", endDate: "2025-04-30", portal: "jnanabhumi.ap.gov.in"
  },
  {
    id: "g6", collegeId, title: "AP Minority Welfare Scholarship",
    description: "Scholarship for minority community students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) pursuing engineering education in AP",
    type: "Government", amount: 55000, amountDescription: "Tuition fee + ₹10,000 maintenance allowance",
    totalSeats: 80, filledSeats: 52, status: "Active", cgpaRequired: 0, maxIncome: 200000,
    categories: ["Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi"],
    eligibility: "Minority community, AP domicile, family income ≤ ₹2.0 Lakhs",
    startDate: "2024-08-01", endDate: "2025-04-30", portal: "jnanabhumi.ap.gov.in"
  },
  {
    id: "g7", collegeId, title: "AP Differently Abled Welfare Scholarship",
    description: "Financial support for differently abled students pursuing engineering education, covering tuition and special assistance",
    type: "Government", amount: 50000, amountDescription: "Full tuition + reader/escort allowance",
    totalSeats: 20, filledSeats: 8, status: "Active", cgpaRequired: 0, maxIncome: 250000,
    categories: ["Differently Abled (40%+ disability)"],
    eligibility: "40% or more disability, valid UDID card, AP domicile",
    startDate: "2024-07-01", endDate: "2025-04-30", portal: "scholarships.gov.in"
  },
];

// Internal & Current Programs for each college
export const getInternalPrograms = (collegeId: string): InternalProgram[] => {
  const programs: Record<string, InternalProgram[]> = {
    gmrit: [
      { id: "ip1", collegeId: "gmrit", title: "Merit Scholarship (CGPA + Attendance)", description: "For students maintaining CGPA ≈ 9.0+ and ~90% attendance throughout the semester", category: "merit", eligibility: "CGPA ≥ 9.0, Attendance ≥ 90%", benefit: "₹25,000/year + Certificate of Excellence", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "gmrit", title: "EAPCET Rank-Based Institutional Scholarship", description: "Based on AP EAPCET entrance rank at the time of admission — 100% fee waiver for rank ≤5000, 20% for 5001-10000, 10% for 10001-15000", category: "merit", eligibility: "AP EAPCET rank based tiers, 90% attendance, maintain CGPA ≥ 7.5+", benefit: "10%-100% tuition fee waiver + hostel/bus concessions", status: "Active", icon: "🎓" },
      { id: "ip3", collegeId: "gmrit", title: "Need-Based Financial Aid", description: "Financial assistance for economically disadvantaged students showing academic promise, assessed by the college committee", category: "need", eligibility: "Family income ≤ ₹1.5 Lakhs, good academic standing", benefit: "Up to ₹50,000 based on need assessment", status: "Active", icon: "💰" },
      { id: "ip4", collegeId: "gmrit", title: "Jagananna Vidya Deevena (College Facilitated)", description: "College facilitates AP Government tuition fee reimbursement through Jnanabhumi portal for eligible students", category: "need", eligibility: "SC/ST/BC/EBC/Kapu/Minority, AP domicile, income ≤ ₹2.5L", benefit: "Full tuition fee reimbursement", status: "Active", icon: "🏛️" },
      { id: "ip5", collegeId: "gmrit", title: "Jagananna Vasathi Deevena (College Facilitated)", description: "College assists in hostel/mess allowance claims under AP Government scheme", category: "need", eligibility: "SC/ST/BC/EBC/Kapu/Minority, AP domicile, income ≤ ₹2.5L", benefit: "₹20,000/year hostel/mess support", status: "Active", icon: "🏠" },
      { id: "ip6", collegeId: "gmrit", title: "Post-Matric Scholarships (SC/ST/BC/EWS)", description: "Category-based government aid facilitated through college scholarship cell", category: "need", eligibility: "Respective category certificate, income criteria as per govt norms", benefit: "Tuition + maintenance allowance", status: "Active", icon: "📋" },
      { id: "ip7", collegeId: "gmrit", title: "Sports Scholarship", description: "For students representing GMRIT/University/State/National level in recognized sports competitions", category: "talent", eligibility: "State/national level sports representation, CGPA ≥ 6.0", benefit: "₹25,000 + certificate + fee concession", status: "Active", icon: "🏅" },
      { id: "ip8", collegeId: "gmrit", title: "Special Achievement Awards (Tech/Cultural)", description: "Awards for outstanding performance in hackathons, coding competitions, technical paper presentations, cultural fests, and inter-college competitions", category: "talent", eligibility: "Winners/top performers in recognized competitions", benefit: "₹10,000-₹25,000 + recognition certificate", status: "Active", icon: "⭐" },
      { id: "ip9", collegeId: "gmrit", title: "International Exposure / Exchange (MoU Based)", description: "Limited foreign university visits, research projects, and semester exchange programs through GMRIT's MoU partnerships with international institutions", category: "exposure", eligibility: "Top 5% students, faculty recommendation, CGPA ≥ 8.5", benefit: "Partial travel funding + university collaboration", status: "Active", icon: "🌍" },
      { id: "ip10", collegeId: "gmrit", title: "Premium Industry Internships via T&P Cell", description: "High-performing students recommended by Training & Placement Cell to premium companies for paid internships during pre-final year", category: "exposure", eligibility: "CGPA ≥ 8.0, cleared aptitude tests, T&P Cell recommendation", benefit: "Paid internships at top MNCs + PPO opportunities", status: "Active", icon: "💼" },
      { id: "ip11", collegeId: "gmrit", title: "GMR Varalakshmi Foundation Assistance", description: "Zero-interest education loan support and emergency financial aid from GMR Varalakshmi Foundation for deserving students facing financial hardship", category: "foundation", eligibility: "Demonstrated financial hardship, good academic record", benefit: "Zero-interest education loan + emergency support", status: "Active", icon: "🧠" },
      { id: "ip12", collegeId: "gmrit", title: "Chemical/Power Engineering Special Scholarship", description: "Flat scholarship for students admitted to Chemical Engineering (₹30,000) and Power Engineering (₹20,000) branches at GMRIT", category: "merit", eligibility: "Admitted to Chemical/Power Engg, any EAMCET rank, 90% attendance, CGPA ≥ 7.0", benefit: "₹20,000-₹30,000/year flat scholarship", status: "Active", icon: "⚡" },
    ],
    vignan: [
      { id: "ip1", collegeId: "vignan", title: "Vignan Merit Scholarship (EAPCET Based)", description: "Tuition fee concession based on AP EAPCET rank tiers at admission", category: "merit", eligibility: "Top EAPCET ranks, maintain CGPA ≥ 8.0", benefit: "25%-100% tuition fee waiver", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "vignan", title: "Academic Excellence Award", description: "Semester-wise awards for branch toppers and university rank holders", category: "merit", eligibility: "Branch topper each semester, CGPA ≥ 9.0", benefit: "₹15,000 + gold medal at convocation", status: "Active", icon: "🎓" },
      { id: "ip3", collegeId: "vignan", title: "Vignan Need-Based Financial Aid", description: "Support for students from economically weaker backgrounds", category: "need", eligibility: "Family income ≤ ₹2.0 Lakhs, academic standing maintained", benefit: "Up to ₹40,000 fee concession", status: "Active", icon: "💰" },
      { id: "ip4", collegeId: "vignan", title: "Sports & Games Scholarship", description: "For students excelling in inter-university/state/national level sports", category: "talent", eligibility: "University/state level sports achievement", benefit: "₹20,000 + sports kit + hostel concession", status: "Active", icon: "🏅" },
      { id: "ip5", collegeId: "vignan", title: "Vignan Hackathon Winners Award", description: "Cash prizes and recognition for students winning hackathons and coding competitions", category: "talent", eligibility: "Winners of recognized hackathons/coding contests", benefit: "₹10,000-₹50,000 based on competition level", status: "Active", icon: "💻" },
      { id: "ip6", collegeId: "vignan", title: "Industry Connect Internship Program", description: "Premium internship placements through Vignan's industry partnerships", category: "exposure", eligibility: "CGPA ≥ 7.5, cleared placement training", benefit: "Paid internships + placement support", status: "Active", icon: "💼" },
      { id: "ip7", collegeId: "vignan", title: "Lendi Foundation Support", description: "Financial aid from Vignan's parent foundation for emergency situations", category: "foundation", eligibility: "Emergency financial need, good conduct", benefit: "Emergency grants up to ₹30,000", status: "Active", icon: "🧠" },
    ],
    srkr: [
      { id: "ip1", collegeId: "srkr", title: "SRKR Founders Merit Scholarship", description: "Prestigious scholarship for top performers honoring the college's founding principles of academic excellence", category: "merit", eligibility: "University rank holders, CGPA ≥ 9.0", benefit: "₹30,000 + gold medal", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "srkr", title: "EAPCET Rank-Based Fee Concession", description: "Admission-time fee waiver based on EAPCET entrance rank", category: "merit", eligibility: "Top EAPCET ranks, maintain CGPA ≥ 7.5", benefit: "15%-50% tuition fee waiver", status: "Active", icon: "🎓" },
      { id: "ip3", collegeId: "srkr", title: "SC/ST/BC Student Support Scheme", description: "Additional institutional support for reserved category students beyond government scholarships", category: "need", eligibility: "SC/ST/BC category, family income ≤ ₹2.5 Lakhs", benefit: "₹10,000 book allowance + lab fee waiver", status: "Active", icon: "💰" },
      { id: "ip4", collegeId: "srkr", title: "SRKR Sports Excellence Program", description: "Recognition and support for student athletes at SRKR", category: "talent", eligibility: "District/state level sports participation", benefit: "₹15,000 + sports facility access", status: "Active", icon: "🏅" },
      { id: "ip5", collegeId: "srkr", title: "Technical Paper Presentation Awards", description: "Awards for students presenting papers at national conferences", category: "talent", eligibility: "Paper accepted at recognized conferences", benefit: "₹5,000-₹15,000 + travel support", status: "Active", icon: "📝" },
      { id: "ip6", collegeId: "srkr", title: "SRKR Alumni Mentorship & Internship", description: "Strong alumni network connects current students with industry mentors and internship opportunities", category: "exposure", eligibility: "Pre-final year students, CGPA ≥ 7.0", benefit: "Industry mentorship + internship placement", status: "Active", icon: "💼" },
    ],
    mvgr: [
      { id: "ip1", collegeId: "mvgr", title: "MVGR Chairman's Merit Scholarship", description: "Awarded to the top-performing students across all branches each academic year", category: "merit", eligibility: "Top 3 in each branch, CGPA ≥ 9.0", benefit: "₹25,000 + Chairman's Trophy", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "mvgr", title: "Entrance Rank-Based Scholarship", description: "Fee concession based on EAPCET rank at admission to MVGR", category: "merit", eligibility: "EAPCET rank-based tiers, maintain attendance ≥ 85%", benefit: "10%-50% tuition fee concession", status: "Active", icon: "🎓" },
      { id: "ip3", collegeId: "mvgr", title: "MVGR Economically Weaker Section Aid", description: "Financial support for students from low-income families", category: "need", eligibility: "Family income ≤ ₹1.5 Lakhs, academic progress maintained", benefit: "Up to ₹35,000 annual support", status: "Active", icon: "💰" },
      { id: "ip4", collegeId: "mvgr", title: "Cultural Fest Achievement Award", description: "Recognition for students excelling in MVGR's annual cultural and technical festivals", category: "talent", eligibility: "Winners in inter-college cultural/tech events", benefit: "₹5,000-₹20,000 cash prize", status: "Active", icon: "🎭" },
      { id: "ip5", collegeId: "mvgr", title: "MVGR Innovation & Startup Support", description: "Seed funding and mentorship for student entrepreneurs and innovators", category: "exposure", eligibility: "Viable project proposal, faculty recommendation", benefit: "Up to ₹50,000 seed fund + incubation support", status: "Active", icon: "🚀" },
      { id: "ip6", collegeId: "mvgr", title: "MVGR Sports Talent Recognition", description: "Support for athletes representing college at university/state level", category: "talent", eligibility: "University/state level sports representation", benefit: "₹15,000 + fee concession", status: "Active", icon: "🏅" },
    ],
    vrs: [
      { id: "ip1", collegeId: "vrs", title: "VRSEC 100% Fee Waiver (SEEE/JEE/EAPCET)", description: "Full tuition waiver for top EAPCET/JEE/SEEE rank holders", category: "merit", eligibility: "SEEE 1st 3 Ranks OR JEE ≥97% OR APEAPCET Rank 1-500", benefit: "100% tuition fee waiver (₹2,50,000 for CSE)", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "vrs", title: "VRSEC 70% Fee Concession", description: "Major fee concession for high-ranking entrance exam students", category: "merit", eligibility: "SEEE Rank 1-50 OR JEE ≥95% OR APEAPCET Rank 501-2000", benefit: "70% of tuition fee waiver", status: "Active", icon: "🎓" },
      { id: "ip3", collegeId: "vrs", title: "Siddhartha Academy Need-Based Aid", description: "Financial assistance through Siddhartha Academy trust for deserving students", category: "need", eligibility: "Demonstrated financial need, good academic record", benefit: "Up to ₹40,000 annual assistance", status: "Active", icon: "💰" },
      { id: "ip4", collegeId: "vrs", title: "VRSEC Research Fellowship", description: "Support for students pursuing research projects and publishing papers", category: "exposure", eligibility: "Active research involvement, faculty-supervised project", benefit: "₹15,000 research grant + conference travel", status: "Active", icon: "🔬" },
      { id: "ip5", collegeId: "vrs", title: "VRSEC Sports & Cultural Award", description: "Annual awards for sports and cultural achievements", category: "talent", eligibility: "State/national level representation", benefit: "₹20,000 + trophy + fee concession", status: "Active", icon: "🏅" },
      { id: "ip6", collegeId: "vrs", title: "Industry Partnership Internships", description: "Premium internship opportunities through VRSEC's industry MoUs", category: "exposure", eligibility: "CGPA ≥ 7.5, pre-final year students", benefit: "Paid internships + placement priority", status: "Active", icon: "💼" },
    ],
    auce: [
      { id: "ip1", collegeId: "auce", title: "AU University Merit Scholarship", description: "Prestigious scholarship for top rankers of Andhra University examination", category: "merit", eligibility: "University rank holders in annual exams", benefit: "₹50,000 + Gold Medal at convocation", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "auce", title: "AUCE Endowment Scholarships", description: "Multiple endowment-funded scholarships from alumni and donors", category: "merit", eligibility: "CGPA ≥ 8.5, varies by endowment", benefit: "₹10,000-₹30,000 per year", status: "Active", icon: "🎓" },
      { id: "ip3", collegeId: "auce", title: "AU Free Ship & Half Free Ship", description: "Government-funded free and half-free studentship at Andhra University", category: "need", eligibility: "SC/ST/BC students, family income criteria", benefit: "Full or 50% tuition fee waiver", status: "Active", icon: "💰" },
      { id: "ip4", collegeId: "auce", title: "AU Research Assistantship", description: "Assistantship for students involved in departmental research projects", category: "exposure", eligibility: "M.Tech/Ph.D students, faculty recommendation", benefit: "₹8,000-₹25,000/month stipend", status: "Active", icon: "🔬" },
      { id: "ip5", collegeId: "auce", title: "AU Sports Quota Benefits", description: "Special admission and fee benefits for sports achievers", category: "talent", eligibility: "State/national level sports certificates", benefit: "Admission + ₹20,000 + sports facilities", status: "Active", icon: "🏅" },
    ],
    jntuk: [
      { id: "ip1", collegeId: "jntuk", title: "JNTUK University Merit Scholarship", description: "For top university rank holders across all affiliated colleges", category: "merit", eligibility: "University examination toppers", benefit: "₹40,000 + medal at convocation", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "jntuk", title: "JNTUK Gate Score-Based Fellowship", description: "Fellowship for students with valid GATE scores admitted to M.Tech", category: "merit", eligibility: "Valid GATE score, M.Tech admission", benefit: "₹12,400/month GATE fellowship", status: "Active", icon: "🎓" },
      { id: "ip3", collegeId: "jntuk", title: "JNTUK EWS Student Support", description: "Support scheme for economically weaker section students", category: "need", eligibility: "EWS certificate, family income ≤ ₹1.5 Lakhs", benefit: "₹20,000 annual support + book bank", status: "Active", icon: "💰" },
      { id: "ip4", collegeId: "jntuk", title: "JNTUK Innovation Lab Access", description: "Access to advanced labs and innovation centers for promising students", category: "exposure", eligibility: "Project proposal approved by HoD", benefit: "Free lab access + ₹10,000 project fund", status: "Active", icon: "💡" },
      { id: "ip5", collegeId: "jntuk", title: "JNTUK Inter-University Sports Award", description: "Recognition for students representing JNTUK in inter-university sports", category: "talent", eligibility: "Inter-university/national level sports", benefit: "₹15,000 + tracksuit + fee concession", status: "Active", icon: "🏅" },
    ],
    rgukt: [
      { id: "ip1", collegeId: "rgukt", title: "RGUKT Full Scholarship (All Students)", description: "RGUKT provides free education including tuition, hostel, and mess to all admitted students — fully government funded", category: "merit", eligibility: "SSC top 2000 rank holders in AP (RGUKT admission criteria)", benefit: "100% free education + hostel + mess", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "rgukt", title: "RGUKT Innovation & Research Grant", description: "Funding for student-led innovation and research projects at IIIT Nuzvid", category: "exposure", eligibility: "Faculty-approved research/innovation proposal", benefit: "Up to ₹25,000 project grant", status: "Active", icon: "🔬" },
      { id: "ip3", collegeId: "rgukt", title: "RGUKT Best Project Award", description: "Annual award for the best B.Tech final year project", category: "talent", eligibility: "Final year B.Tech students, project evaluation", benefit: "₹10,000 + certificate + industry exposure", status: "Active", icon: "⭐" },
      { id: "ip4", collegeId: "rgukt", title: "RGUKT Sports & Cultural Programs", description: "Funded sports and cultural activities including inter-IIIT competitions", category: "talent", eligibility: "All RGUKT students eligible", benefit: "Sports equipment + travel for competitions", status: "Active", icon: "🏅" },
    ],
    klu: [
      { id: "ip1", collegeId: "klu", title: "KLU Academic Excellence Scholarship", description: "Merit-based fee concession for students with outstanding JEE/EAPCET/KLUEEE scores", category: "merit", eligibility: "Top ranks in KLUEEE/JEE Main/EAPCET, maintain 8.5+ CGPA", benefit: "Up to 100% tuition fee waiver", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "klu", title: "KLU Research Publication Grant", description: "Financial support for students publishing research in SCI/Scopus journals", category: "exposure", eligibility: "Paper accepted in SCI/Scopus indexed journal", benefit: "₹10,000-₹25,000 per publication", status: "Active", icon: "📝" },
      { id: "ip3", collegeId: "klu", title: "KLU Startup Incubation Support", description: "Seed funding and incubation for student startups through KL University's TBI", category: "exposure", eligibility: "Viable business plan, team of 2-4 students", benefit: "Up to ₹2,00,000 seed fund + mentorship", status: "Active", icon: "🚀" },
      { id: "ip4", collegeId: "klu", title: "KLU International Exchange Program", description: "Semester exchange and short-term programs with partner universities abroad", category: "exposure", eligibility: "CGPA ≥ 8.5, IELTS/TOEFL score, faculty recommendation", benefit: "Partial travel funding + partner university fee waiver", status: "Active", icon: "🌍" },
      { id: "ip5", collegeId: "klu", title: "KLU Sports Scholarship", description: "Special scholarship for national/international level sports achievers", category: "talent", eligibility: "National/international level sports representation", benefit: "Up to 50% fee waiver + ₹25,000", status: "Active", icon: "🏅" },
      { id: "ip6", collegeId: "klu", title: "KLU Need-Based Financial Support", description: "Financial aid for students from economically weaker backgrounds", category: "need", eligibility: "Family income ≤ ₹2.0 Lakhs, good academic standing", benefit: "Up to ₹50,000 annual support", status: "Active", icon: "💰" },
    ],
    gvp: [
      { id: "ip1", collegeId: "gvp", title: "GVP Chairman's Gold Medal Scholarship", description: "Prestigious award for university rank holders from GVPCE", category: "merit", eligibility: "University rank holders, CGPA ≥ 9.0", benefit: "₹25,000 + Gold Medal", status: "Active", icon: "🏆" },
      { id: "ip2", collegeId: "gvp", title: "GVP Entrance Rank Fee Concession", description: "Admission-time fee waiver based on EAPCET rank", category: "merit", eligibility: "Top EAPCET ranks, maintain CGPA ≥ 7.5", benefit: "10%-40% tuition fee concession", status: "Active", icon: "🎓" },
      { id: "ip3", collegeId: "gvp", title: "Gayatri Vidya Parishad Trust Aid", description: "Financial support from GVP Trust for economically weak students", category: "need", eligibility: "Family income ≤ ₹1.5 Lakhs, consistent attendance", benefit: "Up to ₹30,000 annual aid", status: "Active", icon: "💰" },
      { id: "ip4", collegeId: "gvp", title: "GVP Technical Fest Awards", description: "Prizes for winners of GVP's annual technical festival events", category: "talent", eligibility: "Participants in recognized tech competitions", benefit: "₹5,000-₹25,000 cash prizes", status: "Active", icon: "💻" },
      { id: "ip5", collegeId: "gvp", title: "GVP Industry Internship Placement", description: "Premium industry internships through GVP's corporate partnerships in Visakhapatnam", category: "exposure", eligibility: "CGPA ≥ 7.5, pre-final year students", benefit: "Paid internships + placement support", status: "Active", icon: "💼" },
      { id: "ip6", collegeId: "gvp", title: "GVP Sports Achievement Award", description: "Annual recognition for sports excellence at district/state level", category: "talent", eligibility: "District/state level sports representation", benefit: "₹10,000 + sports kit", status: "Active", icon: "🏅" },
    ],
  };

  return programs[collegeId] || [
    { id: "ip1", collegeId, title: "Institutional Merit Scholarship", description: "Merit-based scholarship for top-performing students", category: "merit", eligibility: "CGPA ≥ 8.5, 85% attendance", benefit: "Up to ₹25,000/year", status: "Active", icon: "🏆" },
    { id: "ip2", collegeId, title: "Need-Based Financial Aid", description: "Support for economically disadvantaged students", category: "need", eligibility: "Family income ≤ ₹2.0 Lakhs", benefit: "Up to ₹30,000", status: "Active", icon: "💰" },
    { id: "ip3", collegeId, title: "Sports & Cultural Award", description: "Recognition for sports and cultural achievements", category: "talent", eligibility: "State/national level representation", benefit: "₹15,000 + certificate", status: "Active", icon: "🏅" },
  ];
};

// Combined scholarships (for backward compatibility)
export const getScholarships = (collegeId: string): Scholarship[] => {
  return getGovtScholarships(collegeId);
};

export const getApplications = (collegeId: string): Application[] => {
  const college = colleges.find(c => c.id === collegeId);
  const dept = college?.departments || ["CSE", "ECE", "EEE", "MECH"];

  return [
    { id: "a1", collegeId, scholarshipId: "g1", scholarshipTitle: "Jagananna Vidya Deevena", studentName: "Durga Prasad", rollNumber: "20341A0301", department: dept[0], year: 4, cgpa: 9.5, familyIncome: 180000, aiScore: 96, status: "Approved", appliedDate: "2024-09-15" },
    { id: "a2", collegeId, scholarshipId: "g3", scholarshipTitle: "AP Post-Matric Scholarship (SC)", studentName: "Lakshmi Narayana", rollNumber: "21341A0201", department: dept[1] || "ECE", year: 3, cgpa: 7.8, familyIncome: 120000, aiScore: 78.5, status: "Approved", appliedDate: "2024-08-20" },
    { id: "a3", collegeId, scholarshipId: "g5", scholarshipTitle: "AP BC/EBC Fee Reimbursement", studentName: "Anusha Devi", rollNumber: "21341A0502", department: dept[0], year: 3, cgpa: 8.1, familyIncome: 95000, aiScore: 81.2, status: "Pending", appliedDate: "2024-09-01" },
    { id: "a4", collegeId, scholarshipId: "g2", scholarshipTitle: "Jagananna Vasathi Deevena", studentName: "Ravi Teja", rollNumber: "22341A0101", department: dept[3] || "MECH", year: 2, cgpa: 7.5, familyIncome: 90000, aiScore: 75, status: "Approved", appliedDate: "2024-09-10" },
    { id: "a5", collegeId, scholarshipId: "ip2", scholarshipTitle: "Institutional Merit Scholarship", studentName: "Priya Sharma", rollNumber: "20341A0405", department: dept[1] || "ECE", year: 4, cgpa: 9.2, familyIncome: 350000, aiScore: 92, status: "Approved", appliedDate: "2024-09-05" },
    { id: "a6", collegeId, scholarshipId: "g6", scholarshipTitle: "AP Minority Welfare Scholarship", studentName: "Mohammed Irfan", rollNumber: "22341A0503", department: dept[0], year: 2, cgpa: 8.8, familyIncome: 60000, aiScore: 91, status: "Pending", appliedDate: "2024-08-25" },
    { id: "a7", collegeId, scholarshipId: "g1", scholarshipTitle: "Jagananna Vidya Deevena", studentName: "Sai Krishna", rollNumber: "21341A0301", department: dept[2] || "EEE", year: 3, cgpa: 8.4, familyIncome: 140000, aiScore: 85, status: "Pending", appliedDate: "2024-09-12" },
    { id: "a8", collegeId, scholarshipId: "g4", scholarshipTitle: "AP Post-Matric Scholarship (ST)", studentName: "Adilakshmi Valmiki", rollNumber: "22341A0210", department: dept[1] || "ECE", year: 2, cgpa: 7.2, familyIncome: 80000, aiScore: 72, status: "Approved", appliedDate: "2024-08-18" },
    { id: "a9", collegeId, scholarshipId: "g2", scholarshipTitle: "Jagananna Vasathi Deevena", studentName: "Karthik Reddy", rollNumber: "23341A0108", department: dept[0], year: 1, cgpa: 8.6, familyIncome: 110000, aiScore: 88, status: "Pending", appliedDate: "2024-10-01" },
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
