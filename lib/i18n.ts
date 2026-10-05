/**
 * App languages. The switch in the app (EN · हिं · मरा) changes every text that uses a key below.
 * To translate more of the app: add a key here, then show it with <T k="your.key" /> (components/i18n).
 */
export type Lang = "en" | "hi" | "mr";

export const languages: ReadonlyArray<{ code: Lang; short: string; label: string }> = [
  { code: "en", short: "EN", label: "English" },
  { code: "hi", short: "हिं", label: "हिन्दी" },
  { code: "mr", short: "मरा", label: "मराठी" },
];

const messages = {
  "greeting.morning": { en: "Good morning", hi: "सुप्रभात", mr: "सुप्रभात" },

  "nav.home": { en: "Home", hi: "होम", mr: "मुख्यपृष्ठ" },
  "nav.marks": { en: "Marks & report card", hi: "अंक और रिपोर्ट कार्ड", mr: "गुण आणि प्रगतिपुस्तक" },
  "nav.marksShort": { en: "Marks", hi: "अंक", mr: "गुण" },
  "nav.attendance": { en: "Attendance", hi: "उपस्थिति", mr: "उपस्थिती" },
  "nav.attendanceHolidays": { en: "Attendance & holidays", hi: "उपस्थिति और छुट्टियाँ", mr: "उपस्थिती आणि सुट्ट्या" },
  "nav.leave": { en: "Leave", hi: "छुट्टी का आवेदन", mr: "रजा अर्ज" },
  "nav.certificates": { en: "Certificates", hi: "प्रमाणपत्र", mr: "प्रमाणपत्रे" },
  "nav.ask": { en: "Ask Bhavi", hi: "भावी से पूछें", mr: "भावीला विचारा" },
  "nav.bhavi": { en: "Bhavi", hi: "भावी", mr: "भावी" },
  "nav.today": { en: "Today", hi: "आज", mr: "आज" },
  "nav.gradebook": { en: "Gradebook", hi: "अंक पुस्तिका", mr: "गुणपत्रिका" },
  "nav.homework": { en: "Homework", hi: "गृहकार्य", mr: "गृहपाठ" },
  "nav.overview": { en: "Overview", hi: "सारांश", mr: "आढावा" },
  "nav.teachers": { en: "Teachers", hi: "शिक्षक", mr: "शिक्षक" },
  "nav.announcements": { en: "Announcements", hi: "सूचनाएँ", mr: "सूचना" },
  "nav.notices": { en: "Notices", hi: "सूचनाएँ", mr: "सूचना" },
  "nav.menu": { en: "Menu", hi: "मेन्यू", mr: "मेनू" },
  "nav.switchRole": { en: "Switch role", hi: "भूमिका बदलें", mr: "भूमिका बदला" },
  "nav.website": { en: "Back to website", hi: "वेबसाइट पर जाएँ", mr: "संकेतस्थळावर जा" },
  "nav.logout": { en: "Log out", hi: "लॉग आउट", mr: "बाहेर पडा" },

  "ui.search": { en: "Search…", hi: "खोजें…", mr: "शोधा…" },
  "ui.askAnything": { en: "Ask anything…", hi: "कुछ भी पूछें…", mr: "काहीही विचारा…" },
  "ui.demo": { en: "Live demo · sample data", hi: "लाइव डेमो · नमूना डेटा", mr: "थेट डेमो · नमुना माहिती" },
  "ui.language": { en: "Language", hi: "भाषा", mr: "भाषा" },
} as const satisfies Record<string, Record<Lang, string>>;

export type MessageKey = keyof typeof messages;

export function translate(key: MessageKey, lang: Lang): string {
  return messages[key][lang];
}
