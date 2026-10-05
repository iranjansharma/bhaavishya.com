/**
 * BHAVI (AI assistant) — demo conversations.
 * The demo answers from this script. In the real product, send the question to your AI API
 * (see components/blocks/ChatPanel.tsx → `askBhavi`) and give it read-only access to the
 * signed-in person's data only.
 */
import type { Role } from "@/lib/roles";
import type { Tone } from "@/lib/tones";

export type ChatBlock =
  | { kind: "text"; text: string }
  | { kind: "bars"; items: Array<{ label: string; value: number; tone: Tone }> }
  | { kind: "table"; columns: string[]; rows: string[][] }
  | { kind: "drafts"; drafts: Array<{ label: string; text: string }> }
  | { kind: "actions"; actions: string[] };

export type ChatMessage = { from: "user" | "bhavi"; blocks: ChatBlock[] };

export type ChatScript = {
  context: string;
  intro: ChatMessage[];
  suggestions: string[];
  answers: Array<{ match: string[]; reply: ChatMessage }>;
  fallback: ChatMessage;
};

const user = (text: string): ChatMessage => ({ from: "user", blocks: [{ kind: "text", text }] });

const fallback: ChatMessage = {
  from: "bhavi",
  blocks: [{ kind: "text", text: "In the real app I answer this from your school's live data. In this demo, try one of the suggested questions." }],
};

export const chatScripts: Record<Role, ChatScript> = {
  parent: {
    context: "Parent app · Aarav Sharma, 7-B",
    intro: [
      user("आरव का गणित में प्रदर्शन कैसा है?"),
      {
        from: "bhavi",
        blocks: [
          { kind: "text", text: "आरव ने अर्धवार्षिक परीक्षा में गणित में 92/100 अंक प्राप्त किए — कक्षा के शीर्ष 10% में! यूनिट टेस्ट 1 से 14 अंकों का सुधार हुआ है। 👏" },
          {
            kind: "bars",
            items: [
              { label: "यूनिट टेस्ट 1", value: 78, tone: "grey" },
              { label: "यूनिट टेस्ट 2", value: 85, tone: "brand" },
              { label: "अर्धवार्षिक", value: 92, tone: "brand" },
            ],
          },
        ],
      },
    ],
    suggestions: ["How is Aarav doing in Hindi?", "What's due this week?", "When is the next holiday?"],
    answers: [
      {
        match: ["hindi"],
        reply: {
          from: "bhavi",
          blocks: [
            { kind: "text", text: "Aarav scored 74 in Hindi — just above the class average of 72. Mrs. Sunita Rao suggests 15 minutes of reading every day. Shall I remind you at 7 PM?" },
            { kind: "actions", actions: ["Yes, remind me at 7 PM", "Message the teacher"] },
          ],
        },
      },
      {
        match: ["due", "homework", "week"],
        reply: {
          from: "bhavi",
          blocks: [
            { kind: "text", text: "Two pieces of homework are due this week:" },
            { kind: "table", columns: ["Subject", "Homework", "Due"], rows: [["Science", "Plant cell diagram", "Wed, 7 Oct"], ["Hindi", "निबंध: मेरा प्रिय त्योहार", "Fri, 9 Oct"]] },
          ],
        },
      },
      {
        match: ["holiday", "छुट्टी", "सुट्टी"],
        reply: {
          from: "bhavi",
          blocks: [{ kind: "text", text: "The next holiday is Dussehra on Tuesday, 20 October. Diwali vacation runs 5–12 November, and school reopens on Friday, 13 November." }],
        },
      },
    ],
    fallback,
  },

  teacher: {
    context: "Teacher app · Kavita Iyer, 7-B",
    intro: [
      user("Who scored 50 or below in the half-yearly Maths exam?"),
      {
        from: "bhavi",
        blocks: [
          { kind: "text", text: "6 students in 7-B scored 50 or below. Most lost marks on fractions and decimals (Q 7–12)." },
          {
            kind: "table",
            columns: ["Student", "Marks", "Weakest topic"],
            rows: [
              ["Gaurav Pawar", "50", "Decimals"],
              ["Neel Chavan", "49", "Fractions"],
              ["Om Bhosale", "47", "Fractions"],
              ["Ishaan Verma", "44", "Fractions"],
              ["Sahil Khan", "38", "Decimals"],
              ["Vedant More", "29", "Fractions"],
            ],
          },
          { kind: "actions", actions: ["Create remedial group", "Draft a note to parents"] },
        ],
      },
    ],
    suggestions: ["Draft a reminder about Saturday's PTM", "Which students are often late?", "Summarise 7-B attendance this month"],
    answers: [
      {
        match: ["ptm", "reminder"],
        reply: {
          from: "bhavi",
          blocks: [
            { kind: "text", text: "Here's a short reminder for 7-B parents:" },
            {
              kind: "drafts",
              drafts: [
                { label: "English", text: "Dear parents, a reminder that the Parent–Teacher Meeting is this Saturday, 10 October, 9 AM–12 PM. I look forward to meeting you. — Mrs. Kavita Iyer, 7-B" },
                { label: "हिन्दी", text: "प्रिय अभिभावक, याद दिला दें कि अभिभावक–शिक्षक बैठक इस शनिवार, 10 अक्टूबर को सुबह 9 से दोपहर 12 बजे तक है। आपसे मिलने की प्रतीक्षा रहेगी। — श्रीमती कविता अय्यर, 7-B" },
              ],
            },
            { kind: "actions", actions: ["Send to 7-B parents"] },
          ],
        },
      },
      {
        match: ["late"],
        reply: {
          from: "bhavi",
          blocks: [
            { kind: "text", text: "Rohan Bhat was late 4 times in September, mostly on Mondays. Yash Thakur was late twice. Shall I message their parents?" },
            { kind: "actions", actions: ["Message both parents"] },
          ],
        },
      },
      {
        match: ["attendance", "summarise", "summarize"],
        reply: {
          from: "bhavi",
          blocks: [{ kind: "text", text: "7-B attendance in September was 93.4%. Five students were below 85%: Ishaan Verma, Yash Thakur, Om Bhosale, Sahil Khan and Neel Chavan." }],
        },
      },
    ],
    fallback,
  },

  principal: {
    context: "Principal app · Greenfield Public School",
    intro: [
      user("Which classes had attendance below 85% last week?"),
      {
        from: "bhavi",
        blocks: [
          { kind: "text", text: "Three classes were below 85% last week (28 Sep – 2 Oct):" },
          {
            kind: "table",
            columns: ["Class", "Attendance", "Change", "Class teacher"],
            rows: [
              ["9-C", "81.2%", "▼ 8.4", "Mr. Sameer Kulkarni"],
              ["6-A", "83.9%", "▼ 3.1", "Ms. Fatima Khan"],
              ["11-B", "84.6%", "▼ 1.2", "Ms. Neha Deshpande"],
            ],
          },
          { kind: "text", text: "In 9-C, 6 students were absent for 3 days or more. 4 of their leave notes mention viral fever." },
          { kind: "actions", actions: ["Alert class teachers", "Message these parents", "Open 9-C register"] },
        ],
      },
    ],
    suggestions: ["Draft a message to those parents in Marathi", "Which teachers are behind on syllabus?", "Summarise this week for the trustees"],
    answers: [
      {
        match: ["marathi", "message", "draft"],
        reply: {
          from: "bhavi",
          blocks: [
            { kind: "text", text: "Here's a warm, short draft for the 6 parents in 9-C:" },
            {
              kind: "drafts",
              drafts: [
                { label: "English", text: "Dear parent, your child was absent for more than 3 days last week. We hope they are feeling better! Please share the reason, or call the class teacher if you need any help." },
                { label: "मराठी", text: "नमस्कार! आपला पाल्य मागील आठवड्यात ३ पेक्षा जास्त दिवस शाळेत गैरहजर होता. कृपया कारण कळवा किंवा वर्गशिक्षकांशी संपर्क साधा." },
              ],
            },
            { kind: "actions", actions: ["Send via WhatsApp + app", "Edit"] },
          ],
        },
      },
      {
        match: ["syllabus", "behind"],
        reply: {
          from: "bhavi",
          blocks: [
            { kind: "text", text: "Three teachers are more than 4 points behind the 70% syllabus target:" },
            {
              kind: "table",
              columns: ["Teacher", "Class", "Done"],
              rows: [["Mr. Arjun Reddy", "9-C Social Science", "58%"], ["Mr. Rohan Mehta", "8-C Science", "64%"], ["Mr. Sameer Kulkarni", "9-C Maths", "66%"]],
            },
          ],
        },
      },
      {
        match: ["trustee", "summary", "summarise", "week"],
        reply: {
          from: "bhavi",
          blocks: [
            { kind: "text", text: "This week: students 93.6% present (▲ 1.2), teachers 46 of 49 with every class covered, half-yearly average 74.8% (▲ 2.1 on last year) and 91% of parents active. Keep an eye on 9-C attendance and Class 8 Science." },
            { kind: "actions", actions: ["Export as PDF"] },
          ],
        },
      },
    ],
    fallback,
  },
};

/** Finds the scripted reply for a question (demo only). */
export function scriptedReply(role: Role, question: string): ChatMessage {
  const q = question.toLowerCase();
  const script = chatScripts[role];
  return script.answers.find((answer) => answer.match.some((word) => q.includes(word)))?.reply ?? script.fallback;
}
