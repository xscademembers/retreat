/**
 * Returns the original image URL without any Wix-specific transforms.
 * This avoids broken URLs if the Wix imaging service paths change.
 */
export function wixImg(url: string, _w: number, _h: number, _q = 80): string {
  return url || '';
}
