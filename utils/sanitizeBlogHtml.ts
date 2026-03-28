/**
 * Strips unsafe markup and paste cruft (Word/Docs) from blog rich text.
 * Must run in the browser (DOMParser). SSR callers receive the raw string unchanged.
 */
export function sanitizeBlogHtml(html: string): string {
  if (typeof window === 'undefined') return html;
  if (!html || !html.trim()) return '';

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const allowedTags = new Set(['STRONG', 'B', 'EM', 'I', 'U', 'A', 'SPAN', 'BR', 'DIV', 'P']);
  const containerTags = new Set(['BODY', 'HTML', 'HEAD', 'DIV', 'P']);

  const cleanNode = (node: Node) => {
    const children = Array.from(node.childNodes);

    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;

        cleanNode(el);

        if (!allowedTags.has(el.tagName) && !containerTags.has(el.tagName)) {
          const parent = el.parentNode;
          if (!parent) continue;
          while (el.firstChild) parent.insertBefore(el.firstChild, el);
          parent.removeChild(el);
          continue;
        }

        if (el.tagName === 'A') {
          const attrs = Array.from(el.attributes);
          for (const attr of attrs) {
            const name = attr.name.toLowerCase();
            if (name === 'href' || name === 'target' || name === 'rel') continue;
            el.removeAttribute(attr.name);
          }
          const href = el.getAttribute('href') || '';
          const isSafe = href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
          if (!isSafe) {
            el.removeAttribute('href');
          } else {
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
          }
        } else if (el.tagName === 'SPAN') {
          const style = el.getAttribute('style') || '';
          const colorMatch = style.match(/color\s*:\s*#[0-9a-fA-F]{3,8}|color\s*:\s*rgb\([^)]+\)/);
          const textAlignMatch = style.match(/text-align\s*:\s*(left|center|right|justify)\s*;?/i);
          const attrs = Array.from(el.attributes);
          for (const attr of attrs) {
            if (attr.name.toLowerCase() !== 'style') el.removeAttribute(attr.name);
          }
          const styleParts: string[] = [];
          if (colorMatch) styleParts.push(colorMatch[0]);
          if (textAlignMatch) styleParts.push(textAlignMatch[0]);
          if (styleParts.length > 0) el.setAttribute('style', styleParts.join('; '));
          else el.removeAttribute('style');
        } else if (el.tagName === 'P' || el.tagName === 'DIV') {
          const attrs = Array.from(el.attributes);
          for (const attr of attrs) el.removeAttribute(attr.name);
        } else if (!containerTags.has(el.tagName)) {
          const attrs = Array.from(el.attributes);
          for (const attr of attrs) el.removeAttribute(attr.name);
        }
      }
    }
  };

  try {
    cleanNode(doc.body);
    let result = doc.body.innerHTML;
    result = result.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ');
    return result;
  } catch {
    return html;
  }
}
