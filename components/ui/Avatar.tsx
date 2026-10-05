import { cn } from "@/lib/utils";

/**
 * Round profile picture. The demo uses illustrated avatars from /public/avatars —
 * never photos of real children. Swap in real photos once you have consent.
 */
export function Avatar({
  src,
  alt = "",
  size = 36,
  ring = 2,
  className,
}: {
  src: string;
  alt?: string;
  size?: number;
  /** White ring around the picture, in pixels. */
  ring?: 0 | 2 | 4;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={cn("shrink-0 rounded-full bg-canvas ring-white", ring === 2 && "ring-2", ring === 4 && "ring-4", className)}
    />
  );
}

/** Overlapping row of avatars. */
export function AvatarStack({ srcs, size = 26 }: { srcs: string[]; size?: number }) {
  return (
    <div className="flex">
      {srcs.map((src, i) => (
        <Avatar key={src} src={src} size={size} className={i === 0 ? undefined : "-ml-2"} />
      ))}
    </div>
  );
}
