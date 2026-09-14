import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  MessageCircle,
  Phone,
  CheckCircle2,
  Building,
  User,
  Mail,
  MapPin,
  FileText,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const InquiryModal: React.FC = () => {
  const { inquiryModalState, closeInquiryModal, submitNewInquiry, settings, getWhatsAppUrl } = useApp();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Kota, Rajasthan');
  const [requirementType, setRequirementType] = useState<any>('Complete Project / Quotation');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (inquiryModalState.isOpen) {
      setIsSubmitted(false);
      if (inquiryModalState.prefillName) {
        setMessage(`Inquiry regarding: ${inquiryModalState.prefillName}`);
      }
      if (inquiryModalState.prefillType) {
        setRequirementType(inquiryModalState.prefillType as any);
      }
    }
  }, [inquiryModalState]);

  if (!inquiryModalState.isOpen) return null;

  const handleSubmit = async (e: React.FormEvent, sendToWhatsApp: boolean = false) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitNewInquiry({
        name: name.trim(),
        company: company.trim() || undefined,
        phone: phone.trim(),
        email: email.trim() || undefined,
        location: location.trim() || 'Kota',
        requirementType,
        productId: inquiryModalState.prefillId,
        productName: inquiryModalState.prefillName || undefined,
        message: message.trim() || 'General inquiry submitted from website.'
      });

      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}

      if (sendToWhatsApp) {
        const waMsg = `*New Website Inquiry for ${settings.businessName}*\n\n` +
          `👤 *Name:* ${name}\n` +
          (company ? `🏢 *Company:* ${company}\n` : '') +
          `📞 *Phone:* ${phone}\n` +
          (email ? `✉️ *Email:* ${email}\n` : '') +
          `📍 *Location:* ${location}\n` +
          `🔧 *Requirement:* ${requirementType}\n` +
          (inquiryModalState.prefillName ? `📦 *Product:* ${inquiryModalState.prefillName}\n` : '') +
          `📝 *Message:* ${message || 'Please contact me with quotation & details.'}`;
        
        window.open(getWhatsAppUrl(waMsg), '_blank');
      }
    } catch (err) {
      console.error('Inquiry submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4 flex items-center justify-between border-b border-blue-700/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center text-blue-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {inquiryModalState.prefillName ? 'Request Price & Information' : 'Request Consultation & Quote'}
              </h3>
              <p className="text-[11px] text-blue-200">
                IT-INFOSYSTEMS • Fast response for Kota & Rajasthan
              </p>
            </div>
          </div>
          <button
            onClick={closeInquiryModal}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-white">Thank You, {name}!</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Your inquiry has been logged. Our technical team from Kota will call you at <span className="text-blue-400 font-semibold">{phone}</span> shortly with complete specifications and best pricing.
              </p>
              <div className="pt-3 flex items-center justify-center gap-3">
                <button
                  onClick={closeInquiryModal}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-5 py-2.5 rounded-xl border border-slate-700"
                >
                  Close Window
                </button>
                <a
                  href={getWhatsAppUrl(`Hello IT-INFOSYSTEMS, I just submitted an inquiry for ${inquiryModalState.prefillName || 'CCTV/Networking'} - Name: ${name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={e => handleSubmit(e, false)} className="space-y-3.5">
              {inquiryModalState.prefillName && (
                <div className="bg-blue-950/60 border border-blue-800/60 p-2.5 rounded-xl flex items-center gap-2 text-xs text-blue-200">
                  <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="truncate">Product/Topic: <strong>{inquiryModalState.prefillName}</strong></span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sunil Verma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98290 12345"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Verma Enterprises / Home"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Location / Area
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Talwandi, Kota / Bundi / Baran"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Requirement Type
                  </label>
                  <select
                    value={requirementType}
                    onChange={e => setRequirementType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Complete Project / Quotation">Complete Project / Quotation</option>
                    <option value="CCTV Camera">CCTV Camera Installation / Upgrade</option>
                    <option value="Networking / LAN / Fiber">Networking / LAN / Fiber Splicing</option>
                    <option value="Biometric / Access Control">Biometric Attendance / Access Control</option>
                    <option value="AMC Contract">AMC Annual Maintenance</option>
                    <option value="IT Support & Hardware">IT Hardware & Server Setup</option>
                    <option value="Other">Other Security Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Message / Details
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your site requirements, number of cameras, premises size, or timeline..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 transition active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>

                <button
                  type="button"
                  onClick={e => handleSubmit(e, true)}
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition active:scale-95 disabled:opacity-50"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Submit & WhatsApp</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-500">
                🔒 We respect your privacy. No spam. Direct technical consultation from Kota.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
