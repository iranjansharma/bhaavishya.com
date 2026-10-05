"use client";

import { useState } from "react";
import { FileChip } from "@/components/ui/bits";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/brand";
import { PhoneFrame } from "@/components/ui/Phone";
import { ptmNotice, school } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const TABS = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हिं" },
  { code: "mr", label: "मरा" },
] as const;

/** Shows how the notice looks on a parent's phone, in each language. */
export function NoticePreview({ framed = true }: { framed?: boolean }) {
  const [lang, setLang] = useState<"en" | "hi" | "mr">("hi");
  const t = ptmNotice.translations[lang];

  const card = (
    <div className="rounded-[18px] bg-white p-3.5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-marigold-50 px-2 py-0.5 text-[11px] font-semibold text-marigold-700">
          <Icon name="Pin" className="size-3" /> {t.badge}
        </span>
        <span className="text-[11px] text-ink-3">{t.when}</span>
      </div>
      <div className="mt-2 text-[14.5px] leading-snug font-bold">{t.title}</div>
      <p className="mt-1.5 text-[12px] leading-relaxed text-ink-2">{t.body}</p>
      <FileChip className="mt-2.5 py-1.5" name="PTM_Schedule.pdf" meta="186 KB" />
      <div className="mt-2.5 flex gap-1.5">
        <span className="inline-flex h-8 flex-1 items-center justify-center gap-1 rounded-lg bg-brand-600 text-xs font-semibold text-white">
          <Icon name="Check" className="size-3.5" /> {t.confirm}
        </span>
        <span className="inline-flex h-8 items-center rounded-lg border border-line-2 px-3 text-xs font-semibold">{t.seen}</span>
      </div>
      {lang !== "en" ? (
        <div className="mt-2 flex items-center gap-1 text-[11px] text-ink-3">
          <Icon name="Languages" className="size-3" /> Translated from English · <u>View original</u>
        </div>
      ) : null}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 flex w-full items-center justify-between">
        <b className="text-[13px]">Preview · parent&apos;s phone</b>
        <div className="inline-flex overflow-hidden rounded-[10px] border border-line-2 bg-white" role="tablist" aria-label="Preview language">
          {TABS.map((tab) => (
            <button
              key={tab.code}
              type="button"
              role="tab"
              aria-selected={lang === tab.code}
              onClick={() => setLang(tab.code)}
              className={cn("px-2.5 py-1.5 text-[12.5px] font-semibold", lang === tab.code ? "bg-ink text-white" : "text-ink-3")}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {framed ? (
        <PhoneFrame time="10:16" screenClassName="bg-canvas">
          <div className="flex items-center gap-2 px-3.5 pt-1.5">
            <LogoMark size={26} />
            <b className="text-[13px]">{school.name}</b>
          </div>
          <div className="px-3 pt-3">{card}</div>
          <div className="mx-3 mt-2.5 flex items-center gap-2.5 rounded-2xl bg-white px-3 py-2.5 opacity-75">
            <span className="grid size-[30px] place-items-center rounded-[9px] bg-mint-50 text-mint-500">
              <Icon name="CircleCheck" className="size-3.5" />
            </span>
            <div className="text-xs">
              <b>Aarav reached school</b>
              <div className="text-[11px] text-ink-3">8:06 AM · Class 7-B</div>
            </div>
          </div>
        </PhoneFrame>
      ) : (
        <div className="w-full rounded-[22px] bg-canvas p-3">{card}</div>
      )}
    </div>
  );
}
