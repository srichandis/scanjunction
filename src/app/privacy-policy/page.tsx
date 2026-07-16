"use client";

import { Shield, ArrowUpRight, MessageCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPolicyPage() {
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
            Legal
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-darkteal leading-[1.1]">
            Privacy{" "}
            <span className="text-brand-orange">Policy</span>
          </h1>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            How ScanJunction collects, uses, and protects your personal information and the memories you entrust to us.
          </p>
          <p className="font-sans text-sm text-slate-400">Last updated: July 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none font-sans space-y-8">
            
            <div className="bg-brand-lightorange/20 rounded-2xl p-6 border border-brand-orange/10 flex items-start space-x-4">
              <Shield size={24} className="text-brand-orange shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-brand-darkteal text-lg mb-1">Our Commitment</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  At ScanJunction, your privacy is paramount. We handle your family&apos;s most precious memories with the same care and confidentiality we would expect for our own.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">1. Information We Collect</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                We collect only the information necessary to provide our digitization services:
              </p>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2">
                <li><strong className="text-slate-800">Personal Information:</strong> Name, phone number, email address, and physical address provided when placing an order or contacting us.</li>
                <li><strong className="text-slate-800">Physical Media:</strong> Photographs, film negatives, slides, documents, video tapes, and other media you entrust to us for digitization.</li>
                <li><strong className="text-slate-800">Payment Information:</strong> We collect payment details for processing orders. Payment transactions are handled through secure third-party processors.</li>
                <li><strong className="text-slate-800">Communications:</strong> Records of your communications with us, including emails, phone calls, and WhatsApp messages.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Your information is used exclusively for:</p>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2">
                <li>Processing and fulfilling your digitization orders</li>
                <li>Communicating with you about your order status</li>
                <li>Scheduling pickups and deliveries</li>
                <li>Providing customer support and responding to inquiries</li>
                <li>Sending digital copies of your scanned media</li>
                <li>Improving our services based on your feedback</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">3. Data Security</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                We implement rigorous security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2">
                <li>All workstations operate without internet access — USB ports are locked to prevent unauthorized data transfer</li>
                <li>Your physical media is stored in secure, access-controlled facilities</li>
                <li>Digital files are transferred to our main server only through controlled, offline processes</li>
                <li>Final delivery of digital files happens through encrypted channels or secure physical media</li>
                <li>We do not retain digital copies beyond the delivery period unless requested</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">4. Data Retention</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your physical media is returned to you promptly after digitization. Digital files are retained for up to 60 days after delivery for your convenience. After this period, digital files may be permanently deleted from our systems. We recommend backing up your digital files to multiple locations upon receipt.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">5. Information Sharing</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We do not sell, trade, or share your personal information or the content of your media with third parties. We may disclose information only when required by law or to protect our legal rights. Your memories remain yours — we are merely the bridge to the digital world.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">6. Your Rights</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal obligations)</li>
                <li>Withdraw consent for marketing communications at any time</li>
                <li>Request information about how your data is processed</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">7. Contact Us</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="mt-4 bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-2 text-sm">
                <p><strong className="text-slate-800">Email:</strong> scanjunction@gmail.com</p>
                <p><strong className="text-slate-800">Phone:</strong> +91 9886 4444 84</p>
                <p><strong className="text-slate-800">Address:</strong> 14, HB Samaja Link Road, Gandhi Bazaar, Bangalore – 560004</p>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-12 text-center bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <h3 className="font-serif font-bold text-xl text-brand-darkteal mb-2">
              Trust us with your memories?
            </h3>
            <p className="font-sans text-slate-500 text-sm mb-6 max-w-md mx-auto">
              Your memories are safe with us. Get started today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/919886444484"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-semibold px-6 py-3 rounded-full text-sm transition-all"
              >
                <MessageCircle size={16} className="fill-current" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="/"
                className="inline-flex items-center space-x-2 text-brand-orange hover:text-brand-orange/80 font-sans font-semibold text-sm transition-colors"
              >
                <span>Get a Free Quote</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
