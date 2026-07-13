import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function Faq() {
  const faqs = [
    {
      id: 1,
      question: "Are my precious family photos safe with ScanJunction?",
      answer: "Yes, 100% safe. We understand your photos and film are completely irreplaceable. We operate under rigorous white-glove security guidelines. Your order is logged on arrival, processed strictly by dedicated team members in our clean workspace, and remains in our possession at all times."
    },
    {
      id: 2,
      question: "Do you offer doorstep pickup and delivery in Bangalore?",
      answer: "Absolutely! We offer secure, reliable doorstep collection and return delivery service across Bangalore. Once you book, our coordinator gets in touch to schedule a convenient time slot. Our collection representatives handle your box inside shockproof carriers."
    },
    {
      id: 3,
      question: "How long does the entire scanning process take?",
      answer: "Our standard turnaround time is 7 to 10 working days, depending on the volume of physical assets. For rush orders or anniversary events, we can expedite processing upon request."
    },
    {
      id: 4,
      question: "In what format do you provide the scanned files?",
      answer: "We supply your digitized files as high-resolution JPEGs or lossless TIFFs (for photos) and MP4 video formats (for videotapes). You can receive them via a secure cloud download link, or we can load them onto a Pen Drive or SSD."
    },
    {
      id: 5,
      question: "How can I check the scanning quality before making full payment?",
      answer: "We scan and share a selected batch of sample photos or negatives for your approval before proceeding with the rest of your order. You can request any color or contrast corrections at this stage. You only pay after you are satisfied with the sample quality."
    },
    {
      id: 6,
      question: "What equipment do you use for film scanning?",
      answer: "We use professional industrial flatbed scanners and specialized high-speed cinema-grade slide film scanners with true hardware dust reduction (ICE technology) to ensure pristine results that simple DIY equipment cannot achieve."
    }
  ];

  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-darkteal">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-brand-orange mx-auto rounded-full"></div>
        </div>

        {/* Accordions */}
        <div className="space-y-4" id="faq-accordion-group">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div 
                key={faq.id}
                className={`border rounded-2xl transition-all overflow-hidden ${
                  isOpen 
                    ? "border-brand-orange/30 bg-brand-lightorange/10 shadow-sm" 
                    : "border-slate-100 bg-white hover:bg-slate-50"
                }`}
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle size={18} className={isOpen ? "text-brand-orange" : "text-slate-400"} />
                    <span className="font-serif font-bold text-slate-800 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-1 rounded-full shrink-0 ${isOpen ? "bg-brand-orange text-white" : "bg-slate-100 text-slate-500"}`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 border-t border-slate-100/50 animate-fade-in">
                    <p className="font-sans text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
