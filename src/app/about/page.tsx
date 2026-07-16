"use client";

import {
  Heart,
  ShieldCheck,
  Zap,
  Award,
  ArrowRight,
  MessageCircle,
  Quote,
  Sparkles,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { googleReviews } from "../../data/reviews";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const stats = [
  { value: "18+", label: "Years of Experience" },
  { value: "5 Million+", label: "Photos Digitized" },
  { value: "1,000+", label: "Happy Families" },
  { value: "99.9%", label: "Safe Handling Record" },
];

const values = [
  {
    title: "Uncompromising Quality",
    description:
      "Every scan passes through a rigorous multi-stage quality check. We manually inspect each image for color accuracy, sharpness, and dust-free results before delivery.",
    icon: Award,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    title: "Security First",
    description:
      "Your memories are kept safe and secure. Our workstations are air-gapped from the internet, USB ports are locked, and all pickups are sealed in tamper-proof bags.",
    icon: ShieldCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Customer Obsession",
    description:
      "We don't just scan — we partner with you. From free sample scans to personalized folder organization, every step is designed around your convenience and peace of mind.",
    icon: Heart,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    title: "Innovation & Speed",
    description:
      "With industrial-grade Epson Perfection scanners and optimized workflows, we deliver museum-quality digitization without the museum-level wait times.",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

function GoogleReviewsCarousel() {
  const reviews = googleReviews;
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
      {/* Main featured review */}
      <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-lg relative flex flex-col justify-between">
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-sm border border-slate-100 flex items-center space-x-1.5">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="font-sans text-[10px] font-semibold text-slate-500">Google Review</span>
        </div>

        <div className="space-y-5 pt-2">
          <div className="flex text-amber-400">
            {[...Array(reviews[activeIndex].rating)].map((_, i) => (
              <Star key={i} size={18} className="fill-current" />
            ))}
          </div>

          <p className="font-serif text-slate-700 text-base sm:text-lg italic leading-relaxed">
            &ldquo;{reviews[activeIndex].text}&rdquo;
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
          <div className="flex items-center space-x-3">
            <img
              src={reviews[activeIndex].avatar}
              alt={reviews[activeIndex].name}
              className="w-10 h-10 rounded-full object-cover border-2 border-brand-orange/20"
              referrerPolicy="no-referrer"
            />
            <div className="font-sans">
              <h4 className="font-serif font-bold text-slate-800 text-sm">{reviews[activeIndex].name}</h4>
              <p className="text-[11px] text-slate-400 font-medium">{reviews[activeIndex].timeAgo}</p>
            </div>
          </div>

          <div className="flex space-x-1.5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail list */}
      <div className="lg:col-span-2 space-y-3">
        {reviews.slice(0, 4).map((rev, index) => (
          <div
            key={rev.id}
            onClick={() => setActiveIndex(index)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              index === activeIndex
                ? "bg-brand-lightorange/40 border-brand-orange/40 shadow-sm"
                : "bg-white border-slate-100 hover:bg-slate-50"
            }`}
          >
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={9} className="fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{rev.timeAgo}</span>
            </div>
            <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-sans">
              &ldquo;{rev.text}&rdquo;
            </p>
            <div className="flex items-center space-x-1.5 mt-1.5">
              <img src={rev.avatar} alt={rev.name} className="w-4 h-4 rounded-full object-cover" referrerPolicy="no-referrer" />
              <span className="font-serif font-bold text-slate-800 text-[10px]">{rev.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const milestones = [
  {
    year: "2008",
    title: "The Beginning",
    description:
      "ScanJunction was founded in Bangalore with a simple mission: help families preserve their fading photographic memories before they were lost forever.",
  },
  {
    year: "2012",
    title: "Expanding Capabilities",
    description:
      "We invested in industrial-grade Epson Perfection scanners and expanded into negative, slide, and document scanning services.",
  },
  {
    year: "2016",
    title: "1 Million Photos Milestone",
    description:
      "Crossed the 1 million photos digitized mark. Our reputation for quality and care earned us a loyal customer base across Bangalore.",
  },
  {
    year: "2020",
    title: "VHS & Audio Digitization",
    description:
      "Added VHS, Hi8, and audio cassette digitization services with time-base correction for degraded tapes. Became a one-stop memory preservation hub.",
  },
  {
    year: "2024",
    title: "5 Million & Growing",
    description:
      "Surpassed 5 million items digitized. Launched the Family Vault cloud platform, enabling families to access, organize, and share their digital archives securely.",
  },
];



export default function AboutPage() {
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
      <section className="bg-gradient-to-br from-brand-lightorange/40 via-white to-slate-50 py-20 sm:py-28 border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
            Our Story
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-darkteal leading-[1.1]">
            We Preserve What Matters{" "}
            <span className="text-brand-orange">Most</span>
          </h1>
          <p className="font-sans text-slate-500 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            For over 18 years, ScanJunction has been Bangalore&apos;s most trusted
            photo digitization service. We believe every photograph, negative,
            and videotape holds a story worth saving — and we treat each one as
            if it were our own.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="/contact"
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transition-all inline-flex items-center space-x-2"
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

      {/* Stats Strip */}
      <section className="py-12 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-orange">
                  {stat.value}
                </p>
                <p className="font-sans text-xs sm:text-sm text-slate-400 font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
              The ScanJunction <span className="text-brand-orange">Timeline</span>
            </h2>
            <p className="font-sans text-slate-500 text-base max-w-2xl mx-auto">
              From a small garage operation to Bangalore&apos;s premier digitization studio — 
              here&apos;s how we grew alongside the families we serve.
            </p>
          </div>

          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

            <div className="space-y-12 lg:space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-brand-orange border-4 border-white shadow-md z-10" />

                  {/* Year Badge */}
                  <div className="lg:hidden">
                    <span className="inline-block bg-brand-orange/10 text-brand-orange font-sans font-bold text-xs px-3 py-1 rounded-full">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div
                    className={`w-full lg:w-[calc(50%-3rem)] ${
                      index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow">
                      <span className="hidden lg:inline-block font-serif text-4xl font-bold text-brand-orange/20 mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-brand-darkteal mb-3">
                        {milestone.title}
                      </h3>
                      <p className="font-sans text-slate-500 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty spacer for alternating layout */}
                  <div className="hidden lg:block w-[calc(50%-3rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
              Our{" "}
              <span className="text-brand-orange">Core Values</span>
            </h2>
            <p className="font-sans text-slate-500 text-base max-w-2xl mx-auto">
              These principles guide everything we do — from the way we handle your
              originals to the way we communicate with you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-white rounded-2xl border border-slate-100 p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${value.bgColor} ${value.color} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}
                  >
                    <Icon size={26} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-brand-darkteal mb-3 group-hover:text-brand-orange transition-colors">
                    {value.title}
                  </h3>
                  <p className="font-sans text-slate-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About the Founder */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
              The Founder
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
              About{" "}
              <span className="text-brand-orange">Srichand Kaushik</span>
            </h2>
            <p className="font-sans text-slate-500 text-base max-w-2xl mx-auto">
              The vision and dedication behind ScanJunction&apos;s trusted digitization services.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left: Avatar / Visual */}
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-orange/20 to-amber-300/20 rounded-[32px] blur-xl" />
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[28px] bg-gradient-to-br from-brand-orange to-amber-400 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-7xl sm:text-8xl select-none">
                    SK
                  </span>
                </div>
                {/* Decorative dots */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-brand-orange/20 rounded-full" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-amber-300/30 rounded-full" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-brand-lightorange/30 border border-brand-orange/10 rounded-2xl p-6 sm:p-8 relative">
                <Quote size={24} className="text-brand-orange/20 absolute top-4 right-4" />
                <p className="font-serif text-lg sm:text-xl text-slate-700 leading-relaxed italic">
                  &ldquo;With over 20 years of experience in the software industry, I founded 
                  ScanJunction and have set up the processes that take care of your memories. 
                  You can rest assured that your memories will be safe with us with the 
                  processes followed.&rdquo;
                </p>
                <div className="mt-4 pt-4 border-t border-brand-orange/10 flex items-center justify-between">
                  <div>
                    <p className="font-serif font-bold text-brand-darkteal">— Srichand Kaushik</p>
                    <p className="font-sans text-xs text-slate-500">Founder, ScanJunction</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 font-sans text-slate-600 text-sm leading-relaxed">
                <p>
                  Srichand is the founder of ScanJunction and has set up the processes within 
                  the company that ensure every memory is handled with the utmost care and 
                  precision. With over <strong>20 years of experience</strong> in the software 
                  industry and a post-graduate degree in Computer Applications, he brings a 
                  unique blend of technical expertise and a deep passion for preservation.
                </p>
                <p>
                  He is also the founder of <strong>Litent Digital Solutions Pvt Ltd</strong> 
                  (founded in 2010), a Bangalore-based digitization and ePublishing company 
                  that serves as the backbone of ScanJunction&apos;s operations. Litent focuses on 
                  four main verticals: <strong>Book Digitization</strong>,{" "}
                  <strong>Photo Digitization</strong>, <strong>Document Digitization</strong>, 
                  and <strong>ePublishing</strong>.
                </p>
                <p>
                  The mission of the company is to conserve print through digitization, 
                  enhancement, and restoration. By restoration mechanisms, ScanJunction can 
                  change old, soiled, yellowed, and discolored memories like books, 
                  photographs, and documents into their original form, thus extending 
                  their longevity for generations to come.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-slate-50 border border-slate-100 text-slate-600 font-sans text-xs font-semibold px-3 py-1.5 rounded-full">
                  20+ Years Experience
                </span>
                <span className="bg-slate-50 border border-slate-100 text-slate-600 font-sans text-xs font-semibold px-3 py-1.5 rounded-full">
                  MCA Post-Graduate
                </span>
                <span className="bg-slate-50 border border-slate-100 text-slate-600 font-sans text-xs font-semibold px-3 py-1.5 rounded-full">
                  Founder of Litent
                </span>
                <span className="bg-slate-50 border border-slate-100 text-slate-600 font-sans text-xs font-semibold px-3 py-1.5 rounded-full">
                  ePublishing Pioneer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Google Reviews Carousel */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
              Real Reviews From Google
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
              What Our Customers{" "}
              <span className="text-brand-orange">Say</span>
            </h2>
            <p className="font-sans text-slate-500 text-base max-w-2xl mx-auto">
              Don&apos;t take our word for it — hear from the families we&apos;ve helped
              preserve their precious memories.
            </p>
          </div>

          <GoogleReviewsCarousel />

          <div className="mt-10 text-center">
            <a
              href="https://g.page/r/CciA3TGL-fmQEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold text-sm px-6 py-3 rounded-full shadow-md transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="currentColor"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
              </svg>
              <span>See all 102 reviews on Google</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand-lightorange/30 via-white to-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-brand-orange">
            <Sparkles size={20} />
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold">
              Start Your Preservation Journey
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
            Ready to Trust Us With Your Memories?
          </h2>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">
            Get a free, no-obligation sample scan of up to 10 photos, negatives, or slides.
            See our quality for yourself before committing to anything.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="/contact"
              className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transition-all inline-flex items-center space-x-2"
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
