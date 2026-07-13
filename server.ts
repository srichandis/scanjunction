import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // API Route to fetch blogs from scanjunction.com wordpress site
  app.get("/api/blogs", async (req, res) => {
    try {
      console.log("Fetching blogs from WordPress API: scanjunction.com");
      
      // We set a short timeout using AbortController to keep the API responsive
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch("https://scanjunction.com/wp-json/wp/v2/posts?_embed&per_page=3", {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`WordPress API returned status: ${response.status}`);
      }

      const posts = await response.json();

      if (!Array.isArray(posts)) {
        throw new Error("WordPress API response is not an array");
      }

      // Map WordPress posts to clean structure
      const formattedPosts = posts.map((post: any) => {
        // Extract featured image
        let imageUrl = "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=600&auto=format&fit=crop"; // fallback image
        try {
          const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
          if (featuredMedia?.source_url) {
            imageUrl = featuredMedia.source_url;
          } else if (featuredMedia?.media_details?.sizes?.medium?.source_url) {
            imageUrl = featuredMedia.media_details.sizes.medium.source_url;
          }
        } catch (e) {
          console.error("Error parsing featured media: ", e);
        }

        // Clean HTML tags from excerpt and title
        const cleanHtml = (htmlStr: string) => {
          if (!htmlStr) return "";
          return htmlStr
            .replace(/<\/?[^>]+(>|$)/g, "") // strip html tags
            .replace(/&nbsp;/g, " ")
            .replace(/&#8217;/g, "'")
            .replace(/&#8211;/g, "–")
            .replace(/&#8216;/g, "'")
            .replace(/&#8220;/g, '"')
            .replace(/&#8221;/g, '"')
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .trim();
        };

        const title = cleanHtml(post.title?.rendered || "No Title");
        const excerpt = cleanHtml(post.excerpt?.rendered || "Read our latest blog update on ScanJunction.");

        // Format Date
        const dateObj = new Date(post.date);
        const formattedDate = isNaN(dateObj.getTime())
          ? "Recently"
          : dateObj.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            });

        return {
          id: post.id,
          title: title,
          excerpt: excerpt.length > 140 ? excerpt.substring(0, 140) + "..." : excerpt,
          date: formattedDate,
          link: post.link || `https://scanjunction.com/?p=${post.id}`,
          imageUrl: imageUrl,
          author: post._embedded?.["author"]?.[0]?.name || "ScanJunction Team"
        };
      });

      return res.json({
        success: true,
        source: "live",
        data: formattedPosts
      });

    } catch (error: any) {
      console.warn("WordPress API fetch failed, using realistic fallback data:", error.message || error);
      
      // Fallback data reflecting actual ScanJunction.com themes
      const fallbackPosts = [
        {
          id: 101,
          title: "How to Store and Preserve Old Negatives & Slides Safely",
          excerpt: "Uncover the best practices for handling, cleaning, and storing vintage photos, slides, and film negatives before they suffer permanent damage.",
          date: "Jul 10, 2026",
          link: "https://scanjunction.com/blog",
          imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
          author: "ScanJunction Team"
        },
        {
          id: 102,
          title: "The Ultimate Guide to Digitizing VHS Tapes and Camcorder Cassettes",
          excerpt: "Do you have boxes of family home videos stored on VHS? Discover why videotapes decay rapidly and how scanning them brings those memories back to life.",
          date: "Jun 24, 2026",
          link: "https://scanjunction.com/blog",
          imageUrl: "https://images.unsplash.com/photo-1542204172-e7052809a86e?q=80&w=600&auto=format&fit=crop",
          author: "ScanJunction Team"
        },
        {
          id: 103,
          title: "Why You Should Create a Digital Family Vault Today",
          excerpt: "Organizing your family's history can be overwhelming. Learn how a secure, private digital family archive keeps your scanned photos safe for generations.",
          date: "May 15, 2026",
          link: "https://scanjunction.com/blog",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
          author: "ScanJunction Team"
        }
      ];

      return res.json({
        success: true,
        source: "fallback",
        data: fallbackPosts
      });
    }
  });

  // Serve static assets and Vite setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
