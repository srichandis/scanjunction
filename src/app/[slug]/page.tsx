"use client";

import { useState, useEffect, useCallback } from "react";
import { BlogPost } from "../../types";
import {
  Calendar,
  User,
  ArrowUpRight,
  ArrowLeft,
  Loader,
  Clock,
  Share2,
  Tag,
  ChevronUp,
  BookOpen,
  Quote,
  Lightbulb,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function estimateReadTime(content?: string) {
  if (!content) return "2 min read";
  const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function extractHeadings(html: string): { level: number; text: string }[] {
  const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/gi;
  const headings: { level: number; text: string }[] = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({ level: parseInt(match[1]), text: stripHtml(match[2]) });
  }
  return headings;
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        const json = await response.json();
        if (json.success && json.data) {
          setPost(json.data);

          const allResponse = await fetch("/api/blogs?per_page=6");
          const allJson = await allResponse.json();
          if (allJson.success && Array.isArray(allJson.data)) {
            const related = allJson.data
              .filter(
                (p: BlogPost) =>
                  p.slug !== slug &&
                  p.categories?.some((c) =>
                    json.data.categories?.includes(c),
                  ),
              )
              .slice(0, 3);
            setRelatedPosts(related);
          }
        } else {
          throw new Error("Post not found");
        }
      } catch (e) {
        console.error("Failed to load blog post:", e);
        setError("Unable to load this article. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  // Reading progress + back to top visibility
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setReadingProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0);
    setShowBackToTop(scrollTop > 600);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "about-us") {
      window.location.href = "/about";
      return;
    }
    if (sectionId === "contact") {
      window.location.href = "/contact";
      return;
    }
    const target = sectionId.startsWith("services-") ? "services" : sectionId;
    window.location.href = `/${target === "home" ? "" : "#" + target}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} activeSection="" />
        <div className="h-[120px]" />
        <div className="flex flex-col items-center justify-center py-40 space-y-4">
          <Loader className="animate-spin text-brand-orange" size={40} />
          <p className="font-sans text-sm text-slate-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onNavigate={handleNavigate} activeSection="" />
        <div className="h-[120px]" />
        <div className="flex flex-col items-center justify-center py-40 space-y-6 text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center">
            <span className="text-3xl">🔍</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Article Not Found</h1>
          <p className="font-sans text-slate-500 text-sm leading-relaxed">
            {error || "The article you're looking for doesn't exist or may have been moved."}
          </p>
          <a
            href="/blog"
            className="inline-flex items-center space-x-2 bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-6 py-3 rounded-full transition-all"
          >
            <ArrowLeft size={16} />
            <span>Back to Blog</span>
          </a>
        </div>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  const headings = post.content ? extractHeadings(post.content) : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-brand-orange to-amber-400 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Article content and WordPress Gutenberg block styles */}
      <style>{`
        /* ====== ARTICLE CONTENT ====== */
        .article-content {
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
          color: #475569;
          line-height: 1.7;
          font-size: 1rem;
        }

        /* Headings */
        .article-content h2 {
          font-family: "Playfair Display", "Inter", ui-serif, Georgia, serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #0b2545;
          margin-top: 3rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #f8fafc;
          scroll-margin-top: 8rem;
        }
        .article-content h3 {
          font-family: "Playfair Display", "Inter", ui-serif, Georgia, serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0b2545;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          scroll-margin-top: 8rem;
        }
        .article-content h4 {
          font-family: "Playfair Display", "Inter", ui-serif, Georgia, serif;
          font-size: 1.125rem;
          font-weight: 700;
          color: #0b2545;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          scroll-margin-top: 8rem;
        }

        /* Paragraphs */
        .article-content p {
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
          color: #475569;
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 1rem;
        }

        /* Bold & Italic */
        .article-content strong {
          color: #1e293b;
          font-weight: 600;
        }
        .article-content em {
          font-style: italic;
        }

        /* Links */
        .article-content a {
          color: #f28f3b;
          font-weight: 500;
          text-decoration: none;
          transition: text-decoration 0.2s;
        }
        .article-content a:hover {
          text-decoration: underline;
        }

        /* Unordered / Ordered Lists */
        .article-content ul,
        .article-content ol {
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
          color: #475569;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .article-content ul {
          list-style-type: disc;
        }
        .article-content ol {
          list-style-type: decimal;
        }
        .article-content li {
          margin-bottom: 0.25rem;
          line-height: 1.7;
        }
        .article-content li > ul,
        .article-content li > ol {
          margin-top: 0.25rem;
          margin-bottom: 0;
        }

        /* Images inside content */
        .article-content img {
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          max-width: 100%;
          height: auto;
          margin: 2rem auto;
          display: block;
        }

        /* Blockquotes */
        .article-content blockquote {
          border-left: 4px solid rgba(242, 143, 59, 0.3);
          background: linear-gradient(to right, rgba(255, 235, 217, 0.2), transparent);
          padding: 1rem 1.5rem;
          border-radius: 0 0.75rem 0.75rem 0;
          margin: 2rem 0;
          font-style: normal;
        }
        .article-content blockquote p {
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
          color: #475569;
          margin-bottom: 0;
        }

        /* Code */
        .article-content code {
          background-color: #f1f5f9;
          color: #0b2545;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-weight: 400;
        }
        .article-content pre {
          background-color: #0f172a;
          color: #f1f5f9;
          border-radius: 0.75rem;
          padding: 1.25rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .article-content pre code {
          background: none;
          color: inherit;
          padding: 0;
          border-radius: 0;
          font-size: 0.875rem;
        }

        /* Tables */
        .article-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .article-content th {
          background-color: #f8fafc;
          color: #334155;
          font-weight: 600;
          font-size: 0.875rem;
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        .article-content td {
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          border-bottom: 1px solid #f1f5f9;
          color: #475569;
        }
        .article-content tr:last-child td {
          border-bottom: none;
        }

        /* Horizontal Rule */
        .article-content hr {
          border: none;
          border-top: 1px solid #f1f5f9;
          margin: 3rem 0;
        }

        /* Figures */
        .article-content figure {
          margin: 2rem 0;
        }
        .article-content figcaption {
          font-size: 0.875rem;
          color: #64748b;
          text-align: center;
          margin-top: 0.5rem;
          font-style: italic;
        }

        /* ====== WORDPRESS GUTENBERG BLOCK STYLES ====== */

        /* Image with caption */
        .wp-block-image-wrapper {
          margin: 2rem 0;
          text-align: center;
        }
        .wp-block-image-wrapper img {
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          max-width: 100%;
          height: auto;
        }
        .wp-image-caption {
          margin-top: 0.75rem !important;
          font-size: 0.875rem !important;
          color: #64748b !important;
          text-align: center !important;
          font-style: italic !important;
        }

        /* Gallery */
        .wp-block-gallery-wrapper {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
        }
        .wp-gallery-item {
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
        }
        .wp-gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        .wp-gallery-item img:hover {
          transform: scale(1.05);
        }

        /* Embeds (YouTube, Vimeo) */
        .wp-block-embed-wrapper {
          position: relative;
          margin: 2rem 0;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        }
        .wp-embed-iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          display: block;
        }

        /* Buttons */
        .wp-block-buttons-wrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin: 1.5rem 0;
        }
        .wp-block-button-link {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          background: #f97316;
          color: white !important;
          font-weight: 600 !important;
          font-size: 0.875rem !important;
          border-radius: 9999px !important;
          text-decoration: none !important;
          transition: background-color 0.2s ease;
        }
        .wp-block-button-link:hover {
          background: #ea580c;
        }

        /* Alignments */
        .aligncenter {
          text-align: center;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .alignleft {
          float: left;
          margin-right: 1rem;
          margin-bottom: 0.5rem;
        }
        .alignright {
          float: right;
          margin-left: 1rem;
          margin-bottom: 0.5rem;
        }
        /* WordPress text alignment classes (can appear on any block) */
        .has-text-align-center {
          text-align: center !important;
        }
        .has-text-align-right {
          text-align: right !important;
        }
        .has-text-align-left {
          text-align: left !important;
        }

        /* Responsive scrollable table wrapper */
        .wp-block-table,
        .wp-block-table-scroll {
          overflow-x: auto;
          margin: 2rem 0;
          -webkit-overflow-scrolling: touch;
        }
        .wp-block-table-scroll table {
          margin-top: 0;
          margin-bottom: 0;
        }

        /* Columns */
        .wp-block-columns {
          display: flex;
          gap: 1.5rem;
          margin: 1.5rem 0;
        }
        @media (max-width: 768px) {
          .wp-block-columns {
            flex-direction: column;
          }
        }
        .wp-block-column {
          flex: 1;
          min-width: 0;
        }

        /* Media text */
        .wp-block-media-text {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: center;
          margin: 2rem 0;
        }
        @media (max-width: 768px) {
          .wp-block-media-text {
            grid-template-columns: 1fr;
          }
        }
        .wp-block-media-text img {
          border-radius: 0.75rem;
          width: 100%;
          height: auto;
        }

        /* Cover block */
        .wp-block-cover {
          position: relative;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.75rem;
          overflow: hidden;
          margin: 2rem 0;
        }
        .wp-block-cover__background {
          position: absolute;
          inset: 0;
        }
        .wp-block-cover__inner-container {
          position: relative;
          z-index: 1;
          padding: 2rem;
          color: white;
        }

        /* Group block */
        .wp-block-group {
          padding: 1.5rem;
          margin: 1.5rem 0;
          background: #f8fafc;
          border-radius: 0.75rem;
          border: 1px solid #f1f5f9;
        }
        .wp-block-group__inner-container > *:last-child {
          margin-bottom: 0;
        }
      `}</style>

      <Navbar onNavigate={handleNavigate} activeSection="" />
      <div className="h-[120px]" />

      {/* Light Hero Section */}
      <section className="bg-gradient-to-br from-brand-lightorange/40 via-white to-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Breadcrumb */}
          <a
            href="/blog"
            className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-brand-orange font-sans text-sm font-medium transition-colors mb-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Blog</span>
          </a>

          {/* Categories */}
          {post.categoryNames && post.categoryNames.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {post.categoryNames.map((cat) => (
                <span
                  key={cat}
                  className="bg-brand-orange/10 text-brand-orange font-sans font-semibold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkteal leading-[1.1] mb-6">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-500 font-sans text-sm">
            <div className="flex items-center space-x-1.5">
              <Calendar size={14} className="text-brand-orange" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <User size={14} className="text-brand-orange" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock size={14} className="text-brand-orange" />
              <span>{estimateReadTime(post.content)}</span>
            </div>
            <div className="flex items-center space-x-3 ml-auto">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-brand-orange hover:underline font-semibold"
              >
                <Share2 size={14} />
                <span>Original Post</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image with decorative frame */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10 mb-14">
        <div className="relative">
          <div className="absolute -inset-2 bg-brand-lightorange/30 rounded-3xl blur-sm" />
          <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-slate-100">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[280px] sm:h-[400px] lg:h-[460px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
          {/* Decorative label */}
          <div className="absolute -bottom-3 -right-3 bg-white rounded-xl px-4 py-2 shadow-md border border-slate-100 hidden sm:flex items-center space-x-2">
            <BookOpen size={14} className="text-brand-orange" />
            <span className="font-sans text-xs text-slate-500 font-medium">
              {estimateReadTime(post.content)} • {post.date}
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex gap-12">
          {/* Desktop Table of Contents */}
          {headings.length > 2 && (
            <aside className="hidden xl:block w-64 shrink-0">
              <div className="sticky top-36 space-y-4">
                <div className="flex items-center space-x-2 text-brand-orange">
                  <BookOpen size={16} />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider">On this page</span>
                </div>
                <nav className="space-y-2 border-l-2 border-slate-100 pl-4">
                  {headings.map((h, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const el = document.getElementById(`heading-${i}`);
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`block text-left font-sans text-sm hover:text-brand-orange transition-colors ${
                        h.level === 2 ? "font-medium text-slate-600" : "text-slate-400 pl-3 text-xs"
                      }`}
                    >
                      {h.text}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <article className="flex-1 min-w-0 max-w-3xl">
            {/* Excerpt / Lead */}
            <div className="mb-10 pb-8 border-b border-slate-100">
              <div className="flex space-x-4">
                <div className="hidden sm:block text-brand-orange shrink-0">
                  <Quote size={28} className="opacity-30" />
                </div>
                <p className="font-serif text-lg sm:text-xl text-slate-600 leading-relaxed italic">
                  {stripHtml(post.excerpt)}
                </p>
              </div>
            </div>

            {/* Full Content */}
            {post.content ? (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: (() => {
                    let headingIdx = 0;
                    return post.content!.replace(/<h([2-3])([^>]*)>(.*?)<\/h([2-3])>/gi, (match, level, attrs, text, closeLevel) => {
                      const idx = headingIdx++;
                      return `<h${level}${attrs} id="heading-${idx}">${text}</h${closeLevel}>`;
                    });
                  })(),
                }}
              />
            ) : (
              <div className="text-center py-16 space-y-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-16 h-16 rounded-full bg-brand-lightorange/50 flex items-center justify-center mx-auto">
                  <BookOpen size={24} className="text-brand-orange" />
                </div>
                <p className="font-sans text-slate-500">Full article content is available on the original post.</p>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-6 py-3 rounded-full transition-all"
                >
                  <span>Read on api.scanjunction.com</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            )}

            {/* Key Takeaways Box */}
            {post.content && (
              <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100/50 p-6 sm:p-8">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-amber-100 text-amber-600 rounded-xl shrink-0">
                    <Lightbulb size={20} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif font-bold text-base text-amber-800">Key Takeaway</h4>
                    <p className="font-sans text-sm text-amber-700/80 leading-relaxed">
                      {stripHtml(post.excerpt)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-orange to-amber-400 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-sm">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-bold text-base text-brand-darkteal">{post.author}</p>
                  <p className="font-sans text-xs text-slate-400 mb-2">Author &amp; Archiving Specialist at ScanJunction</p>
                  <p className="font-sans text-sm text-slate-500 leading-relaxed">
                    ScanJunction helps families preserve their precious memories through professional digitization services. 
                    With expertise spanning photo scanning, film conversion, and digital archiving, our team ensures your 
                    legacy lasts for generations.
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.categoryNames && post.categoryNames.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                  <Tag size={14} className="text-slate-400 shrink-0" />
                  <span className="font-sans text-xs text-slate-400 font-medium shrink-0">Topics:</span>
                  {post.categoryNames.map((cat) => (
                    <span
                      key={cat}
                      className="bg-slate-50 text-slate-600 font-sans text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-100"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share & Navigate */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <a
                href="/blog"
                className="inline-flex items-center space-x-1.5 text-sm font-sans font-medium text-slate-500 hover:text-brand-orange transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back to all articles</span>
              </a>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-sm font-sans font-semibold text-brand-orange hover:underline"
              >
                <Share2 size={14} />
                <span>View Original Post</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 border-t border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-darkteal">Related Articles</h2>
              <div className="w-12 h-1 bg-brand-orange rounded-full mt-3 mx-auto" />
              <p className="font-sans text-slate-500 text-sm mt-3">Continue reading more from our blog</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <a
                  key={rp.id}
                  href={`/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={rp.imageUrl}
                      alt={rp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-sans">
                      <div className="flex items-center space-x-1">
                        <Calendar size={10} />
                        <span>{rp.date}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center space-x-1">
                        <Clock size={10} />
                        <span>{estimateReadTime(rp.content)}</span>
                      </div>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-brand-darkteal leading-snug group-hover:text-brand-orange transition-colors line-clamp-2">
                      {rp.title}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 line-clamp-2">{stripHtml(rp.excerpt)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Light CTA */}
      <section className="bg-gradient-to-br from-brand-lightorange/30 via-white to-slate-50 py-16 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-darkteal">
            Preserve Your Memories Today
          </h2>
          <p className="font-sans text-slate-500 text-base leading-relaxed">
            Ready to digitize your old photos, slides, tapes, or documents? Get a free consultation and sample scan from our Bangalore team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="/"
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center space-x-2"
            >
              <span>Get Free Samples</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 font-sans font-semibold px-8 py-3.5 rounded-full border border-slate-200 transition-all"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-orange hover:shadow-xl transition-all animate-fade-in"
          aria-label="Back to top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
