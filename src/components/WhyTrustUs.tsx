import { HeartHandshake, ShieldCheck, Sparkles, FolderHeart } from "lucide-react";

export default function WhyTrustUs() {
  const pillars = [
    {
      id: "care",
      title: "Handled With Care",
      subtitle: "Your family treasures",
      description: "Your original photographs, slides, and negatives are treated with white-glove respect, tracked safely through every phase, and returned pristine.",
      icon: HeartHandshake,
      bgColor: "bg-orange-50",
      iconColor: "text-brand-orange",
      borderColor: "border-brand-orange/20"
    },
    {
      id: "quality",
      title: "Premium Quality",
      subtitle: "No shortcut scanning",
      description: "We use professional industrial flatbed and cinematic slide film scanners with true high-resolution optics to capture every microscopic bit of detail.",
      icon: ShieldCheck,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-100"
    },
    {
      id: "restoration",
      title: "Expert Restoration",
      subtitle: "Bringing colors back to life",
      description: "Our artists manually color-correct, remove dust artifacts, repair tears, and remove severe scratches using state-of-the-art digital retouching.",
      icon: Sparkles,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-100"
    },
    {
      id: "organized",
      title: "Organized For You",
      subtitle: "Ready for future generations",
      description: "Scans are beautifully arranged into folders, tagged by year/subject, and prepared beautifully for simple viewing, sharing, or digital backup.",
      icon: FolderHeart,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-100"
    }
  ];

  return (
    <section className="py-20 bg-white" id="about-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
            Archival Quality Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkteal">
            Why Families Trust <span className="italic">ScanJunction</span>
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="font-sans text-slate-600 text-lg">
            We don't just 'scan' pictures—we preserve legacies. Every order is processed with utmost transparency, using standard museum-grade digital workflows.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.id}
                id={`trust-${pillar.id}`}
                className={`relative bg-white rounded-2xl border ${pillar.borderColor} p-6 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center`}
              >
                {/* Floating Highlight Decor */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl"></div>

                {/* Icon Wrapper */}
                <div className={`w-14 h-14 rounded-2xl ${pillar.bgColor} ${pillar.iconColor} flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform shadow-sm`}>
                  <Icon size={28} />
                </div>

                {/* Typography */}
                <span className="font-sans text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {pillar.subtitle}
                </span>
                <h3 className="font-serif font-bold text-xl text-brand-darkteal mb-3">
                  {pillar.title}
                </h3>
                <p className="font-sans text-slate-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
