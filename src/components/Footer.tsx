import { Facebook, Instagram, Twitter, Mail, Phone, MessageCircle, Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter }
  ];

  const services = [
    { name: "Photo Scanning", id: "services-photos" },
    { name: "Album Scanning", id: "services-albums" },
    { name: "Negative Scanning", id: "services-negatives" },
    { name: "Slide Scanning", id: "services-slides" },
    { name: "Document Scanning", id: "services-documents" },
    { name: "VHS to Digital", id: "services-vhs" },
    { name: "Audio Conversion", id: "services-audio" },
    { name: "Photo Restoration", id: "services-restoration" }
  ];

  const company = [
    { name: "About Us", id: "about-us" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Pricing", id: "pricing" },
    { name: "Family Vault", id: "family-vault" },
    { name: "Blog Feed", id: "blog" },
    { name: "Frequently Asked Questions", id: "faq" },
    { name: "Contact Us", id: "contact" }
  ];

  return (
    <footer className="bg-brand-navy text-slate-300 font-sans border-t border-slate-800" id="footer">
      
      {/* Upper Footer sitemap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                Scan<span className="text-brand-orange">Junction</span>
              </span>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-semibold font-sans">
                Trust Your Memory, Our Expertise
              </p>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              We professionally digitize old physical print photos, film negatives, slides, documents, books, and videotapes utilizing industrial-grade equipment for unmatched safety and crisp quality.
            </p>

            {/* Social icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-brand-orange hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Services List */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-white text-base">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.map((serv) => (
                <li key={serv.name}>
                  <button 
                    onClick={() => onNavigate(serv.id)}
                    className="hover:text-brand-orange transition-colors text-left"
                  >
                    {serv.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Sitemap */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif font-bold text-white text-base">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {company.map((comp) => (
                <li key={comp.name}>
                  <button 
                    onClick={() => onNavigate(comp.id)}
                    className="hover:text-brand-orange transition-colors text-left"
                  >
                    {comp.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details / Google badge */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-white text-base">Get in Touch</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center space-x-3">
                  <Phone size={14} className="text-brand-orange" />
                  <a href="tel:+919886444484" className="hover:text-white">+91 9886 4444 84</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail size={14} className="text-brand-orange" />
                  <a href="mailto:scanjunction@gmail.com" className="hover:text-white">scanjunction@gmail.com</a>
                </li>
              </ul>
            </div>

            {/* Google reviews footer summary */}
            <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/30 font-sans space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400">Based on 1,000+ reviews on Google across Bangalore.</p>
              <a 
                href="https://google.com" 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="text-[10px] text-brand-orange font-bold uppercase tracking-wider block hover:underline"
              >
                Review us on Google →
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Credits Ribbon */}
      <div className="border-t border-slate-800 py-6 text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 ScanJunction. All Rights Reserved. Digitally restored and archived with pride.</p>
          <div className="flex space-x-6">
            <a href="#faq" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#faq" className="hover:text-slate-400 transition-colors">Terms & Conditions</a>
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart size={10} className="text-rose-500 fill-current" />
              <span>in Bangalore</span>
            </span>
          </div>
        </div>
      </div>

      {/* FLOATING WHATSAPP CHAT BUTTON (Bottom-Right Widget as shown in mockup) */}
      <a
        href="https://wa.me/919886444484"
        target="_blank"
        referrerPolicy="no-referrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white font-sans font-bold text-sm px-5 py-3.5 rounded-full shadow-2xl hover:bg-emerald-600 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center space-x-2 animate-bounce hover:animate-none"
        id="whatsapp-floating-widget"
      >
        <MessageCircle size={18} className="fill-current animate-pulse-slow" />
        <span>Chat on WhatsApp</span>
      </a>

    </footer>
  );
}
