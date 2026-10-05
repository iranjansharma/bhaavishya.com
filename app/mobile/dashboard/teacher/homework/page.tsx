import type { Metadata } from "next";
import { ActionButton } from "@/components/blocks/interactive";
import { AttachmentTile, BoardThumb, SubmissionCard, WorksheetThumb } from "@/components/blocks/teacher";
import { AvatarStack } from "@/components/ui/Avatar";
import { FieldLabel, TextArea, TextField } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Chip, ChipGroup } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { IconTile, Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { Tabs } from "@/components/ui/Tabs";
import { Toggle } from "@/components/ui/Toggle";
import { homeworkSubmissions, notSubmitted, recentHomework, teacherToday } from "@/lib/demo-data";
import { PageNote } from "../../../_components/Greeting";

export const metadata: Metadata = { title: "Homework" };

/** PHONE · Homework (/dashboard/teacher/homework) — check submissions, or post new work. */
export default function TeacherHomeworkPage() {
  const hw = teacherToday.homework;

  const submissions = (
    <div className="flex flex-col gap-4">
      <Card padding="sm">
        <CardHeader title={hw.title} right="Due today, 8 PM" />
        <div className="mt-3 flex items-center gap-3">
          <Progress value={(hw.submitted / hw.total) * 100} tone="mint" className="flex-1" />
          <b className="text-[13px] tabular-nums">
            {hw.submitted} of {hw.total}
          </b>
        </div>
        <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-brand-100 bg-brand-50 px-3 py-2.5">
          <Icon name="Sparkles" className="mt-0.5 size-4 text-brand-600" />
          <div className="min-w-0 flex-1 text-[13px] text-ink-2">
            <b className="text-ink">Bhavi pre-checked 9 new photos</b> — 7 look right, 2 may have mistakes. You give the final mark.
            <div className="mt-2">
              <ActionButton label="Review 2 flagged" doneLabel="Reviewed" size="xs" />
            </div>
          </div>
        </div>
      </Card>

      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        <Chip active icon="Check" size="sm">
          All · 31
        </Chip>
        <Chip size="sm">To check · 9</Chip>
        <Chip size="sm">Checked · 22</Chip>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
        {homeworkSubmissions.map((s) => (
          <SubmissionCard key={s.student} submission={s} />
        ))}
      </div>

      <Card padding="sm">
        <div className="flex items-center justify-between gap-3">
          <b className="text-[13px]">{notSubmitted.length} not submitted yet</b>
          <AvatarStack srcs={notSubmitted} size={26} />
        </div>
        <div className="mt-3">
          <ActionButton label="Remind parents on WhatsApp" doneLabel="Reminder sent" variant="mint" icon="MessageCircle" size="md" full />
        </div>
      </Card>
    </div>
  );

  const post = (
    <div className="flex flex-col gap-4">
      <Card padding="sm" className="flex flex-col gap-3.5">
        <TextField label="Title" name="title" defaultValue="Decimals — Practice set 6" />
        <div>
          <FieldLabel>Send to</FieldLabel>
          <ChipGroup options={["7-B", "7-A", "8-A"]} defaultValue={["7-B"]} multiple size="sm" label="Classes" />
        </div>
        <TextField label="Due" name="due" defaultValue="Wed, 7 Oct · 8 PM" icon="CalendarClock" />
        <TextArea
          label="Instructions"
          name="instructions"
          rows={4}
          defaultValue="Solve Q1–4 in your notebook and show every step. Upload a clear photo of your page by 8 PM on Wednesday."
        />
        <div>
          <FieldLabel>Attachments · 2</FieldLabel>
          <div className="grid grid-cols-2 gap-2.5">
            <AttachmentTile label="Practice_Set_6.pdf" icon="FileText">
              <WorksheetThumb />
            </AttachmentTile>
            <AttachmentTile label="Board_notes.jpg" icon="Camera">
              <BoardThumb />
            </AttachmentTile>
          </div>
          <label className="mt-2.5 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-brand-200 bg-brand-50 text-[13px] font-semibold text-brand-600">
            <Icon name="Camera" className="size-4" />
            Take photo or add a PDF
            <input type="file" accept="image/*,application/pdf" capture="environment" multiple className="sr-only" />
          </label>
        </div>
        <div className="flex flex-col gap-2.5">
          <Toggle label="Students upload a photo of their work" defaultOn />
          <Toggle label="Remind parents on WhatsApp the evening before" defaultOn />
        </div>
      </Card>

      <ActionButton label="Post to 7-B · 38 students" doneLabel="Posted · parents notified" icon="Send" size="lg" full />
      <p className="-mt-2 flex items-center justify-center gap-1.5 text-xs text-ink-3">
        <Icon name="Eye" className="size-3.5" /> Students and parents see it instantly
      </p>

      <Card padding="sm">
        <CardHeader className="mb-1" title="Recently posted" />
        <ul className="divide-y divide-line">
          {recentHomework.map((h) => (
            <li key={h.title} className="flex items-center gap-3 py-2.5">
              <IconTile icon="Calculator" tone="brand" size="sm" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold">{h.title}</div>
                <div className="truncate text-xs text-ink-3">{h.note}</div>
              </div>
              <Pill tone={h.status === "Done" ? "mint" : "marigold"} icon={h.status === "Done" ? "Check" : undefined}>
                {h.status}
              </Pill>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );

  return (
    <>
      <PageNote>Mathematics · Class 7-B · post work with photos and PDFs, check it from your phone.</PageNote>
      <Tabs labels={["Submissions · 31", "Post new"]} panels={[submissions, post]} />
    </>
  );
}
