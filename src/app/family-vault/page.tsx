"use client";

import { Search, Sparkles, Calendar, BookOpen, Share2, Shield, ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const features = [
  {
    title: "Search & Filter",
    description: "Quickly locate specific scans by date, event tags, labels, or scanned folders.",
    icon: Search,
  },
  {
    title: "AI Face Recognition",
    description: "Automatically group your photos by individual faces to discover all pictures of a relative.",
    icon: Sparkles,
  },
  {
    title: "Timeline View",
    description: "Navigate through your family's history chronologically, watching generations unfold.",
    icon: Calendar,
  },
  {
    title: "Albums & Collections",
    description: "Create themed virtual albums, event booklets, or customized digital memory scrapbooks.",
    icon: BookOpen,
  },
  {
    title: "Share With Family",
    description: "Generate password-secured sharing links or invite family members to contribute and view safely.",
    icon: Share2,
  },
  {
    title: "Secure Cloud Storage",
    description: "Encrypted redundant cloud hosting guarantees protection from physical drive loss.",
    icon: Shield,
  },
];

export default function FamilyVaultPage() {
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} activeSection="" />
      <div className="h-[120px]" />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-brand-lightorange/40 via-white to-slate-50 py-20 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
            Introducing
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-darkteal leading-[1.1]">
            Your{" "}
            <span className="text-brand-orange">Family Vault</span>
          </h1>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            A private, secure digital archive for your family&apos;s most precious memories. Access, share, 
            and preserve your digitized photos, videos, and documents across generations.
          </p>
        </div>
      </section>

      {/* Vault UI Mockup + Features */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Device Mockup */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-brand-orange/10 rounded-full filter blur-3xl z-0 pointer-events-none" />
              
              <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-3 font-sans">
                {/* Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <span className="w-2.5 h-2.5 bg-rose-400 rounded-full" />
                      <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                      <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Family Vault v1.4</span>
                  </div>
                  <div className="bg-slate-50 rounded-full px-2.5 py-1 text-[10px] text-brand-orange font-bold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping" />
                    <span>Secure Cloud Live</span>
                  </div>
                </div>

                {/* Category Filters */}
                <div className="flex space-x-2 overflow-x-auto pb-2 mb-3">
                  <span className="bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer">All Memories</span>
                  <span className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">Wedding 1974</span>
                  <span className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">Summer Holidays</span>
                  <span className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">Negatives Scan</span>
                </div>

                {/* Photo Showcase Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="relative rounded-lg overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=200&auto=format&fit=crop" alt="Vintage family scan" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1974</div>
                  </div>
                  <div className="relative rounded-lg overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1554941068-a252680d25d9?q=80&w=200&auto=format&fit=crop" alt="Vintage portrait scan" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1968</div>
                  </div>
                  <div className="relative rounded-lg overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop" alt="Camera slides scan" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1980</div>
                  </div>
                  <div className="relative rounded-lg overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=200&auto=format&fit=crop" alt="Album page" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1991</div>
                  </div>
                  <div className="relative rounded-lg overflow-hidden group col-span-2">
                    <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=300&auto=format&fit=crop" alt="Photos on table" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1952</div>
                  </div>
                </div>

                {/* Floating Review Widget */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-lg border border-slate-100 flex items-center space-x-2 max-w-[180px]">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Shield size={16} />
                  </div>
                  <div className="text-[10px] leading-tight">
                    <p className="font-bold text-slate-800">ISO 27017 Safe</p>
                    <p className="text-slate-400">Safe &amp; secure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Features */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
                  Everything You Need to Preserve & Share Memories
                </h2>
                <p className="font-sans text-slate-500 text-base leading-relaxed">
                  More than just raw folders on a standard hard drive. ScanJunction provides a 
                  private, secure digital archive tailored for vintage media retrieval and long-term sharing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {features.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div key={feat.title} className="flex space-x-3 items-start">
                      <div className="p-2 bg-brand-lightorange/50 text-brand-orange rounded-xl shrink-0">
                        <Icon size={18} />
                      </div>
                      <div className="font-sans">
                        <h4 className="font-serif font-bold text-sm text-brand-darkteal mb-0.5">{feat.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{feat.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href="/"
                className="inline-flex items-center space-x-2 bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold text-sm px-6 py-3 rounded-full shadow-md transition-all"
              >
                <span>Start Your Family Vault</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-lightorange/30 via-white to-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
            Ready to Secure Your Memories?
          </h2>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">
            Every scan comes with free access to your private Family Vault. 
            Get started with a free sample scan today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="/"
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center space-x-2"
            >
              <span>Get Free Samples</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-700 font-sans font-semibold px-8 py-3.5 rounded-full border border-slate-200 transition-all"
            >
              <MessageCircle size={16} className="fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
