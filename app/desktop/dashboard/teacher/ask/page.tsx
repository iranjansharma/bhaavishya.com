import type { Metadata } from "next";
import { ChatPanel } from "@/components/blocks/ChatPanel";
import { T } from "@/components/i18n/language";
import { Pill } from "@/components/ui/Pill";
import { chatScripts } from "@/lib/chat";
import { PageHeader } from "../../../_components/PageHeader";
import { AskSidePanel } from "../../../_components/AskSidePanel";

export const metadata: Metadata = { title: "Ask Bhavi" };

/** DESKTOP · Ask Bhavi for the teacher (/dashboard/teacher/ask) — answers come from lib/chat.ts in the demo. */
export default function TeacherAskPage() {
  return (
    <>
      <PageHeader
        title={
          <span className="flex items-center gap-2.5">
            <T k="nav.ask" />
            <Pill tone="brand" icon="Sparkles">
              AI
            </Pill>
          </span>
        }
        subtitle={`${chatScripts.teacher.context} · answers from your school's data, in English, हिन्दी or मराठी`}
      />
      <div className="grid grid-cols-[minmax(0,1fr)_300px] items-start gap-[18px]">
        <ChatPanel role="teacher" variant="desktop" />
        <AskSidePanel role="teacher" />
      </div>
    </>
  );
}
