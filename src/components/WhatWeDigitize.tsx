import { Image, BookOpen, Layers, FileText, Film, Volume2, Bookmark } from "lucide-react";

export default function WhatWeDigitize() {
  const categories = [
    {
      id: "photos",
      title: "Photos",
      icon: Image,
      description: "Loose print photos of all sizes. Digitized up to 3000 DPI for ultra-clear reprints.",
      imageUrl: "https://images.unsplash.com/photo-1531684096782-1af8c28ddb95?q=80&w=400&auto=format&fit=crop",
      tag: "Popular"
    },
    {
      id: "albums",
      title: "Albums",
      icon: BookOpen,
      description: "Whole photo albums scanned cover-to-cover. We preserve your captions and page arrangements.",
      imageUrl: "https://images.unsplash.com/photo-1632679760635-55966a6e3d42?q=80&w=400&auto=format&fit=crop",
      tag: "Expert Care"
    },
    {
      id: "negatives",
      title: "Negatives",
      icon: Layers,
      description: "35mm, medium format, and large format negatives scratch removed and color-corrected.",
      imageUrl: "https://plus.unsplash.com/premium_photo-1698081087873-06103e201351?q=80&w=400&auto=format&fit=crop",
      tag: "Precise"
    },
    {
      id: "slides",
      title: "Slides",
      icon: Bookmark,
      description: "35mm slides, super 35, and mounted slides cleaned and digitally enhanced.",
      imageUrl: "https://images.unsplash.com/photo-1761682751228-783c48e7cd30?q=80&w=400&auto=format&fit=crop",
      tag: "Vibrant"
    },
    {
      id: "documents",
      title: "Documents",
      icon: FileText,
      description: "Old letters, certificates, degrees, maps, and drawings scanned into searchable PDFs.",
      imageUrl: "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=400&auto=format&fit=crop",
      tag: "Secure PDF"
    },
    {
      id: "books",
      title: "Books",
      icon: BookOpen,
      description: "Diaries, family archives, religious texts scanned with specialized non-destructive scanners.",
      imageUrl: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=400&auto=format&fit=crop",
      tag: "Non-Destructive"
    },
    {
      id: "vhs",
      title: "VHS Tapes",
      icon: Film,
      description: "VHS, VHS-C, Hi8, and MiniDV tapes converted to digital MP4 files on pendrives.",
      imageUrl: "https://images.unsplash.com/photo-1493664543243-589b576c5bcd?q=80&w=400&auto=format&fit=crop",
      tag: "Trending"
    },
    {
      id: "audio",
      title: "Audio Cassettes",
      icon: Volume2,
      description: "Compact cassettes and reel-to-reel tapes converted to crystal-clear digital MP3 files.",
      imageUrl: "https://images.unsplash.com/photo-1573566472937-1fa7a6230e93?q=80&w=400&auto=format&fit=crop",
      tag: "Restored"
    }
  ];

  return (
    <section className="py-20 bg-slate-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkteal">
            What We <span className="text-brand-orange">Digitize</span>
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
          <p className="font-sans text-slate-600 text-lg">
            No matter the format, we have the cutting-edge equipment and archival expertise to digitize your entire memory collection.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="digitize-grid">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id}
                id={`digitize-${category.id}`}
                onClick={() => window.location.href = `/services/${category.id}`}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                {/* Image & Tag */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img 
                    src={category.imageUrl} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                  
                  {/* Floating Tag */}
                  <span className="absolute top-4 right-4 bg-brand-orange text-white font-sans font-semibold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {category.tag}
                  </span>

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/95 text-brand-teal flex items-center justify-center shadow">
                    <IconComponent size={20} />
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-lg text-brand-darkteal group-hover:text-brand-orange transition-colors">
                      {category.title}
                    </h3>
                    <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center text-xs font-semibold text-brand-orange group-hover:translate-x-1 transition-transform">
                    <span>Learn about scanning</span>
                    <span className="ml-1">→</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
