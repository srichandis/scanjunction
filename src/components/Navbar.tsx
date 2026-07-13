import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, ChevronDown, Menu, X, MessageCircle, ArrowRight } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", id: "home" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Pricing", id: "pricing" },
    { name: "Family Vault", id: "family-vault" },
    { name: "About Us", id: "about-us" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" },
  ];

  const services = [
    { name: "Photo Scanning", id: "photos" },
    { name: "Album Scanning", id: "albums" },
    { name: "Negative Scanning", id: "negatives" },
    { name: "Slide Scanning", id: "slides" },
    { name: "Document Scanning", id: "documents" },
    { name: "VHS to Digital", id: "vhs" },
    { name: "Audio Conversion", id: "audio" },
    { name: "Photo Restoration", id: "restoration" },
  ];

  const handleNavItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-50 fixed top-0 left-0 transition-all duration-300">
      {/* Top Utility Ribbon */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center border-b border-slate-800 font-sans">
        <div className="flex items-center space-x-6 mx-auto sm:mx-0">
          <a href="tel:+919886444484" className="flex items-center space-x-2 hover:text-brand-orange transition-colors" id="nav-phone">
            <Phone size={12} className="text-brand-orange" />
            <span>+91 9886 4444 84</span>
          </a>
          <a href="mailto:scanjunction@gmail.com" className="flex items-center space-x-2 hover:text-brand-orange transition-colors" id="nav-email">
            <Mail size={12} className="text-brand-orange" />
            <span>scanjunction@gmail.com</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-slate-300">
          <MapPin size={12} className="text-brand-orange" />
          <span>Pickup available across Bangalore</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-slate-100"
            : "bg-white py-4 border-b border-slate-100"
        }`}
        id="main-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex flex-col cursor-pointer group"
            onClick={() => handleNavItemClick("home")}
            id="nav-logo"
          >
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-2xl tracking-tight text-brand-darkteal">
                Scan<span className="text-brand-orange group-hover:text-brand-orange/90 transition-colors">Junction</span>
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 font-medium font-sans">
              Trust Your Memory, Our Expertise
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 font-sans font-medium text-sm text-slate-700">
            <button
              onClick={() => handleNavItemClick("home")}
              className={`hover:text-brand-orange transition-colors cursor-pointer ${
                activeSection === "home" ? "text-brand-orange font-semibold" : ""
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="flex items-center space-x-1 hover:text-brand-orange transition-colors focus:outline-none cursor-pointer py-1"
                id="services-dropdown-btn"
              >
                <span>Services</span>
                <ChevronDown size={14} className={`transform transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setIsServicesOpen(false)}
                  id="services-dropdown-menu"
                >
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          handleNavItemClick(`services-${service.id}`);
                          setIsServicesOpen(false);
                        }}
                        className="text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-brand-orange text-xs transition-all cursor-pointer font-medium"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`hover:text-brand-orange transition-colors cursor-pointer ${
                  activeSection === item.id ? "text-brand-orange font-semibold" : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              referrerPolicy="no-referrer"
              className="flex items-center space-x-1 border border-emerald-500 hover:bg-emerald-500 hover:text-white text-emerald-600 px-4 py-2 rounded-full font-sans font-medium text-xs transition-all duration-200"
              id="whatsapp-nav-btn"
            >
              <MessageCircle size={14} className="fill-current" />
              <span>WhatsApp Us</span>
            </a>
            <button
              onClick={() => handleNavItemClick("contact")}
              className="bg-brand-orange hover:bg-brand-orange/95 text-white px-5 py-2 rounded-full font-sans font-medium text-xs shadow-md shadow-brand-orange/20 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center space-x-1"
              id="samples-nav-btn"
            >
              <span>Get Free Samples</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              referrerPolicy="no-referrer"
              className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} className="fill-current" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-brand-orange transition-colors cursor-pointer focus:outline-none"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[88px] bg-white z-40 overflow-y-auto animate-fade-in" id="mobile-menu-drawer">
          <div className="px-4 py-6 space-y-4 font-sans font-medium text-base text-slate-800">
            <button
              onClick={() => handleNavItemClick("home")}
              className="block w-full text-left py-2 border-b border-slate-100 hover:text-brand-orange"
            >
              Home
            </button>

            {/* Services for Mobile */}
            <div className="py-2 border-b border-slate-100">
              <span className="text-xs uppercase text-slate-400 tracking-wider">Our Services</span>
              <div className="grid grid-cols-2 gap-2 mt-2 pl-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleNavItemClick(`services-${service.id}`)}
                    className="text-left text-sm py-1.5 text-slate-600 hover:text-brand-orange"
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className="block w-full text-left py-2 border-b border-slate-100 hover:text-brand-orange"
              >
                {item.name}
              </button>
            ))}

            <div className="pt-4 flex flex-col space-y-3">
              <a
                href="https://wa.me/919886444484"
                target="_blank"
                referrerPolicy="no-referrer"
                className="flex items-center justify-center space-x-2 bg-emerald-500 text-white py-3 rounded-xl hover:bg-emerald-600 transition-colors font-semibold"
              >
                <MessageCircle size={18} className="fill-current" />
                <span>WhatsApp Us</span>
              </a>
              <button
                onClick={() => handleNavItemClick("contact")}
                className="flex items-center justify-center space-x-2 bg-brand-orange text-white py-3 rounded-xl hover:bg-brand-orange/95 transition-colors font-semibold"
              >
                <span>Get Free Samples</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
