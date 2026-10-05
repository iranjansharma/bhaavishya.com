import type { Metadata } from "next";
import { ActionButton } from "@/components/blocks/interactive";
import { AttachmentTile, BoardThumb, SubmissionCard, WorksheetThumb } from "@/components/blocks/teacher";
import { T } from "@/components/i18n/language";
import { AvatarStack } from "@/components/ui/Avatar";
import { FieldLabel, TextArea, TextField } from "@/components/ui/bits";
import { Card, CardHeader } from "@/components/ui/Card";
import { Chip, ChipGroup } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { IconTile, Pill } from "@/components/ui/Pill";
import { Progress } from "@/components/ui/Progress";
import { Segmented } from "@/components/ui/Segmented";
import { Toggle } from "@/components/ui/Toggle";
import { homeworkSubmissions, notSubmitted, recentHomework, teacherToday } from "@/lib/demo-data";
import { PageHeader } from "../../../_components/PageHeader";

export const metadata: Metadata = { title: "Homework" };

/** DESKTOP · Homework (/dashboard/teacher/homework) */
export default function TeacherHomeworkPage() {
  const hw = teacherToday.homework;
  return (
    <>
      <PageHeader
        title={<T k="nav.homework" />}
        subtitle="Mathematics · Class 7-B · Post work with photos and PDFs — check submissions from your phone."
        actions={<Segmented options={["7-B", "7-A", "8-A", "6-C"]} defaultValue="7-B" />}
      />
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.42fr)] items-start gap-[18px]">
        <Card className="flex flex-col gap-3.5">
          <CardHeader title="Post new homework" right={<Pill tone="grey">Draft</Pill>} />
          <TextField label="Title" name="title" defaultValue="Decimals — Practice set 6" />
          <div className="grid grid-cols-[minmax(0,1fr)_200px] gap-3">
            <div>
              <FieldLabel>Send to</FieldLabel>
              <ChipGroup options={["7-B", "7-A", "8-A"]} defaultValue={["7-B"]} multiple size="sm" label="Classes" />
            </div>
            <TextField label="Due" name="due" defaultValue="Wed, 7 Oct · 8 PM" icon="CalendarClock" />
          </div>
          <TextArea label="Instructions" name="instructions" defaultValue="Solve Q1–4 in your notebook and show every step. Upload a clear photo of your page by 8 PM on Wednesday." />
          <div>
            <FieldLabel>Attachments · 2</FieldLabel>
            <div className="grid grid-cols-[1fr_1fr_92px] gap-2.5">
              <AttachmentTile label="Practice_Set_6.pdf" icon="FileText">
                <WorksheetThumb />
              </AttachmentTile>
              <AttachmentTile label="Board_notes.jpg" icon="Camera">
                <BoardThumb />
              </AttachmentTile>
              <label className="flex h-[140px] cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-[1.5px] border-dashed border-brand-200 bg-brand-50 text-center text-xs font-semibold text-brand-600">
                <Icon name="ImagePlus" className="size-5" />
                Add photo,
                <br />
                PDF or link
                <input type="file" multiple className="sr-only" />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Toggle label="Students upload a photo of their work" defaultOn />
            <Toggle label="Remind parents on WhatsApp the evening before" defaultOn />
          </div>
          <div>
            <div className="mb-1 text-[11.5px] font-bold tracking-[0.08em] text-ink-3 uppercase">Recently posted</div>
            <ul className="divide-y divide-line">
              {recentHomework.map((h) => (
                <li key={h.title} className="flex items-center gap-3 py-2">
                  <IconTile icon="Calculator" tone="brand" size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold">{h.title}</div>
                    <div className="text-xs text-ink-3">{h.note}</div>
                  </div>
                  <Pill tone={h.status === "Done" ? "mint" : "marigold"} icon={h.status === "Done" ? "Check" : undefined}>
                    {h.status}
                  </Pill>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between border-t border-line pt-3.5">
            <span className="flex items-center gap-1.5 text-xs text-ink-3">
              <Icon name="Eye" className="size-3.5" /> Parents see it instantly
            </span>
            <ActionButton label="Post to 7-B · 38" doneLabel="Posted" icon="Send" size="md" />
          </div>
        </Card>

        <Card className="flex flex-col gap-3">
          <CardHeader title={`${hw.title} · submissions`} right="Due today, 8 PM" />
          <div className="flex items-center gap-3">
            <Progress value={(hw.submitted / hw.total) * 100} tone="mint" className="flex-1" />
            <b className="text-[13px]">
              {hw.submitted} of {hw.total} submitted
            </b>
          </div>
          <div className="flex items-center gap-2">
            <Chip active icon="Check" size="sm">
              All · 31
            </Chip>
            <Chip size="sm">To check · 9</Chip>
            <Chip size="sm">Checked · 22</Chip>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 px-3 py-2.5">
            <Icon name="Sparkles" className="size-4 text-brand-600" />
            <span className="flex-1 text-[13px] text-ink-2">
              <b className="text-ink">Bhavi pre-checked 9 new photos</b> — 7 look right, 2 may have mistakes. You give the final mark.
            </span>
            <ActionButton label="Review 2 flagged" doneLabel="Reviewed" size="xs" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {homeworkSubmissions.map((s) => (
              <SubmissionCard key={s.student} submission={s} />
            ))}
          </div>
          <div className="flex items-center gap-3 border-t border-line pt-3">
            <b className="text-[13px]">{notSubmitted.length} not submitted</b>
            <AvatarStack srcs={notSubmitted} size={26} />
            <div className="ml-auto">
              <ActionButton label="Remind parents on WhatsApp" doneLabel="Reminder sent" variant="mint" icon="MessageCircle" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
