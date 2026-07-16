import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { googleReviews } from "../data/reviews";

export default function Testimonials() {
  const reviews = googleReviews;

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-4">
            <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
              REAL GOOGLE REVIEWS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkteal">
              Loved By Families
            </h2>
            <div className="w-16 h-1 bg-brand-orange rounded-full"></div>
          </div>

          {/* Rating Summary Widget */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center space-x-4">
            <div className="flex flex-col items-center justify-center border-r border-slate-200 pr-4">
              <span className="text-3xl font-bold text-brand-darkteal">4.9</span>
              <span className="text-[10px] text-slate-500 font-semibold font-sans">OUT OF 5</span>
            </div>
            <div className="font-sans">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-600 font-bold mt-1">Based on 102+ reviews</p>
              <a 
                href="https://g.page/r/CciA3TGL-fmQEBM/review" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] text-brand-orange hover:underline font-semibold"
              >
                Review us on Google →
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Main Selected Slider Card (Highlight review) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-lg relative flex flex-col justify-between" id="active-review-card">
            {/* Google badge */}
            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-sm border border-slate-100 flex items-center space-x-1.5">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-sans text-[10px] font-semibold text-slate-500">Google Review</span>
            </div>

            <div className="space-y-6 pt-2">
              {/* Star rating */}
              <div className="flex text-amber-400">
                {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-slate-700 text-lg sm:text-xl italic leading-relaxed">
                &ldquo;{reviews[activeIndex].text}&rdquo;
              </p>
            </div>

            {/* Author info and actions */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-8 mt-8">
              <div className="flex items-center space-x-4">
                <img 
                  src={reviews[activeIndex].avatar} 
                  alt={reviews[activeIndex].name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-orange/20"
                  referrerPolicy="no-referrer"
                />
                <div className="font-sans">
                  <h4 className="font-serif font-bold text-slate-800 text-base">{reviews[activeIndex].name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{reviews[activeIndex].timeAgo} • Verified Google Review</p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex space-x-2">
                <button 
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  id="testimonial-prev-btn"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  id="testimonial-next-btn"
                  aria-label="Next review"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Review Lists */}
          <div className="space-y-4 flex flex-col justify-between">
            {reviews.slice(0, 4).map((rev, index) => (
              <div 
                key={rev.id}
                onClick={() => setActiveIndex(index)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  index === activeIndex 
                    ? "bg-brand-lightorange/40 border-brand-orange/40 shadow-sm" 
                    : "bg-white border-slate-100 hover:bg-slate-50"
                }`}
                id={`testimonial-thumb-${rev.id}`}
              >
                <div className="font-sans">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{rev.timeAgo}</span>
                  </div>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-slate-100/50">
                  <img src={rev.avatar} alt={rev.name} className="w-5 h-5 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <span className="font-serif font-bold text-slate-800 text-[11px]">{rev.name}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* View all reviews CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://g.page/r/CciA3TGL-fmQEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white hover:bg-slate-50 text-slate-600 font-sans font-semibold text-sm px-6 py-3 rounded-full border border-slate-200 transition-all shadow-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>See all 102 reviews on Google</span>
          </a>
        </div>

      </div>
    </section>
  );
}
