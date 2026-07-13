"use client";

import { useState, useEffect, useMemo } from "react";
import { BlogPost } from "../../types";
import {
  Calendar,
  User,
  ArrowUpRight,
  Loader,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function estimateReadTime(content?: string) {
  if (!content) return "2 min read";
  const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").trim();
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [source, setSource] = useState<"live" | "fallback" | "">("");

  const POSTS_PER_PAGE = 9;

  const handleNavigate = (sectionId: string) => {
    const target = sectionId.startsWith("services-") ? "services" : sectionId;
    window.location.href = `/${target === "home" ? "" : "#" + target}`;
  };

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `/api/blogs?per_page=${POSTS_PER_PAGE}&page=${currentPage}`,
        );
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          setBlogs(json.data);
          setSource(json.source);
          setTotalPages(json.totalPages || 1);
          setTotalPosts(json.total || json.data.length);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (e) {
        console.error("Failed to load blogs:", e);
        setError("Unable to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [currentPage]);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery) return blogs;
    const q = searchQuery.toLowerCase();
    return blogs.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q),
    );
  }, [blogs, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} activeSection="blog" />
      <div className="h-[120px]" />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-brand-darkteal via-brand-navy to-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-orange/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
              ScanJunction Blog
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
              Insights on{" "}
              <span className="text-brand-orange">Digitizing Memories</span>
            </h1>
            <p className="font-sans text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
              Expert advice on photo scanning, film digitization, photo
              restoration, and preserving your family&apos;s legacy for
              generations to come.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange transition-all font-sans"
            />
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader className="animate-spin text-brand-orange" size={40} />
              <p className="font-sans text-sm text-slate-500">
                Fetching latest articles...
              </p>
            </div>
          ) : error ? (
            /* Error State */
            <div className="flex flex-col items-center justify-center py-32 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
              <p className="font-sans text-slate-600 text-lg font-medium">
                {error}
              </p>
              <button
                onClick={() => {
                  setCurrentPage(1);
                  setLoading(true);
                  // Re-trigger fetch
                  window.location.reload();
                }}
                className="font-sans text-sm font-semibold text-brand-orange hover:underline"
              >
                Try again
              </button>
            </div>
          ) : filteredBlogs.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-32 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <Search size={28} className="text-slate-400" />
              </div>
              <p className="font-sans text-slate-600 text-lg font-medium">
                No articles found
              </p>
              <p className="font-sans text-slate-400 text-sm">
                Try adjusting your search or filter
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="font-sans text-sm font-semibold text-brand-orange hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <>
              {/* Source Indicator */}
              {source === "live" && (
                <div className="mb-8 flex items-center space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="font-sans text-xs text-emerald-600 font-medium">
                    Synced live from scanjunction.com
                  </span>
                </div>
              )}

              {/* Results count */}
              <div className="mb-8 flex items-center justify-between">
                <p className="font-sans text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-700">
                    {filteredBlogs.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-700">
                    {totalPosts}
                  </span>{" "}
                  articles
                </p>
                {source === "live" && (
                  <a
                    href="https://scanjunction.com/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-brand-orange font-semibold hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Visit Original Blog</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>

              {/* Blog Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((post, index) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                    style={{
                      animationDelay: `${index * 80}ms`,
                    }}
                  >
                    {/* Image */}
                    <a
                      href={`/${post.slug}`}
                      className="relative h-52 w-full overflow-hidden bg-slate-100 block"
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                      {/* Category Badge */}
                      {post.categoryNames && post.categoryNames.length > 0 && (
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 font-sans font-semibold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                          {post.categoryNames[0]}
                        </span>
                      )}

                      {/* Read time */}
                      <span className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white font-sans text-[10px] px-2 py-1 rounded-full flex items-center space-x-1">
                        <Clock size={10} />
                        <span>{estimateReadTime(post.content)}</span>
                      </span>
                    </a>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        {/* Date & Author */}
                        <div className="flex items-center space-x-4 text-xs text-slate-400 font-sans font-medium">
                          <div className="flex items-center space-x-1">
                            <Calendar size={11} className="text-brand-orange" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User size={11} className="text-brand-orange" />
                            <span>{post.author}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif font-bold text-lg text-brand-darkteal leading-snug">
                          <a
                            href={`/${post.slug}`}
                            className="hover:text-brand-orange transition-colors"
                          >
                            {post.title}
                          </a>
                        </h3>

                        {/* Excerpt */}
                        <p className="font-sans text-slate-600 text-sm leading-relaxed line-clamp-3">
                          {stripHtml(post.excerpt)}
                        </p>
                      </div>

                      {/* Read More */}
                      <div className="pt-3 border-t border-slate-50">
                        <a
                          href={`/${post.slug}`}
                          className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform"
                        >
                          <span>Read Article</span>
                          <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex items-center justify-center space-x-4">
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.max(1, p - 1))
                    }
                    disabled={currentPage === 1}
                    className="inline-flex items-center space-x-1.5 font-sans text-sm font-semibold text-slate-600 hover:text-brand-orange disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    {Array.from(
                      { length: Math.min(totalPages, 5) },
                      (_, i) => {
                        const startPage = Math.max(
                          1,
                          Math.min(
                            currentPage - 2,
                            totalPages - 4,
                          ),
                        );
                        const pageNum = startPage + i;
                        if (pageNum > totalPages) return null;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-9 h-9 rounded-xl font-sans text-sm font-semibold transition-all ${
                              currentPage === pageNum
                                ? "bg-brand-orange text-white shadow-sm"
                                : "text-slate-500 hover:bg-slate-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      },
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center space-x-1.5 font-sans text-sm font-semibold text-slate-600 hover:text-brand-orange disabled:text-slate-300 disabled:cursor-not-allowed transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand-darkteal via-brand-navy to-slate-900 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Ready to Digitize Your Memories?
          </h2>
          <p className="font-sans text-slate-300 text-lg leading-relaxed">
            Get in touch with our Bangalore team for a free consultation and
            sample scan of your cherished photographs and media.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="/"
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transition-all inline-flex items-center space-x-2"
            >
              <span>Get Free Samples</span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-sans font-semibold px-8 py-3.5 rounded-full border border-white/20 transition-all inline-flex items-center space-x-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
