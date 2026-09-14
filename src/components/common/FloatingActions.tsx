import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FloatingActionsProps {
  onOpenEstimator?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = () => {
  const { getWhatsAppUrl, getCallUrl } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll To Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-2xl bg-[#111c33] text-slate-300 hover:text-white hover:bg-[#162444] shadow-xl border border-white/10 backdrop-blur-sm transition-all transform hover:-translate-y-1"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Call Button (Visible on mobile/tablet) */}
      <a
        href={getCallUrl()}
        className="pointer-events-auto md:hidden p-3.5 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/40 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
        title="Call IT-INFOSYSTEMS"
        aria-label="Call IT-INFOSYSTEMS"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Button */}
      <div className="relative pointer-events-auto">
        {/* Pulsing ring */}
        <span className="absolute -inset-1 rounded-2xl bg-emerald-500 opacity-40 animate-ping" />
        
        <a
          href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I am interested in CCTV, Networking & Security Solutions in Kota.')}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-2xl shadow-2xl shadow-emerald-950/60 transition-all transform hover:-translate-y-1 active:scale-95"
          title="Chat with IT-INFOSYSTEMS on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
