import type { Metadata } from "next";
import { Certificate } from "@/components/blocks/Certificate";
import { ActionButton } from "@/components/blocks/interactive";
import { T } from "@/components/i18n/language";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { IconTile, Pill } from "@/components/ui/Pill";
import { achievements, certificate, kids, schoolDocuments } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { PageHeader } from "../../../_components/PageHeader";

export const metadata: Metadata = { title: "Certificates" };

/** DESKTOP · Certificates & documents (/dashboard/parent/certificates) */
export default function ParentCertificatesPage() {
  const child = kids[0];
  return (
    <>
      <PageHeader
        title={<T k="nav.certificates" />}
        subtitle={`Download, share or verify ${child.firstName}'s certificates any time — no more queues at the school office.`}
        actions={
          <Button icon="Plus" href="/dashboard/parent/certificates">
            Request a certificate
          </Button>
        }
      />
      <div className="grid grid-cols-[1.32fr_1fr] items-start gap-[18px]">
        <Card className="bg-linear-to-b from-[#f8f6fd] to-white">
          <CardHeader
            className="mb-5"
            title={`${certificate.award} · ${certificate.event}`}
            right={
              <Pill tone="mint" icon="ShieldCheck">
                QR verified
              </Pill>
            }
          />
          <Certificate />
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-xs text-ink-3">
              <Icon name="Lock" className="size-3.5" /> Tamper-proof — anyone can scan the QR code to confirm it&apos;s genuine.
            </span>
            <div className="flex shrink-0 gap-2">
              <ActionButton label="Share on WhatsApp" doneLabel="Link copied" variant="secondary" icon="Share2" />
              <ActionButton label="Download PDF" doneLabel="Downloaded" icon="Download" />
            </div>
          </div>
        </Card>
        <div className="flex flex-col gap-[18px]">
          <Card>
            <CardHeader className="mb-2" title="Achievements" right={`${achievements.length} certificates`} />
            <ul className="flex flex-col gap-1">
              {achievements.map((a, i) => (
                <li key={a.title} className={cn("flex items-center gap-3 rounded-xl px-2.5 py-2", i === 0 && "border border-brand-200 bg-brand-50")}>
                  <IconTile icon={a.icon} tone={a.tone} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold">{a.title}</div>
                    <div className="text-xs text-ink-3">{a.date} · QR verified</div>
                  </div>
                  {i === 0 ? <Pill tone="brand">Viewing</Pill> : <Icon name="ChevronRight" className="size-4 text-ink-3" />}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
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
                    <ActionButton label="Request" doneLabel="Requested" variant="soft" size="xs" />
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
