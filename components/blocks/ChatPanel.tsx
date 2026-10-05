"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/brand";
import { chatScripts, scriptedReply, type ChatBlock, type ChatMessage } from "@/lib/chat";
import { users } from "@/lib/demo-data";
import type { Role } from "@/lib/roles";
import { hexTone } from "@/lib/tones";
import { cn } from "@/lib/utils";

/**
 * Where Bhavi's answers come from. The demo uses a script (lib/chat.ts).
 * For the real product, call your AI endpoint here, e.g.
 *   const res = await fetch("/api/bhavi", { method: "POST", body: JSON.stringify({ role, question }) });
 */
async function askBhavi(role: Role, question: string): Promise<ChatMessage> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return scriptedReply(role, question);
}

/** Ask Bhavi chat. variant="desktop" sits in a card; "mobile" fills the screen with the input above the tab bar. */
export function ChatPanel({ role, variant }: { role: Role; variant: "desktop" | "mobile" }) {
  const script = chatScripts[role];
  const [messages, setMessages] = useState<ChatMessage[]>(script.intro);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, thinking]);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q || thinking) return;
    setMessages((m) => [...m, { from: "user", blocks: [{ kind: "text", text: q }] }]);
    setDraft("");
    setThinking(true);
    const reply = await askBhavi(role, q);
    if (!mounted.current) return;
    setMessages((m) => [...m, reply]);
    setThinking(false);
  };

  const mobile = variant === "mobile";

  const thread = (
    <div className={cn("flex flex-col gap-3", mobile ? "px-4 pt-3 pb-4" : "p-5")}>
      {messages.map((message, i) =>
        message.from === "user" ? (
          <div key={i} className="flex max-w-[85%] items-end gap-2 self-end">
            <div className="rounded-[16px_16px_4px_16px] bg-brand-600 px-3.5 py-2.5 text-[14px] leading-snug text-white">{textOf(message)}</div>
            {mobile ? null : <Avatar src={users[role].avatar} size={30} />}
          </div>
        ) : (
          <div key={i} className={cn("flex items-start gap-2 self-start", mobile ? "max-w-[94%]" : "max-w-[88%]")}>
            {mobile ? null : <LogoMark size={30} />}
            <div className="flex min-w-0 flex-col gap-2.5 rounded-[16px_16px_16px_4px] border border-line bg-white px-3.5 py-3 text-[13.5px] leading-relaxed text-ink-2">
              {message.blocks.map((block, j) => (
                <Block key={j} block={block} mobile={mobile} />
              ))}
            </div>
          </div>
        ),
      )}
      {thinking ? (
        <div className="flex items-center gap-2 self-start">
          {mobile ? null : <LogoMark size={30} />}
          <div className="flex gap-1 rounded-2xl border border-line bg-white px-3.5 py-3" aria-label="Bhavi is typing">
            {[0, 1, 2].map((d) => (
              <span key={d} className="size-1.5 animate-typing rounded-full bg-brand-400" style={{ animationDelay: `${d * 0.15}s` }} />
            ))}
          </div>
        </div>
      ) : null}
      <div ref={endRef} />
    </div>
  );

  const suggestions = (
    <div className={cn("flex gap-2", mobile ? "no-scrollbar overflow-x-auto px-4 pb-2" : "flex-wrap px-5 pb-3")}>
      {script.suggestions.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => ask(s)}
          className="shrink-0 rounded-full bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold whitespace-nowrap text-brand-600 hover:bg-brand-100"
        >
          {s}
        </button>
      ))}
    </div>
  );

  const composer = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void ask(draft);
      }}
      className={cn("flex items-center gap-2.5", mobile ? "px-4 pb-3" : "border-t border-line px-4 py-3")}
    >
      <label className="flex h-12 min-w-0 flex-1 items-center gap-2.5 rounded-full border border-line-2 bg-white px-4 focus-within:border-brand-600">
        <span className="sr-only">Ask Bhavi</span>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask in English, हिन्दी or मराठी…"
          className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink-4"
        />
        <Icon name="Mic" className="size-[18px] text-ink-3" label="Voice input (connect a speech-to-text service)" />
      </label>
      <button type="submit" aria-label="Send" className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-600 text-white shadow-glow disabled:opacity-50" disabled={thinking}>
        <Icon name="Send" className="size-[18px]" />
      </button>
    </form>
  );

  if (mobile) {
    return (
      <div className="pb-[136px]">
        {thread}
        <div className="fixed inset-x-0 bottom-[calc(64px+env(safe-area-inset-bottom))] z-20 mx-auto max-w-[480px] border-t border-line bg-white/95 pt-2.5 backdrop-blur">
          {suggestions}
          {composer}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[620px] flex-col overflow-hidden rounded-2xl border border-line bg-[#fbfafe] shadow-card">
      <div className="flex-1 overflow-y-auto">{thread}</div>
      <div className="border-t border-line bg-white pt-3">
        {suggestions}
        {composer}
      </div>
    </div>
  );
}

function textOf(message: ChatMessage): string {
  return message.blocks.map((b) => (b.kind === "text" ? b.text : "")).join(" ");
}

function Block({ block, mobile }: { block: ChatBlock; mobile: boolean }) {
  switch (block.kind) {
    case "text":
      return <p>{block.text}</p>;
    case "bars":
      return (
        <div className="rounded-xl border border-line bg-[#faf9fd] px-3 py-2.5">
          {block.items.map((item) => (
            <div key={item.label} className="my-1 flex items-center gap-2.5">
              <span className="w-24 shrink-0 text-xs">{item.label}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-track">
                <span className="block h-full rounded-full" style={{ width: `${item.value}%`, background: hexTone[item.tone] }} />
              </span>
              <b className="w-6 text-right text-xs text-ink tabular-nums">{item.value}</b>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="-mx-1 overflow-x-auto">
          <table className="w-full min-w-[280px] border-separate border-spacing-0 text-[12.5px]">
            <thead>
              <tr className="text-left text-[10.5px] font-bold tracking-[0.06em] text-ink-3 uppercase [&>th]:border-b [&>th]:border-line [&>th]:bg-[#faf9fd] [&>th]:px-2.5 [&>th]:py-2">
                {block.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")} className="[&>td]:border-b [&>td]:border-line [&>td]:px-2.5 [&>td]:py-2 last:[&>td]:border-0">
                  {row.map((cell, k) => (
                    <td key={k} className={cn(k === 0 ? "font-semibold text-ink" : "", cell.startsWith("▼") ? "font-semibold text-coral-700" : "")}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "drafts":
      return (
        <div className={cn("grid gap-2.5", mobile ? "grid-cols-1" : "grid-cols-2")}>
          {block.drafts.map((d) => (
            <div key={d.label} className="rounded-xl border border-line bg-[#faf9fd] px-3 py-2.5">
              <div className="mb-1 text-[10.5px] font-bold tracking-[0.08em] text-ink-3 uppercase">{d.label}</div>
              <p className="text-[12.5px] leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>
      );
    case "actions":
      return (
        <div className="flex flex-wrap gap-1.5">
          {block.actions.map((a) => (
            <ActionChip key={a} label={a} />
          ))}
        </div>
      );
  }
}

function ActionChip({ label }: { label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setDone(true)}
      className={cn(
        "inline-flex h-7 items-center gap-1 rounded-lg px-2.5 text-xs font-semibold transition-colors",
        done ? "bg-mint-50 text-mint-700" : "bg-brand-50 text-brand-600 hover:bg-brand-100",
      )}
    >
      {done ? <Icon name="Check" className="size-3.5" /> : null}
      {done ? "Done (demo)" : label}
    </button>
  );
}
