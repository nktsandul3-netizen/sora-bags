/** Извлекает numeric video id из ссылки TikTok или возвращает id, если передан напрямую. */
export function parseTikTokVideoId(urlOrId: string): string | null {
  const trimmed = urlOrId.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) return trimmed;
  const match = trimmed.match(/\/video\/(\d+)/);
  return match?.[1] ?? null;
}

export function getTikTokEmbedUrl(videoId: string, options?: { autoplay?: boolean; mute?: boolean }) {
  const params = new URLSearchParams();
  if (options?.autoplay) params.set("autoplay", "1");
  if (options?.mute) params.set("mute", "1");
  const query = params.toString();
  return `https://www.tiktok.com/embed/v2/${videoId}${query ? `?${query}` : ""}`;
}