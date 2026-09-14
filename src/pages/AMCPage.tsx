import React from 'react';
import {
  Shield,
  CheckCircle2,
  Clock,
  Wrench,
  AlertTriangle,
  Sparkles,
  Phone,
  MessageCircle,
  FileCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AMCPageProps {
  setCurrentTab: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const AMCPage: React.FC<AMCPageProps> = ({ setCurrentTab }) => {
  const { amcPlans, openInquiryModal, getWhatsAppUrl, getCallUrl, settings } = useApp();

  return (
    <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 text-xs font-semibold">
          <Shield className="w-3.5 h-3.5" />
          <span>Annual Maintenance Contracts (AMC)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Reliable CCTV & Network Maintenance in Kota
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Ensure 99.9% uptime for your security surveillance cameras, NVRs, and network switches. Prevent unexpected hardware failure with scheduled preventative servicing.
        </p>
      </div>

      {/* AMC Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {amcPlans.map(plan => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
              plan.isPopular
                ? 'bg-gradient-to-b from-blue-950/80 via-slate-900 to-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-950/60 scale-105 z-10'
                : 'bg-slate-900/90 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {plan.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-0.5 rounded-full shadow flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Most Popular in Kota</span>
              </span>
            )}

            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.duration}</p>
                <div className="mt-3">
                  <span className="text-lg sm:text-xl font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 inline-block">
                    {plan.price}
                  </span>
                </div>
              </div>

              {/* Service Frequency & Response SLA Badges */}
              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-blue-300">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span><strong>Response:</strong> {plan.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Wrench className="w-4 h-4 shrink-0 text-indigo-400" />
                  <span><strong>Visits:</strong> {plan.visitFrequency}</span>
                </div>
              </div>

              {/* Included Services */}
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Services Included:
                </p>
                <ul className="space-y-2">
                  {plan.servicesIncluded.map((serv, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{serv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terms Note */}
              {plan.terms && plan.terms.length > 0 && (
                <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  {plan.terms.map((term, idx) => (
                    <p key={idx}>• {term}</p>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button (Section 13 Requirement: "Request AMC Quote") */}
            <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-2">
              <button
                onClick={() =>
                  openInquiryModal({
                    name: `AMC Contract Request: ${plan.name} (${plan.price})`,
                    type: 'AMC Contract'
                  })
                }
                className={`w-full font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg ${
                  plan.isPopular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <span>Request AMC Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={getWhatsAppUrl(`Hello IT-INFOSYSTEMS, I am interested in ${plan.name} for our premises in Kota. Please share quotation.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 py-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Inquire on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Routine AMC Checklist */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            What Happens During a Preventative AMC Visit?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Our certified technician executes a standardized 10-point health audit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            { title: 'Optical Lens & Dome Cleaning', desc: 'Cleaning dust, cobwebs, and moisture from camera lenses to restore razor-sharp night & day visibility.' },
            { title: 'Hard Drive Recording Retention Audit', desc: 'Checking S.M.A.R.T. disk sectors, verifying continuous 24/7 video recording and calendar time synchronization.' },
            { title: 'Power Supply & Voltage Testing', desc: 'Testing SMPS power distribution and PoE switches to prevent sudden power surges or camera cutoffs.' },
            { title: 'BNC / RJ45 Connector Re-crimping', desc: 'Tightening loose connectors, weatherproofing outdoor joints, and replacing worn patch cords.' },
            { title: 'Firmware & Security Patch Update', desc: 'Updating DVR/NVR firmware to patch security vulnerabilities and improve video encoding efficiency.' },
            { title: 'Remote Mobile Streaming Verification', desc: 'Checking static IP, P2P Cloud status, and ensuring push notifications work smoothly on client smartphones.' }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pl-6">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
