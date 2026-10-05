/**
 * DEMO DATA — every name, number and date shown in the app lives in this file.
 * Both versions (desktop and mobile) read from here, so a change appears everywhere.
 * When you connect a real database, replace these exports with data from your API.
 *
 * Greenfield Public School and everyone in it are fictional.
 */
import type { IconName } from "@/components/ui/icon-data";
import { GRADE_ORDER, gradeFor, type Grade } from "@/lib/grades";
import type { Role } from "@/lib/roles";
import type { Tone } from "@/lib/tones";

/* ───────────────────────── School & people ───────────────────────── */

export const school = {
  name: "Greenfield Public School",
  city: "Pune",
  board: "CBSE",
  year: "2026–27",
  students: 1248,
  teachers: 49,
} as const;

export const demoDate = { long: "Monday, 5 October 2026", short: "Mon, 5 Oct" } as const;

export type User = { name: string; firstName: string; avatar: string; subtitle: string };

export const users: Record<Role, User> = {
  parent: { name: "Priya Sharma", firstName: "Priya", avatar: "/avatars/priya.svg", subtitle: "Parent · Aarav & Diya" },
  teacher: { name: "Kavita Iyer", firstName: "Kavita", avatar: "/avatars/kavita.svg", subtitle: "Class teacher · 7-B" },
  principal: { name: "Dr. Meenakshi Nair", firstName: "Dr. Nair", avatar: "/avatars/meenakshi.svg", subtitle: "Principal" },
};

/* ───────────────────────── Subjects ───────────────────────── */

export type SubjectKey = "english" | "hindi" | "maths" | "science" | "social" | "computer";

export const subjects: Record<SubjectKey, { name: string; short: string; icon: IconName; tone: Tone }> = {
  english: { name: "English", short: "English", icon: "BookText", tone: "ocean" },
  hindi: { name: "Hindi", short: "Hindi", icon: "Languages", tone: "marigold" },
  maths: { name: "Mathematics", short: "Maths", icon: "Calculator", tone: "brand" },
  science: { name: "Science", short: "Science", icon: "FlaskConical", tone: "mint" },
  social: { name: "Social Science", short: "Social Sci.", icon: "Globe", tone: "rose" },
  computer: { name: "Computer Science", short: "Computer", icon: "Monitor", tone: "teal" },
};

/* ───────────────────────── PARENT · Priya, mother of Aarav (7-B) and Diya (3-A) ───────────────────────── */

export const kids = [
  { id: "aarav", name: "Aarav Sharma", firstName: "Aarav", className: "7-B", roll: "02", avatar: "/avatars/aarav-sharma.svg" },
  { id: "diya", name: "Diya Sharma", firstName: "Diya", className: "3-A", roll: "11", avatar: "/avatars/diya-s.svg" },
] as const;

export const childToday = {
  status: "In school · present at 8:06 AM",
  classTeacher: { name: "Mrs. Kavita Iyer", avatar: "/avatars/kavita.svg" },
};

export const childAttendance = { percent: 94.5, present: 104, total: 110, late: 3, classAverage: 93.1 };

export const childResult = {
  exam: "Half-yearly",
  percent: 86.5,
  total: 519,
  max: 600,
  grade: "A2" as Grade,
  change: 3.8,
  rankNote: "Top 10%",
  classSize: 38,
  classAverage: 74.7,
  trend: [78.2, 82.7, 86.5],
};

export type MarkRow = { subject: SubjectKey; teacher: string; ut1: number; ut2: number; halfYearly: number; classAverage: number };

export const marks: MarkRow[] = [
  { subject: "english", teacher: "Ms. Fatima Khan", ut1: 80, ut2: 84, halfYearly: 88, classAverage: 76 },
  { subject: "hindi", teacher: "Mrs. Sunita Rao", ut1: 70, ut2: 72, halfYearly: 74, classAverage: 72 },
  { subject: "maths", teacher: "Mrs. Kavita Iyer", ut1: 78, ut2: 85, halfYearly: 92, classAverage: 71 },
  { subject: "science", teacher: "Mr. Rohan Mehta", ut1: 77, ut2: 83, halfYearly: 89, classAverage: 74 },
  { subject: "social", teacher: "Mr. Arjun Reddy", ut1: 76, ut2: 79, halfYearly: 81, classAverage: 73 },
  { subject: "computer", teacher: "Ms. Neha Deshpande", ut1: 88, ut2: 93, halfYearly: 95, classAverage: 82 },
];

export const exams = ["Unit Test 1", "Unit Test 2", "Half-yearly", "Annual"];

export const examProgress = {
  labels: ["Unit Test 1", "Unit Test 2", "Half-yearly"],
  child: [78.2, 82.7, 86.5],
  classAverage: [70.4, 72.1, 74.7],
};

export const teacherRemark = {
  teacher: "Mrs. Kavita Iyer",
  avatar: "/avatars/kavita.svg",
  text: "Aarav is attentive and solves problems with confidence. A little daily Hindi reading will help him with grammar. Keep it up, Aarav!",
};

export const bhaviMarksSummary =
  "Aarav is in the top 10% of his class and improved in every subject this term. His biggest jump is in Maths (+14 since Unit Test 1). Hindi is the one to watch — the teacher suggests 15 minutes of reading a day.";

export type TimetableSlot = { time: string; subject: SubjectKey; teacher: string; status: "done" | "now" | "next"; room?: string };

export const timetableToday: TimetableSlot[] = [
  { time: "8:00", subject: "maths", teacher: "Mrs. Kavita Iyer", status: "done" },
  { time: "8:40", subject: "english", teacher: "Ms. Fatima Khan", status: "done" },
  { time: "9:20", subject: "science", teacher: "Ms. Pooja Kulkarni · substitute", status: "now", room: "Lab 2" },
  { time: "10:20", subject: "hindi", teacher: "Mr. Anil Kumar · substitute", status: "next", room: "Room 207" },
  { time: "11:00", subject: "social", teacher: "Mr. Arjun Reddy", status: "next", room: "Room 207" },
];

export type HomeworkItem = { subject: SubjectKey; title: string; due: string; done?: boolean; attachment?: boolean };

export const homeworkDue: HomeworkItem[] = [
  { subject: "maths", title: "Fractions worksheet", due: "Due today", done: true },
  { subject: "science", title: "Plant cell diagram", due: "Due Wed, 7 Oct", attachment: true },
  { subject: "hindi", title: "निबंध: मेरा प्रिय त्योहार", due: "Due Fri, 9 Oct" },
];

export type Announcement = { id: string; icon: IconName; title: string; body: string; from: string; when: string; pinned?: boolean };

export const announcements: Announcement[] = [
  { id: "ptm", icon: "Pin", title: "Parent–Teacher Meeting · Sat, 10 Oct", body: "9:00 AM – 12:00 PM · discuss the half-yearly results", from: "Principal", when: "1h ago", pinned: true },
  { id: "results", icon: "FileText", title: "Half-yearly report cards are out", body: "Aarav's report card is ready to view", from: "Mrs. Kavita Iyer", when: "Yesterday" },
  { id: "sports", icon: "Trophy", title: "Annual Sports Day · Sat, 28 Nov", body: "Practice starts 2 Nov — sports uniform needed", from: "Mr. Vikram Singh", when: "2 days ago" },
];

export type CalendarEntry = { day: string; month: string; title: string; note: string; kind: "holiday" | "event" };

export const upcomingDates: CalendarEntry[] = [
  { day: "10", month: "Oct", title: "Parent–Teacher Meeting", note: "Saturday · 9 AM", kind: "event" },
  { day: "20", month: "Oct", title: "Dussehra", note: "Tuesday · school closed", kind: "holiday" },
  { day: "5", month: "Nov", title: "Diwali vacation", note: "5–12 Nov · reopens Fri 13 Nov", kind: "holiday" },
  { day: "24", month: "Nov", title: "Guru Nanak Jayanti", note: "Tuesday · school closed", kind: "holiday" },
  { day: "25", month: "Dec", title: "Christmas", note: "Friday · school closed", kind: "holiday" },
];

export const fees = { term: "Term 2 · Oct–Dec", amount: 18500, due: "Thu, 15 October", dueIn: "Due in 10 days" };

/* Attendance calendar · September 2026 (1 Sep is a Tuesday) */

export type DayStatus = "present" | "absent" | "late" | "holiday" | "weekend" | "outside";
export type CalendarDay = { date: number; status: DayStatus; label?: string; tag?: "exam" | "event" };

const SEPTEMBER_NOTES: Record<number, Partial<CalendarDay>> = {
  4: { tag: "event", label: "Teachers' Day" },
  8: { status: "late", label: "Arrived 8:19 AM" },
  10: { status: "absent", label: "Sick leave · approved" },
  11: { status: "absent", label: "Sick leave · approved" },
  14: { status: "holiday", label: "Ganesh Chaturthi" },
  21: { tag: "exam", label: "English" },
  22: { tag: "exam", label: "Hindi" },
  23: { tag: "exam", label: "Maths" },
  24: { tag: "exam", label: "Science" },
  25: { tag: "exam", label: "Social Sci." },
  28: { tag: "exam", label: "Computer" },
};

function buildSeptember(): CalendarDay[] {
  const days: CalendarDay[] = [{ date: 31, status: "outside" }]; // Monday 31 August
  for (let date = 1; date <= 30; date++) {
    const weekday = date % 7; // 0 = Monday … 6 = Sunday
    const isWeekend = weekday === 5 || weekday === 6;
    days.push(isWeekend ? { date, status: "weekend" } : { date, status: "present", ...SEPTEMBER_NOTES[date] });
  }
  for (let date = 1; date <= 4; date++) days.push({ date, status: "outside" }); // 1–4 October
  return days;
}

export const attendanceMonth = {
  title: "September 2026",
  schoolDays: 21,
  present: 19,
  absent: 2,
  late: 1,
  holidays: 1,
  percent: 90.5,
  days: buildSeptember(),
};

export type LeaveRecord = { title: string; dates: string; status: "approved" | "declined" | "pending"; note?: string; attachment?: string };

export const leaveHistory: LeaveRecord[] = [
  { title: "Sick leave · 2 days", dates: "10–11 Sep 2026", status: "approved", note: "Get well soon, Aarav!", attachment: "Doctor_note.jpg" },
  { title: "Family function · 1 day", dates: "14 Aug 2026", status: "approved" },
  { title: "Medical appointment · Half day", dates: "3 Jul 2026", status: "approved" },
  { title: "Other · 1 day", dates: "18 Jun 2026", status: "declined", note: "Unit test that day — please attend." },
];

export const leaveTypes = ["Sick leave", "Family function", "Medical appointment", "Other"];

export const leaveDraft = {
  from: "Wed, 7 Oct",
  to: "Thu, 8 Oct",
  days: "2 school days",
  reason:
    "Aarav has had a viral fever since last night. Dr. Kulkarni has advised two days of rest. He will catch up on the Science project notes with his classmates.",
  attachment: { name: "Medical_Certificate_Dr_Kulkarni.pdf", size: "248 KB" },
  missed: [
    { day: "Wed, 7 Oct", classes: ["Maths", "English", "Science lab", "Hindi", "Social Science"] },
    { day: "Thu, 8 Oct", classes: ["Computer", "Maths", "Science class test", "PE"] },
  ],
  warning: "Science class test",
};

export const certificate = {
  award: "First Prize",
  event: "Inter-School Science Quiz 2026",
  student: "Aarav Sharma",
  className: "7-B",
  heldOn: "22 August 2026",
  number: "GPS/2026/SQ/0457",
  issued: "24 August 2026",
  verifyUrl: "bhavishya.app/v/GPS0457",
};

export const achievements: Array<{ icon: IconName; tone: Tone; title: string; date: string }> = [
  { icon: "Trophy", tone: "marigold", title: "First Prize · Inter-School Science Quiz", date: "22 Aug 2026" },
  { icon: "Medal", tone: "grey", title: "Silver · 100 m sprint, Athletics Meet", date: "12 Dec 2025" },
  { icon: "Award", tone: "brand", title: "Merit · Maths Olympiad (Level 1)", date: "8 Feb 2026" },
];

export const schoolDocuments: Array<{ icon: IconName; title: string; note: string; action: "download" | "review" | "request" }> = [
  { icon: "FileText", title: "Bonafide certificate", note: "Issued 12 Aug 2026", action: "download" },
  { icon: "FileText", title: "Report card · Half-yearly 2026", note: "Published 4 Oct 2026", action: "download" },
  { icon: "FileClock", title: "Character certificate", note: "Requested 2 Oct · with the principal", action: "review" },
  { icon: "FileOutput", title: "Transfer certificate (TC)", note: "Needs the principal's approval", action: "request" },
];

/* ───────────────────────── TEACHER · Kavita Iyer, Maths, class teacher of 7-B ───────────────────────── */

export type ScheduleItem = { time: string; title: string; note: string; status: "done" | "now" | "next" };

export const teacherSchedule: ScheduleItem[] = [
  { time: "8:00", title: "7-B · Mathematics", note: "Class teacher period · attendance sent 8:06", status: "done" },
  { time: "8:40", title: "8-A · Mathematics", note: "Chapter 4 · Linear equations", status: "done" },
  { time: "9:20", title: "Free period", note: "Check homework · Fractions worksheet", status: "done" },
  { time: "10:20", title: "7-A · Mathematics", note: "Room 204 · starts in 5 minutes", status: "now" },
  { time: "12:30", title: "6-C · Mathematics", note: "Room 108 · Ratio & proportion", status: "next" },
  { time: "1:10", title: "7-B · Maths lab", note: "Bring geometry kits", status: "next" },
];

export const teacherToday = {
  nextClass: { title: "7-A · Maths", note: "10:20 AM · Room 204 · in 5 min" },
  attendance: { percent: 92.1, present: 35, total: 38, sentAt: "8:06" },
  homework: { submitted: 31, total: 38, title: "Fractions worksheet" },
};

export type LeaveRequest = { id: string; student: string; avatar: string; dates: string; reason: string; attachment?: string; received: string };

export const leaveRequests: LeaveRequest[] = [
  { id: "lr-1", student: "Aarav Sharma", avatar: "/avatars/aarav-sharma.svg", dates: "Wed 7 – Thu 8 Oct · Sick leave", reason: "Viral fever, doctor advised two days of rest.", attachment: "Medical_Certificate.pdf", received: "20 min ago" },
  { id: "lr-2", student: "Diya Menon", avatar: "/avatars/diya-menon.svg", dates: "Fri, 9 Oct · Family function", reason: "Cousin's wedding in Kochi.", received: "1h ago" },
  { id: "lr-3", student: "Kabir Singh", avatar: "/avatars/kabir-singh.svg", dates: "Mon, 12 Oct · Medical appointment (half day)", reason: "Dentist at 11 AM — will come after lunch.", attachment: "Appointment.jpg", received: "2h ago" },
];

export type AttendanceMark = "P" | "A" | "L" | "V"; // present, absent, late, on approved leave

export type Student = { roll: number; name: string; avatar: string; mark: AttendanceMark; note?: string; maths: number };

const CLASS_7B: Array<[string, number]> = [
  ["Aadhya Kulkarni", 78], ["Aarav Sharma", 92], ["Advait Deshmukh", 86], ["Ananya Gupta", 88], ["Arjun Patel", 83],
  ["Aryan Nair", 68], ["Diya Menon", 76], ["Fatima Shaikh", 70], ["Gaurav Pawar", 50], ["Harleen Kaur", 74],
  ["Ishaan Verma", 44], ["Ishita Banerjee", 95], ["Kabir Singh", 66], ["Kavya Reddy", 91], ["Krish Malhotra", 72],
  ["Meera Joshi", 84], ["Mohammed Aamir", 79], ["Myra D'Souza", 87], ["Neel Chavan", 49], ["Nikhil Rao", 73],
  ["Om Bhosale", 47], ["Pari Agarwal", 69], ["Pranav Iyer", 93], ["Riya Das", 77], ["Rohan Bhat", 63],
  ["Saanvi Iyer", 98], ["Sahil Khan", 38], ["Samarth Jadhav", 65], ["Shreya Mishra", 75], ["Siddharth Jain", 71],
  ["Tanvi Shah", 81], ["Tejas Gokhale", 58], ["Trisha Pillai", 82], ["Vedant More", 29], ["Vihaan Kapoor", 62],
  ["Yash Thakur", 55], ["Zara Siddiqui", 67], ["Zoya Ahmed", 57],
];

const TODAY_MARKS: Record<string, { mark: AttendanceMark; note?: string }> = {
  "Ishaan Verma": { mark: "A" },
  "Yash Thakur": { mark: "A" },
  "Rohan Bhat": { mark: "L", note: "Arrived 8:19 AM" },
  "Zoya Ahmed": { mark: "V", note: "On approved leave" },
};

const avatarFor = (name: string) => `/avatars/${name.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-")}.svg`;

export const classStudents: Student[] = CLASS_7B.map(([name, maths], i) => ({
  roll: i + 1,
  name,
  avatar: avatarFor(name),
  maths,
  mark: TODAY_MARKS[name]?.mark ?? "P",
  note: TODAY_MARKS[name]?.note,
}));

/** Half-yearly Maths, split into theory (out of 80) and internal assessment (out of 20). */
export const mathsGradebook = classStudents.map((s) => {
  const internal = Math.min(20, Math.max(10, Math.round(s.maths * 0.2 + 1.5)));
  return { roll: s.roll, name: s.name, avatar: s.avatar, theory: s.maths - internal, internal };
});

const mathsScores = classStudents.map((s) => s.maths);

export const mathsSummary = {
  average: Math.round((mathsScores.reduce((a, b) => a + b, 0) / mathsScores.length) * 10) / 10,
  highest: { marks: 98, name: "Saanvi Iyer" },
  lowest: 29,
  passRate: 97.4,
  atRisk: classStudents.filter((s) => s.maths <= 50).sort((a, b) => b.maths - a.maths),
  distribution: GRADE_ORDER.map((grade) => ({ grade, count: mathsScores.filter((m) => gradeFor(m) === grade).length })),
};

export type Submission = {
  student: string;
  avatar: string;
  time: string;
  lines: string[];
  status: "checked" | "great" | "flag" | "new";
  paper: "kraft" | "grey" | "blue";
  tilt: number;
  stamp?: string;
};

export const homeworkSubmissions: Submission[] = [
  { student: "Aarav Sharma", avatar: "/avatars/aarav-sharma.svg", time: "7:42 PM", lines: ["Q1. 3/4 + 1/8", "= 6/8 + 1/8 = 7/8", "Q2. 2/3 × 9/10", "= 18/30 = 3/5"], status: "checked", paper: "kraft", tilt: -1.5, stamp: "Good!" },
  { student: "Saanvi Iyer", avatar: "/avatars/saanvi-iyer.svg", time: "6:15 PM", lines: ["Q1. 3/4 + 1/8 = 7/8", "Q2. 2/3 × 9/10 = 3/5", "Q3. 5/6 − 1/4", "= 10/12 − 3/12 = 7/12"], status: "great", paper: "grey", tilt: 1.2, stamp: "Excellent ★" },
  { student: "Ishaan Verma", avatar: "/avatars/ishaan-verma.svg", time: "9:10 PM", lines: ["Q1. 3/4 + 1/8 = 4/12", "Q2. 2/3 × 9/10 = 3/5", "Q3. 5/6 − 1/4 = 7/12"], status: "flag", paper: "blue", tilt: -2.2 },
  { student: "Kavya Reddy", avatar: "/avatars/kavya-reddy.svg", time: "8:02 PM", lines: ["Q1. 6/8 + 1/8 = 7/8", "Q2. 18/30 = 3/5", "Q3. 7/12", "Q4. 1 1/6"], status: "checked", paper: "kraft", tilt: 2, stamp: "✓" },
  { student: "Diya Menon", avatar: "/avatars/diya-menon.svg", time: "8:20 PM", lines: ["Q1. 3/4 + 1/8", "= 6/8 + 1/8", "= 7/8", "Q2. 3/5"], status: "new", paper: "grey", tilt: -1 },
  { student: "Kabir Singh", avatar: "/avatars/kabir-singh.svg", time: "8:31 PM", lines: ["Q1. 7/8", "Q2. 2/3 × 9/10 = 3/5", "Q3. 7/12", "Q4. 7/6 = 1 1/6"], status: "new", paper: "blue", tilt: 1.6 },
  { student: "Meera Joshi", avatar: "/avatars/meera-joshi.svg", time: "7:05 PM", lines: ["Q1. 3/4 + 1/8 = 7/8", "Q2. 3/5", "Q3. 7/12", "Q4. 1 1/6"], status: "checked", paper: "kraft", tilt: -2, stamp: "Good!" },
  { student: "Arjun Patel", avatar: "/avatars/arjun-patel.svg", time: "9:02 PM", lines: ["Q1. 7/8", "Q2. 18/30", "= 3/5", "Q3. 7/12"], status: "new", paper: "grey", tilt: 2.2 },
];

export const notSubmitted = ["om-bhosale", "neel-chavan", "gaurav-pawar", "sahil-khan", "vedant-more", "yash-thakur", "tejas-gokhale"].map(
  (slug) => `/avatars/${slug}.svg`,
);

export const recentHomework = [
  { title: "Fractions worksheet", note: "Mon, 5 Oct · 31 of 38 submitted", status: "Checking" },
  { title: "Ratio word problems", note: "Thu, 1 Oct · 38 of 38 submitted", status: "Done" },
];

/* ───────────────────────── PRINCIPAL · Dr. Meenakshi Nair ───────────────────────── */

export type Kpi = { icon: IconName; tone: Tone; label: string; value: string; suffix?: string; foot: string; change?: string };

export const principalKpis: Kpi[] = [
  { icon: "Users", tone: "mint", label: "Students present", value: "93.6%", foot: "1,168 of 1,248", change: "▲ 1.2%" },
  { icon: "GraduationCap", tone: "brand", label: "Teachers present", value: "46", suffix: "/49", foot: "3 on leave · covered" },
  { icon: "Inbox", tone: "coral", label: "Waiting for you", value: "7", foot: "5 leave · 2 certificates" },
  { icon: "ChartColumn", tone: "marigold", label: "Half-yearly average", value: "74.8%", foot: "vs last year", change: "▲ 2.1" },
  { icon: "Smartphone", tone: "ocean", label: "Parents active", value: "91%", foot: "opened the app this week" },
];

export const attendanceTrend = {
  labels: ["7 Sep", "", "", "", "", "15 Sep", "", "", "", "21 Sep", "", "", "", "", "28 Sep", "", "", "", "5 Oct"],
  thisYear: [92.8, 93.1, 92.4, 91.2, 90.6, 93.5, 94.0, 94.2, 93.7, 96.4, 96.8, 96.5, 96.9, 96.2, 95.8, 94.1, 93.2, 92.9, 93.6],
  lastYear: [91.6, 92.0, 91.1, 90.4, 90.1, 92.0, 92.6, 92.9, 92.2, 95.1, 95.4, 95.0, 95.6, 94.8, 94.1, 92.8, 92.0, 91.7, 92.4],
};

/** Today's attendance by class (columns 1–12) and section (rows A–D). null = section doesn't exist. */
export const attendanceByClass: { sections: string[]; grid: Array<Array<number | null>>; lowest: { section: string; classNo: number } } = {
  sections: ["A", "B", "C", "D"],
  grid: [
    [97, 96, 95, 96, 94, 88, 95, 94, 93, 95, 92, 94],
    [96, 97, 94, 95, 96, 93, 92, 95, 94, 93, 89, 93],
    [95, 95, 96, 94, 95, 94, 94, 93, 86, 94, 93, 92],
    [98, 96, 95, 97, null, null, 93, 94, null, null, null, null],
  ],
  lowest: { section: "C", classNo: 9 },
};

export const principalInsights: Array<{ icon: IconName; title: string; body: string }> = [
  { icon: "TrendingDown", title: "9-C attendance fell to 81% last week", body: "Down 8.4 points. 6 students missed 3 or more days." },
  { icon: "FlaskConical", title: "Class 8 Science", body: "is 9% below last year's half-yearly average." },
  { icon: "EyeOff", title: "112 parents", body: "haven't seen the PTM notice yet." },
];

export type Approval = { id: string; avatar: string; name: string; detail: string; note: string };

export const approvals: Approval[] = [
  { id: "ap-1", avatar: "/avatars/fatima-k.svg", name: "Ms. Fatima Khan", detail: "Casual leave · Mon 12 – Tue 13 Oct", note: "Substitute: Mr. Anil Kumar (suggested)" },
  { id: "ap-2", avatar: "/avatars/arjun-r.svg", name: "Mr. Arjun Reddy", detail: "Duty leave · Fri 16 Oct", note: "CBSE Social Science workshop, Mumbai" },
];

export const moreApprovals = "+ 3 student leaves · 2 certificate requests";

export const teachersOnLeave: Array<{ avatar: string; name: string; detail: string; substitute?: { name: string; avatar: string } }> = [
  { avatar: "/avatars/rohan-m.svg", name: "Mr. Rohan Mehta", detail: "Science · sick leave", substitute: { name: "Ms. Pooja Kulkarni", avatar: "/avatars/pooja-k.svg" } },
  { avatar: "/avatars/sunita.svg", name: "Mrs. Sunita Rao", detail: "Hindi · personal leave", substitute: { name: "Mr. Anil Kumar", avatar: "/avatars/anil.svg" } },
  { avatar: "/avatars/vikram.svg", name: "Mr. Vikram Singh", detail: "PE · sports workshop" },
];

export type TeacherRow = {
  avatar: string;
  name: string;
  subject: string;
  classes: number;
  today: { label: "Present" | "Late" | "On leave"; detail: string };
  attendance: number;
  syllabus: number;
  result: number;
  improving: boolean;
  rating: number;
  trend: number[];
};

export const teacherRoster: TeacherRow[] = [
  { avatar: "/avatars/kavita.svg", name: "Mrs. Kavita Iyer", subject: "Mathematics", classes: 4, today: { label: "Present", detail: "7:41 AM" }, attendance: 98.2, syllabus: 76, result: 76.2, improving: true, rating: 4.8, trend: [70, 72, 71, 74, 75, 76] },
  { avatar: "/avatars/fatima-k.svg", name: "Ms. Fatima Khan", subject: "English", classes: 3, today: { label: "Present", detail: "7:52 AM" }, attendance: 97.3, syllabus: 71, result: 78.4, improving: true, rating: 4.7, trend: [74, 75, 77, 76, 78, 78] },
  { avatar: "/avatars/rohan-m.svg", name: "Mr. Rohan Mehta", subject: "Science", classes: 3, today: { label: "On leave", detail: "Sick" }, attendance: 95.4, syllabus: 64, result: 71.5, improving: false, rating: 4.5, trend: [74, 73, 72, 72, 71, 71.5] },
  { avatar: "/avatars/arjun-r.svg", name: "Mr. Arjun Reddy", subject: "Social Science", classes: 3, today: { label: "Late", detail: "8:12 AM" }, attendance: 92.6, syllabus: 58, result: 69.8, improving: false, rating: 4.2, trend: [73, 72, 71, 70, 70, 69.8] },
  { avatar: "/avatars/sunita.svg", name: "Mrs. Sunita Rao", subject: "Hindi", classes: 3, today: { label: "On leave", detail: "Personal" }, attendance: 94.1, syllabus: 69, result: 72.6, improving: true, rating: 4.6, trend: [70, 70, 71, 72, 72, 72.6] },
  { avatar: "/avatars/pooja-k.svg", name: "Ms. Pooja Kulkarni", subject: "Science", classes: 3, today: { label: "Present", detail: "7:45 AM" }, attendance: 99.1, syllabus: 73, result: 75.3, improving: true, rating: 4.6, trend: [71, 72, 73, 74, 75, 75.3] },
  { avatar: "/avatars/neha-d.svg", name: "Ms. Neha Deshpande", subject: "Computer Science", classes: 3, today: { label: "Present", detail: "7:38 AM" }, attendance: 98.6, syllabus: 81, result: 84.1, improving: true, rating: 4.9, trend: [80, 81, 82, 83, 83, 84.1] },
  { avatar: "/avatars/sameer.svg", name: "Mr. Sameer Kulkarni", subject: "Mathematics", classes: 3, today: { label: "Late", detail: "8:05 AM" }, attendance: 93.2, syllabus: 66, result: 70.2, improving: false, rating: 4.3, trend: [73, 72, 72, 71, 70, 70.2] },
];

export const teacherStats = { present: 46, total: 49, onLeave: 3, late: 2, syllabus: 68, syllabusTarget: "70% by 31 Oct", averageResult: 74.8, rating: 4.6 };

export const teacherOfMonth = { avatar: "/avatars/kavita.svg", name: "Mrs. Kavita Iyer", role: "Mathematics · Class teacher 7-B", attendance: "98%", syllabus: "76%", rating: "4.8★" };

export const needsAttention = [
  { avatar: "/avatars/arjun-r.svg", name: "Mr. Arjun Reddy", note: "Syllabus 12% behind plan in 9-C · late twice this week" },
  { avatar: "/avatars/sameer.svg", name: "Mr. Sameer Kulkarni", note: "9-C Maths average down 4 points since Unit Test 2" },
];

export const recentAnnouncements = [
  { title: "Dussehra holiday · 20 Oct", read: 97 },
  { title: "Half-yearly results", read: 94 },
  { title: "Sports Day practice", read: 88 },
];

export type NoticeText = { badge: string; when: string; title: string; body: string; confirm: string; seen: string };

/** The PTM notice, written once in English and auto-translated (edit translations before sending). */
export const ptmNotice: { title: string; body: string; translations: Record<"en" | "hi" | "mr", NoticeText> } = {
  title: "Parent–Teacher Meeting · Saturday, 10 October",
  body: "Dear parents, the first Parent–Teacher Meeting of the year will be held on Saturday, 10 October, from 9:00 AM to 12:00 PM. Please meet your child's class teacher to discuss the half-yearly results. Kindly bring the signed report-card slip.",
  translations: {
    en: {
      badge: "Notice",
      when: "now",
      title: "Parent–Teacher Meeting · Saturday, 10 October",
      body: "Dear parents, the first Parent–Teacher Meeting of the year will be held on Saturday, 10 October, from 9:00 AM to 12:00 PM. Please meet your child's class teacher to discuss the half-yearly results.",
      confirm: "I'll attend",
      seen: "Seen",
    },
    hi: {
      badge: "सूचना",
      when: "अभी",
      title: "अभिभावक–शिक्षक बैठक · शनिवार, 10 अक्टूबर",
      body: "प्रिय अभिभावक, वर्ष की पहली अभिभावक-शिक्षक बैठक शनिवार, 10 अक्टूबर को सुबह 9:00 बजे से दोपहर 12:00 बजे तक होगी। कृपया अर्धवार्षिक परिणामों पर चर्चा करने के लिए अपने बच्चे के कक्षा शिक्षक से मिलें।",
      confirm: "मैं आऊँगा/आऊँगी",
      seen: "देखा",
    },
    mr: {
      badge: "सूचना",
      when: "आत्ता",
      title: "पालक–शिक्षक सभा · शनिवार, 10 ऑक्टोबर",
      body: "प्रिय पालक, वर्षातील पहिली पालक-शिक्षक सभा शनिवार, 10 ऑक्टोबर रोजी सकाळी 9:00 ते दुपारी 12:00 या वेळेत होईल. सहामाही परीक्षेच्या निकालांवर चर्चा करण्यासाठी कृपया आपल्या पाल्याच्या वर्गशिक्षकांना भेटा.",
      confirm: "मी येईन",
      seen: "पाहिले",
    },
  },
};
