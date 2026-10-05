import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream px-6 text-center">
      <div>
        <p className="text-sm font-bold tracking-[0.14em] text-brand-600 uppercase">404</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight">This page doesn&apos;t exist yet</h1>
        <p className="mt-3 text-ink-2">Check the address, or go back to the home page.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex h-11 items-center rounded-xl bg-brand-600 px-5 font-semibold text-white">
            Home
          </Link>
          <Link href="/demo" className="inline-flex h-11 items-center rounded-xl border border-line-2 bg-white px-5 font-semibold">
            Live demo
          </Link>
        </div>
      </div>
    </main>
  );
}
