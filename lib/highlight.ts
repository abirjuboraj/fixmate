
export const HIGHLIGHT_DURATION_MS = 5000;

export const HIGHLIGHT_ROW_CLASS =
  "bg-primary/10";

export const HIGHLIGHT_CARD_CLASS =
  "bg-primary/5";


export const HIGHLIGHT_TRANSITION =
  "transition-colors duration-1500 ease-in-out";


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
