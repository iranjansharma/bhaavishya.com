"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/brand";

/**
 * Floating "Bhavi" button on the website. Opens a small greeting that leads to a demo.
 * Replace with your live-chat tool (e.g. a WhatsApp link or an AI chat) when you go live.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);

  // Say hello after a few seconds, once per visit.
  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 4000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="fixed right-7 bottom-6 z-40 flex items-end gap-3">
      {open ? (
        <div className="w-[300px] animate-rise rounded-[18px_18px_6px_18px] border border-line bg-white px-4 py-3.5 shadow-float">
          <div className="mb-1.5 flex items-center gap-2">
            <LogoMark size={22} />
            <b className="text-[13.5px]">Bhavi</b>
            <span className="rounded-full bg-mint-50 px-1.5 py-0.5 text-[10.5px] font-semibold text-mint-700">● Online</span>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="ml-auto text-ink-3 hover:text-ink">
              <Icon name="X" className="size-4" />
            </button>
          </div>
          <p className="text-[13.5px] leading-normal text-ink-2">Hi! 👋 Want to see Bhavishya with your school&apos;s data? I can book a demo in 30 seconds.</p>
          <div className="mt-2.5 flex gap-2">
            <Button size="xs" href="/book-demo">
              Book a demo
            </Button>
            <Button size="xs" variant="secondary" href="/demo">
              Try the live demo
            </Button>
          </div>
        </div>
      ) : null}
      <button
        type="button"
        aria-label={open ? "Close chat" : "Chat with Bhavi"}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-[60px] place-items-center rounded-full bg-linear-to-br from-[#7b5cff] to-brand-700 shadow-[0_14px_30px_-8px_rgb(81_52_232/0.7)]"
      >
        <LogoMark size={34} />
        <span className="absolute top-1 right-1 size-3 rounded-full border-[2.5px] border-white bg-mint-500" />
      </button>
    </div>
  );
}
