"use client";

import { Calendar, Truck, Sparkles, Scan, ClipboardCheck, ThumbsUp, CheckCircle, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const steps = [
  {
    number: 1,
    title: "Book Pickup",
    description: "Schedule a free contactless pickup at your convenient date and time slot across Bangalore.",
    icon: Calendar,
    bgColor: "bg-orange-50",
    iconColor: "text-brand-orange",
  },
  {
    number: 2,
    title: "We Collect",
    description: "Our secure transport professional collects your treasures in sealed, shockproof containers.",
    icon: Truck,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    number: 3,
    title: "Cleaning & Prep",
    description: "We clean dust, remove tape residue, and prep negatives and slides manually with micro-cloths.",
    icon: Sparkles,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    number: 4,
    title: "Professional Scan",
    description: "Memories are digitized on state-of-the-art studio scanners with meticulous depth-correction.",
    icon: Scan,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    number: 5,
    title: "Quality Check",
    description: "Every scanned image is double-checked frame-by-frame for colors, margins, and crispness.",
    icon: ClipboardCheck,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    number: 6,
    title: "Sample Approval",
    description: "We email a small collection of sample scans. You pay only after verifying our work.",
    icon: ThumbsUp,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    number: 7,
    title: "Final Delivery",
    description: "Receive your originals back alongside your new files on a secure Pen Drive, SSD, or Digital Link.",
    icon: CheckCircle,
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    number: 8,
    title: "Cloud Backup",
    description: "Optional cloud backup in your private, secure Family Vault for simple remote access.",
    icon: ShieldCheck,
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
  },
];

export default function HowItWorksPage() {
  const handleNavigate = (sectionId: string) => {
    const target = sectionId.startsWith("services-") ? "services" : sectionId;
    window.location.href = `/${target === "home" ? "" : "#" + target}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} activeSection="" />
      <div className="h-[120px]" />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-brand-lightorange/40 via-white to-slate-50 py-20 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
            The Safe Preservation Journey
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-darkteal leading-[1.1]">
            How It <span className="text-brand-orange">Works</span>
          </h1>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            We&apos;ve designed a worry-free, transparent process to ensure your irreplaceable original 
            archives remain perfectly secure and pristine from pickup to delivery.
          </p>
        </div>
      </section>

      {/* Steps Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting dashed line for desktop */}
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-slate-200 z-0" />

            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative z-10 bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-lg transition-shadow flex flex-col items-center text-center group"
                >
                  <div className="absolute -top-3 left-4 bg-brand-orange text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    {step.number}
                  </div>

                  <div className={`w-14 h-14 rounded-2xl ${step.bgColor} ${step.iconColor} flex items-center justify-center mb-5 transform group-hover:scale-105 transition-transform shadow-sm`}>
                    <Icon size={24} />
                  </div>

                  <h3 className="font-serif font-bold text-base text-brand-darkteal mb-2 group-hover:text-brand-orange transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats Row */}
          <div className="mt-16 bg-gradient-to-br from-brand-lightorange/30 via-white to-slate-50 rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "20+", label: "Years of Experience" },
              { value: "5 Million+", label: "Photos Digitized" },
              { value: "1000+", label: "Happy Families" },
              { value: "99.9%", label: "Safe Handling Record" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`space-y-1 ${i < 3 ? "border-r border-slate-200 pr-4" : ""}`}
              >
                <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-orange">
                  {stat.value}
                </p>
                <p className="font-sans text-xs sm:text-sm text-slate-500 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-lightorange/30 via-white to-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
            Ready to Start Your Preservation Journey?
          </h2>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">
            Get a free consultation and sample scan. Our Bangalore team will take 
            care of your memories with the utmost care and expertise.
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
