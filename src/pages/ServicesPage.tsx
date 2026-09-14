import React, { useState } from 'react';
import {
  Camera,
  Network,
  Server,
  Fingerprint,
  CheckCircle2,
  Phone,
  MessageCircle,
  Wrench,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from '../components/common/CategoryIcon';

interface ServicesPageProps {
  setCurrentTab: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setCurrentTab }) => {
  const { services, openInquiryModal, getWhatsAppUrl, getCallUrl, settings } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'cctv' | 'networking' | 'it-support' | 'security'>('all');

  const filteredServices = activeFilter === 'all'
    ? services.filter(s => s.isPublished)
    : services.filter(s => s.isPublished && s.category === activeFilter);

  const categories = [
    { id: 'all', label: 'All Services', icon: Sparkles },
    { id: 'cctv', label: 'CCTV & Surveillance', icon: Camera },
    { id: 'networking', label: 'Networking & Fiber', icon: Network },
    { id: 'it-support', label: 'IT & Server Support', icon: Server },
    { id: 'security', label: 'Smart Security & Biometrics', icon: Fingerprint }
  ];

  return (
    <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-300 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>Professional Installation & Technical Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Comprehensive Engineering Services
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          From residential IP camera setups to multi-building industrial fiber optic backbones and corporate server racks in Kota and Rajasthan.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isActive = activeFilter === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map(service => (
          <div
            key={service.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-slate-700 transition flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                  <CategoryIcon name={service.iconName} className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full">
                  {service.category.toUpperCase()}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              {/* Service Features Checklist */}
              {service.features && service.features.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Service Scope & Deliverables:
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() =>
                  openInquiryModal({
                    name: `Service Request: ${service.title}`,
                    type: service.category === 'cctv' ? 'CCTV Camera' : service.category === 'networking' ? 'Networking / LAN / Fiber' : 'IT Support & Hardware'
                  })
                }
                className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Book Service / Survey</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={getWhatsAppUrl(`Hello IT-INFOSYSTEMS, I would like to inquire about your service: ${service.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Project Consultation & Quotation Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 rounded-3xl p-8 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Need a Complete Turnkey Project Estimation?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Contact our senior engineering team for an on-site survey, customized network topology diagram, and complete bill of materials with transparent quotation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => openInquiryModal({ name: 'Turnkey Project Quotation', type: 'Complete Project / Quotation' })}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition"
          >
            Request Project Quotation
          </button>
          <a
            href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I want to request a quotation for a complete turnkey CCTV/Networking project in Kota.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
