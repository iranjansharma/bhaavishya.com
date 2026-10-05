import { Icon } from "@/components/ui/Icon";
import { QrCode, SchoolCrest } from "@/components/ui/brand";
import { certificate, school } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

/**
 * Certificate of Achievement with a verification QR code.
 * `size="sm"` is a narrower version for phones.
 */
export function Certificate({ size = "md" }: { size?: "sm" | "md" }) {
  const sm = size === "sm";
  return (
    <div
      className={cn(
        "relative mx-auto w-full rounded-md bg-[#fffdf6] text-center shadow-[0_20px_40px_-20px_rgb(60_40_0/0.35)]",
        sm ? "max-w-[360px] px-6 py-6" : "max-w-[640px] px-10 py-8",
      )}
    >
      <div className="pointer-events-none absolute inset-2.5 rounded border-[2.5px] border-[#e2a72e]" />
      <div className="pointer-events-none absolute inset-4 rounded-sm border border-brand-700/60" />
      <div className="relative">
        <div className="flex items-center justify-center gap-3">
          <SchoolCrest size={sm ? 30 : 40} />
          <div className="text-left">
            <div className={cn("font-serif font-bold tracking-[0.06em] text-[#0f3d2e] uppercase", sm ? "text-[12.5px]" : "text-[17px]")}>{school.name}</div>
            <div className={cn("tracking-[0.14em] text-ink-3", sm ? "text-[9px]" : "text-[11px]")}>
              {school.city.toUpperCase()} · AFFILIATED TO {school.board}
            </div>
          </div>
        </div>
        <div className={cn("mt-4 font-serif text-brand-700 italic", sm ? "text-[22px]" : "text-[31px]")}>Certificate of Achievement</div>
        <div className={cn("mt-2 text-ink-2", sm ? "text-[11.5px]" : "text-[13px]")}>This is to certify that</div>
        <div className={cn("mt-1 font-serif font-semibold tracking-[-0.01em]", sm ? "text-[22px]" : "text-[30px]")}>{certificate.student}</div>
        <div className="mx-auto mt-1 h-[1.5px] w-[60%] max-w-[220px] bg-[#e2a72e]" />
        <p className={cn("mt-2.5 leading-relaxed text-ink-2", sm ? "text-[11.5px]" : "text-[13px]")}>
          of Class {certificate.className} won the <b className="text-ink">{certificate.award}</b> in the <b className="text-ink">{certificate.event}</b> held at{" "}
          {school.name} on {certificate.heldOn}.
        </p>
        <div className={cn("flex items-end justify-between", sm ? "mt-4 px-1" : "mt-5 px-2.5")}>
          <Signature name="K. Iyer" role="Class Teacher" sm={sm} />
          <span
            className={cn(
              "grid place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffe08a,#e2a72e_60%,#b9801a)] text-[#5a3a00] shadow-[0_6px_14px_-6px_rgb(140_90_0/0.6)]",
              sm ? "size-11" : "size-[58px]",
            )}
          >
            <Icon name="Award" className={sm ? "size-5" : "size-7"} />
          </span>
          <Signature name="M. Nair" role="Principal" sm={sm} />
        </div>
        <div className={cn("flex items-end justify-between gap-3", sm ? "mt-3" : "mt-4")}>
          <div className={cn("text-left text-ink-3", sm ? "text-[9px]" : "text-[11px]")}>
            Certificate no. {certificate.number}
            <br />
            Issued {certificate.issued}
          </div>
          <div className="flex items-end gap-2 text-right">
            <div className={cn("text-ink-3", sm ? "text-[9px]" : "text-[11px]")}>
              Scan to verify
              <br />
              <b className="text-ink-2">{certificate.verifyUrl}</b>
            </div>
            <QrCode value={certificate.number} size={sm ? 42 : 54} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Signature({ name, role, sm }: { name: string; role: string; sm: boolean }) {
  return (
    <div className="text-center">
      <div className={cn("font-serif text-[#2b2540] italic", sm ? "text-[15px]" : "text-[20px]")}>{name}</div>
      <div className={cn("mx-auto my-0.5 h-px bg-line-2", sm ? "w-20" : "w-[120px]")} />
      <div className={cn("text-ink-3", sm ? "text-[9.5px]" : "text-[11px]")}>{role}</div>
    </div>
  );
}
