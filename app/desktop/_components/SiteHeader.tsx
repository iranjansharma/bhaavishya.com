import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/brand";
import { siteNav } from "@/lib/site-content";

/** Desktop website header (sticky). Links come from lib/site-content.ts. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/5 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center gap-9 px-8">
        <Logo />
        <nav className="flex gap-7 text-[14.5px] font-medium text-ink-2">
          {siteNav.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <Button variant="ghost" href="/demo">
            Log in
          </Button>
          <Button variant="dark" href="/book-demo" iconRight="ArrowRight">
            Book a free demo
          </Button>
        </div>
      </div>
    </header>
  );
}
