import React, { useState } from "react";
import { Phone, Mail, MapPin, Sparkles, Send, ShieldCheck, Heart } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "photos",
    quantity: "1-100",
    address: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "photos",
        quantity: "1-100",
        address: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative" id="contact">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-lightorange/30 rounded-full filter blur-3xl -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-brand-navy text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            {/* Subtle background overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-teal-800/20 via-transparent to-transparent pointer-events-none"></div>

            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-brand-orange block">
                  CONTACT SCANJUNCTION
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                  Let's preserve your family memories today
                </h2>
                <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
                  Have questions about your archives or want to schedule a pickup? Send us a message or request up to 10 free sample scans.
                </p>
              </div>

              {/* Direct Info */}
              <div className="space-y-6 pt-6 border-t border-slate-800">
                <a href="tel:+919886444484" className="flex items-center space-x-4 hover:text-brand-orange transition-colors" id="contact-phone">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-brand-orange flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div className="font-sans">
                    <p className="text-xs text-slate-400 font-semibold">Call / WhatsApp Us</p>
                    <p className="font-bold text-sm sm:text-base">+91 9886 4444 84</p>
                  </div>
                </a>

                <a href="mailto:scanjunction@gmail.com" className="flex items-center space-x-4 hover:text-brand-orange transition-colors" id="contact-email">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-brand-orange flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div className="font-sans">
                    <p className="text-xs text-slate-400 font-semibold">Email Inquiry</p>
                    <p className="font-bold text-sm sm:text-base">scanjunction@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-brand-orange flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div className="font-sans">
                    <p className="text-xs text-slate-400 font-semibold">Address / Studio</p>
                    <p className="font-bold text-sm sm:text-base">Basavanagudi, Bangalore, Karnataka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Safe Badge */}
            <div className="mt-12 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 flex items-center space-x-3 relative z-10">
              <div className="text-emerald-500 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <p className="font-sans text-xs text-slate-300 leading-normal">
                All pickups are sealed in tamper-proof bags. High security and privacy guaranteed.
              </p>
            </div>

          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-xl">
            
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fade-in" id="contact-success">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
                  <Heart size={40} className="fill-current" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-2xl text-brand-darkteal">Request Received with Love!</h3>
                  <p className="font-sans text-slate-500 text-sm max-w-md">
                    Thank you for trusting ScanJunction. Our Bangalore archiving coordinator will call you shortly to confirm your booking and arrange your collection.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-semibold text-xs px-6 py-3 rounded-full shadow-md transition-colors cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="sample-request-form">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-2xl text-brand-darkteal flex items-center space-x-2">
                    <Sparkles size={22} className="text-brand-orange" />
                    <span>Get Your Free Sample Scan</span>
                  </h3>
                  <p className="font-sans text-slate-500 text-sm">
                    Fill out the form below. We will collect up to 10 of your photos, negatives, or slides, digitize them for free, and email the results.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label htmlFor="name" className="font-sans font-semibold text-xs text-slate-700">Your Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Anand Kumar"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label htmlFor="phone" className="font-sans font-semibold text-xs text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98864 44484"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="font-sans font-semibold text-xs text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. anand@example.com"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>

                  {/* Service Needed */}
                  <div className="space-y-1">
                    <label htmlFor="service" className="font-sans font-semibold text-xs text-slate-700">Format to Scan *</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    >
                      <option value="photos">Photos / Albums</option>
                      <option value="negatives">Negative Film</option>
                      <option value="slides">35mm Mounted Slides</option>
                      <option value="vhs">VHS / Video Tapes</option>
                      <option value="documents">Books & Documents</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Quantity */}
                  <div className="space-y-1">
                    <label htmlFor="quantity" className="font-sans font-semibold text-xs text-slate-700">Estimated Total Quantity</label>
                    <select
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    >
                      <option value="1-100">1 to 100 items</option>
                      <option value="101-500">101 to 500 items</option>
                      <option value="501-2000">501 to 2,000 items</option>
                      <option value="2000+">More than 2,000 items</option>
                    </select>
                  </div>

                  {/* Pickup Location */}
                  <div className="space-y-1">
                    <label htmlFor="address" className="font-sans font-semibold text-xs text-slate-700">Pickup Location (Area in Bangalore) *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Jayanagar / Indiranagar"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="font-sans font-semibold text-xs text-slate-700">Additional Instructions / Details</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the condition of your photos or specific years/occasions you'd like sorted first..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-brand-orange focus:bg-white rounded-xl px-4 py-3 text-sm focus:outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white font-sans font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-orange/20 hover:shadow-brand-orange/30 focus:outline-none flex items-center justify-center space-x-2 transition-all cursor-pointer disabled:opacity-50"
                  id="submit-request-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Scheduling with Coordinator...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Book Free Doorstep Pickup</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>
        
      </div>
    </section>
  );
}
