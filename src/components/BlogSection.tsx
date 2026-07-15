import { useState, useEffect } from "react";
import { BlogPost } from "../types";
import { Calendar, User, ArrowUpRight, Loader } from "lucide-react";

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [source, setSource] = useState<"live" | "fallback" | "">("");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        const json = await response.json();
        if (json.success && Array.isArray(json.data)) {
          setBlogs(json.data);
          setSource(json.source);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (e) {
        console.error("Failed to load blogs, state remains default:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section className="py-20 bg-slate-50" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
              Direct from api.scanjunction.com
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkteal">
              Latest Blog Updates
            </h2>
            <div className="w-16 h-1 bg-brand-orange rounded-full"></div>
          </div>
          
          <div className="flex items-center space-x-3">
            {source === "live" && (
              <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-100 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>Live WordPress Sync</span>
              </span>
            )}
            <a 
              href="/blog" 
              className="text-sm text-brand-orange hover:text-brand-orange/80 font-sans font-semibold inline-flex items-center space-x-1"
            >
              <span>View All Blogs</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4" id="blogs-loading">
            <Loader className="animate-spin text-brand-orange" size={32} />
            <p className="font-sans text-sm text-slate-500">Connecting to WordPress CMS...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blogs-grid">
            {blogs.map((post) => (
              <article 
                key={post.id}
                id={`blog-post-${post.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Blog Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Blog Info */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Date and Author Ribbon */}
                    <div className="flex items-center space-x-4 text-xs text-slate-400 font-sans font-medium">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} className="text-brand-orange" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User size={12} className="text-brand-orange" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Blog Title */}
                    <h3 className="font-serif font-bold text-lg text-brand-darkteal leading-snug group-hover:text-brand-orange transition-colors">
                      <a href={`/${post.slug}`}>
                        {post.title}
                      </a>
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-slate-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More button */}
                  <div className="pt-2 border-t border-slate-50">
                    <a 
                      href={`/${post.slug}`}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-brand-orange group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read Article</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
