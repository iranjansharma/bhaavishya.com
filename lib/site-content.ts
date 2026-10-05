/**
 * WEBSITE CONTENT — headlines, features, prices and FAQs for the marketing website.
 * Both the desktop and the mobile website read from this file, so edit text here once.
 */
import type { IconName } from "@/components/ui/icon-data";
import type { Tone } from "@/lib/tones";

export const brand = {
  name: "Bhavishya",
  tagline: "भविष्य · School, connected",
  email: "hello@bhavishya.app",
  phone: "+91 98765 43210",
};

export const siteNav = [
  { label: "Product", href: "/#product" },
  { label: "For parents", href: "/#roles" },
  { label: "For teachers", href: "/#roles" },
  { label: "For principals", href: "/#roles" },
  { label: "Pricing", href: "/pricing" },
  { label: "Live demo", href: "/demo" },
];

export const hero = {
  badge: "NEW",
  eyebrow: "Bhavi AI now replies to parents in हिन्दी & मराठी",
  title: "Run a smarter school. Keep every parent",
  titleAccent: "in the loop.",
  lead: "Attendance, marks, leave, certificates and announcements — one beautiful app for principals, teachers and parents. With an AI assistant built in.",
  primary: { label: "Book a free demo", href: "/book-demo" },
  secondary: { label: "Try the live demo", href: "/demo" },
  note: "No signup — one click opens a demo school full of sample data",
};

export const trustPoints: Array<{ icon: IconName; label: string }> = [
  { icon: "BookOpenCheck", label: "CBSE · ICSE · State boards" },
  { icon: "Smartphone", label: "Android, iPhone & web" },
  { icon: "Languages", label: "Indian languages" },
];

export type RoleCard = { role: "principal" | "teacher" | "parent"; label: string; title: string; icon: IconName; tone: Tone; points: string[] };

export const roleCards: RoleCard[] = [
  {
    role: "principal",
    label: "For principals",
    title: "See your whole school at a glance",
    icon: "School",
    tone: "brand",
    points: ["Live attendance for students and staff", "Teacher performance and syllabus progress", "Approve leave and certificates in one tap", "Announcements in every parent's language"],
  },
  {
    role: "teacher",
    label: "For teachers",
    title: "Less paperwork, more teaching",
    icon: "GraduationCap",
    tone: "mint",
    points: ["Mark attendance in under 30 seconds", "A gradebook that builds report cards", "Homework with photos and PDFs", "Leave requests come straight to you"],
  },
  {
    role: "parent",
    label: "For parents",
    title: "Never miss a moment of school",
    icon: "Heart",
    tone: "marigold",
    points: ["Marks, report cards and progress", "An alert the moment your child reaches school", "Apply for leave with a doctor's note", "Download certificates and the holiday list"],
  },
];

export const features: Array<{ icon: IconName; tone: Tone; title: string; text: string }> = [
  { icon: "UserCheck", tone: "mint", title: "Attendance", text: "Students and staff, with instant alerts to parents on WhatsApp, SMS and the app." },
  { icon: "ChartColumn", tone: "brand", title: "Marks & report cards", text: "CBSE, ICSE and State Board formats, generated automatically." },
  { icon: "CalendarX", tone: "coral", title: "Leave", text: "Parents apply, teachers approve — with attachments and history." },
  { icon: "BadgeCheck", tone: "marigold", title: "QR-verified certificates", text: "Bonafide, transfer and achievement certificates anyone can verify." },
  { icon: "Megaphone", tone: "ocean", title: "Announcements", text: "Write once in English — parents read it in their own language." },
  { icon: "CalendarDays", tone: "rose", title: "Holidays & events", text: "One school calendar for exams, holidays, PTMs and celebrations." },
  { icon: "NotebookPen", tone: "teal", title: "Homework", text: "Post tasks with photos and PDFs; see who has submitted." },
  { icon: "Sparkles", tone: "brand", title: "Bhavi AI", text: "Ask questions, draft notices and spot problems before they grow." },
];

export const stats: Array<{ icon: IconName; tone: Tone; value: string; label: string }> = [
  { icon: "Timer", tone: "mint", value: "30 sec", label: "to mark attendance for a class of 40" },
  { icon: "Hand", tone: "marigold", value: "1 tap", label: "for parents to apply for leave" },
  { icon: "FileX", tone: "coral", value: "0", label: "paper certificates to print and sign" },
  { icon: "Languages", tone: "brand", value: "3", label: "languages: English, हिन्दी, मराठी" },
];

export const bhaviPoints: Array<{ icon: IconName; title: string; text: string }> = [
  { icon: "Languages", title: "Speaks your parents' language", text: "English, हिन्दी, मराठी and more — typed or spoken." },
  { icon: "WandSparkles", title: "Drafts in seconds", text: "Circulars, report-card remarks and replies to parents." },
  { icon: "TriangleAlert", title: "Spots problems early", text: "Falling attendance or marks get flagged before they grow." },
  { icon: "ShieldCheck", title: "Private by design", text: "Parents only ever see their own child's data." },
];

export const goLiveSteps: Array<{ week: string; icon: IconName; tone: Tone; title: string; text: string }> = [
  { week: "Week 1", icon: "FileSpreadsheet", tone: "brand", title: "Import your data", text: "Send us your Excel sheets. We set up classes, students, teachers and fees for you." },
  { week: "Week 2", icon: "Presentation", tone: "mint", title: "Train your teachers", text: "One hour in your staff room, in Hindi or English. Attendance starts the same day." },
  { week: "Week 3", icon: "Send", tone: "marigold", title: "Invite parents", text: "Parents get a WhatsApp link and log in with their phone number — no passwords." },
];

/* ───────────────────────── Pricing ───────────────────────── */

export type Plan = {
  id: "silver" | "gold" | "platinum";
  name: string;
  /** Price per student per year, in rupees (before GST). */
  pricePerYear: number;
  description: string;
  includesLabel: string;
  features: string[];
  cta: { label: string; href: string };
  popular?: boolean;
};

export const plans: Plan[] = [
  {
    id: "silver",
    name: "Silver",
    pricePerYear: 149,
    description: "For schools going digital for the first time.",
    includesLabel: "Everything to get started",
    features: ["Student attendance + instant parent alerts", "Marks entry & board-format report cards", "Announcements & holiday calendar", "Leave requests from parents", "Parent app — Android, iPhone & web", "Email & chat support"],
    cta: { label: "Start a 30-day pilot", href: "/book-demo" },
  },
  {
    id: "gold",
    name: "Gold",
    pricePerYear: 299,
    description: "For schools that want everything in one place.",
    includesLabel: "Everything in Silver, plus",
    features: ["Teacher attendance & leave approvals", "QR-verified digital certificates", "Homework with photo & PDF attachments", "WhatsApp + SMS alerts (fair use)", "Principal dashboard & analytics", "Bhavi AI assistant in 3 languages"],
    cta: { label: "Book a free demo", href: "/book-demo" },
    popular: true,
  },
  {
    id: "platinum",
    name: "Platinum",
    pricePerYear: 499,
    description: "For premium schools that want AI everywhere.",
    includesLabel: "Everything in Gold, plus",
    features: ["Unlimited Bhavi AI in major Indian languages", "Early-warning insights on attendance & marks", "Your school's own branded app", "Custom report cards & advanced reports", "Dedicated success manager", "On-site training & priority support"],
    cta: { label: "Talk to us", href: "/book-demo" },
  },
];

export const diamondPlan = {
  name: "Diamond",
  title: "For school groups & trusts (5+ campuses)",
  text: "Multi-campus dashboard, central admissions, custom integrations · Custom pricing",
  cta: { label: "Contact us", href: "/book-demo" },
};

/** Monthly billing costs 15% more than paying yearly. */
export const MONTHLY_MARKUP = 1.15;
export const GST_RATE = 0.18;

export const pricingFaq = [
  { q: "Is there a setup fee?", a: "No. Onboarding, data migration and teacher training are free on every plan." },
  { q: "Can we try it before we pay?", a: "Yes. Every plan starts with a free 30-day pilot using your own classes and students." },
  { q: "Do parents pay anything?", a: "No. The school pays per student; the parent app is free for families." },
  { q: "Is our data safe?", a: "Each school's data is kept separate, and parents can only see their own child's records." },
];

/* ───────────────────────── Book a demo ───────────────────────── */

export const demoForm = {
  roles: ["Principal", "Owner / Trustee", "Administrator", "Teacher"],
  sizes: ["Under 300", "300–800", "800–1,500", "1,500+"],
  boards: ["CBSE", "ICSE", "State board", "IB"],
  /** Next available days. Connect this to your real calendar later. */
  days: [
    { label: "Tue", date: "6", month: "Oct" },
    { label: "Wed", date: "7", month: "Oct" },
    { label: "Thu", date: "8", month: "Oct" },
    { label: "Fri", date: "9", month: "Oct" },
    { label: "Sat", date: "10", month: "Oct" },
    { label: "Mon", date: "12", month: "Oct" },
  ],
  slots: [
    { time: "10:00 AM", available: true },
    { time: "11:30 AM", available: true },
    { time: "1:00 PM", available: false },
    { time: "2:30 PM", available: true },
    { time: "4:00 PM", available: true },
    { time: "6:00 PM", available: true },
  ],
  host: { name: "Neha Joshi", avatar: "/avatars/neha-j.svg", quote: "I'll show you how a school goes paperless in three weeks." },
  benefits: [
    { icon: "LayoutDashboard" as IconName, tone: "mint" as Tone, title: "A tour of the whole app", text: "Principal dashboard, teacher tools and the parent app." },
    { icon: "IndianRupee" as IconName, tone: "marigold" as Tone, title: "A price for your exact student count", text: "Silver, Gold or Platinum — no hidden charges." },
    { icon: "FileSpreadsheet" as IconName, tone: "brand" as Tone, title: "Free data migration", text: "We import students and staff from Excel or your current software." },
  ],
};

/* ───────────────────────── Live demo: pick a role ───────────────────────── */

export const demoRoles: Array<{
  role: "parent" | "teacher" | "principal";
  label: string;
  icon: IconName;
  person: string;
  detail: string;
  avatar: string;
  href: string;
  tryThis: string[];
}> = [
  {
    role: "parent",
    label: "Parent",
    icon: "Heart",
    person: "Priya Sharma",
    detail: "Mother of Aarav (7-B) and Diya (3-A)",
    avatar: "/avatars/priya.svg",
    href: "/dashboard/parent",
    tryThis: ["Check Aarav's half-yearly marks", "Apply for leave with a doctor's note", "Download a QR-verified certificate"],
  },
  {
    role: "teacher",
    label: "Teacher",
    icon: "GraduationCap",
    person: "Kavita Iyer",
    detail: "Maths · class teacher of 7-B",
    avatar: "/avatars/kavita.svg",
    href: "/dashboard/teacher",
    tryThis: ["Mark today's attendance for 7-B", "Enter half-yearly Maths marks", "Approve three leave requests"],
  },
  {
    role: "principal",
    label: "Principal",
    icon: "School",
    person: "Dr. Meenakshi Nair",
    detail: "Principal",
    avatar: "/avatars/meenakshi.svg",
    href: "/dashboard/principal",
    tryThis: ["See live attendance for the whole school", "Review teacher performance", "Send a notice in English, हिन्दी & मराठी"],
  },
];

export const footer = {
  columns: [
    { title: "Product", links: [{ label: "Features", href: "/#product" }, { label: "Pricing", href: "/pricing" }, { label: "Live demo", href: "/demo" }] },
    { title: "Company", links: [{ label: "Book a demo", href: "/book-demo" }, { label: "Contact", href: "/book-demo" }] },
  ],
  note: "Made in India for Indian schools.",
};
