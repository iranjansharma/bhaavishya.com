import type { ReactNode } from "react";
import { Greeting } from "@/components/i18n/language";

/** "Good morning, Priya" heading used on the phone home pages. */
export function GreetingHeader({ name, subtitle }: { name: string; subtitle: string }) {
  return (
    <div>
      <h1 className="font-serif text-[26px] leading-tight font-semibold tracking-[-0.02em]">
        <Greeting name={name} />
      </h1>
      <p className="mt-0.5 text-[13px] text-ink-3">{subtitle}</p>
    </div>
  );
}

/** One-line description under the top bar on phone pages. */
export function PageNote({ children }: { children: ReactNode }) {
  return <p className="-mb-1 text-[13px] text-ink-3">{children}</p>;
}
