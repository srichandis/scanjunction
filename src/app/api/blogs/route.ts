import { NextRequest, NextResponse } from "next/server";

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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const perPage = searchParams.get("per_page") || "6";
    const page = searchParams.get("page") || "1";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(
      `https://api.scanjunction.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`,
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
    const totalPosts = response.headers.get("X-WP-Total") || "0";
    const totalPages = response.headers.get("X-WP-TotalPages") || "1";

    if (!Array.isArray(posts)) {
      throw new Error("WordPress API response is not an array");
    }

    const formattedPosts = posts.map((post: any) => {
      let imageUrl =
        "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=600&auto=format&fit=crop";

      const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
      if (featuredMedia?.source_url) {
        imageUrl = featuredMedia.source_url;
      } else if (featuredMedia?.media_details?.sizes?.medium?.source_url) {
        imageUrl = featuredMedia.media_details.sizes.medium.source_url;
      }

      // Extract category names from embedded terms
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
      const content = post.content?.rendered
        ? post.content.rendered
            .replace(/<figure[^>]*>[\s\S]*?<\/figure>/gi, "")
            .trim()
        : "";
      const dateObj = new Date(post.date);
      const formattedDate = Number.isNaN(dateObj.getTime())
        ? "Recently"
        : dateObj.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

      return {
        id: post.id,
        title,
        slug: post.slug,
        excerpt:
          excerpt.length > 200
            ? `${excerpt.substring(0, 200)}...`
            : excerpt,
        content,
        date: formattedDate,
        link: post.link || `https://api.scanjunction.com/?p=${post.id}`,
        imageUrl,
        author: post._embedded?.author?.[0]?.name || "ScanJunction Team",
        categories: post.categories || [],
        categoryNames,
      };
    });

    return NextResponse.json({
      success: true,
      source: "live",
      data: formattedPosts,
      total: parseInt(totalPosts, 10),
      totalPages: parseInt(totalPages, 10),
      currentPage: parseInt(page, 10),
    });
  } catch (error) {
    console.warn("WordPress API fetch failed, using fallback data:", error);

    return NextResponse.json({
      success: true,
      source: "fallback",
      data: [
        {
          id: 101,
          title: "How to Store and Preserve Old Negatives & Slides Safely",
          slug: "how-to-store-and-preserve-old-negatives-slides",
          excerpt:
            "Uncover the best practices for handling, cleaning, and storing vintage photos, slides, and film negatives before they suffer permanent damage.",
          content:
            "<p>Preserving old negatives and slides requires careful handling. Here are the best practices for keeping your vintage media safe.</p><p>Store negatives in acid-free sleeves, keep them in a cool, dry place, and handle them by the edges to avoid fingerprint oils.</p>",
          date: "July 10, 2026",
          link: "https://api.scanjunction.com/blog",
          imageUrl:
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
          author: "ScanJunction Team",
          categories: [1, 2],
          categoryNames: ["Photo Scan", "Negatives and Slides"],
        },
        {
          id: 102,
          title: "The Ultimate Guide to Digitizing VHS Tapes and Camcorder Cassettes",
          slug: "ultimate-guide-digitizing-vhs-tapes-camcorder-cassettes",
          excerpt:
            "Do you have boxes of family home videos stored on VHS? Discover why videotapes decay rapidly and how scanning them brings those memories back to life.",
          content:
            "<p>VHS tapes have a lifespan of 10-25 years. After that, the magnetic tape degrades and the video quality deteriorates.</p><p>Digitizing your VHS tapes ensures your family memories last forever in a modern digital format.</p>",
          date: "June 24, 2026",
          link: "https://api.scanjunction.com/blog",
          imageUrl:
            "https://images.unsplash.com/photo-1542204172-e7052809a86e?q=80&w=1200&auto=format&fit=crop",
          author: "ScanJunction Team",
          categories: [3],
          categoryNames: ["Blog"],
        },
        {
          id: 103,
          title: "Why You Should Create a Digital Family Vault Today",
          slug: "why-create-digital-family-vault",
          excerpt:
            "Organizing your family's history can be overwhelming. Learn how a secure, private digital family archive keeps your scanned photos safe for generations.",
          content:
            "<p>A digital family vault is more than just cloud storage. It's a curated, organized archive of your family's most precious memories.</p><p>With ScanJunction, you get a secure vault with AI-powered face grouping, smart search, and easy sharing.</p>",
          date: "May 15, 2026",
          link: "https://api.scanjunction.com/blog",
          imageUrl:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
          author: "ScanJunction Team",
          categories: [4],
          categoryNames: ["Photo Management"],
        },
        {
          id: 104,
          title: "Book Scanning 101: How to Digitize Your Library",
          slug: "book-scanning-101-digitize-library",
          excerpt:
            "Whether it's rare manuscripts or family recipe books, learn the professional approach to scanning bound documents without damaging the spine.",
          content:
            "<p>Book scanning requires specialized equipment to capture pages without damaging the binding. Our overhead scanners are designed specifically for this purpose.</p><p>From cookbooks to photo albums, we handle all types of bound media with care.</p>",
          date: "April 28, 2026",
          link: "https://api.scanjunction.com/blog",
          imageUrl:
            "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop",
          author: "ScanJunction Team",
          categories: [5],
          categoryNames: ["Book Scan"],
        },
        {
          id: 105,
          title: "Data Extraction from Old Documents: A Complete Guide",
          slug: "data-extraction-old-documents-guide",
          excerpt:
            "Businesses and individuals alike can benefit from digitizing old documents. We break down the data extraction process from physical records.",
          content:
            "<p>Data extraction from physical documents involves scanning, OCR processing, and verification. Our process ensures 99.9% accuracy.</p><p>Whether it's legal documents, medical records, or historical archives, we handle it with precision.</p>",
          date: "April 10, 2026",
          link: "https://api.scanjunction.com/blog",
          imageUrl:
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop",
          author: "ScanJunction Team",
          categories: [6],
          categoryNames: ["Data Extraction"],
        },
        {
          id: 106,
          title: "Photo Restoration: Bringing Old Damaged Photos Back to Life",
          slug: "photo-restoration-bringing-old-damaged-photos-back",
          excerpt:
            "Torn, faded, or water-damaged photos can be digitally restored. Discover the process of bringing cherished memories back to their original glory.",
          content:
            "<p>Photo restoration is a delicate art combining digital scanning expertise with careful editing. Tears, creases, and color fading can all be repaired.</p><p>Our team uses professional tools to restore your photos to their original condition or better.</p>",
          date: "March 15, 2026",
          link: "https://api.scanjunction.com/blog",
          imageUrl:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
          author: "ScanJunction Team",
          categories: [1],
          categoryNames: ["Photo Scan"],
        },
      ],
      total: 6,
      totalPages: 1,
      currentPage: 1,
    });
  }
}
