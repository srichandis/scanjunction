import { Calendar, Truck, Sparkles, Scan, ClipboardCheck, ThumbsUp, CheckCircle, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Book Pickup",
      description: "Schedule a free contactless pickup at your convenient date and time slot across Bangalore.",
      icon: Calendar,
      bgColor: "bg-orange-50",
      iconColor: "text-brand-orange"
    },
    {
      number: 2,
      title: "We Collect",
      description: "Our secure transport professional collects your treasures in sealed, shockproof containers.",
      icon: Truck,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      number: 3,
      title: "Cleaning & Prep",
      description: "We clean dust, remove tape residue, and prep negatives and slides manually with micro-cloths.",
      icon: Sparkles,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600"
    },
    {
      number: 4,
      title: "Professional Scan",
      description: "Memories are digitized on state-of-the-art studio scanners with meticulous depth-correction.",
      icon: Scan,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      number: 5,
      title: "Quality Check",
      description: "Every scanned image is double-checked frame-by-frame for colors, margins, and crispness.",
      icon: ClipboardCheck,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600"
    },
    {
      number: 6,
      title: "Sample Approval",
      description: "We email a small collection of sample scans. You pay only after verifying our work.",
      icon: ThumbsUp,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    },
    {
      number: 7,
      title: "Final Delivery",
      description: "Receive your originals back alongside your new files on a secure Pen Drive, SSD, or Digital Link.",
      icon: CheckCircle,
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600"
    },
    {
      number: 8,
      title: "Cloud Backup",
      description: "Optional cloud backup in your private, secure Family Vault for simple remote access.",
      icon: ShieldCheck,
      bgColor: "bg-sky-50",
      iconColor: "text-sky-600"
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
            The Safe Preservation Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkteal">
            How It <span className="text-brand-orange">Works</span>
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="font-sans text-slate-600 text-lg">
            We've designed a worry-free, transparent process to ensure your irreplaceable original archives remain perfectly secure and pristine.
          </p>
        </div>

        {/* Steps Horizontal / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting Background Line for Large Screens */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-slate-200 z-0"></div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number} 
                id={`how-works-step-${step.number}`}
                className="relative z-10 bg-white border border-slate-100 p-6 rounded-2xl hover:shadow-lg transition-shadow flex flex-col items-center text-center group"
              >
                {/* Step Number Circle */}
                <div className="absolute -top-3 left-4 bg-brand-orange text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                  {step.number}
                </div>

                {/* Icon Wrapper */}
                <div className={`w-14 h-14 rounded-2xl ${step.bgColor} ${step.iconColor} flex items-center justify-center mb-5 transform group-hover:scale-105 transition-transform shadow-sm`}>
                  <Icon size={24} />
                </div>

                {/* Text Information */}
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

        {/* Stats Row Segment (Directly under Timeline as displayed in mockup image) */}
        <div className="mt-20 bg-brand-darkteal rounded-3xl p-8 md:p-12 text-white shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative overflow-hidden">
          {/* Subtle Background Art */}
          <div className="absolute inset-0 bg-radial-at-t from-teal-800/20 via-transparent to-transparent pointer-events-none"></div>

          <div className="space-y-1 relative z-10 border-r border-slate-700/50 last:border-0 pr-4 last:pr-0">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-orange">
              20+
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium tracking-wide uppercase">
              Years of Experience
            </p>
          </div>

          <div className="space-y-1 relative z-10 border-r border-slate-700/50 last:border-0 pr-4 last:pr-0">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-orange">
              5 Million+
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium tracking-wide uppercase">
              Photos Digitized
            </p>
          </div>

          <div className="space-y-1 relative z-10 border-r border-slate-700/50 last:border-0 pr-4 last:pr-0">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-orange">
              1000+
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium tracking-wide uppercase">
              Happy Families
            </p>
          </div>

          <div className="space-y-1 relative z-10">
            <p className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-orange">
              99.9%
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium tracking-wide uppercase">
              Safe Handling Record
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
