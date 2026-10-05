/** The two versions of the site. Each has its own folder: app/desktop and app/mobile. */
export type View = "desktop" | "mobile";

/** Cookie that remembers a manual choice (set by ?view=mobile or ?view=desktop). */
export const VIEW_COOKIE = "bhavishya-view";

export function isView(value: string | null | undefined): value is View {
  return value === "desktop" || value === "mobile";
}

/**
 * Which version a device gets: phones → mobile, computers and tablets → desktop.
 * Want tablets on the mobile version too? Add `|| deviceType === "tablet"` below.
 */
export function viewForDevice(deviceType: string | undefined): View {
  return deviceType === "mobile" || deviceType === "wearable" ? "mobile" : "desktop";
}

/** "/desktop/pricing" → "/pricing", so menus can highlight the right item in both versions. */
export function withoutViewPrefix(pathname: string): string {
  const clean = pathname.replace(/^\/(desktop|mobile)(?=\/|$)/, "");
  return clean === "" ? "/" : clean;
}
