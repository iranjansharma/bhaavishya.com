import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/brand";
import { brand, footer } from "@/lib/site-content";

/** Desktop website footer. "Mobile site" lets anyone preview the phone version. */
export function SiteFooter() {
  return (
    <footer className="border-t border-sand bg-cream">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 px-8 py-14">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-2">{footer.note}</p>
        </div>
        {footer.columns.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-bold tracking-[0.08em] text-ink-3 uppercase">{col.title}</div>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div className="text-xs font-bold tracking-[0.08em] text-ink-3 uppercase">Talk to us</div>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-2">
            <li className="flex items-center gap-2">
              <Icon name="Mail" className="size-4" /> {brand.email}
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Phone" className="size-4" /> {brand.phone}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-5 text-xs text-ink-3">
          <span>
            © 2026 {brand.name}. Demo content — all names and data are sample data.
          </span>
          {/* Plain <a> on purpose: the request must reach proxy.ts so it can remember the choice. */}
          <a href="?view=mobile" className="inline-flex items-center gap-1.5 font-semibold text-ink-2 hover:text-ink">
            <Icon name="Smartphone" className="size-3.5" /> Mobile site
          </a>
        </div>
      </div>
    </footer>
  );
}
