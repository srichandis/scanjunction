import { useState, useEffect } from "react";
import { Phone, Mail, ChevronDown, Menu, X, MessageCircle, ArrowRight, Instagram, Linkedin, Youtube } from "lucide-react";
import logoLight from "../assets/images/scanjunction-logo.png";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isPhotobooksOpen, setIsPhotobooksOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const photobookLinks = [
    { name: "Create Photo Book", id: "photobook-create" },
  ];

  const resources = [
    { name: "Blog", id: "blog" },
    { name: "Pricing", id: "pricing" },
    { name: "FAQ", id: "faq" },
  ];

  const handleNavItemClick = (id: string) => {
    if (id === "blog") {
      window.location.href = "/blog";
    } else if (id === "pricing") {
      window.location.href = "/pricing";
    } else if (id === "faq") {
      window.location.href = "/faqs";
    } else if (id === "family-vault") {
      window.location.href = "/family-vault";
    } else if (id === "how-it-works") {
      window.location.href = "/#how-it-works";
    } else if (id === "about-us") {
      window.location.href = "/about";
    } else if (id === "contact") {
      window.location.href = "/contact";
    } else if (id === "photobook-create") {
      window.location.href = "/photobook/create";
    } else if (id.startsWith("services-")) {
      const serviceId = id.replace("services-", "");
      window.location.href = `/services/${serviceId}`;
    } else {
      onNavigate(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-50 fixed top-0 left-0 transition-all duration-300">
      {/* Top Utility Ribbon */}
      <div className="bg-brand-navy text-white text-xs py-2 px-4 flex flex-wrap justify-between items-center border-b border-slate-800 font-sans">
        <div className="flex items-center space-x-4 sm:space-x-6 mx-auto sm:mx-0">
          <a href="tel:+919886444484" className="flex items-center space-x-1.5 hover:text-brand-orange transition-colors" id="nav-phone">
            <Phone size={11} className="text-brand-orange" />
            <span className="hidden sm:inline">+91 9886 4444 84</span>
            <span className="sm:hidden">Call</span>
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <a href="mailto:scanjunction@gmail.com" className="flex items-center space-x-1.5 hover:text-brand-orange transition-colors" id="nav-email">
            <Mail size={11} className="text-brand-orange" />
            <span className="hidden sm:inline">scanjunction@gmail.com</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-2.5 border-r border-slate-700 pr-4">
            <a href="https://www.instagram.com/scanjunction/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors" aria-label="Instagram">
              <Instagram size={13} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors" aria-label="LinkedIn">
              <Linkedin size={13} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors" aria-label="YouTube">
              <Youtube size={13} />
            </a>
          </div>
          <button onClick={() => handleNavItemClick("about-us")} className="hover:text-brand-orange transition-colors font-medium">
            About
          </button>
          <button onClick={() => handleNavItemClick("contact")} className="hover:text-brand-orange transition-colors font-medium">
            Contact
          </button>
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
            <img 
              src={logoLight.src} 
              alt="ScanJunction Logo" 
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 font-sans font-medium text-sm text-slate-700">
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:text-brand-orange hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
                id="services-dropdown-btn"
              >
                <span>Services</span>
                <ChevronDown size={13} className={`transform transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-0.5 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                  id="services-dropdown-menu"
                >
                  <div className="grid grid-cols-1 gap-0.5 px-1.5">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          handleNavItemClick(`services-${service.id}`);
                          setIsServicesOpen(false);
                        }}
                        className="text-left px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-orange text-xs transition-all cursor-pointer font-medium"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Photobooks Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsPhotobooksOpen(true)}
              onMouseLeave={() => setIsPhotobooksOpen(false)}
            >
              <button
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:text-brand-orange hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
                id="photobooks-dropdown-btn"
              >
                <span>Photobooks</span>
                <ChevronDown size={13} className={`transform transition-transform duration-200 ${isPhotobooksOpen ? "rotate-180" : ""}`} />
              </button>

              {isPhotobooksOpen && (
                <div
                  className="absolute top-full left-0 mt-0.5 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                  id="photobooks-dropdown-menu"
                >
                  <div className="grid grid-cols-1 gap-0.5 px-1.5">
                    {photobookLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => {
                          handleNavItemClick(link.id);
                          setIsPhotobooksOpen(false);
                        }}
                        className="text-left px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-orange text-xs transition-all cursor-pointer font-medium"
                      >
                        {link.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Family Vault */}
            <button
              onClick={() => handleNavItemClick("family-vault")}
              className={`px-3 py-2 rounded-lg hover:text-brand-orange hover:bg-slate-50 transition-colors cursor-pointer ${
                activeSection === "family-vault" ? "text-brand-orange font-semibold" : ""
              }`}
            >
              Family Vault
            </button>

            {/* How It Works */}
            <button
              onClick={() => handleNavItemClick("how-it-works")}
              className={`px-3 py-2 rounded-lg hover:text-brand-orange hover:bg-slate-50 transition-colors cursor-pointer ${
                activeSection === "how-it-works" ? "text-brand-orange font-semibold" : ""
              }`}
            >
              How It Works
            </button>

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <button
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:text-brand-orange hover:bg-slate-50 transition-colors focus:outline-none cursor-pointer"
              >
                <span>Resources</span>
                <ChevronDown size={13} className={`transform transition-transform duration-200 ${isResourcesOpen ? "rotate-180" : ""}`} />
              </button>

              {isResourcesOpen && (
                <div
                  className="absolute top-full right-0 mt-0.5 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in"
                >
                  <div className="grid grid-cols-1 gap-0.5 px-1.5">
                    {resources.map((resource) => (
                      <button
                        key={resource.id}
                        onClick={() => {
                          handleNavItemClick(resource.id);
                          setIsResourcesOpen(false);
                        }}
                        className="text-left px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-orange text-xs transition-all cursor-pointer font-medium"
                      >
                        {resource.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 border border-emerald-500 hover:bg-emerald-500 hover:text-white text-emerald-600 px-4 py-2 rounded-full font-sans font-medium text-xs transition-all duration-200"
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
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} className="fill-current" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-brand-orange transition-colors cursor-pointer focus:outline-none"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[116px] bg-white z-40 overflow-y-auto animate-fade-in border-t border-slate-100" id="mobile-menu-drawer">
          <div className="px-4 py-6 space-y-1 font-sans font-medium text-base text-slate-700">
            
            {/* Services for Mobile */}
            <div className="py-3 border-b border-slate-100">
              <span className="text-xs uppercase text-slate-400 tracking-wider font-semibold mb-3 block">Our Services</span>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      handleNavItemClick(`services-${service.id}`);
                    }}
                    className="text-left text-sm py-2 px-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-brand-orange transition-colors"
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Nav Items */}
            <div className="py-2 space-y-0.5">
              {/* Photobooks Mobile */}
              <div className="border-b border-slate-100 pb-1">
                <span className="block w-full text-left py-2.5 px-1 text-slate-500 font-semibold text-sm">
                  Photobooks
                </span>
                <div className="pl-4 space-y-0.5">
                  <button
                    onClick={() => handleNavItemClick("photobook-create")}
                    className="block w-full text-left py-2 px-1 text-sm text-slate-600 hover:text-brand-orange"
                  >
                    Create Photo Book
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleNavItemClick("family-vault")}
                className="block w-full text-left py-2.5 px-1 border-b border-slate-100 hover:text-brand-orange"
              >
                Family Vault
              </button>
              <button
                onClick={() => handleNavItemClick("how-it-works")}
                className="block w-full text-left py-2.5 px-1 border-b border-slate-100 hover:text-brand-orange"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavItemClick("blog")}
                className="block w-full text-left py-2.5 px-1 border-b border-slate-100 hover:text-brand-orange"
              >
                Blog
              </button>
              <button
                onClick={() => handleNavItemClick("pricing")}
                className="block w-full text-left py-2.5 px-1 border-b border-slate-100 hover:text-brand-orange"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavItemClick("faq")}
                className="block w-full text-left py-2.5 px-1 border-b border-slate-100 hover:text-brand-orange"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavItemClick("about-us")}
                className="block w-full text-left py-2.5 px-1 border-b border-slate-100 hover:text-brand-orange"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavItemClick("contact")}
                className="block w-full text-left py-2.5 px-1 border-b border-slate-100 hover:text-brand-orange"
              >
                Contact
              </button>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 flex flex-col space-y-3">
              <a
                href="https://wa.me/919886444484"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-emerald-50 text-emerald-700 border border-emerald-200 py-3 rounded-xl hover:bg-emerald-100 transition-colors font-semibold"
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
