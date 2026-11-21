
export const HIGHLIGHT_DURATION_MS = 5000;

export const HIGHLIGHT_ROW_CLASS =
  "bg-primary/10 outline outline-2 -outline-offset-2 outline-primary/50";

export const HIGHLIGHT_CARD_CLASS =
  "border-primary bg-primary/5 ring-2 ring-inset ring-primary/50";


export const HIGHLIGHT_TRANSITION = "transition-all duration-700";


export function withHighlight(
  path: string,
  id?: string,
  anchorPrefix?: string,
): string {
  if (!id) return path;
  const separator = path.includes("?") ? "&" : "?";
  const anchor = anchorPrefix ? `#${anchorPrefix}${id}` : "";
  return `${path}${separator}highlight=${encodeURIComponent(id)}${anchor}`;
}
