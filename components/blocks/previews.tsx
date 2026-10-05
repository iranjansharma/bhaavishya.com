import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/brand";
import { Pill } from "@/components/ui/Pill";
import { LineChart, Sparkline, heatColor } from "@/components/charts";
import { cn } from "@/lib/utils";

/*
 * Small "screenshots" of the app built from real components — used on the website
 * (hero, role cards, AI section) in both versions. Edit them like any other component.
 */

const miniCard = "rounded-[14px] bg-white px-3.5 py-3 shadow-[0_14px_30px_-16px_rgb(25_23_44/0.35)]";

export function PrincipalMini({ id = "pm" }: { id?: string }) {
  const heat = [96, 94, 97, 92, 95, 98, 91, 93, 97, 95, 88, 94, 96, 97, 93, 95, 92, 96, 98, 94, 90];
  return (
    <div className="relative h-full min-h-[200px]">
      <div className={cn(miniCard, "absolute top-0 left-0 w-[46%] min-w-[150px]")}>
        <div className="text-[11px] font-semibold text-ink-3">Students present</div>
        <div className="text-[24px] font-bold tracking-[-0.03em]">93.6%</div>
        <Sparkline id={`${id}-spark`} values={[92.1, 92.8, 93.4, 92.6, 93.9, 94.4, 93.6]} color="#5134E8" width={130} height={28} />
      </div>
      <div className={cn(miniCard, "absolute top-6 right-0 w-[52%] min-w-[170px]")}>
        <div className="mb-2 text-[11px] font-semibold text-ink-3">Attendance by class</div>
        <div className="grid grid-cols-7 gap-1">
          {heat.map((v, i) => (
            <span key={i} className="aspect-square rounded-[5px]" style={{ background: heatColor(v) }} />
          ))}
        </div>
      </div>
      <div className={cn(miniCard, "absolute bottom-0 left-[8%] flex w-[78%] items-center gap-2")}>
        <Avatar src="/avatars/rohan-m.svg" size={28} />
        <div className="min-w-0 flex-1 text-xs">
          <b>Rohan Mehta</b> · sick leave
          <div className="truncate text-[11px] text-ink-3">Substitute: Pooja Kulkarni</div>
        </div>
        <Pill tone="mint">✓</Pill>
      </div>
    </div>
  );
}

export function TeacherMini() {
  const rows: Array<[string, string, "P" | "A" | "L"]> = [
    ["/avatars/aarav-sharma.svg", "Aarav Sharma", "P"],
    ["/avatars/ishaan-verma.svg", "Ishaan Verma", "A"],
    ["/avatars/kavya-reddy.svg", "Kavya Reddy", "P"],
  ];
  return (
    <div className={miniCard}>
      <div className="mb-1 flex items-center justify-between">
        <b className="text-[13px]">Class 7-B · Period 1</b>
        <Pill tone="mint">35/38</Pill>
      </div>
      {rows.map(([avatar, name, mark]) => (
        <div key={name} className="flex items-center gap-2 border-b border-line py-1.5 last:border-0">
          <Avatar src={avatar} size={26} />
          <span className="flex-1 text-[13px] font-semibold">{name}</span>
          <span className="flex gap-1">
            {(["P", "A", "L"] as const).map((m) => (
              <span
                key={m}
                className={cn(
                  "grid size-[22px] place-items-center rounded-md text-[11px] font-bold",
                  m === mark ? (m === "A" ? "bg-coral-500 text-white" : "bg-mint-500 text-white") : "bg-[#f1eff7] text-ink-3",
                )}
              >
                {m}
              </span>
            ))}
          </span>
        </div>
      ))}
      <div className="mt-2 grid h-7 place-items-center rounded-lg bg-mint-500 text-xs font-semibold text-white">Submit &amp; notify parents</div>
    </div>
  );
}

export function ParentMini() {
  const subjects: Array<[string, number, string]> = [
    ["Maths", 92, "bg-brand-600"],
    ["Science", 89, "bg-mint-500"],
    ["English", 88, "bg-ocean-500"],
    ["Hindi", 74, "bg-marigold-400"],
  ];
  return (
    <div className="relative">
      <div className={cn(miniCard, "w-[84%] min-w-[220px]")}>
        <div className="mb-2 flex items-center gap-2">
          <Avatar src="/avatars/aarav-sharma.svg" size={30} />
          <div>
            <b className="text-[13px]">Aarav · Half-yearly</b>
            <div className="text-[11px] text-ink-3">Class 7-B · 2026–27</div>
          </div>
        </div>
        {subjects.map(([name, value, color]) => (
          <div key={name} className="my-1 flex items-center gap-2">
            <span className="w-[60px] text-xs">{name}</span>
            <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-track">
              <span className={cn("block h-full rounded-full", color)} style={{ width: `${value}%` }} />
            </span>
            <b className="w-5 text-right text-xs tabular-nums">{value}</b>
          </div>
        ))}
      </div>
      <div className={cn(miniCard, "absolute right-0 -bottom-4 w-[120px] text-center")}>
        <div className="text-[26px] font-extrabold tracking-[-0.03em]">86.5%</div>
        <Pill tone="mint">Grade A2 ▲</Pill>
      </div>
    </div>
  );
}

/** Notifications on a phone lock screen (desktop hero). */
export function LockScreenNotifications() {
  const notes = [
    { when: "now", title: "Aarav reached school ✅", body: "Marked present at 8:06 AM by Mrs. Kavita Iyer" },
    { when: "2h ago", title: "Half-yearly report card is out 📄", body: "Aarav scored 86.5% · Grade A2. Tap to view." },
    { when: "Sat", title: "PTM on Saturday, 10 Oct", body: "9:00 AM – 12:00 PM · Tap to confirm" },
  ];
  return (
    <div>
      <div className="mt-5 text-center text-white">
        <div className="text-[15px] opacity-85">Monday, 5 October</div>
        <div className="text-[64px] leading-none font-semibold tracking-[-0.02em]">9:41</div>
      </div>
      <div className="mt-6 flex flex-col gap-2.5 px-3">
        {notes.map((n) => (
          <div key={n.title} className="rounded-[18px] bg-white/90 px-3 py-2.5 text-[12.5px] leading-snug text-ink-2">
            <div className="mb-1 flex items-center gap-1.5 text-[10.5px] tracking-[0.04em] text-ink-3">
              <LogoMark size={16} />
              <b>BHAVISHYA</b>
              <span className="ml-auto">{n.when}</span>
            </div>
            <b className="text-[13px] text-ink">{n.title}</b>
            <div>{n.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** The principal's dashboard as a floating card (desktop hero). */
export function HeroDashboardCard() {
  const trend = [91.8, 92.6, 93.1, 92.2, 93.8, 94.1, 93.4, 94.6, 95.2, 94.4, 95.8, 96.1];
  return (
    <div className="rounded-[20px] border border-white/90 bg-white/90 p-5 shadow-float backdrop-blur">
      <div className="mb-3.5 flex items-start justify-between">
        <div>
          <div className="font-serif text-[19px] font-semibold">Good morning, Dr. Nair</div>
          <div className="text-xs text-ink-3">Monday, 5 October · Greenfield Public School</div>
        </div>
        <Pill tone="mint" icon="Activity">
          Live
        </Pill>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Students present", "93.6%", "▲ 1.2%", "mint"],
          ["Teachers present", "46/49", "3 on leave", "grey"],
          ["Approvals", "7", "5 leave · 2 certs", "marigold"],
        ].map(([label, value, note, tone]) => (
          <div key={label} className="min-w-0 rounded-[13px] border border-line bg-white px-2.5 py-2.5">
            <div className="text-[11px] font-semibold text-ink-3">{label}</div>
            <div className="my-0.5 text-[22px] font-bold tracking-[-0.03em]">{value}</div>
            <Pill tone={tone as "mint" | "grey" | "marigold"} className="max-w-full truncate text-[11px]">
              {note}
            </Pill>
          </div>
        ))}
      </div>
      <div className="mt-3.5">
        <div className="mb-1 flex justify-between text-xs">
          <b>Attendance · last 12 days</b>
          <span className="flex gap-2.5 text-ink-3">
            <span className="inline-flex items-center gap-1">
              <i className="inline-block size-2 rounded-full bg-brand-600" />
              This year
            </span>
            <span className="inline-flex items-center gap-1">
              <i className="inline-block size-2 rounded-full bg-[#c9c2ee]" />
              Last year
            </span>
          </span>
        </div>
        <LineChart
          id="hero-trend"
          labels={trend.map(() => "")}
          series={[
            { values: trend, color: "#5134E8", area: true, endDot: true },
            { values: trend.map((v) => v - 1.6), color: "#C9C2EE", dashed: true, width: 2 },
          ]}
          min={88}
          max={98}
          ticks={[88, 93, 98]}
          width={378}
          height={120}
          padding={[6, 6, 6, 26]}
        />
      </div>
    </div>
  );
}

/** The parent app home screen, shown inside a PhoneFrame on the website. */
export function ParentAppScreen() {
  const tiles: Array<[string, "ChartColumn" | "CalendarCheck" | "NotebookPen" | "CalendarX", string]> = [
    ["Marks", "ChartColumn", "bg-brand-50 text-brand-600"],
    ["Attendance", "CalendarCheck", "bg-mint-50 text-mint-500"],
    ["Homework", "NotebookPen", "bg-teal-50 text-teal-500"],
    ["Leave", "CalendarX", "bg-coral-50 text-coral-500"],
  ];
  return (
    <div className="h-full bg-canvas">
      <div className="flex items-center gap-2 px-3.5 pt-1.5">
        <Avatar src="/avatars/priya.svg" size={32} />
        <div className="flex-1">
          <div className="text-[11px] text-ink-3">नमस्ते 👋</div>
          <b className="text-[13px]">Priya Sharma</b>
        </div>
        <span className="relative grid size-8 place-items-center rounded-[10px] border border-line-2 bg-white">
          <Icon name="Bell" className="size-4" />
          <span className="absolute -top-1 -right-1 size-3.5 rounded-full border-2 border-white bg-coral-500" />
        </span>
      </div>
      <div className="mx-3 mt-3 rounded-[20px] bg-ai p-3.5 text-white">
        <div className="flex items-center gap-2">
          <Avatar src="/avatars/aarav-sharma.svg" size={36} />
          <div>
            <b className="text-[13px]">Aarav Sharma</b>
            <div className="text-[11px] text-[#d3ccff]">Class 7-B · Roll 02</div>
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-1.5 rounded-[9px] bg-mint-500/20 px-2 py-1 text-[11px] font-semibold text-[#c9ffe9]">
          <Icon name="CircleCheck" className="size-3" /> In school · present at 8:06 AM
        </div>
        <div className="mt-2.5 flex justify-between text-center">
          {[
            ["94.5%", "Attendance"],
            ["86.5%", "Half-yearly"],
            ["2", "Homework due"],
          ].map(([v, l]) => (
            <div key={l}>
              <b className="text-base">{v}</b>
              <div className="text-[9.5px] text-[#c7bfff]">{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-3 mt-3 grid grid-cols-4 gap-1.5">
        {tiles.map(([label, icon, cls]) => (
          <div key={label} className="flex flex-col items-center gap-1 rounded-[14px] bg-white px-1 py-2 text-[10px] font-semibold text-ink-2 shadow-card">
            <span className={cn("grid size-8 place-items-center rounded-[10px]", cls)}>
              <Icon name={icon} className="size-4" />
            </span>
            {label}
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3 flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 shadow-card">
        <span className="grid size-[34px] place-items-center rounded-[10px] bg-marigold-50 text-marigold-500">
          <Icon name="Megaphone" className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <b className="text-xs">PTM · Saturday, 10 October</b>
          <div className="text-[11px] text-ink-3">9 AM – 12 PM · tap to confirm</div>
        </div>
        <Icon name="ChevronRight" className="size-4 text-ink-3" />
      </div>
    </div>
  );
}

/** The Bhavi chat window shown on the website (static). */
export function BhaviShowcase({ compact = false }: { compact?: boolean }) {
  const bars: Array<[string, number, string]> = [
    ["UT-1", 78, "bg-[#c9c2ee]"],
    ["UT-2", 85, "bg-brand-400"],
    ["Half-yearly", 92, "bg-brand-600"],
  ];
  return (
    <div className="overflow-hidden rounded-3xl bg-white text-ink shadow-[0_40px_90px_-30px_rgb(0_0_0/0.6)]">
      <div className="flex items-center gap-2.5 border-b border-line px-4 py-3.5">
        <LogoMark size={32} />
        <div className="min-w-0 flex-1">
          <b>Ask Bhavi</b>
          <div className="truncate text-xs text-ink-3">Parent app · Aarav Sharma, 7-B</div>
        </div>
        <span className="inline-flex overflow-hidden rounded-[10px] border border-line-2 text-[12px] font-semibold">
          <span className="px-2 py-1 text-ink-3">EN</span>
          <span className="bg-ink px-2 py-1 text-white">हिं</span>
          <span className="px-2 py-1 text-ink-3">मरा</span>
        </span>
      </div>
      <div className={cn("flex flex-col gap-3 bg-[#fbfafe]", compact ? "p-3.5" : "p-[18px]")}>
        <div className="max-w-[80%] self-end rounded-[18px_18px_4px_18px] bg-brand-600 px-3.5 py-2.5 text-[14.5px] text-white">आरव का गणित में प्रदर्शन कैसा है?</div>
        <div className="max-w-[92%] self-start rounded-[18px_18px_18px_4px] border border-line bg-white px-3.5 py-3 text-[14px] leading-relaxed text-ink-2">
          आरव ने अर्धवार्षिक परीक्षा में गणित में <b className="text-ink">92/100</b> अंक प्राप्त किए — कक्षा के शीर्ष 10% में! 👏
          <div className="mt-2.5 rounded-xl border border-line bg-[#faf9fd] px-3 py-2">
            {bars.map(([label, value, color]) => (
              <div key={label} className="my-1 flex items-center gap-2">
                <span className="w-[76px] text-xs">{label}</span>
                <span className="h-[7px] flex-1 overflow-hidden rounded-full bg-track">
                  <span className={cn("block h-full rounded-full", color)} style={{ width: `${value}%` }} />
                </span>
                <b className="text-xs tabular-nums">{value}</b>
              </div>
            ))}
          </div>
        </div>
        {compact ? null : (
          <>
            <div className="max-w-[80%] self-end rounded-[18px_18px_4px_18px] bg-brand-600 px-3.5 py-2.5 text-[14.5px] text-white">What should he work on next?</div>
            <div className="max-w-[92%] self-start rounded-[18px_18px_18px_4px] border border-line bg-white px-3.5 py-3 text-[14px] leading-relaxed text-ink-2">
              Hindi is his lowest subject (74). Mrs. Sunita Rao suggests 15 minutes of Hindi reading daily. Want me to add a reminder for you?
              <div className="mt-2.5 flex flex-wrap gap-2">
                {["Yes, remind me at 7 PM", "Show Hindi marks", "Message the teacher"].map((s) => (
                  <span key={s} className="rounded-full bg-brand-50 px-2.5 py-1 text-[12.5px] font-semibold text-brand-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center gap-2.5 border-t border-line px-3.5 py-3">
        <div className="flex h-[42px] flex-1 items-center gap-2 rounded-xl border border-line-2 px-3 text-[13.5px] text-ink-3">
          <Icon name="Mic" className="size-4" /> Ask in any language…
        </div>
        <span className="grid size-[42px] place-items-center rounded-xl bg-brand-600 text-white">
          <Icon name="Send" className="size-4" />
        </span>
      </div>
    </div>
  );
}
