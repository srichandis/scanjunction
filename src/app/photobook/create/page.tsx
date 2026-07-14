"use client";

import { useState } from "react";
import { BookOpen, Clock, Bell, ArrowRight, Mail, CheckCircle, Camera, Heart, Star, Layout, Palette, Printer } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ComingSoonPage() {
  const [activeSection, setActiveSection] = useState("photobook-create");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "home") {
      window.location.href = "/";
    } else if (sectionId === "about-us") {
      window.location.href = "/about";
    } else if (sectionId === "contact") {
      window.location.href = "/contact";
    } else if (sectionId === "blog") {
      window.location.href = "/blog";
    } else if (sectionId === "pricing") {
      window.location.href = "/pricing";
    } else if (sectionId === "faq") {
      window.location.href = "/faqs";
    } else if (sectionId === "family-vault") {
      window.location.href = "/family-vault";
    } else if (sectionId === "how-it-works") {
      window.location.href = "/how-it-works";
    } else if (sectionId === "photobook-create") {
      window.location.href = "/photobook/create";
    } else if (sectionId.startsWith("services-")) {
      window.location.href = "/";
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsSubscribing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden antialiased">
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero / Coming Soon Section */}
      <section className="relative pt-36 pb-20 sm:pb-28 overflow-hidden min-h-[80vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-slate-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s" }} />
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
        
        {/* Floating decorative elements */}
        <div className="absolute top-32 left-12 w-4 h-4 bg-brand-orange/30 rounded-full animate-bounce hidden lg:block" style={{ animationDuration: "3s" }} />
        <div className="absolute top-48 right-20 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce hidden lg:block" style={{ animationDuration: "3.5s" }} />
        <div className="absolute bottom-40 left-1/3 w-5 h-5 bg-purple-400/20 rounded-full animate-bounce hidden lg:block" style={{ animationDuration: "4s" }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8 border border-white/10">
            <Clock size={14} className="text-brand-orange" />
            <span className="text-white/70 text-xs font-medium tracking-wide uppercase">Coming Soon</span>
          </div>

          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <BookOpen size={36} className="text-brand-orange" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            We&apos;re Building Something
            <span className="text-brand-orange block mt-2">Beautiful for You</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-4 leading-relaxed">
            Our Photo Book Creator is being crafted with love and attention to detail. 
            Soon you&apos;ll be able to turn your cherished memories into stunning, 
            professionally designed photo books — right from your browser.
          </p>

          <p className="text-slate-400 text-sm mb-12">
            Be the first to know when we launch.
          </p>

          {/* Email Subscription Form */}
          <div className="max-w-md mx-auto">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-orange/50 focus:border-brand-orange/50 text-sm transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-xl shadow-brand-orange/20 hover:shadow-2xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubscribing ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Subscribing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <Bell size={16} />
                      <span>Notify Me</span>
                    </span>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                <CheckCircle size={36} className="text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg mb-1">You&apos;re on the List!</h3>
                <p className="text-slate-300 text-sm">
                  We&apos;ll notify you at <span className="text-brand-orange font-medium">{email}</span> when we launch.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What's Coming Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-4 py-1.5 rounded-full mb-4">
              Sneak Peek
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What We&apos;re Building
            </h2>
            <p className="max-w-2xl mx-auto text-slate-500 text-base leading-relaxed">
              Here&apos;s a glimpse of the features coming to our Photo Book Creator.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: "Easy Photo Upload",
                description: "Drag and drop your photos. Supports all formats — JPEG, PNG, HEIC, and more. Auto-organization by date and event.",
                color: "text-blue-600",
                bgColor: "bg-blue-50",
              },
              {
                icon: Layout,
                title: "Drag-and-Drop Editor",
                description: "Intuitive canvas editor with smart layouts, text tools, stickers, and backgrounds. No design skills needed.",
                color: "text-purple-600",
                bgColor: "bg-purple-50",
              },
              {
                icon: Palette,
                title: "Customizable Templates",
                description: "Choose from dozens of professionally designed templates. Customize colors, fonts, and layouts to match your style.",
                color: "text-pink-600",
                bgColor: "bg-pink-50",
              },
              {
                icon: Printer,
                title: "Premium Printing",
                description: "Printed on archival-quality paper with professional binding. Available in softcover, hardcover, and layflat options.",
                color: "text-amber-600",
                bgColor: "bg-amber-50",
              },
              {
                icon: Star,
                title: "AI-Powered Enhancement",
                description: "Auto color correction, red-eye removal, and image enhancement. Your photos will look their absolute best.",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50",
              },
              {
                icon: Heart,
                title: "Collaborate with Family",
                description: "Invite family members to contribute photos and help design the book together in real-time.",
                color: "text-rose-600",
                bgColor: "bg-rose-50",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-brand-navy to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Want to Learn More?
          </h2>
          <p className="text-slate-300 text-base mb-10 max-w-xl mx-auto leading-relaxed">
            Talk to our team about our photo book printing services. We can help bring your vision to life even before the online creator launches.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleNavigate("contact")}
              className="bg-brand-orange hover:bg-brand-orange/95 text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-xl shadow-brand-orange/20 hover:shadow-2xl transition-all duration-200 flex items-center space-x-2"
            >
              <span>Talk to Our Team</span>
              <ArrowRight size={16} />
            </button>
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white px-6 py-3.5 rounded-full border border-white/20 hover:border-white/40 transition-all text-sm font-medium"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
