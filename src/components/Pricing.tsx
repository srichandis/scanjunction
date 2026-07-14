import { Check, ShieldCheck, Heart } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      title: "Photo Scanning",
      price: "Starting from ₹4",
      unit: "per photo",
      description: "Perfect for loose family photos, vintage polaroids, and snapshot booklets.",
      features: [
        "Digitized up to 600 DPI resolution",
        "Manual orientation correction",
        "Basic color and brightness balancing",
        "Digital download link (60 days free)",
        "Organized in customized year folders"
      ],
      popular: true,
      color: "border-brand-orange/30 shadow-brand-orange/5"
    },
    {
      title: "Album Scanning",
      price: "Starting from ₹2",
      unit: "per photo",
      description: "Whole photo albums scanned cover-to-cover preserving captions and page arrangements.",
      features: [
        "Non-destructive album scanning",
        "Preserves original page layout",
        "High-resolution flatbed scanning",
        "Careful handling of glued photos",
        "Digital files organized by page"
      ],
      popular: false,
      color: "border-slate-100"
    },
    {
      title: "Negative Scanning",
      price: "Starting from ₹600",
      unit: "per roll of 35 frames",
      description: "Best for 35mm film negatives, super slides, and mounted film strips.",
      features: [
        "Digitized on dedicated film scanners",
        "True optical 2400 DPI resolution",
        "Hardware dust & scratch repair (ICE)",
        "Inversion and correct color restoration",
        "Digital files + original slides returned"
      ],
      popular: false,
      color: "border-slate-100"
    },
    {
      title: "Slide Scanning",
      price: "Starting from ₹20",
      unit: "per slide",
      description: "For 35mm slides, super 35, and mounted slides cleaned and digitally enhanced.",
      features: [
        "High-resolution slide scanning",
        "Color correction & restoration",
        "Mold & dust removal pre-treatment",
        "Digital enhancement of faded colors",
        "Delivered in JPEG + TIFF formats"
      ],
      popular: false,
      color: "border-slate-100"
    },
    {
      title: "Document Scanning",
      price: "Starting from ₹2",
      unit: "per page",
      description: "Ideal for old letters, certificates, maps, and important documents.",
      features: [
        "High-speed duplex scanning",
        "OCR conversion to searchable PDF",
        "Color, grayscale & B&W options",
        "Secure handling of sensitive docs",
        "Digital files organized by folders"
      ],
      popular: false,
      color: "border-slate-100"
    },
    {
      title: "VHS to Digital",
      price: "Starting from ₹600",
      unit: "per hour",
      description: "For VHS, VHS-C, Hi8, and camcorder cassettes lying in drawers.",
      features: [
        "Full capture of vintage sound and tape",
        "Digitized to modern MP4 files",
        "Time-base correction for degraded tapes",
        "Chapters division & simple title card",
        "Optional cloud or USB delivery"
      ],
      popular: false,
      color: "border-slate-100"
    },
    {
      title: "Audio Conversion",
      price: "Starting from ₹500",
      unit: "per cassette",
      description: "For compact cassettes, microcassettes, and reel-to-reel tapes.",
      features: [
        "Full analog-to-digital conversion",
        "Noise reduction processing",
        "Digitized to high-quality MP3/WAV",
        "Track splitting & labeling",
        "Optional cloud delivery"
      ],
      popular: false,
      color: "border-slate-100"
    },
    {
      title: "Photo Restoration",
      price: "Starting from ₹499",
      unit: "per photo",
      description: "Professional digital repair for damaged, torn, or faded photographs.",
      features: [
        "Tear & crease removal",
        "Color correction & enhancement",
        "Stain & water damage repair",
        "Missing area reconstruction",
        "Delivered in TIFF + JPEG formats"
      ],
      popular: false,
      color: "border-slate-100"
    }
  ];

  return (
    <section className="py-20 bg-slate-50" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
            AFFORDABLE MEMORY ARCHIVING
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkteal">
            Transparent Pricing
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="font-sans text-slate-600 text-lg">
            No hidden costs or setup fees. We offer simple per-item pricing models with generous volume discounts for larger collections.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.title}
              className={`bg-white rounded-3xl border p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative ${plan.color}`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  Most Requested
                </span>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-brand-darkteal">{plan.title}</h3>
                  <p className="font-sans text-slate-500 text-xs sm:text-sm leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-baseline space-x-1 border-b border-slate-50 pb-6">
                  <span className="font-serif text-4xl sm:text-5xl font-extrabold text-brand-darkteal">{plan.price}</span>
                  <span className="font-sans text-xs text-slate-400 font-semibold">{plan.unit}</span>
                </div>

                <ul className="space-y-3 font-sans text-xs sm:text-sm text-slate-600">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start space-x-2.5">
                      <div className="p-0.5 bg-emerald-50 text-emerald-500 rounded-full shrink-0 mt-0.5">
                        <Check size={14} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  href="#contact"
                  className={`w-full font-sans font-semibold text-xs py-3.5 rounded-xl block text-center transition-all cursor-pointer ${
                    plan.popular 
                      ? "bg-brand-orange hover:bg-brand-orange/95 text-white shadow-md shadow-brand-orange/10" 
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  Request a Free Quote
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Volume discount helper */}
        <div className="bg-brand-darkteal text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-slate-800 text-brand-orange rounded-2xl shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="font-sans">
              <h4 className="font-serif font-bold text-base text-white">Have a massive collection? (1,000+ items)</h4>
              <p className="text-slate-300 text-xs sm:text-sm">We provide tailored enterprise archiving packages, free safe deposit boxes, and deep volume discounts.</p>
            </div>
          </div>
          <a 
            href="https://wa.me/919886444484" 
            target="_blank" 
            referrerPolicy="no-referrer"
            className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-colors shrink-0"
          >
            Ask for Bulk Discount
          </a>
        </div>

      </div>
    </section>
  );
}
