import { Button } from "@/components/ui/Button";

/** Buttons that stay at the bottom of the screen on the phone home page. */
export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[480px] border-t border-sand bg-cream/95 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-md">
      <div className="grid grid-cols-2 gap-2.5">
        <Button variant="secondary" href="/demo" icon="CirclePlay">
          Live demo
        </Button>
        <Button href="/book-demo" iconRight="ArrowRight">
          Book a demo
        </Button>
      </div>
    </div>
  );
}
