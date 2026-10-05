import type { Metadata } from "next";
import { ChatPanel } from "@/components/blocks/ChatPanel";
import { T } from "@/components/i18n/language";
import { Pill } from "@/components/ui/Pill";
import { chatScripts } from "@/lib/chat";
import { PageHeader } from "../../../_components/PageHeader";
import { AskSidePanel } from "../../../_components/AskSidePanel";

export const metadata: Metadata = { title: "Ask Bhavi" };

/** DESKTOP · Ask Bhavi for the principal (/dashboard/principal/ask) — answers come from lib/chat.ts in the demo. */
export default function PrincipalAskPage() {
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
        subtitle={`${chatScripts.principal.context} · answers from your school's data, in English, हिन्दी or मराठी`}
      />
      <div className="grid grid-cols-[minmax(0,1fr)_300px] items-start gap-[18px]">
        <ChatPanel role="principal" variant="desktop" />
        <AskSidePanel role="principal" />
      </div>
    </>
  );
}
