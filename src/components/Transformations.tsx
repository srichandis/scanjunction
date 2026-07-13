import React, { useState } from "react";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";

interface ComparisonCardProps {
  id: number;
  title: string;
  beforeUrl: string;
  afterUrl: string;
  key?: number;
}

function ComparisonCard({ id, title, beforeUrl, afterUrl }: ComparisonCardProps) {
  // slider position in percentage (0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX, rect);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSliding || e.buttons === 1) {
      const container = e.currentTarget;
      const rect = container.getBoundingClientRect();
      handleMove(e.clientX, rect);
    }
  };

  return (
    <div className="flex flex-col space-y-3 font-sans">
      <div 
        className="relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden shadow-lg border-2 border-white select-none cursor-ew-resize bg-slate-200"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsSliding(true)}
        onMouseUp={() => setIsSliding(false)}
        onMouseLeave={() => setIsSliding(false)}
      >
        {/* After Image (Always in background) */}
        <img 
          src={afterUrl} 
          alt="Restored scan" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 bottom-4 bg-emerald-600/90 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
          After
        </div>

        {/* Before Image (Clipped on top) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img 
            src={beforeUrl} 
            alt="Original damaged photo" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ width: "100%", height: "100%" }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-4 bottom-4 bg-brand-orange/90 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
            Before
          </div>
        </div>

        {/* Divider Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-brand-teal shadow-xl flex items-center justify-center border border-slate-200 hover:scale-110 active:scale-95 transition-transform">
            <RefreshCw size={12} className="animate-spin-slow text-brand-orange" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center px-1">
        <h4 className="font-serif font-bold text-slate-800 text-sm sm:text-base">
          {title}
        </h4>
        <span className="text-xs text-slate-400 font-medium italic">
          Slide to preview
        </span>
      </div>
    </div>
  );
}

export default function Transformations() {
  const transformations = [
    {
      id: 1,
      title: "Color Restoration & Fade Repair",
      beforeUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop&sepia=100&contrast=80",
      afterUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop&contrast=110"
    },
    {
      id: 2,
      title: "B&W Scratch & Tear Removal",
      beforeUrl: "https://images.unsplash.com/photo-1554941068-a252680d25d9?q=80&w=400&auto=format&fit=crop&blur=2",
      afterUrl: "https://images.unsplash.com/photo-1554941068-a252680d25d9?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Slide Film Dust & Mould Fix",
      beforeUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop&brightness=80",
      afterUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop&brightness=110"
    },
    {
      id: 4,
      title: "Vintage Negative Conversion",
      beforeUrl: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=400&auto=format&fit=crop&invert=true",
      afterUrl: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-brand-navy text-white overflow-hidden" id="transformations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
            Digital Transformation Showcase
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            Restoring <span className="text-brand-orange">Memories</span>, Reviving <span className="text-brand-orange">Emotions</span>
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="font-sans text-slate-300 text-lg">
            Witness the magical difference manual color-balancing, dust-cleaning, and professional studio scanners make compared to typical flatbed scanning.
          </p>
        </div>

        {/* Compare Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {transformations.map((item) => (
            <ComparisonCard 
              key={item.id}
              id={item.id}
              title={item.title}
              beforeUrl={item.beforeUrl}
              afterUrl={item.afterUrl}
            />
          ))}
        </div>

        {/* Bottom CTA Inside Section */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center space-x-2 text-brand-orange hover:text-white font-sans font-semibold text-sm transition-colors group"
          >
            <span>View More Transformations</span>
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
