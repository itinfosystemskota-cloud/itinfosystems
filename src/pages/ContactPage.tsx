import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  Building,
  User,
  CheckCircle2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { settings, submitNewInquiry, getWhatsAppUrl, getCallUrl } = useApp();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Kota, Rajasthan');
  const [requirementType, setRequirementType] = useState<any>('Complete Project / Quotation');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent, sendToWhatsApp: boolean = false) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitNewInquiry({
        name: name.trim(),
        company: company.trim() || undefined,
        phone: phone.trim(),
        email: email.trim() || undefined,
        location: location.trim() || 'Kota, Rajasthan',
        requirementType,
        message: message.trim() || 'Inquiry submitted from Contact Us page.'
      });

      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.6 }
        });
      } catch {}

      if (sendToWhatsApp) {
        const waMsg =
          `*Contact Inquiry for ${settings.businessName}*\n\n` +
          `👤 *Name:* ${name}\n` +
          (company ? `🏢 *Company:* ${company}\n` : '') +
          `📞 *Phone:* ${phone}\n` +
          (email ? `✉️ *Email:* ${email}\n` : '') +
          `📍 *Location:* ${location}\n` +
          `🔧 *Requirement:* ${requirementType}\n` +
          `📝 *Message:* ${message || 'Please contact me.'}`;

        window.open(getWhatsAppUrl(waMsg), '_blank');
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-300 text-xs font-semibold">
          <Phone className="w-3.5 h-3.5" />
          <span>Get in Touch with Our Kota Team</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact IT-INFOSYSTEMS
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Need a site survey, equipment quotation, CCTV repair, or network cable installation in Kota? Reach out to us directly.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Col: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span>Office & Contact Information</span>
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Office Address</p>
                  <p className="text-slate-300 mt-0.5 leading-relaxed">{settings.fullAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Call Us (Kota)</p>
                  <p className="text-slate-300 mt-0.5">Primary: {settings.phone}</p>
                  {settings.alternatePhone && (
                    <p className="text-slate-400 text-[11px]">Alt: {settings.alternatePhone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">WhatsApp Inquiry</p>
                  <p className="text-slate-300 mt-0.5">Instant quotes & product photos</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Email Address</p>
                  <p className="text-slate-300 mt-0.5">{settings.email}</p>
                  <p className="text-slate-400 text-[11px]">Support: {settings.supportEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Business Hours</p>
                  <p className="text-slate-300 mt-0.5">{settings.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Bar */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <a
                href={getCallUrl()}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <a
                href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I want to talk to your technical sales representative.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Send Us An Inquiry</h2>
              <p className="text-xs text-slate-400 mt-1">
                Fill out your details below and our team will get back to you with a formal proposal.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out. One of our surveillance and network engineers in Kota will contact you at <strong className="text-blue-400">{phone}</strong>.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-slate-800 text-slate-300 text-xs px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-700 transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={e => handleSubmit(e, false)} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98290 12345"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sharma Industries / Home"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                      Location / Premises Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Talwandi, Kota / Ranpur"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                      Requirement Category
                    </label>
                    <select
                      value={requirementType}
                      onChange={e => setRequirementType(e.target.value as any)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Complete Project / Quotation">Complete Turnkey Project / Quotation</option>
                      <option value="CCTV Camera">CCTV Camera Installation / Upgrade</option>
                      <option value="Networking / LAN / Fiber">Networking / LAN / Fiber Splicing</option>
                      <option value="Biometric / Access Control">Biometric Attendance & Door Lock</option>
                      <option value="AMC Contract">AMC Annual Maintenance Contract</option>
                      <option value="IT Support & Hardware">Computer / Server / NAS Hardware</option>
                      <option value="Other">Other Security Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1.5 text-[11px]">
                    Project Requirements / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe number of cameras, premises square footage, timeline, or current issues..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                {/* Submit & WhatsApp Buttons (Section 14) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 active:scale-95 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={e => handleSubmit(e, true)}
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-95 disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Submit & WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Google Maps Section (Section 14) */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Visit Our Kota Office</span>
            </h3>
            <p className="text-xs text-slate-400">
              {settings.fullAddress}
            </p>
          </div>
          <a
            href={settings.googleMapsEmbedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="aspect-[21/9] sm:aspect-[21/7] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
          <iframe
            src={settings.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="IT-INFOSYSTEMS Kota Location Map"
          />
        </div>
      </section>
    </div>
  );
};
