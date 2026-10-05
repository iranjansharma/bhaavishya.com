import type { Metadata } from "next";
import { ChatPanel } from "@/components/blocks/ChatPanel";
import { chatScripts } from "@/lib/chat";

export const metadata: Metadata = { title: "Ask Bhavi" };

/** PHONE · Ask Bhavi for the parent (/dashboard/parent/ask) — answers come from lib/chat.ts in the demo. */
export default function ParentAskPage() {
  return (
    <div className="-mx-4 -mt-4">
      <div className="flex items-center gap-2 border-b border-line bg-white px-4 py-2.5 text-xs text-ink-3">
        <span className="size-2 rounded-full bg-mint-500" />
        {chatScripts.parent.context}
      </div>
      <ChatPanel role="parent" variant="mobile" />
    </div>
  );
}
