import React from 'react';
import { Shield, FileText, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LegalPagesProps {
  page: 'privacy-policy' | 'terms' | 'disclaimer';
  setCurrentTab: (tab: string) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ page, setCurrentTab }) => {
  const { settings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={() => setCurrentTab('home')}
        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1.5 font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      {page === 'privacy-policy' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">Privacy Policy</h1>
              <p className="text-[11px] text-slate-400">Last updated: February 2026</p>
            </div>
          </div>

          <p>
            Welcome to <strong>{settings.businessName}</strong>. We are committed to protecting the privacy and personal data of our customers, website visitors, and clients in Kota and Rajasthan.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">1. Information We Collect</h3>
          <p>
            When you submit an inquiry, request a quotation, or contact us via WhatsApp or phone, we may collect your name, company name, phone number, email address, physical site address, and details about your security/networking requirements.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">2. How We Use Your Information</h3>
          <p>
            We use the collected information exclusively to provide you with on-site surveys, equipment quotations, technical support, hardware warranty tracking, and AMC services. We never sell, rent, or trade your personal data with third-party advertising companies.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">3. Video Footage & Password Security</h3>
          <p>
            During CCTV camera installation and NVR setup, our technicians ensure strong, client-owned passwords are configured. We do not store or view private video surveillance streams without explicit client consent during troubleshooting.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">4. Contact Us</h3>
          <p>
            If you have questions regarding this Privacy Policy, contact us at <strong>{settings.email}</strong> or visit our office at {settings.fullAddress}.
          </p>
        </div>
      )}

      {page === 'terms' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <FileText className="w-6 h-6 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">Terms & Conditions</h1>
              <p className="text-[11px] text-slate-400">Last updated: February 2026</p>
            </div>
          </div>

          <p>
            These terms and conditions govern the sale of CCTV, networking, and IT security equipment, as well as on-site installation and maintenance services provided by <strong>{settings.businessName}</strong>.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">1. Equipment Warranty</h3>
          <p>
            All hardware (Cameras, NVRs, DVRs, Hard Drives, Managed Switches, Biometric Attendance units) carry official OEM manufacturer warranties. Physical damage, lightning damage, unauthorized tampering, or water ingress (on non-waterproof units) are excluded from standard warranty coverage.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">2. Quotations & Pricing</h3>
          <p>
            Formal quotations are valid for 15 days from the date of issuance due to market fluctuations in copper cabling, storage media, and electronic components. On-site cable measurement determines final billing.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">3. Annual Maintenance Contracts (AMC)</h3>
          <p>
            AMC plans cover routine scheduled preventive maintenance, lens cleaning, hard drive health verification, and labor for breakdown calls. Spare parts and replacement equipment are billed separately unless covered under active manufacturer warranty.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">4. Jurisdiction</h3>
          <p>
            Any disputes arising out of contracts or services shall be subject to the exclusive jurisdiction of the courts in Kota, Rajasthan, India.
          </p>
        </div>
      )}

      {page === 'disclaimer' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 space-y-6 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Shield className="w-6 h-6 text-amber-400" />
            <div>
              <h1 className="text-xl font-bold text-white">Disclaimer</h1>
              <p className="text-[11px] text-slate-400">Last updated: February 2026</p>
            </div>
          </div>

          <p>
            The information contained on this website is for general informational purposes and equipment specifications. While <strong>{settings.businessName}</strong> strives to keep all hardware models and specifications up to date, manufacturers may revise technical parameters without prior notice.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">1. Network & Internet Reliability</h3>
          <p>
            Remote mobile streaming speed depends on the speed and reliability of your local Internet Service Provider (ISP) and SIM network coverage. {settings.businessName} is not liable for ISP downtime or third-party cloud server outages.
          </p>

          <h3 className="text-sm font-bold text-white pt-2">2. Demo & Sample Data Notice</h3>
          <p>
            Sample product images and mock catalog entries displayed during development are for preview and testing purposes. Genuine OEM specifications are finalized upon site audit and formal quotation.
          </p>
        </div>
      )}
    </div>
  );
};
