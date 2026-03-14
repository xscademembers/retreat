/**
 * Appends Wix image-service resize params to a wixstatic.com URL.
 * Returns the original URL unchanged for non-Wix sources.
 *
 * @param url  – Original wixstatic media URL
 * @param w    – Desired width in CSS pixels (will be doubled for retina)
 * @param h    – Desired height in CSS pixels (will be doubled for retina)
 * @param q    – JPEG/WebP quality 1-100 (default 80)
 */
export function wixImg(url: string, w: number, h: number, q = 80): string {
  if (!url || !url.includes('static.wixstatic.com/media/')) return url;

  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
  const pw = Math.round(w * dpr);
  const ph = Math.round(h * dpr);

  return `${url}/v1/fill/w_${pw},h_${ph},al_c,q_${q},enc_avif/img.webp`;
}
