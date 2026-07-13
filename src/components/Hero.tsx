import { Star, ShieldCheck, Truck, Sparkles, Play, ArrowRight } from "lucide-react";
import heroImg from "../assets/images/hero_memories_archive_1783873592836.jpg";
import polaroidImg from "../assets/images/polaroid_holiday_1783873608378.jpg";
import slideImg from "../assets/images/vintage_slide_1783873623937.jpg";

interface HeroProps {
  onGetSamples: () => void;
  onSeeHowItWorks: () => void;
}

export default function Hero({ onGetSamples, onSeeHowItWorks }: HeroProps) {
  return (
    <section 
      className="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 overflow-hidden bg-radial from-slate-50 to-white"
      id="home"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-8 animate-slide-up">
            
            {/* Tagline / Heading */}
            <div className="space-y-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-darkteal font-bold leading-[1.1] tracking-tight">
                Preserve Every <span className="text-brand-orange italic font-semibold relative inline-block">
                  Memory
                  <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-brand-orange/20 rounded-full"></span>
                </span> Before Time Fades It Away
              </h1>
              
              <p className="font-sans text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
                We professionally digitize photographs, albums, negatives, slides, VHS tapes, documents and more—so your cherished family memories stay safe and accessible for generations.
              </p>
            </div>

            {/* Trust Badges Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 bg-amber-50 rounded-lg text-brand-orange">
                  <Star size={18} className="fill-current" />
                </div>
                <div className="font-sans">
                  <p className="font-bold text-sm">1000+ Google Reviews</p>
                  <p className="text-xs text-slate-500">4.9 Star Rating</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 bg-sky-50 rounded-lg text-sky-600">
                  <Sparkles size={18} />
                </div>
                <div className="font-sans">
                  <p className="font-bold text-sm">Millions Digitized</p>
                  <p className="text-xs text-slate-500">Expert Quality Scans</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                  <ShieldCheck size={18} />
                </div>
                <div className="font-sans">
                  <p className="font-bold text-sm">100% Safe Handling</p>
                  <p className="text-xs text-slate-500">Priceless Heirloom Security</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                  <Truck size={18} />
                </div>
                <div className="font-sans">
                  <p className="font-bold text-sm">Pickup & Delivery</p>
                  <p className="text-xs text-slate-500">Doorstep Convenience</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onGetSamples}
                className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-8 py-4 rounded-full shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
                id="hero-get-samples-btn"
              >
                <span>Get Your Free Samples</span>
                <ArrowRight size={18} />
              </button>
              
              <button
                onClick={onSeeHowItWorks}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-sans font-semibold px-8 py-4 rounded-full shadow-sm hover:shadow transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
                id="hero-how-works-btn"
              >
                <div className="w-6 h-6 rounded-full bg-brand-lightorange flex items-center justify-center text-brand-orange">
                  <Play size={10} className="fill-current ml-0.5" />
                </div>
                <span>See How It Works</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Showcase */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end animate-fade-in">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-lightorange/40 rounded-full filter blur-3xl z-0 pointer-events-none"></div>

            {/* Main Image Framed Nicely */}
            <div className="relative z-10 w-full max-w-[460px] rounded-2xl shadow-2xl border-4 border-white overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500 bg-slate-100">
              <img 
                src={heroImg} 
                alt="Vintage family photographs lying on a wooden table, being examined with love" 
                className="w-full h-[400px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl flex items-center space-x-3 shadow-md">
                <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                  <Sparkles size={18} />
                </div>
                <div className="font-sans text-xs">
                  <p className="font-bold text-slate-900">100% Archival Standards</p>
                  <p className="text-slate-500 font-medium">Safe from light and moisture decay</p>
                </div>
              </div>
            </div>

            {/* Secondary Floating Decorative Frame (Polaroid effect) */}
            <div className="absolute -bottom-6 -left-6 hidden sm:block z-20 w-[180px] bg-white p-3 rounded-lg shadow-xl transform -rotate-6 border border-slate-100">
              <img 
                src={polaroidImg} 
                alt="Memory Slide" 
                className="w-full h-[130px] object-cover rounded-md mb-2"
                referrerPolicy="no-referrer"
              />
              <p className="font-serif text-[10px] text-center text-slate-500 italic">Family Holidays, 1982</p>
            </div>
            
            {/* Tertiary Floating Slide (35mm Slide effect) */}
            <div className="absolute -top-6 right-6 hidden sm:block z-20 w-[120px] bg-slate-50 p-2 border-8 border-white shadow-lg transform rotate-12 rounded">
              <img 
                src={slideImg} 
                alt="Vintage camera negative scan" 
                className="w-full h-[80px] object-cover rounded-sm filter sepia"
                referrerPolicy="no-referrer"
              />
              <p className="font-mono text-[8px] text-center text-slate-400 mt-1">SLIDE #24</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
