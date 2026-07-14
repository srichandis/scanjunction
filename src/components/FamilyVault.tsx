import { Search, Sparkles, Calendar, BookOpen, Share2, Shield, ArrowRight } from "lucide-react";

export default function FamilyVault() {
  const features = [
    {
      title: "Search & Filter",
      description: "Quickly locate specific scans by date, event tags, labels, or scanned folders.",
      icon: Search
    },
    {
      title: "AI Face Recognition",
      description: "Automatically group your photos by individual faces to discover all pictures of a relative.",
      icon: Sparkles
    },
    {
      title: "Timeline View",
      description: "Navigate through your family's history chronologically, watching generations unfold.",
      icon: Calendar
    },
    {
      title: "Albums & Collections",
      description: "Create themed virtual albums, event booklets, or customized digital memory scrapbooks.",
      icon: BookOpen
    },
    {
      title: "Share With Family",
      description: "Generate password-secured sharing links or invite family members to contribute and view safely.",
      icon: Share2
    },
    {
      title: "Secure Cloud Storage",
      description: "Encrypted redundant cloud hosting guarantees protection from physical drive loss.",
      icon: Shield
    }
  ];

  return (
    <section className="py-20 bg-slate-50 overflow-hidden" id="family-vault">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Device Mockups & Gallery Grid */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-brand-orange/10 rounded-full filter blur-3xl z-0 pointer-events-none"></div>
            
            {/* Simulated Desktop App Canvas */}
            <div className="relative z-10 w-full max-w-[500px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-3 font-sans">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <span className="w-2.5 h-2.5 bg-rose-400 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                    <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Family Vault v1.4</span>
                </div>
                <div className="bg-slate-50 rounded-full px-2.5 py-1 text-[10px] text-brand-orange font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-ping"></span>
                  <span>Secure Cloud Live</span>
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex space-x-2 overflow-x-auto pb-2 mb-3">
                <span className="bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer">All Memories</span>
                <span className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full hover:bg-slate-100 cursor-pointer">Wedding 1974</span>
                <span className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full hover:bg-slate-100 cursor-pointer">Summer Holidays</span>
                <span className="bg-slate-50 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full hover:bg-slate-100 cursor-pointer">Negatives Scan</span>
              </div>

              {/* Photo Showcase Grid */}
              <div className="grid grid-cols-3 gap-2">
                <div className="relative rounded-lg overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=200&auto=format&fit=crop" alt="Vintage family scan" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1974</div>
                </div>
                <div className="relative rounded-lg overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1554941068-a252680d25d9?q=80&w=200&auto=format&fit=crop" alt="Vintage portrait scan" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1968</div>
                </div>
                <div className="relative rounded-lg overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=200&auto=format&fit=crop" alt="Camera slides scan" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1980</div>
                </div>
                <div className="relative rounded-lg overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=200&auto=format&fit=crop" alt="Album page" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1991</div>
                </div>
                <div className="relative rounded-lg overflow-hidden group col-span-2">
                  <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=300&auto=format&fit=crop" alt="Photos on table" className="w-full h-20 object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] text-white font-bold">1952</div>
                </div>
              </div>

              {/* Floating Review Widget */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-lg border border-slate-100 flex items-center space-x-2 max-w-[180px]">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Shield size={16} />
                </div>
                <div className="text-[10px] leading-tight">
                  <p className="font-bold text-slate-800">ISO 27017 Safe</p>
                  <p className="text-slate-400">Safe &amp; secure</p>
                </div>
              </div>

            </div>

            {/* Mobile Vault Mockup Overlay */}
            <div className="absolute -bottom-8 -right-4 w-[160px] bg-slate-900 text-white rounded-[24px] p-2.5 shadow-2xl border-2 border-slate-700 hidden sm:block z-20 font-sans">
              <div className="w-12 h-3.5 bg-slate-800 rounded-full mx-auto mb-3"></div>
              
              <div className="space-y-2 text-[10px]">
                <div className="flex items-center space-x-1.5 bg-slate-800 p-1.5 rounded-lg">
                  <Sparkles size={10} className="text-brand-orange" />
                  <span className="font-semibold">AI Face Groups</span>
                </div>

                <div className="flex -space-x-1.5 overflow-hidden py-1">
                  <img className="inline-block h-5 w-5 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="" referrerPolicy="no-referrer" />
                  <img className="inline-block h-5 w-5 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="" referrerPolicy="no-referrer" />
                  <img className="inline-block h-5 w-5 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="" referrerPolicy="no-referrer" />
                </div>

                <p className="text-slate-400 text-[9px] leading-relaxed">Grandpa's folder detected 42 vintage matches across slides.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Vault Details & Grid of features */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
                INTRODUCING
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkteal">
                Your Family Vault
              </h2>
              <p className="font-sans text-slate-600 text-base leading-relaxed">
                More than just raw folders on a standard hard drive. ScanJunction provides a private, secure digital archive tailored for vintage media retrieval and long-term sharing.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="flex space-x-3 items-start">
                    <div className="p-2 bg-brand-lightorange/50 text-brand-orange rounded-xl shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="font-sans">
                      <h4 className="font-serif font-bold text-sm text-brand-darkteal mb-0.5">{feat.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Trigger */}
            <div className="pt-2">
              <a 
                href="#contact"
                className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold text-sm px-6 py-3 rounded-full inline-flex items-center space-x-2 shadow-md cursor-pointer transition-colors"
                id="explore-vault-btn"
              >
                <span>Explore Family Vault Demo</span>
                <ArrowRight size={14} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
