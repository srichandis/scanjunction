"use client";

import { ScrollText, ArrowUpRight, MessageCircle } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsPage() {
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
            Terms &{" "}
            <span className="text-brand-orange">Conditions</span>
          </h1>
          <p className="font-sans text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
            The terms governing the use of ScanJunction&apos;s digitization services and website.
          </p>
          <p className="font-sans text-sm text-slate-400">Last updated: July 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            
            <div className="bg-brand-lightorange/20 rounded-2xl p-6 border border-brand-orange/10 flex items-start space-x-4">
              <ScrollText size={24} className="text-brand-orange shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-brand-darkteal text-lg mb-1">Service Agreement</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  By using ScanJunction&apos;s services, you agree to the following terms and conditions. Please read them carefully before placing an order.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">1. Services</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ScanJunction provides professional digitization services for photographs, film negatives, slides, documents, books, video tapes, and audio cassettes. We also offer photo restoration and digital archiving solutions. All services are provided subject to availability and our assessment of the materials submitted.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">2. Order Placement</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">By placing an order with ScanJunction, you confirm that:</p>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2">
                <li>You are the owner of the media being submitted, or have explicit authorization from the owner</li>
                <li>The information provided during ordering is accurate and complete</li>
                <li>You are at least 18 years of age, or have parental consent</li>
                <li>You understand that orders are 100% free to place and payment is only due after completion</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">3. Pricing & Payment</h2>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2">
                <li>Prices are quoted per item and may vary based on quantity, condition, and specific requirements</li>
                <li>Final pricing is confirmed after assessment of the submitted materials</li>
                <li>Payment is due only after digitization is complete and sample review is approved</li>
                <li>We accept Cash on Delivery, UPI, and NEFT as payment methods</li>
                <li>Volume discounts are available for large collections (1,000+ items)</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">4. Pickup & Delivery</h2>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2">
                <li>Free doorstep pickup and delivery is available within Bangalore</li>
                <li>For customers outside Bangalore, courier is the only option for sending and receiving materials</li>
                <li>All pickups are sealed in tamper-proof bags for security</li>
                <li>Customers may also visit our facility for drop-off and pick-up</li>
                <li>We are not responsible for delays caused by courier services outside our control</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">5. Turnaround Time</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Estimated turnaround times are provided at the time of order. These are general estimates and may vary depending on the volume, condition of materials, and current workload. Typical timelines:
              </p>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2 mt-3">
                <li>500 print photos at 600 DPI: approximately 5 business days</li>
                <li>6 hours of videotape: approximately 5 business days</li>
                <li>500 negatives/slides at 1,200 DPI: approximately 7 business days</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">6. Care & Handling</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ScanJunction takes the utmost care in handling your materials. Our team is trained in archival-safe handling procedures. However, by submitting materials, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2 mt-3">
                <li>Some materials may be in fragile or deteriorated condition</li>
                <li>We will not be liable for pre-existing damage that is discovered during the digitization process</li>
                <li>We document the condition of materials upon receipt for transparency</li>
                <li>Any concerns about material condition will be communicated to you before proceeding</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">7. Limitation of Liability</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ScanJunction&apos;s liability is limited to the value of the services rendered. We are not liable for any incidental, consequential, or indirect damages arising from the use of our services. We recommend maintaining backups of all digital files delivered.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">8. Intellectual Property</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                You retain full intellectual property rights to your original media and the digitized copies. ScanJunction does not claim any ownership over your content. We will not use, reproduce, or distribute your content without your explicit permission.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">9. Cancellation & Refunds</h2>
              <ul className="list-disc pl-6 text-slate-600 text-sm space-y-2">
                <li>Orders can be cancelled anytime before digitization begins at no charge</li>
                <li>Once digitization has commenced, cancellation may be subject to charges for work already completed</li>
                <li>If you are not satisfied with the quality of digitization, we will re-scan the affected items at no additional cost</li>
                <li>Refunds are processed within 5-7 business days</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">10. Changes to Terms</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ScanJunction reserves the right to update these terms at any time. Changes will be communicated through our website and, where appropriate, via email. Continued use of our services after changes constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-darkteal mb-4">11. Contact</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                For questions about these terms, please contact us:
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
              Ready to get started?
            </h3>
            <p className="font-sans text-slate-500 text-sm mb-6 max-w-md mx-auto">
              Place your first order — it&apos;s 100% free to start.
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
