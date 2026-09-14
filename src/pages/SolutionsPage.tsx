import React from 'react';
import {
  Building,
  Home,
  Briefcase,
  Store,
  Layers,
  ShieldCheck,
  Camera,
  Network,
  Server,
  Fingerprint,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SolutionsPageProps {
  setCurrentTab: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ setCurrentTab }) => {
  const { openInquiryModal, getWhatsAppUrl, getCallUrl } = useApp();

  const solutions = [
    {
      id: 'home',
      title: 'Home & Residential Security',
      subtitle: 'Complete peace of mind for bungalows, villas, apartments and farm houses',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
      highlights: [
        '24/7 ColorVu full-color night vision cameras for boundary & gate',
        'Smart IP Video Door Phone (VDP) with remote smartphone unlock',
        'Mobile app live streaming with human motion detection push alerts',
        'Clean concealed routing without disturbing your home interior aesthetics',
        'Power backup UPS for 4-8 hours continuous recording during load shedding'
      ],
      recommendedGear: '4-8 IP Cameras + 7" Touch Video Door Phone + 2TB Surveillance HDD'
    },
    {
      id: 'office',
      title: 'Office & Corporate IT Infrastructure',
      subtitle: 'Seamless networking, biometric attendance, and workplace surveillance',
      icon: Briefcase,
      image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Structured Cat6 Gigabit network drops for employee workstations',
        'Biometric face & fingerprint attendance machine with automatic payroll reports',
        'Electromagnetic door lock (EM Lock) for server room & management cabin',
        'Dual-ISP automatic failover router (Zero Internet Downtime)',
        'Indoor wide-angle dome cameras for reception, cabins, and hallways'
      ],
      recommendedGear: '16-Port Managed PoE Switch + 9U Wall Rack + Face Recognition Device + Dual-WAN Router'
    },
    {
      id: 'factory',
      title: 'Factory & Industrial Plant Security',
      subtitle: 'Heavy-duty surveillance, armored fiber backbone, and perimeter monitoring',
      icon: Building,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Steel-armored outdoor fiber optic backbone linking sheds & guard rooms (up to 5km)',
        'Heavy-duty weatherproof IP67 bullet cameras with 50m-80m IR night vision',
        'Perimeter tripwire AI sensors for intrusion detection at boundaries',
        'Centralized control room video wall setup with multi-screen monitoring',
        'Rigid industrial PVC conduit piping resistant to heat, dust, and vibrations'
      ],
      recommendedGear: '4-Core Armored Single-Mode Fiber + 32-64CH 4K NVR + Optical LIU + 24U Floor Rack'
    },
    {
      id: 'commercial',
      title: 'Commercial, Retail & Showroom Security',
      subtitle: 'Loss prevention, billing counter clarity, and multi-branch management',
      icon: Store,
      image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'High-resolution cameras focused on cash counters to read currency notes clearly',
        'Customer footfall heatmapping & customer flow analytics',
        'Anti-shoplifting aisle coverage with zero blind spots',
        'Centralized mobile viewing for store owners across multiple Kota branches',
        'Audio recording cameras for customer grievance review'
      ],
      recommendedGear: '8-16 4MP Audio IP Cameras + 4TB HDD + Ceiling Mount Access Points'
    },
    {
      id: 'enterprise',
      title: 'Enterprise & Campus Deployments',
      subtitle: 'High-density Wi-Fi 6, redundant NVR storage, and VLAN network isolation',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'VLAN network isolation separating CCTV traffic, guest Wi-Fi, and corporate servers',
        'High-density Wi-Fi 6 APs supporting 500+ concurrent devices without packet drop',
        'RAID redundant NVR storage ensuring zero video loss if a hard drive fails',
        'Enterprise Network Attached Storage (NAS) with scheduled off-site backup',
        'Comprehensive 24/7 SLA Annual Maintenance Contract (AMC)'
      ],
      recommendedGear: 'Ubiquiti / Cisco Managed Switches + 42U Server Rack + Optical SFP+ Backbone + Enterprise AMC'
    }
  ];

  return (
    <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Engineered Architectures</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Industry-Specific Security & IT Solutions
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Customized surveillance, structured cabling, and network topologies designed for specific operational environments in Kota.
        </p>
      </div>

      {/* Solutions List */}
      <div className="space-y-12">
        {solutions.map((sol, index) => {
          const Icon = sol.icon;
          const isEven = index % 2 === 1;

          return (
            <div
              key={sol.id}
              className={`bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image side */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 shadow-xl relative group">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 text-xs text-slate-300">
                    <p className="font-semibold text-white">Recommended Setup:</p>
                    <p className="text-[11px] text-blue-300 truncate">{sol.recommendedGear}</p>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{sol.title}</h2>
                    <p className="text-xs text-slate-400">{sol.subtitle}</p>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {sol.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() =>
                      openInquiryModal({
                        name: `Solution Consultation: ${sol.title}`,
                        type: 'Complete Project / Quotation'
                      })
                    }
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs py-2.5 px-5 rounded-xl transition flex items-center gap-1.5 shadow-md"
                  >
                    <span>Request Custom Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={getWhatsAppUrl(`Hello IT-INFOSYSTEMS, I would like to discuss solutions for: ${sol.title}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
