/**
 * Cleans and transforms WordPress Gutenberg HTML content for proper rendering in Next.js.
 * - Removes Gutenberg HTML comment blocks (<!-- wp:... --> / <!-- /wp:... -->)
 * - Handles WordPress-specific block classes
 * - Normalizes image figures, embeds, tables, and alignment
 */

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube(?:-nocookie)?\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return match ? match[1] : null;
}

function extractVimeoId(url: string): string | null {
  const match = url.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:\/.*)?$/,
  );
  return match ? match[1] : null;
}

export function cleanWordPressHtml(content: string): string {
  if (!content) return "";

  let html = content;

  // 1. Remove Gutenberg HTML comment blocks (single-line and multi-line)
  html = html.replace(/<!--\s*\/?wp:[\s\S]*?-->/g, "");

  // 2. Remove empty paragraph tags left from stripping comments
  html = html.replace(/<p>\s*<\/p>/gi, "");

  // 3. Transform WordPress image figures — unwrap the figure but keep img + figcaption
  html = html.replace(
    /<figure[^>]*class="[^"]*wp-block-image[^"]*"[^>]*>([\s\S]*?)<\/figure>/gi,
    (_, inner) => {
      const imgMatch = inner.match(/<img[^>]*>/i);
      const captionMatch = inner.match(
        /<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i,
      );
      const img = imgMatch ? imgMatch[0] : "";
      if (captionMatch) {
        const captionText = captionMatch[1].trim();
        return `<div class="wp-block-image-wrapper">${img}<p class="wp-image-caption">${captionText}</p></div>`;
      }
      return img || inner;
    },
  );

  // 4. Transform WordPress galleries
  html = html.replace(
    /<figure[^>]*class="[^"]*wp-block-gallery[^"]*"[^>]*>([\s\S]*?)<\/figure>/gi,
    (_, inner) => {
      const imgs = inner.match(/<img[^>]*>/gi);
      if (!imgs || imgs.length === 0) return inner;
      const galleryItems = imgs
        .map(
          (img: string) =>
            `<div class="wp-gallery-item">${img}</div>`,
        )
        .join("");
      return `<div class="wp-block-gallery-wrapper">${galleryItems}</div>`;
    },
  );

  // 5. Transform WordPress embeds (YouTube, Vimeo)
  html = html.replace(
    /<figure[^>]*class="[^"]*wp-block-embed[^"]*"[^>]*>([\s\S]*?)<\/figure>/gi,
    (_, inner) => {
      // Try to extract URL from embed wrapper
      const urlMatch = inner.match(
        /https?:\/\/[^\s"'<]+(?:youtube\.com|youtu\.be|vimeo\.com)[^\s"'<]*/i,
      );
      if (urlMatch) {
        const url = urlMatch[0];
        const ytId = extractYouTubeId(url);
        if (ytId) {
          return `<div class="wp-block-embed-wrapper"><iframe src="https://www.youtube.com/embed/${ytId}" frameborder="0" allowfullscreen class="wp-embed-iframe" title="YouTube video"></iframe></div>`;
        }
        const vimeoId = extractVimeoId(url);
        if (vimeoId) {
          return `<div class="wp-block-embed-wrapper"><iframe src="https://player.vimeo.com/video/${vimeoId}" frameborder="0" allowfullscreen class="wp-embed-iframe" title="Vimeo video"></iframe></div>`;
        }
      }
      // Fallback: show the raw link as a clickable anchor
      const linkMatch = inner.match(
        /https?:\/\/[^\s"'<]+\/[^\s"'<]*/i,
      );
      if (linkMatch) {
        const linkUrl = linkMatch[0];
        return `<div class="wp-block-embed-wrapper"><p class="wp-embed-fallback"><a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkUrl}</a></p></div>`;
      }
      return `<div class="wp-block-embed-wrapper">${inner}</div>`;
    },
  );

  // 6. Transform tables wrapped in figure — unwrap and wrap in scrollable div
  html = html.replace(
    /<figure[^>]*class="[^"]*wp-block-table[^"]*"[^>]*>([\s\S]*?)<\/figure>/gi,
    (_, inner) => `<div class="wp-block-table-scroll">${inner}</div>`,
  );

  // 7. Clean up WordPress block classes on headings, paragraphs, lists, etc.
  html = html.replace(
    /<(h[1-6])\s+class="[^"]*wp-block-heading[^"]*"([^>]*)>/gi,
    "<$1$2>",
  );
  html = html.replace(
    /<p\s+class="[^"]*wp-block-paragraph[^"]*"([^>]*)>/gi,
    "<p$1>",
  );
  html = html.replace(
    /<(ul|ol)\s+class="[^"]*wp-block-list[^"]*"([^>]*)>/gi,
    "<$1$2>",
  );
  html = html.replace(
    /<blockquote\s+class="[^"]*wp-block-quote[^"]*"([^>]*)>/gi,
    "<blockquote$1>",
  );
  html = html.replace(
    /<pre\s+class="[^"]*wp-block-code[^"]*"([^>]*)>/gi,
    "<pre$1>",
  );

  // 8. Handle WordPress buttons
  html = html.replace(
    /<div\s+class="wp-block-buttons">([\s\S]*?)<\/div>/gi,
    (_, inner) => {
      const cleanedInner = inner.replace(
        /<a\s+class="wp-block-button__link"([^>]*)>([\s\S]*?)<\/a>/gi,
        '<a class="wp-block-button-link"$1>$2</a>',
      );
      return `<div class="wp-block-buttons-wrapper">${cleanedInner}</div>`;
    },
  );

  // 9. Remove extra attributes from WordPress separator
  html = html.replace(
    /<hr\s+class="wp-block-separator[^"]*"[^>]*\/?>/gi,
    "<hr />",
  );

  // 10. Remove leftover empty divs
  html = html.replace(/<div>\s*<\/div>/gi, "");

  return html.trim();
}
