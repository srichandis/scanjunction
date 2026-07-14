"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowUpRight, MessageCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface FaqSection {
  category: string;
  items: { id: number; question: string; answer: string }[];
}

const faqSections: FaqSection[] = [
  {
    category: "General",
    items: [
      {
        id: 1,
        question: "What are your office hours?",
        answer:
          "Our office hours are 10:00 AM to 7:00 PM IST Monday through Friday and 10:00 AM to 1:30 PM on Saturday. Email queries are typically answered within 4 hours. We are closed on Sundays and public holidays.",
      },
      {
        id: 2,
        question: "Where are you located?",
        answer:
          "You can meet us at: 14, HB Samaja Link Road, Gandhi Bazaar, Bangalore – 560004. Or call us at +91 9886 44 44 84, or email us at scanjunction@gmail.com.",
      },
      {
        id: 3,
        question: "How should I store my digitized content?",
        answer:
          "It's always better to store the digitized content on Pen-drives or Hard-drives. Either you can hand over a device or we can purchase it on your behalf. If the order value exceeds INR 5,000 you will be eligible for a free pen-drive. Approximately 1,200 photo scans at 600 DPI and 300 negative or slide scans at 2,400 DPI can fit in a 2 GB space. It also makes sense to copy the digitized content to online servers like Dropbox or Google Drive.",
      },
      {
        id: 4,
        question: "What file format will my scans be in?",
        answer:
          "Scanned pictures, slides, and negatives are stored in JPEG format. The organization of the folders depends on how the albums and negatives were labeled. Better labeling from your side leads to a better folder structure. Playback is possible on computers and most TVs.",
      },
      {
        id: 5,
        question: "What are the different ways to send my content to you?",
        answer:
          "There are 3 ways to get your content to us: (1) Pick-up and Drop — we collect from your doorstep and deliver back (Bangalore only). (2) Drop-off and Pick-up — you visit our facility. (3) Courier — for orders outside Bangalore, courier is the only option. Our custom-built safety process ensures your content is protected throughout.",
      },
      {
        id: 6,
        question: "How long does the digitization process take?",
        answer:
          "Time taken for 500 print photos at 600 DPI is approximately 5 days. 6 hours of videotape takes about 5 days. 500 negatives/slides at 1,200 DPI takes about 7 days. These are general estimates. If photos need to be removed from glued albums, or negatives/slides/video tapes need to be cleaned, times may vary.",
      },
      {
        id: 7,
        question: "How do you protect my privacy and security?",
        answer:
          "We take the privacy of your content very seriously. None of our workstations have access to the internet and USB ports are locked. This prevents your content from leaking out of ScanJunction. Workstation content can be copied only to the main server, and final delivery happens from the main server after quality checks.",
      },
      {
        id: 8,
        question: "Should I sort and label my content before sending?",
        answer:
          "It's best to sort content and label it by name. The same naming convention carries over to the digital medium. However, we understand this can be difficult, and we are OK if you send photos without counting or sorting. Note that there is an album handling charge of ₹2 per photo which is additional to the scanning charges if photos need to be removed from albums.",
      },
    ],
  },
  {
    category: "Ordering & Payment",
    items: [
      {
        id: 9,
        question: "How do I place an order?",
        answer:
          "The first step is to place an order online. Once an online order is placed, an order number gets generated which becomes the single point of contact until the entire process is completed.",
      },
      {
        id: 10,
        question: "Do I need to pay when I place the order?",
        answer:
          "No! There is no need to pay when you place an order. Ordering is 100% free. You will only pay once the sample review and complete scanning are done. We accept Cash on Delivery, UPI, and NEFT.",
      },
      {
        id: 11,
        question: "What payment methods do you accept?",
        answer:
          "We accept Cash on Delivery, UPI, and NEFT as payment methods.",
      },
    ],
  },
  {
    category: "Photo Scanning",
    items: [
      {
        id: 12,
        question: "What DPI resolution should I choose for photo scanning?",
        answer:
          "Higher DPI leads to better quality. It's always better to go with a higher DPI and get it right the first time to capture as much data as possible. We recommend photos be scanned at 600 DPI. Higher DPI also enables the scans to be printed on to larger sizes at a later stage.",
      },
      {
        id: 13,
        question: "What scanners do you use?",
        answer:
          "We use best-in-category Epson Perfection V800 flatbed scanners for professional-grade digitization.",
      },
      {
        id: 14,
        question: "What is the difference between JPEG and TIFF formats?",
        answer:
          "The file size depends on the scan resolution. TIFF is the raw format without any reduction in quality and will be the largest in size generally. JPEG is ideal for sharing and storing as they are about 5 times smaller in size compared to TIFF.",
      },
      {
        id: 15,
        question: "What is photo retouching and how much does it cost?",
        answer:
          "Retouching is the art of enhancing an already existing print photo. Print photos may have faded or yellowed. Sharpening such digitized print photos by color correction is called Retouch. If you choose just scanning, the digitized content will be a replica of the print photo with its inherent defects. We charge a very nominal ₹2 per photo for retouch, done manually, taking approximately 3 minutes per scan.",
      },
    ],
  },
  {
    category: "Negative Scanning",
    items: [
      {
        id: 16,
        question: "Is it better to scan negatives or prints?",
        answer:
          "It's always better to scan negatives compared to printed photos as negatives have the best information and quality. Negatives are scanned at 1,200 DPI and for best results, 3,000 DPI is preferred.",
      },
      {
        id: 17,
        question: "How do I identify which side of the negative has the emulsion?",
        answer:
          "The side where there is photographic emulsion has lesser shine. However, the best way is to follow the numbering scheme on the negative strip — the number should be visible, and this is on the opposite side of the photographic emulsion.",
      },
      {
        id: 18,
        question: "Do you scan medium and large format negatives?",
        answer:
          "Yes, we scan those on a case-by-case basis. Please contact us if you have negatives bigger than 35mm. You won't see prices for medium and large format negatives listed on our price page as these are not common. Pricing depends on quantity, color/B&W, and condition.",
      },
      {
        id: 19,
        question: "Can I select specific frames from a negative strip to scan?",
        answer:
          "It's not possible to accommodate selective scanning from a negative strip at this point in time. For photos, selective scanning is possible — either photos can be removed or marked in the album. But for negative strips, we scan the entire strip.",
      },
    ],
  },
  {
    category: "Slide Scanning",
    items: [
      {
        id: 20,
        question: "What resolution should I use for slide scanning?",
        answer:
          "It's advisable to scan slides at 3,000 DPI (technically SPI) so the resulting image will have approximately 10 megapixels resolution. This gives a good print quality up to 13\" × 9\".",
      },
      {
        id: 21,
        question: "How do you handle mold and dust on slides?",
        answer:
          "We take great care in mold and dust removal. It's very critical not to swipe slides with a rough cloth. Special cloth is used for this purpose, and film cleaner liquids are used in extreme cases. Even after cleaning, if scans are not up to mark, restoration may be the only option.",
      },
      {
        id: 22,
        question: "How do I identify the correct side of a slide for scanning?",
        answer:
          "Every slide has a mark, logo, or instruction printed on one side. This side of the slide is what the scanner should break down into pixels.",
      },
      {
        id: 23,
        question: "Do you offer color restoration for slides?",
        answer:
          "Yes! We have a professional team adept at color restoration techniques. Our scanning hardware also comes with in-built color restoration. In addition, ScanJunction uses professional software to manually restore colors in pictures.",
      },
    ],
  },
  {
    category: "Video & Audio",
    items: [
      {
        id: 24,
        question: "How long does video tape digitization take?",
        answer:
          "Approximately 6 hours of videotape takes about 5 days to digitize. Times may vary if tapes need special cleaning or treatment before playback.",
      },
      {
        id: 25,
        question: "How do you handle degraded or sticky VHS tapes?",
        answer:
          "We use time-base correction (TBC) and climate-controlled baking processes to restore sticky tapes before playback. This prevents the magnetic coating from stripping off during digitization.",
      },
    ],
  },
];

export default function FaqsPage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
            Got Questions?
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-darkteal leading-[1.1]">
            Frequently Asked{" "}
            <span className="text-brand-orange">Questions</span>
          </h1>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our digitization process, pricing,
            and how we keep your memories safe.
          </p>
        </div>
      </section>

      {/* FAQ Accordion by Category */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqSections.map((section) => (
            <div key={section.category} className="mb-10 last:mb-0">
              {/* Category Heading */}
              <div className="flex items-center space-x-3 mb-5">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange whitespace-nowrap">
                  {section.category}
                </span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <div className="space-y-3">
                {section.items.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                        isOpen
                          ? "border-brand-orange/20 bg-brand-lightorange/20 shadow-sm"
                          : "border-slate-100 bg-white hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <button
                        onClick={() =>
                          setOpenFaqId(isOpen ? null : faq.id)
                        }
                        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer gap-4"
                      >
                        <div className="flex items-start space-x-3">
                          <HelpCircle
                            size={18}
                            className={`mt-0.5 shrink-0 ${
                              isOpen ? "text-brand-orange" : "text-slate-400"
                            }`}
                          />
                          <span className="font-serif font-semibold text-slate-800 text-sm sm:text-base leading-snug">
                            {faq.question}
                          </span>
                        </div>
                        <div
                          className={`p-1 rounded-full shrink-0 transition-colors ${
                            isOpen
                              ? "bg-brand-orange text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-0 animate-fade-in">
                          <div className="border-t border-brand-orange/10 pt-4">
                            <p className="font-sans text-slate-600 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still have questions */}
          <div className="mt-12 text-center bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <h3 className="font-serif font-bold text-xl text-brand-darkteal mb-2">
              Still have questions?
            </h3>
            <p className="font-sans text-slate-500 text-sm mb-6 max-w-md mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Reach out to
              our team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/919886444484"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold px-6 py-3 rounded-full text-sm transition-all"
              >
                <MessageCircle size={16} className="fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="/"
                className="inline-flex items-center space-x-2 text-brand-orange hover:text-brand-orange/80 font-sans font-semibold text-sm transition-colors"
              >
                <span>Contact Us</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
