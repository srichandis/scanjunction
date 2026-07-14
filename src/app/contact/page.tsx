"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Import Contact dynamically since it uses useState (client component)
const ContactForm = dynamic(() => import("../../components/Contact"), {
  ssr: false,
  loading: () => (
    <div className="py-40 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function ContactPage() {
  const handleNavigate = (sectionId: string) => {
    if (sectionId === "about-us") {
      window.location.href = "/about";
      return;
    }
    if (sectionId === "contact") {
      window.location.href = "/contact";
      return;
    }
    const target = sectionId.startsWith("services-") ? "services" : sectionId;
    window.location.href = `/${target === "home" ? "" : "#" + target}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onNavigate={handleNavigate} activeSection="" />
      <div className="h-[120px]" />

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-brand-lightorange/40 via-white to-slate-50 py-20 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="inline-block font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange">
            Get In Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-darkteal leading-[1.1]">
            Let&apos;s Talk About Your{" "}
            <span className="text-brand-orange">Memories</span>
          </h1>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            Whether you have questions about our services, need a custom quote
            for a large collection, or want to schedule a free doorstep pickup —
            we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Form Section — Reusing the Contact component */}
      <ContactForm />

      {/* Map / Location Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Visit Info */}
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
                  Visit Our Studio
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal leading-tight">
                  Meet Us at Our{" "}
                  <span className="text-brand-orange">Bangalore Studio</span>
                </h2>
                <p className="font-sans text-slate-500 text-sm leading-relaxed">
                  We&apos;d love to meet you in person. Drop by our studio in
                  Basavanagudi during business hours, or schedule a free
                  contactless doorstep pickup anywhere in Bangalore.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lightorange text-brand-orange flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="font-sans">
                    <p className="font-semibold text-sm text-slate-800">
                      Studio Address
                    </p>
                    <p className="text-slate-500 text-sm">
                      14, HB Samaja Link Road, Gandhi Bazaar,
                      <br />
                      Basavanagudi, Bangalore – 560004
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lightorange text-brand-orange flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="font-sans">
                    <p className="font-semibold text-sm text-slate-800">
                      Business Hours
                    </p>
                    <p className="text-slate-500 text-sm">
                      Mon – Fri: 10:00 AM – 7:00 PM
                      <br />
                      Saturday: 10:00 AM – 1:30 PM
                      <br />
                      Sunday & Public Holidays: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-lightorange text-brand-orange flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="font-sans">
                    <p className="font-semibold text-sm text-slate-800">
                      Email & Phone
                    </p>
                    <p className="text-slate-500 text-sm">
                      <a
                        href="mailto:scanjunction@gmail.com"
                        className="hover:text-brand-orange transition-colors"
                      >
                        scanjunction@gmail.com
                      </a>
                      <br />
                      <a
                        href="tel:+919886444484"
                        className="hover:text-brand-orange transition-colors"
                      >
                        +91 9886 4444 84
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/919886444484"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold text-sm px-6 py-3 rounded-full shadow-md transition-all"
              >
                <MessageCircle size={16} className="fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Right: Embedded Map */}
            <div className="relative">
              <div className="absolute -inset-3 bg-brand-lightorange/20 rounded-3xl blur-sm pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 h-[400px] bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0995191128625!2d77.5683!3d12.9419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1595b5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sBasavanagudi%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ScanJunction Studio Location"
                  className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Floating Map Badge */}
              <div className="absolute -bottom-3 -right-3 bg-white rounded-xl px-4 py-2.5 shadow-md border border-slate-100 flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="font-sans text-xs text-slate-500 font-medium">
                  Basavanagudi, Bangalore
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand-lightorange/30 via-white to-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
            Not Ready to Chat?
          </h2>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-xl mx-auto">
            Browse our pricing and services at your own pace. When you&apos;re
            ready, we&apos;ll be here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="/pricing"
              className="bg-white hover:bg-slate-50 text-slate-700 font-sans font-semibold px-8 py-3.5 rounded-full border border-slate-200 shadow-sm transition-all inline-flex items-center space-x-2"
            >
              <span>View Pricing</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/919886444484"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              <MessageCircle size={16} className="fill-current" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
