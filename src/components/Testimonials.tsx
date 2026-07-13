import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Chinnu E",
      timeAgo: "5 months ago",
      rating: 5,
      text: "Nice experience! Scanned multiple volumes of grandfather's photo albums. Colors have been balanced beautifully and dust marks were magically repaired. Highly recommended in Bangalore.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "PRASHANT SAJJAN",
      timeAgo: "7 months ago",
      rating: 5,
      text: "I visited Scan Junction, Basavanagudi to enhance and clarify an old black-and-white passport-size photo, and they did an excellent job. The staff was super professional, took their time, and handled the fragile prints with white-gloves. Super happy with the high-resolution files.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Sudhir Pai",
      timeAgo: "8 months ago",
      rating: 5,
      text: "Good experience getting digital videos done from old Sony camcorder cassettes and VHS tapes that were lying around for 25 years. I was worried they would snap, but ScanJunction did superb conversion and shared links securely over email.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Girish Shenoy",
      timeAgo: "9 months ago",
      rating: 5,
      text: "Good work, prompt response. And excellent output. They scanned negatives and 35mm slides of my childhood years perfectly. Will definitely trust them with additional memories.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
    }
  ];

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
              <p className="text-xs text-slate-600 font-bold mt-1">Based on 1,000+ reviews</p>
              <a 
                href="https://google.com" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="text-[10px] text-brand-orange hover:underline font-semibold"
              >
                Review us on Google
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Grid or Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Main Selected Slider Card (Highlight review) */}
          <div className="lg:col-span-2 bg-radial from-slate-50 to-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-lg relative flex flex-col justify-between" id="active-review-card">
            <div className="space-y-6">
              {/* Star rating */}
              <div className="flex text-amber-400">
                {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-slate-700 text-lg sm:text-xl italic leading-relaxed">
                "{reviews[activeIndex].text}"
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
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  id="testimonial-next-btn"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Review Lists */}
          <div className="space-y-4 flex flex-col justify-between">
            {reviews.map((rev, index) => (
              <div 
                key={rev.id}
                onClick={() => setActiveIndex(index)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-[30%] ${
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
                    "{rev.text}"
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

      </div>
    </section>
  );
}
