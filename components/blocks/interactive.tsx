"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/* Small interactive pieces. Each keeps its own state; connect them to your API later. */

/** "Confirm I'll attend" + "Add to calendar" for an event notice. */
export function RsvpButtons({ className }: { className?: string }) {
  const [going, setGoing] = useState(false);
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {going ? (
        <span className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-mint-50 px-2.5 text-xs font-semibold text-mint-700">
          <Icon name="Check" className="size-3.5" /> You're attending
        </span>
      ) : (
        <Button size="xs" variant="marigold" onClick={() => setGoing(true)}>
          Confirm I&apos;ll attend
        </Button>
      )}
      <Button size="xs" variant="secondary" icon="CalendarPlus">
        Add to calendar
      </Button>
    </div>
  );
}

/** Approve / Decline pair that turns into a status label after a tap. */
export function DecisionButtons({ approveLabel = "Approve", stacked = false }: { approveLabel?: string; stacked?: boolean }) {
  const [decision, setDecision] = useState<"approved" | "declined" | null>(null);
  if (decision) {
    return (
      <span
        className={cn(
          "inline-flex h-7 shrink-0 items-center gap-1 rounded-lg px-2.5 text-xs font-semibold",
          decision === "approved" ? "bg-mint-50 text-mint-700" : "bg-coral-50 text-coral-700",
        )}
      >
        <Icon name={decision === "approved" ? "Check" : "X"} className="size-3.5" />
        {decision === "approved" ? "Approved" : "Declined"}
      </span>
    );
  }
  return (
    <span className={cn("flex shrink-0 gap-1.5", stacked && "flex-col")}>
      <Button size="xs" variant={stacked ? "primary" : "mint"} icon={stacked ? undefined : "Check"} onClick={() => setDecision("approved")}>
        {approveLabel}
      </Button>
      <Button size="xs" variant="secondary" onClick={() => setDecision("declined")}>
        Decline
      </Button>
    </span>
  );
}

/** A button that shows a short confirmation after it is pressed (e.g. "Reminder sent"). */
export function ActionButton({
  label,
  doneLabel,
  variant = "primary",
  size = "sm",
  icon,
  full,
}: {
  label: string;
  doneLabel: string;
  variant?: "primary" | "secondary" | "marigold" | "mint" | "soft" | "glass" | "dark";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: IconName;
  full?: boolean;
}) {
  const [done, setDone] = useState(false);
  return (
    <Button variant={done ? "secondary" : variant} size={size} icon={done ? "Check" : icon} full={full} onClick={() => setDone(true)}>
      {done ? doneLabel : label}
    </Button>
  );
}
