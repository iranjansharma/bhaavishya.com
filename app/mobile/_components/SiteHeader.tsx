"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/brand";
import { siteNav } from "@/lib/site-content";

/** Phone website header: logo, "Book demo" and a menu that slides down. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Stop the page scrolling behind the open menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-ink/5 bg-cream/90 px-4 backdrop-blur-md">
        <Logo size={32} tagline={false} />
        <div className="ml-auto flex items-center gap-1.5">
          <Button size="sm" variant="dark" href="/book-demo">
            Book demo
          </Button>
          <button type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)} className="grid size-10 place-items-center rounded-xl text-ink">
            <Icon name="Menu" className="size-6" />
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 mx-auto max-w-[480px]" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-night-950/40" onClick={() => setOpen(false)} />
          <div className="relative animate-rise rounded-b-3xl bg-cream px-4 pt-3 pb-5 shadow-float">
            <div className="flex h-11 items-center">
              <Logo size={32} tagline={false} />
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="ml-auto grid size-10 place-items-center rounded-xl">
                <Icon name="X" className="size-6" />
              </button>
            </div>
            <nav className="mt-2 flex flex-col">
              {siteNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-sand py-3.5 text-[17px] font-semibold"
                >
                  {item.label}
                  <Icon name="ChevronRight" className="size-5 text-ink-3" />
                </Link>
              ))}
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <Button variant="secondary" href="/demo" size="lg" icon="CirclePlay">
                Live demo
              </Button>
              <Button href="/book-demo" size="lg">
                Book demo
              </Button>
            </div>
            {/* Plain <a> on purpose: proxy.ts sees ?view=desktop and remembers the choice. */}
            <a href="?view=desktop" className="mt-4 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-ink-3">
              <Icon name="Monitor" className="size-4" /> Switch to desktop site
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
