import type { Metadata } from "next";
import { Certificate } from "@/components/blocks/Certificate";
import { ActionButton } from "@/components/blocks/interactive";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { IconTile, Pill } from "@/components/ui/Pill";
import { achievements, certificate, schoolDocuments } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Certificates" };

/** PHONE · Certificates & documents (/dashboard/parent/certificates) */
export default function ParentCertificatesPage() {
  return (
    <>
      <Card padding="sm" className="bg-linear-to-b from-[#f8f6fd] to-white">
        <div className="mb-3 flex items-center justify-between gap-2">
          <b className="truncate text-[14px]">
            {certificate.award} · Science Quiz
          </b>
          <Pill tone="mint" icon="ShieldCheck">
            QR verified
          </Pill>
        </div>
        <Certificate size="sm" />
        <div className="mt-4 grid grid-cols-2 gap-2">
          <ActionButton label="Share" doneLabel="Link copied" variant="secondary" icon="Share2" size="md" />
          <ActionButton label="Download" doneLabel="Downloaded" icon="Download" size="md" />
        </div>
        <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11.5px] text-ink-3">
          <Icon name="Lock" className="size-3" /> Anyone can scan the QR code to check it&apos;s genuine.
        </p>
      </Card>

      <Card padding="sm">
        <CardHeader className="mb-1.5" title="Achievements" right={`${achievements.length}`} />
        <ul className="flex flex-col gap-1">
          {achievements.map((a, i) => (
            <li key={a.title} className={cn("flex items-center gap-3 rounded-xl px-2 py-2", i === 0 && "border border-brand-200 bg-brand-50")}>
              <IconTile icon={a.icon} tone={a.tone} />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">{a.title}</div>
                <div className="text-xs text-ink-3">{a.date}</div>
              </div>
              <Icon name="ChevronRight" className="size-4 text-ink-3" />
            </li>
          ))}
        </ul>
      </Card>

      <Card padding="sm">
        <CardHeader title="School documents" right="Ready in minutes" />
        <ul className="divide-y divide-line">
          {schoolDocuments.map((d) => (
            <li key={d.title} className="flex items-center gap-3 py-2.5">
              <IconTile icon={d.icon} tone="grey" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">{d.title}</div>
                <div className="truncate text-xs text-ink-3">{d.note}</div>
              </div>
              {d.action === "download" ? (
                <Button size="xs" variant="secondary" icon="Download">
                  PDF
                </Button>
              ) : d.action === "review" ? (
                <Pill tone="marigold">In review</Pill>
              ) : (
                <ActionButton label="Request" doneLabel="Sent" variant="soft" size="xs" />
              )}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
