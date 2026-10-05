import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/brand";
import { brand, footer } from "@/lib/site-content";

/** Phone website footer. */
export function SiteFooter() {
  return (
    <footer className="border-t border-sand bg-cream px-5 pt-10 pb-28">
      <Logo size={34} />
      <p className="mt-3 text-sm text-ink-2">{footer.note}</p>
      <div className="mt-6 grid grid-cols-2 gap-6">
        {footer.columns.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-bold tracking-[0.08em] text-ink-3 uppercase">{col.title}</div>
            <ul className="mt-2.5 flex flex-col gap-2 text-sm text-ink-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-2 text-sm text-ink-2">
        <a href={`mailto:${brand.email}`} className="flex items-center gap-2">
          <Icon name="Mail" className="size-4" /> {brand.email}
        </a>
        <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="flex items-center gap-2">
          <Icon name="Phone" className="size-4" /> {brand.phone}
        </a>
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-sand pt-4 text-xs text-ink-3">
        <span>© 2026 {brand.name} · sample data</span>
        <a href="?view=desktop" className="inline-flex items-center gap-1.5 font-semibold text-ink-2">
          <Icon name="Monitor" className="size-3.5" /> Desktop site
        </a>
      </div>
    </footer>
  );
}
