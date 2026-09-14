import React from 'react';
import {
  Shield,
  Camera,
  Network,
  Server,
  Fingerprint,
  Cable,
  CheckCircle2,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AboutPageProps {
  setCurrentTab: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentTab }) => {
  const { settings, getWhatsAppUrl, getCallUrl, openInquiryModal } = useApp();

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* 1. Header Banner */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300 text-xs font-semibold mb-4">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Professional • Reliable • Technology Driven</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About {settings.businessName}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-4 leading-relaxed">
          Your trusted technology partner based in Kota, Rajasthan. We deliver comprehensive surveillance systems, high-speed fiber optic networks, server infrastructure, and biometric security solutions for residences, commercial spaces, and industrial plants.
        </p>
      </section>

      {/* 2. Core Capabilities Matrix */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">CCTV & Surveillance</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Design, installation, and troubleshooting of high-definition analog, IP, and 4K ColorVu security cameras with remote mobile app monitoring.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Networking & Structured Cabling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cat6 / Cat6A structured cabling, patch panel terminations, server rack dressing, managed switch configurations, and VLAN isolation.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Cable className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Fiber Optic Networking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Long-distance single-mode & multi-mode armored fiber pulling, precision fusion splicing, joint enclosure testing, and industrial link restoration.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Server & Computer Solutions</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Office PC lab deployments, Windows/Linux server setups, Network Attached Storage (NAS) configurations, and automated data backup systems.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Fingerprint className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Security Systems & Biometrics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Contactless facial recognition, biometric fingerprint time-attendance devices, electromagnetic door locks, and IP video door phones.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">AMC & Maintenance Contracts</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comprehensive Annual Maintenance Contracts (AMC) with scheduled preventative checkups, lens cleaning, recording retention verification, and emergency response.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Service Workflow */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              How We Work: Structured 5-Step Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              From site survey to long-term maintenance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Site Survey', desc: 'On-site assessment of premises, lighting conditions, camera angles, and cable pathways.' },
              { step: '02', title: 'Architecture Design', desc: 'Custom network topology, bandwidth calculation, storage estimation, and bill of materials.' },
              { step: '03', title: 'Clean Installation', desc: 'Conduit laying, Cat6/Fiber pulling, camera mounting, rack dressing, and power backup integration.' },
              { step: '04', title: 'Testing & Handover', desc: 'Configuration of remote mobile viewing, user account permissions, and client walkthrough.' },
              { step: '05', title: 'AMC & Ongoing Support', desc: 'Scheduled preventative maintenance and rapid on-site troubleshooting in Kota.' }
            ].map(item => (
              <div key={item.step} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-2xl font-black text-blue-500 font-mono">{item.step}</span>
                <div className="mt-3">
                  <h4 className="text-xs font-bold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Coverage & Location */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              Coverage Area
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Serving Kota & Surrounding Hadoti Region
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We provide prompt on-site engineering services throughout Kota city and industrial zones including:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Ranpur Industrial Area</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Indraprastha Industrial Area (IPIA)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Talwandi & Vigyan Nagar</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Gumanpura & Nayapura</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Mahaveer Nagar & Kunhadi</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Bundi, Baran & Jhalawar (On-Project)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Contact & Working Hours</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Address:</strong> {settings.fullAddress}
            </p>
            <p className="text-xs text-slate-300">
              <strong>Hours:</strong> {settings.workingHours}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={getCallUrl()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {settings.phone}</span>
              </a>
              <a
                href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I would like to schedule a site consultation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
