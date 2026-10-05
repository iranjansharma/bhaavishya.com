# Bhavishya — school website + app template

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript

This template has **one marketing website** and **one app**. The app has three sections: Parent, Teacher and Principal. Every page comes in **two separate versions**: one designed for computers and one designed for phones. Both versions use the same address. The site picks the right version for each visitor.

Everything is filled with sample data for a demo school, *Greenfield Public School, Pune*, so every screen looks real from the first run.

---

## 1. Run it

You need **Node.js 20.9 or newer**.

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

**See the phone version on your computer:** open `http://localhost:3000/?view=mobile`.
To go back, use `?view=desktop`. To return to automatic choice, use `?view=auto`.
Each page also has a link for this: on desktop it's in the footer and the profile menu, and on phones it's in the menu.
You can also use your browser's device toolbar. Pick an iPhone and reload.

---

## 2. What's inside

| Address | What it is | Desktop file | Phone file |
|---|---|---|---|
| `/` | Home page | `app/desktop/(website)/page.tsx` | `app/mobile/(website)/page.tsx` |
| `/pricing` | Silver · Gold · Platinum (+ Diamond), yearly/monthly, price calculator, FAQ | `…/(website)/pricing/page.tsx` | same path under `app/mobile` |
| `/book-demo` | Demo booking form with day and time slots | `…/(website)/book-demo/page.tsx` | ″ |
| `/demo` | Live demo: pick a role and enter the app | `…/(website)/demo/page.tsx` | ″ |
| `/dashboard/parent` | Parent home: child's day, announcements, homework, fees, holidays | `app/desktop/dashboard/parent/page.tsx` | `app/mobile/dashboard/parent/page.tsx` |
| `/dashboard/parent/marks` | Marks, report card, progress chart, AI summary | `…/parent/marks/page.tsx` | ″ |
| `/dashboard/parent/attendance` | Attendance calendar and holidays | `…/parent/attendance/page.tsx` | ″ |
| `/dashboard/parent/leave` | Apply for leave (with doctor's note), leave history | `…/parent/leave/page.tsx` | ″ |
| `/dashboard/parent/certificates` | QR-verified certificates and school documents | `…/parent/certificates/page.tsx` | ″ |
| `/dashboard/teacher` | Teacher's day: schedule, leave requests, homework, AI suggestions | `…/teacher/page.tsx` | ″ |
| `/dashboard/teacher/attendance` | Mark attendance (everyone present, tap the exceptions) | `…/teacher/attendance/page.tsx` | ″ |
| `/dashboard/teacher/gradebook` | Enter marks; totals and grades update live | `…/teacher/gradebook/page.tsx` | ″ |
| `/dashboard/teacher/homework` | Post homework with photos/PDFs, check submissions | `…/teacher/homework/page.tsx` | ″ |
| `/dashboard/principal` | School overview: attendance trend and heatmap, approvals, staff on leave | `…/principal/page.tsx` | ″ |
| `/dashboard/principal/teachers` | Teacher attendance and performance | `…/principal/teachers/page.tsx` | ″ |
| `/dashboard/principal/announcements` | Write a notice once; parents read it in English, हिन्दी or मराठी | `…/principal/announcements/page.tsx` | ″ |
| `/dashboard/{role}/ask` | **Ask Bhavi**, the AI chat, in every section | `…/{role}/ask/page.tsx` | ″ |

Inside the app you can switch roles, change the language (EN · हिं · मरा) and open Ask Bhavi from any page.
On desktop, roles and language are in the top bar.
On phones, use the round Bhavi button and the **Menu** tab.

---

## 3. How desktop and mobile are kept separate

```
proxy.ts                 ← decides: phone → app/mobile, computer or tablet → app/desktop
app/
  layout.tsx             ← shared: fonts, page title
  globals.css            ← shared: colours, shadows, fonts (Tailwind @theme)
  desktop/               ← EVERYTHING computers see
    (website)/…            website pages + header/footer
    dashboard/…            the app: parent/, teacher/, principal/
    _components/           desktop-only frame: sidebar, top bar, site header…
  mobile/                ← EVERYTHING phones see
    (website)/…
    dashboard/…
    _components/           phone-only frame: bottom tab bar, menu sheet, sticky buttons…
components/              ← shared building blocks used by both versions
  ui/                      buttons, cards, chips, icons…
  blocks/                  bigger pieces: gradebook, attendance marker, chat, pricing…
  charts/                  line chart, ring, histogram (plain SVG, no library)
lib/                     ← all text, sample data and menus (edit these first)
```

`proxy.ts` is what Next.js 16 calls the old `middleware.ts`.
It reads the browser's user agent and quietly serves `app/mobile/...` or `app/desktop/...`.
The address bar never changes: `/pricing` stays `/pricing` on both.

- Want **tablets on the phone version**? In `lib/view.ts`, add `|| deviceType === "tablet"`.
- A manual choice made with `?view=` is remembered for 30 days in a cookie called `bhavishya-view`.

Some blocks look different on each device, so they take a `layout` prop.
Examples: `<Gradebook layout="table" />` on desktop and `<Gradebook layout="cards" />` on phones.
Others are `AttendanceMarker` (`grid`/`list`), `PricingPlans`, `LeaveForm` and `DemoBookingForm` (`desktop`/`mobile`).

**Rule for phone pages:** don't use `sm:`/`md:`/`lg:` breakpoints. Phone pages are always phone-width. Phone pages and desktop pages are separate files, so there's nothing to respond to.

---

## 4. Where to change things

| To change… | Edit |
|---|---|
| Website text: hero, features, steps, FAQ, footer | `lib/site-content.ts` |
| **Prices and plans** (Silver ₹149, Gold ₹299, Platinum ₹499, Diamond) | `plans`, `diamondPlan`, `MONTHLY_MARKUP`, `GST_RATE` in `lib/site-content.ts` |
| Demo-booking days, time slots, host | `demoForm` in `lib/site-content.ts` |
| Sample school, students, marks, teachers… | `lib/demo-data.ts` |
| App menus and phone tabs | `lib/navigation.ts` |
| Translations (EN / हिन्दी / मराठी) | `lib/i18n.ts` |
| Ask Bhavi's demo answers | `lib/chat.ts` |
| Colours, shadows, fonts | `app/globals.css` (`@theme`) and `app/layout.tsx` |
| Logo and app icon | `public/logo.svg`, `app/icon.svg`, `components/ui/brand.tsx` |
| Profile pictures | `public/avatars/` (illustrations; see the note on photos below) |

Need more icons? Use any [Lucide](https://lucide.dev) icon. Copy its shapes into `components/ui/icon-data.ts` in the same format.

---

## 5. Add a new page

Example: a timetable page for teachers.

1. Create `app/desktop/dashboard/teacher/timetable/page.tsx`.
2. Create `app/mobile/dashboard/teacher/timetable/page.tsx`.
3. Add it to `sidebarNav.teacher` in `lib/navigation.ts`. The same list feeds the phone's menu sheet. Add it to `mobileTabs` too if it should be a bottom tab.
4. Add the menu label to `lib/i18n.ts`.

Copy a neighbouring page to start. Page files should only export the page (`export default`) and `metadata`.

---

## 6. Turning the demo into the real product

Everything interactive already works on screen: buttons, forms, chat, the calculator, language switching. None of it saves anything yet. These are the places to connect:

- **Login and roles.** The demo lets anyone enter any role. Add authentication, then send each person to their own section. Use [Auth.js](https://authjs.dev), [Clerk](https://clerk.com) or [Supabase Auth](https://supabase.com/auth). Phone-number OTP login suits parents.
- **Database.** Pages import sample data from `lib/demo-data.ts`. Replace those imports with real queries in the (server) page files. The shapes in that file are a good starting schema.
- **Forms.** Each one has a `TODO` comment:
  - `DemoBookingForm` → your CRM or Google Sheet, plus a WhatsApp confirmation
  - `LeaveForm` → save the request, upload the attachment, notify the class teacher
  - `AttendanceMarker` → save marks, alert parents of absent and late students
  - `Gradebook` → save while the teacher types, publish when ready
  - Homework and announcement pages → save and notify
- **Ask Bhavi (AI).** See `askBhavi()` in `components/blocks/ChatPanel.tsx`. Point it at your own API route, for example `app/api/bhavi/route.ts`. That route calls your AI model with **only the data the signed-in person is allowed to see**. A parent should see only their own child.
- **WhatsApp / SMS.** Connect the WhatsApp Business Platform or an Indian SMS provider for alerts and notices.
- **Fee payments.** "Pay now · UPI or card" needs a payment gateway, such as Razorpay, Cashfree or PayU.
- **QR certificates.** `QrCode` in `components/ui/brand.tsx` draws a placeholder pattern. Generate real codes with a library such as `qrcode`, and add a public `/verify/[id]` page.
- **Photos.** The template uses illustrated avatars on purpose. Use real photos of children only with written parental consent, and store them privately.

---

## 7. Put it online

- **Vercel (easiest):** push the folder to GitHub, then *Import Project* on vercel.com. `proxy.ts` works as is.
- **Your own server:** `npm run build`, then `npm start`, on Node 20.9+.
- Static export (`output: "export"`) is **not** supported, because `proxy.ts` needs a server to pick the version.

On Next.js 15 instead of 16, rename `proxy.ts` to `middleware.ts`. Also rename the function `proxy` to `middleware`.

---

## 8. Notes

- **How this template was checked.** Packages couldn't be downloaded from npm where this was built. Instead:
  - The code was type-checked with TypeScript.
  - The styles were compiled with the real Tailwind CSS v4 compiler.
  - All 38 pages (19 desktop + 19 phone) were rendered with React 19.
  - The pages were tested in Chromium at 1440×900 and 390×844: clicks, forms, chat, language and role switching.
  - The `proxy.ts` routing was unit-tested.

  Run `npm run build` once after `npm install` for the full Next.js check. If anything is flagged, it'll be a small type fix.
- All names, schools and numbers are invented sample data.
- Icons are from Lucide (ISC licence). Fonts are Inter, Lora and Noto Sans Devanagari (Google Fonts, OFL).
