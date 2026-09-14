import React from 'react';
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { settings, categories, getWhatsAppUrl, getCallUrl } = useApp();

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030b1c] text-slate-400 text-sm border-t border-white/5">
      {/* Top Banner / CTA */}
      <div className="bg-[#051126] border-b border-white/5 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
              Direct Contact & Support
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Looking for CCTV or Networking Setup in Kota?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Get an on-site security survey and customized project quotation for your home, office, showroom, or factory.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={getCallUrl()}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl border border-white/10 transition active:scale-95 shadow-md"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call: {settings.phone}</span>
            </a>
            <a
              href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I want to book a site survey for CCTV/Networking in Kota.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition active:scale-95 shadow-lg shadow-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Col 1: About & Info */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left focus:outline-none group hover:opacity-95 transition-opacity"
            >
              <BrandLogo size="lg" showSubtitle={true} glow={true} animate={true} />
            </button>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              Kota's premier technology infrastructure provider. Specializing in high-definition CCTV surveillance, single/multi-mode fiber optic networking, structured Cat6 cabling, server racks, and smart biometric attendance systems.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{settings.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{settings.workingHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-blue-300 transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-white border-l-2 border-blue-500 pl-2.5">
              Quick Navigation
            </h5>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About IT-INFOSYSTEMS' },
                { id: 'products', label: 'Product Catalog' },
                { id: 'services', label: 'Our Services' },
                { id: 'solutions', label: 'Industry Solutions' },
                { id: 'projects', label: 'Completed Projects' },
                { id: 'amc', label: 'AMC Maintenance Plans' },
                { id: 'contact', label: 'Contact Us' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Core Categories */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-white border-l-2 border-blue-500 pl-2.5">
              Key Categories
            </h5>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 7).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleNavClick(`category-${cat.id}`)}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-left"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Solutions & Support */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-white border-l-2 border-blue-500 pl-2.5">
              Solutions & Trust
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNavClick('solutions')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Factory & Industrial Security</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('solutions')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Office LAN & Wi-Fi Setup</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('solutions')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Commercial Retail & Showrooms</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('solutions')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600" />
                  <span>Home & Villa CCTV Intercom</span>
                </button>
              </li>
              <li className="pt-2">
                <a
                  href={settings.googleMapsEmbedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold"
                >
                  <span>Google Maps Location</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="inline-flex items-center gap-1.5 bg-[#111c33] hover:bg-[#162444] border border-white/10 text-slate-300 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition"
              >
                <Lock className="w-3 h-3 text-blue-400" />
                <span>Admin Login Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>
              © {new Date().getFullYear()} <strong className="text-slate-300">{settings.businessName}</strong>. All rights reserved. CCTV • Networking • IT Solutions (Kota, Rajasthan).
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleNavClick('privacy-policy')}
              className="hover:text-slate-300 transition"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavClick('terms')}
              className="hover:text-slate-300 transition"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => handleNavClick('disclaimer')}
              className="hover:text-slate-300 transition"
            >
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
