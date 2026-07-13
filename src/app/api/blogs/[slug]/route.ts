import { NextResponse } from "next/server";

function cleanHtml(htmlStr: string) {
  if (!htmlStr) return "";

  return htmlStr
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(
      `https://scanjunction.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 3600 },
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`WordPress API returned status: ${response.status}`);
    }

    const posts = await response.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      throw new Error("Post not found");
    }

    const post = posts[0];

    let imageUrl =
      "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1200&auto=format&fit=crop";

    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
    if (featuredMedia?.source_url) {
      imageUrl = featuredMedia.source_url;
    }

    const categoryNames: string[] = [];
    const terms = post._embedded?.["wp:term"] || [];
    for (const termGroup of terms) {
      for (const term of termGroup) {
        if (term.taxonomy === "category") {
          categoryNames.push(term.name);
        }
      }
    }

    const title = cleanHtml(post.title?.rendered || "No Title");
    const excerpt = cleanHtml(
      post.excerpt?.rendered || "Read our latest blog update on ScanJunction.",
    );
    const content = post.content?.rendered || "";
    const dateObj = new Date(post.date);
    const formattedDate = Number.isNaN(dateObj.getTime())
      ? "Recently"
      : dateObj.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

    const formattedPost = {
      id: post.id,
      title,
      slug: post.slug,
      excerpt,
      content,
      date: formattedDate,
      link: post.link || `https://scanjunction.com/?p=${post.id}`,
      imageUrl,
      author: post._embedded?.author?.[0]?.name || "ScanJunction Team",
      categories: post.categories || [],
      categoryNames,
    };

    return NextResponse.json({
      success: true,
      source: "live",
      data: formattedPost,
    });
  } catch (error) {
    console.warn("WordPress single post fetch failed:", error);

    // Fallback: try fetching all posts and find by slug
    try {
      const fallbackResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs?per_page=20`,
        { next: { revalidate: 3600 } },
      );
      const fallbackData = await fallbackResponse.json();
      const fallbackPost = fallbackData.data?.find(
        (p: any) => p.slug === slug,
      );
      if (fallbackPost) {
        return NextResponse.json({
          success: true,
          source: "fallback",
          data: fallbackPost,
        });
      }
    } catch {
      // ignore fallback errors
    }

    return NextResponse.json(
      { success: false, error: "Post not found" },
      { status: 404 },
    );
  }
}
