import type { Metadata } from "next";
import { ActionButton } from "@/components/blocks/interactive";
import { NoticePreview } from "@/components/blocks/NoticePreview";
import { ReadRates } from "@/components/blocks/principal";
import { Button } from "@/components/ui/Button";
import { FieldLabel, FileChip, TextField } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Toggle";
import { ptmNotice, recentAnnouncements, school } from "@/lib/demo-data";
import { PageNote } from "../../../_components/Greeting";

export const metadata: Metadata = { title: "Announcements" };

/** PHONE · New announcement (/dashboard/principal/announcements) */
export default function PrincipalAnnouncementsPage() {
  return (
    <>
      <PageNote>Write once in English — every parent reads it in their own language.</PageNote>
      <div className="flex gap-2">
        <Button size="xs" variant="secondary" icon="FileText">
          Drafts · 2
        </Button>
        <Button size="xs" variant="secondary" icon="Clock">
          Scheduled · 1
        </Button>
      </div>

      <Card padding="sm" className="flex flex-col gap-3.5">
        <TextField label="Title" name="title" defaultValue={ptmNotice.title} />
        <label className="flex flex-col gap-1.5">
          <span className="text-[12.5px] font-semibold text-ink-2">Message</span>
          <span className="overflow-hidden rounded-xl border border-line-2 focus-within:border-brand-600">
            <span className="flex items-center gap-3 border-b border-line bg-[#faf9fd] px-3 py-2 text-ink-3">
              <Icon name="Bold" className="size-4" />
              <Icon name="Italic" className="size-4" />
              <Icon name="List" className="size-4" />
              <Icon name="Smile" className="size-4" />
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                <Icon name="WandSparkles" className="size-3.5" /> Improve with Bhavi
              </span>
            </span>
            <textarea name="message" rows={6} defaultValue={ptmNotice.body} className="block w-full resize-none px-3.5 py-3 text-[13.5px] leading-relaxed outline-none" />
          </span>
        </label>
        <div className="flex flex-col gap-2">
          <FileChip name="PTM_Schedule_Classwise.pdf" meta="186 KB" right={<Icon name="X" className="size-4 text-ink-3" />} />
          <FileChip name="Campus_map.png" meta="412 KB" kind="img" right={<Icon name="X" className="size-4 text-ink-3" />} />
        </div>
        <div>
          <FieldLabel>Send to</FieldLabel>
          <ChipGroup
            options={[`All parents · ${school.students.toLocaleString("en-IN")}`, `Teachers · ${school.teachers}`, "Choose classes…", "Bus route parents"]}
            defaultValue={[`All parents · ${school.students.toLocaleString("en-IN")}`, `Teachers · ${school.teachers}`]}
            multiple
            size="sm"
            label="Send to"
          />
        </div>
        <div>
          <FieldLabel>Channels</FieldLabel>
          <ChipGroup options={["App", "WhatsApp", "SMS", "Email"]} defaultValue={["App", "WhatsApp", "SMS"]} multiple size="sm" label="Channels" />
        </div>
        <div>
          <FieldLabel hint="auto-translated">Languages</FieldLabel>
          <ChipGroup options={["English", "हिन्दी", "मराठी"]} defaultValue={["English", "हिन्दी", "मराठी"]} multiple size="sm" label="Languages" />
        </div>
        <div className="flex flex-col gap-2.5">
          <Toggle label="Ask parents to confirm attendance" defaultOn />
          <Toggle label="Remind non-readers after 24 h" defaultOn />
        </div>
      </Card>

      <Card padding="sm" className="bg-linear-to-b from-[#f1edff] to-[#fbfaff]">
        <NoticePreview framed={false} />
      </Card>

      <div className="flex flex-col gap-2">
        <ActionButton label="Send to 1,297 people" doneLabel="Sent · translating…" icon="Send" size="lg" full />
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary">Save draft</Button>
          <Button variant="secondary" icon="CalendarClock">
            Schedule
          </Button>
        </div>
      </div>

      <Card padding="sm">
        <CardHeader className="mb-3" title="Recent · read by parents" />
        <ReadRates items={recentAnnouncements} stacked />
      </Card>
    </>
  );
}
