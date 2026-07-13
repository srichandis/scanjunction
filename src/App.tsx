"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatWeDigitize from "./components/WhatWeDigitize";
import WhyTrustUs from "./components/WhyTrustUs";
import Transformations from "./components/Transformations";
import HowItWorks from "./components/HowItWorks";
import FamilyVault from "./components/FamilyVault";
import Testimonials from "./components/Testimonials";
import BlogSection from "./components/BlogSection";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  // Custom function to handle navigation smoothly
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Check if we are targeting services directly or general section IDs
    if (sectionId.startsWith("services-")) {
      const element = document.getElementById("services");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Monitor user scrolling to update active item in navbar dynamically
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "how-it-works", "pricing", "family-vault", "about-us", "blog", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased">
      {/* Navigation Header */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="w-full">
        {/* Hero Section */}
        <Hero 
          onGetSamples={() => handleNavigate("contact")} 
          onSeeHowItWorks={() => handleNavigate("how-it-works")} 
        />

        {/* Services / What We Digitize Grid */}
        <WhatWeDigitize onSelectCategory={(catId) => handleNavigate("contact")} />

        {/* Why Trust Us (Core standards) */}
        <WhyTrustUs />

        {/* Transformations (Interactive slider showcase) */}
        <Transformations />

        {/* How It Works (Timeline & Stats) */}
        <HowItWorks />

        {/* Pricing Table & Bulk Deals Info */}
        <Pricing />

        {/* Family Vault Feature Presentation */}
        <FamilyVault />

        {/* Live Blogs Synchronized from scanjunction.com WordPress API */}
        <BlogSection />

        {/* Happy Families Google Reviews */}
        <Testimonials />

        {/* FAQ Accordion Section */}
        <Faq />

        {/* Sample Request & Contact Forms */}
        <Contact />
      </main>

      {/* Multi-column Sitemap Footer & Chat Widget */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
