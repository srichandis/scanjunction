"use client";

import { useState, useEffect } from "react";
import {
  Image, BookOpen, Layers, Bookmark, FileText, Film, Volume2,
  Sparkles, CheckCircle, ArrowRight, ShieldCheck, Star, Clock,
  Phone, Wrench
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/Contact";

interface ServiceData {
  id: string;
  title: string;
  shortTitle: string;
  heroHeadline: string;
  heroDescription: string;
  benefits: string[];
  process: { title: string; description: string }[];
  idealFor: string[];
  whyChoose: string[];
  imageUrl: string;
  icon: React.ElementType;
  tag: string;
}

const serviceData: Record<string, ServiceData> = {
  photos: {
    id: "photos",
    title: "Photo Scanning",
    shortTitle: "Photos",
    heroHeadline: "Preserve Every Print in Crystal-Clear Digital Quality",
    heroDescription:
      "From faded vintage prints to modern snapshots, we digitize all photo formats at up to 3000 DPI with professional color correction and scratch removal.",
    benefits: [
      "Up to 3000 DPI resolution for stunning reprints",
      "Professional color correction & fade restoration",
      "Scratch, dust & crease removal included",
      "Organized by date, event or album",
      "Delivered on USB, Google Drive or Cloud",
      "Archival-safe handling & storage",
    ],
    process: [
      {
        title: "Inspection & Cleaning",
        description:
          "Every photo is inspected for damage, dust, and condition. We gently clean using archival-safe methods before scanning.",
      },
      {
        title: "Professional Scanning",
        description:
          "Using Epson flatbed and Fujitsu document scanners, we digitize at optimal DPI settings — up to 3000 DPI for detailed prints.",
      },
      {
        title: "Color Correction & Restoration",
        description:
          "Our restoration experts manually color-correct faded photos, remove scratches, and repair creases using professional tools.",
      },
      {
        title: "Quality Check & Delivery",
        description:
          "Each scan is reviewed for accuracy. Your digital files are organized by album or date and delivered on your preferred media.",
      },
    ],
    idealFor: [
      "Family photo albums spanning decades",
      "Vintage black & white photographs",
      "Polaroid and instant camera prints",
      "Old school photographs & graduation photos",
      "Wedding and event photo collections",
    ],
    whyChoose: [
      "3000 DPI ultra-high resolution scanning",
      "Manual color balancing — not automated presets",
      "Scratch and dust removal on every scan",
      "Free pickup and delivery in Bangalore",
      "100% satisfaction guaranteed",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1531684096782-1af8c28ddb95?q=80&w=800&auto=format&fit=crop",
    icon: Image,
    tag: "Popular",
  },
  albums: {
    id: "albums",
    title: "Album Scanning",
    shortTitle: "Albums",
    heroHeadline: "Whole Albums Digitized Cover-to-Cover — Captions & All",
    heroDescription:
      "We carefully disassemble, scan, and reassemble your photo albums preserving every detail — including handwritten captions, page layouts, and decorative elements.",
    benefits: [
      "Non-destructive scanning of bound albums",
      "Captions, dates & handwritten notes preserved",
      "Page layouts maintained in digital format",
      "High-resolution with color correction",
      "Searchable PDF or image folder delivery",
      "Album reassembled after scanning",
    ],
    process: [
      {
        title: "Album Assessment",
        description:
          "We evaluate the binding type and paper condition to determine the safest scanning approach — flatbed or overhead capture.",
      },
      {
        title: "Page-by-Page Capture",
        description:
          "Each page is carefully scanned, including captions, decorations, and both sides if needed. Bound albums use our book cradle scanner.",
      },
      {
        title: "Layout Preservation",
        description:
          "Pages are organized digitally just as they appeared in the album. Handwritten notes and stickers are kept visible and legible.",
      },
      {
        title: "Reassembly & Delivery",
        description:
          "Your album is carefully reassembled. Digital files are delivered with page-by-page organization on your preferred media.",
      },
    ],
    idealFor: [
      "Vintage family photo albums",
      "Scrapbooks with handwritten captions",
      "Wedding guest books & albums",
      "Heritage and ancestry albums",
      "School yearbooks & memory books",
    ],
    whyChoose: [
      "Specialized book cradle for bound albums",
      "Captions and notes preserved in every scan",
      "Color correction for aged/toned pages",
      "Free pickup and delivery in Bangalore",
      "Expert handling of delicate & antique albums",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1632679760635-55966a6e3d42?q=80&w=800&auto=format&fit=crop",
    icon: BookOpen,
    tag: "Expert Care",
  },
  negatives: {
    id: "negatives",
    title: "Negative Scanning",
    shortTitle: "Negatives",
    heroHeadline: "Convert Film Negatives into Stunning Digital Positives",
    heroDescription:
      "35mm, medium format, and large format negatives scanned with professional film scanners. We digitally convert negatives to vibrant positives with accurate color reproduction.",
    benefits: [
      "35mm, 120 medium format & large format",
      "Up to 4000 DPI for incredible detail",
      "Digital inversion with color correction",
      "Dust & scratch removal using Digital ICE",
      "Batch scanning for large collections",
      "Archival TIFF & JPEG formats delivered",
    ],
    process: [
      {
        title: "Film Inspection",
        description:
          "Negatives are inspected for dust, mould, and physical condition. We note any issues and clean using anti-static methods.",
      },
      {
        title: "Professional Film Scanning",
        description:
          "Using dedicated film scanners (Plustek, Nikon Coolscan), each frame is captured at optimal resolution with multi-exposure for maximum dynamic range.",
      },
      {
        title: "Digital Conversion & Color Grading",
        description:
          "Negatives are digitally inverted to positives. Our colorists manually adjust white balance, contrast, and exposure for natural-looking results.",
      },
      {
        title: "Delivery & Organization",
        description:
          "Scans are organized by roll number and frame. Delivered as high-res JPEG or TIFF on USB, Google Drive, or cloud storage.",
      },
    ],
    idealFor: [
      "35mm film negative archives",
      "Medium format (120/220) negatives",
      "Black & white negative collections",
      "Old family film rolls from the 60s–90s",
      "Photographer archive digitization",
    ],
    whyChoose: [
      "Dedicated film scanners — not flatbed",
      "Multi-exposure HDR scanning for shadow detail",
      "Manual color grading by expert colorists",
      "Digital ICE dust & scratch removal",
      "Free pickup and delivery in Bangalore",
    ],
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1698081087873-06103e201351?q=80&w=800&auto=format&fit=crop",
    icon: Layers,
    tag: "Precise",
  },
  slides: {
    id: "slides",
    title: "Slide Scanning",
    shortTitle: "Slides",
    heroHeadline: "Bring Your 35mm Slides Back to Life in Vivid Color",
    heroDescription:
      "35mm mounted slides, super 35, and glass-mounted slides professionally scanned and digitally enhanced. We restore faded colors and remove dust for gallery-quality results.",
    benefits: [
      "35mm mounted & unmounted slides",
      "Super 35 and half-frame slide formats",
      "Glass-mounted slide handling",
      "Fade restoration & color correction",
      "Up to 4000 DPI optical resolution",
      "Dust, mould & fungus removal",
    ],
    process: [
      {
        title: "Slide Preparation",
        description:
          "Mounted slides are inspected for mould, fungus, and physical damage. Glass-mounted slides are handled with special care.",
      },
      {
        title: "High-Resolution Scanning",
        description:
          "Using dedicated slide scanners with multi-exposure technology, each slide is captured to reveal shadow detail and prevent highlight blowout.",
      },
      {
        title: "Color & Fade Restoration",
        description:
          "Faded color dyes are digitally restored. Contrast, saturation, and white balance are manually adjusted for accurate, vibrant colors.",
      },
      {
        title: "Quality Control & Export",
        description:
          "Every slide is reviewed. Files are named by slide number and delivered in your preferred format — JPEG, TIFF, or both.",
      },
    ],
    idealFor: [
      "35mm travel & vacation slide collections",
      "Family slides from the 50s–80s",
      "Educational & scientific slide archives",
      "Glass-mounted antique slides",
      "Corporate presentation slide archives",
    ],
    whyChoose: [
      "Dedicated slide scanners with multi-exposure",
      "Manual fade restoration — not auto-fix",
      "Mould & fungus removal included",
      "Free pickup and delivery in Bangalore",
      "TIFF archival format available",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1761682751228-783c48e7cd30?q=80&w=800&auto=format&fit=crop",
    icon: Bookmark,
    tag: "Vibrant",
  },
  documents: {
    id: "documents",
    title: "Document Scanning",
    shortTitle: "Documents",
    heroHeadline: "Digitize Your Important Documents into Searchable PDFs",
    heroDescription:
      "Old letters, certificates, legal documents, maps, and drawings scanned with archival-grade precision. Converted to searchable PDFs for easy access and sharing.",
    benefits: [
      "Up to 600 DPI for text & detail clarity",
      "OCR text recognition — searchable PDFs",
      "Color, grayscale & B&W scanning options",
      "Handles delicate & oversized documents",
      "Secure & confidential handling",
      "Cloud, USB or hard drive delivery",
    ],
    process: [
      {
        title: "Document Assessment",
        description:
          "Documents are assessed for size, paper condition, ink type, and binding. We determine optimal scanning parameters for each type.",
      },
      {
        title: "Archival Scanning",
        description:
          "Using book scanners and flatbed scanners, each page is captured at optimal resolution. Delicate documents are handled with extreme care.",
      },
      {
        title: "OCR & Post-Processing",
        description:
          "Text is extracted using OCR technology to create searchable PDFs. Skew correction, contrast adjustment, and page cropping are applied.",
      },
      {
        title: "Secure Delivery",
        description:
          "Files are organized, named, and delivered securely. Original documents are returned in the same or better condition.",
      },
    ],
    idealFor: [
      "Old letters & family correspondence",
      "Birth certificates & legal documents",
      "Property deeds & land records",
      "Maps, blueprints & architectural drawings",
      "Books, diaries & handwritten manuscripts",
    ],
    whyChoose: [
      "Searchable PDF with OCR technology",
      "Delicate document handling expertise",
      "Oversized document scanning (A3+)",
      "Confidentiality guaranteed",
      "Free pickup and delivery in Bangalore",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=800&auto=format&fit=crop",
    icon: FileText,
    tag: "Secure PDF",
  },
  books: {
    id: "books",
    title: "Book Scanning",
    shortTitle: "Books",
    heroHeadline: "Non-Destructive Book Scanning for Rare & Precious Volumes",
    heroDescription:
      "Diaries, family archives, religious texts, and rare books scanned with specialized non-destructive book scanners. No binding removal needed — your books stay intact.",
    benefits: [
      "Non-destructive — no binding removal",
      "V-cradle for gentle page opening",
      "Up to 600 DPI with page curvature correction",
      "Spine-friendly scanning process",
      "Searchable PDF with OCR",
      "Perfect for rare & antique books",
    ],
    process: [
      {
        title: "Book Evaluation",
        description:
          "We assess binding type, paper condition, and spine flexibility to determine the safest scanning approach without damaging the book.",
      },
      {
        title: "Non-Destructive Capture",
        description:
          "Using a book scanner with V-cradle design, each page spread is captured without fully opening the book — preserving the spine and binding.",
      },
      {
        title: "Page Processing & OCR",
        description:
          "Individual pages are extracted from spread images. Curvature correction is applied, and OCR is run for searchable text in the final PDF.",
      },
      {
        title: "Delivery & Return",
        description:
          "Your book is returned in its original condition. Digital files are delivered as a searchable PDF with page-by-page organization.",
      },
    ],
    idealFor: [
      "Family history & genealogy books",
      "Antique & rare religious texts",
      "Personal diaries & journals",
      "Handwritten family recipe books",
      "Published books for digital archive",
    ],
    whyChoose: [
      "100% non-destructive — books stay intact",
      "Specialized book scanner with V-cradle",
      "Page curvature correction technology",
      "OCR for searchable digital text",
      "Free pickup and delivery in Bangalore",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=800&auto=format&fit=crop",
    icon: BookOpen,
    tag: "Non-Destructive",
  },
  vhs: {
    id: "vhs",
    title: "VHS to Digital",
    shortTitle: "VHS Tapes",
    heroHeadline: "Convert Your Old Video Tapes to Digital MP4 Files",
    heroDescription:
      "VHS, VHS-C, Hi8, MiniDV, and Betamax tapes converted to digital MP4 files. We clean heads, stabilize tracking, and enhance audio for the best possible transfer.",
    benefits: [
      "VHS, VHS-C, Hi8, MiniDV & Betamax",
      "Digital MP4 files on USB or hard drive",
      "Video stabilization & noise reduction",
      "Audio enhancement & level balancing",
      "Real-time capture — no frames dropped",
      "Chapter marking & basic editing included",
    ],
    process: [
      {
        title: "Tape Inspection",
        description:
          "Tapes are inspected for mould, tape condition, and housing integrity. We clean VCR heads and ensure optimal playback before transfer.",
      },
      {
        title: "Real-Time Capture",
        description:
          "Each tape is played in real-time on professional-grade decks. Video is captured through a time-base corrector for stable, jitter-free output.",
      },
      {
        title: "Video & Audio Enhancement",
        description:
          "Stabilization, color correction, and noise reduction are applied. Audio is leveled and cleaned of hiss and pops.",
      },
      {
        title: "Digital Export & Delivery",
        description:
          "Final MP4 files are organized by tape. Delivered on USB, external hard drive, or Google Drive for easy sharing.",
      },
    ],
    idealFor: [
      "Family home videos on VHS tapes",
      "Wedding videos on MiniDV & Hi8",
      "Old camcorder footage from the 80s–90s",
      "Betamax home video collections",
      "School plays, recitals & family events",
    ],
    whyChoose: [
      "Professional-grade VCRs with TBC",
      "Real-time capture — no quality loss",
      "Video stabilization & color correction",
      "Audio enhancement & noise reduction",
      "Free pickup and delivery in Bangalore",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1493664543243-589b576c5bcd?q=80&w=800&auto=format&fit=crop",
    icon: Film,
    tag: "Trending",
  },
  audio: {
    id: "audio",
    title: "Audio Conversion",
    shortTitle: "Audio",
    heroHeadline: "Bring Your Audio Memories Back with Crystal-Clear Digital Sound",
    heroDescription:
      "Compact cassettes, reel-to-reel tapes, and microcassettes converted to crystal-clear digital MP3 or WAV files. We restore audio quality and remove unwanted noise.",
    benefits: [
      "Compact cassettes & microcassettes",
      "Reel-to-reel tape conversion",
      "8-track & dictation tapes",
      "Noise reduction & hiss removal",
      "MP3, WAV & FLAC formats available",
      "Track splitting & labeling included",
    ],
    process: [
      {
        title: "Tape Assessment",
        description:
          "Tapes are inspected for mould, tape stickiness, and mechanical condition. We clean playback heads and confirm tape path alignment.",
      },
      {
        title: "Digital Capture",
        description:
          "Tapes are played on restored, high-quality decks. Audio is captured in real-time at 24-bit/96kHz for maximum fidelity.",
      },
      {
        title: "Audio Restoration",
        description:
          "Clicks, pops, hiss, and wow/flutter are removed using spectral editing software. Volume levels are normalized for consistent playback.",
      },
      {
        title: "Track Splitting & Delivery",
        description:
          "Individual tracks are split and labeled. Final files delivered as MP3 (for devices) or WAV/FLAC (for archival) on your preferred media.",
      },
    ],
    idealFor: [
      "Family mixtapes & recorded letters",
      "Oral history & interview recordings",
      "Music recordings & demo tapes",
      "Dictation & voice memo cassettes",
      "Reel-to-reel family archives",
    ],
    whyChoose: [
      "24-bit/96kHz professional capture",
      "Spectral audio restoration technology",
      "Track splitting & labeling included",
      "Multiple format options (MP3, WAV, FLAC)",
      "Free pickup and delivery in Bangalore",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1573566472937-1fa7a6230e93?q=80&w=800&auto=format&fit=crop",
    icon: Volume2,
    tag: "Restored",
  },
  restoration: {
    id: "restoration",
    title: "Photo Restoration",
    shortTitle: "Restoration",
    heroHeadline: "Breathe New Life into Old, Damaged & Faded Photographs",
    heroDescription:
      "Professional photo restoration using advanced digital tools. We repair tears, remove scratches, restore faded colors, and even reconstruct missing parts of your precious photos.",
    benefits: [
      "Tear, crease & scratch repair",
      "Faded color restoration & enhancement",
      "Water damage & stain removal",
      "Missing area reconstruction",
      "Black & white colorization available",
      "Archival-quality digital output",
    ],
    process: [
      {
        title: "Damage Assessment",
        description:
          "The photo is scanned at high resolution and examined for tears, creases, stains, fading, and missing sections. We plan the restoration approach.",
      },
      {
        title: "Digital Restoration",
        description:
          "Using professional tools (Photoshop, Affinity Photo), we meticulously repair damage — cloning missing areas, healing tears, and removing stains pixel by pixel.",
      },
      {
        title: "Color & Tone Grading",
        description:
          "Faded colors are restored to their original vibrancy. Contrast, exposure, and white balance are adjusted. B&W colorization is available on request.",
      },
      {
        title: "Final Review & Delivery",
        description:
          "The restored photo is reviewed at 100% zoom for quality. Delivered as high-resolution JPEG and TIFF files on your preferred media.",
      },
    ],
    idealFor: [
      "Old faded family photographs",
      "Torn & damaged vintage prints",
      "Water-damaged & mouldy photos",
      "Scratched & creased heirloom photos",
      "Black & white photos for colorization",
    ],
    whyChoose: [
      "Pixel-level manual restoration — not auto-fix",
      "Missing area reconstruction expertise",
      "Colorization of B&W photos available",
      "Archival TIFF output included",
      "Free pickup and delivery in Bangalore",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    icon: Wrench,
    tag: "Skilled",
  },
};

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const [activeSection, setActiveSection] = useState("services");
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  const service = slug ? serviceData[slug] : undefined;
  const IconComponent = service?.icon || Image;

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
      const serviceId = sectionId.replace("services-", "");
      window.location.href = `/services/${serviceId}`;
    }
  };

  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Service Not Found</h1>
          <p className="text-slate-500 mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
          <a
            href="/"
            className="bg-brand-orange text-white px-6 py-3 rounded-full font-semibold text-sm inline-block"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden antialiased">
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-slate-900" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
                <IconComponent size={14} className="text-brand-orange" />
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                  {service.tag} Service
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                {service.heroHeadline}
              </h1>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                {service.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact-form"
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-xl shadow-brand-orange/20 hover:shadow-2xl transition-all duration-200 inline-flex items-center space-x-2"
                >
                  <span>Get Free Quote</span>
                  <ArrowRight size={14} />
                </a>
                <a
                  href="https://wa.me/919886444484"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white px-6 py-3 rounded-full border border-white/20 hover:border-white/40 transition-all text-sm font-medium inline-flex items-center justify-center"
                >
                  <Phone size={14} className="mr-2" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-orange text-white rounded-xl px-5 py-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star size={16} className="fill-current" />
                  <span className="font-bold text-sm">Trusted by 10,000+ families</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-4 py-1.5 rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What You Get with <span className="text-brand-orange">{service.title}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-brand-orange/20 hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-semibold text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-4 py-1.5 rounded-full mb-4">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How We Handle Your <span className="text-brand-orange">Precious Memories</span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-500 text-base leading-relaxed">
              Every item goes through our carefully designed process to ensure the best possible results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4 font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold text-brand-orange uppercase tracking-widest bg-brand-orange/5 px-4 py-1.5 rounded-full mb-4">
                Perfect For
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Who Is This <span className="text-brand-orange">For?</span>
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Our {service.title.toLowerCase()} service is ideal for anyone looking to preserve their precious memories. Here are some common use cases:
              </p>

              <div className="space-y-3">
                {service.idealFor.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={12} />
                    </div>
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-3xl p-8 sm:p-10 text-white">
              <ShieldCheck size={40} className="text-brand-orange mb-6" />
              <h3 className="text-xl font-bold mb-4">Why Trust ScanJunction?</h3>
              <div className="space-y-4">
                {service.whyChoose.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-brand-orange/5 to-brand-orange/10 border-y border-brand-orange/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock size={32} className="text-brand-orange mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Ready to Digitize Your {service.shortTitle}?
          </h2>
          <p className="text-slate-500 text-base mb-8 max-w-xl mx-auto">
            Get in touch with our team for a free consultation and quote. We offer free doorstep pickup in Bangalore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#contact-form"
              className="bg-brand-orange hover:bg-brand-orange/95 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg shadow-brand-orange/20 hover:shadow-xl transition-all duration-200"
            >
              Request Free Quote
            </a>
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-brand-orange px-6 py-3 rounded-full border border-slate-200 hover:border-brand-orange/40 transition-all text-sm font-medium"
            >
              <span className="flex items-center space-x-2">
                <Phone size={14} />
                <span>Call +91 9886 4444 84</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <div id="contact-form">
        <ContactForm />
      </div>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
