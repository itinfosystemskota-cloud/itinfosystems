import React from 'react';
import {
  Shield,
  Camera,
  Network,
  Server,
  Fingerprint,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Zap,
  HardDrive,
  Cpu,
  Clock,
  Eye,
  Sliders,
  Award,
  Users,
  Building,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { BrandLogo } from '../components/common/BrandLogo';
import { CyberGrid } from '../components/common/CyberGrid';
import { LiveCommandCenter } from '../components/common/LiveCommandCenter';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentTab }) => {
  const { settings, categories, products, services, projects, amcPlans, openInquiryModal, getWhatsAppUrl, getCallUrl } = useApp();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);
  const featuredProjects = projects.slice(0, 3);

  const handleProductClick = (productId: string) => {
    setCurrentTab(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (categoryId: string) => {
    setCurrentTab(`category-${categoryId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION WITH CYBER MATRIX & HOLOGRAPHIC COMMAND CENTER */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 pb-12 lg:pb-24">
        {/* Cyber Grid with Live Laser Scanning & Particle Mesh */}
        <CyberGrid />

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-indigo-600/15 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Col: Hero Text, Brand Emblem & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
              {/* High-Tech Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-transparent border border-cyan-500/30 text-cyan-300 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 w-fit mx-auto lg:mx-0 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span>Rajasthan's Premier CCTV, IT & Fiber Partner</span>
              </div>

              {/* Large 3D Official Brand Logo Presentation */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <BrandLogo size="hero" showSubtitle={true} glow={true} animate={true} />
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] mb-6 tracking-tight">
                Engineering Next-Gen <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">AI CCTV Surveillance</span> & IT Infrastructure
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                {settings.heroSubtitle} Expert on-site engineering, 4K ColorVu IP cameras, biometric access control, NMS software and 10G fiber optic splicing in Kota.
              </p>

              {/* High-Impact Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => openInquiryModal({ name: 'General Project / Hardware Quotation', type: 'Complete Project / Quotation' })}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white px-7 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 hover:from-blue-500 hover:to-cyan-500 transition-all shadow-[0_0_25px_rgba(37,99,255,0.4)] active:scale-95 border border-cyan-400/30"
                >
                  <Zap className="w-4 h-4 text-cyan-300" />
                  <span>Request Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I want to book a free on-site survey and inquiry in Kota.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/40 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <button
                  onClick={() => setCurrentTab('products')}
                  className="bg-[#111c33]/80 border border-white/10 text-slate-200 px-6 py-4 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-all active:scale-95"
                >
                  View Catalog
                </button>
              </div>

              {/* Stats Counters with Glowing Dividers */}
              <div className="mt-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-center lg:text-left">
                <div className="bg-[#111c33]/60 p-3 rounded-2xl border border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-0.5 font-mono">500+</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Turnkey Sites</div>
                </div>
                <div className="bg-[#111c33]/60 p-3 rounded-2xl border border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-blue-400 mb-0.5 font-mono">150+</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Active AMC</div>
                </div>
                <div className="bg-[#111c33]/60 p-3 rounded-2xl border border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-0.5 font-mono">24/7</div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Local Support</div>
                </div>
              </div>
            </div>

            {/* Right Col: Holographic Command Center Interactive Console */}
            <div className="lg:col-span-6">
              <LiveCommandCenter />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT CATEGORIES STRIP */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 w-fit">
              Product Categories
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore Our Solutions By Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click any category to browse all matching hardware, software, and systems
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('products')}
            className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
          >
            <span>All Products ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => {
            const productCount = products.filter(p => p.category === cat.name).length;
            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug || cat.id)}
                className="group bg-[#111c33] hover:bg-[#162444] border border-white/5 hover:border-blue-500/40 p-5 rounded-3xl cursor-pointer transition-all duration-200 hover:-translate-y-1 text-center flex flex-col items-center justify-between shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 group-hover:bg-blue-600/30 text-blue-400 flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
                  <CategoryIcon name={cat.iconName} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                    {cat.name}
                  </h3>
                  <span className="inline-block text-[10px] font-bold text-blue-400 mt-1.5 bg-blue-500/10 px-2 py-0.5 rounded-md">
                    {productCount} {productCount === 1 ? 'Item' : 'Items'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CORE SERVICES 4-PILLAR GRID */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Core Engineering & Installation Services
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Professional surveillance, high-speed fiber backbone, server room cabling, and smart security integrations for businesses in Kota.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: CCTV & Surveillance */}
          <div className="bg-[#111c33] border border-white/5 hover:border-blue-500/30 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">CCTV & Surveillance</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>IP & 4K ColorVu Camera Installation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>NVR / DVR Multi-Channel Recorders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Mobile Live Streaming & AI Alerts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>CCTV Repair & Maintenance</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentTab('services')}
              className="mt-6 text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 pt-3 border-t border-white/5 uppercase tracking-wide"
            >
              <span>Explore CCTV Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2: Networking & Fiber */}
          <div className="bg-[#111c33] border border-white/5 hover:border-blue-500/30 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Networking & Fiber</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>LAN & WAN Structured Cat6 Cabling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Fiber Optic Fusion Splicing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Managed Switch & VLAN Setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Enterprise High-Density Wi-Fi 6</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentTab('services')}
              className="mt-6 text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 pt-3 border-t border-white/5 uppercase tracking-wide"
            >
              <span>Explore Networking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3: IT Support & Server */}
          <div className="bg-[#111c33] border border-white/5 hover:border-blue-500/30 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">IT Infrastructure</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Server & NAS Storage Deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Computer Lab & Workstation Setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Automatic Data Backup Solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>IT Asset Management & Tuning</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentTab('services')}
              className="mt-6 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 pt-3 border-t border-white/5 uppercase tracking-wide"
            >
              <span>Explore IT Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 4: Security Systems */}
          <div className="bg-[#111c33] border border-white/5 hover:border-blue-500/30 rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Fingerprint className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Smart Security</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Biometric Face & Finger Attendance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>EM-Lock Door Access Control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Smart IP Video Door Phones (VDP)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>Multi-Tenant Society Intercoms</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentTab('services')}
              className="mt-6 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 pt-3 border-t border-white/5 uppercase tracking-wide"
            >
              <span>Explore Security</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SHOWCASE */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 w-fit">
              Top Hardware
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Security & Networking Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Industry-standard IP cameras, PoE switches, biometric attendance, and storage drives.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('products')}
            className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
          >
            <span>View Full Catalog ({products.length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div
              key={product.id}
              className="bg-[#111c33] border border-white/5 hover:border-blue-500/30 rounded-3xl overflow-hidden transition-all flex flex-col group hover:-translate-y-1"
            >
              {/* Product Image */}
              <div
                onClick={() => handleProductClick(product.id)}
                className="relative aspect-video bg-[#030b1c] overflow-hidden cursor-pointer"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow">
                  {product.category}
                </span>
                {product.discountPercentage && !product.hidePrice && (
                  <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-blue-400 font-bold uppercase tracking-wide text-[10px]">{product.category}</span>
                    <span className="font-mono text-[10px]">SKU: {product.sku}</span>
                  </div>

                  <h3
                    onClick={() => handleProductClick(product.id)}
                    className="text-base font-bold text-white hover:text-blue-300 cursor-pointer transition line-clamp-2"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 uppercase tracking-wide">
                      Get Best Quote
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={getWhatsAppUrl(`Hello IT-INFOSYSTEMS, I am interested in ${product.name} (Model: ${product.model}). Please share quotation and details.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition"
                      title="WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleProductClick(product.id)}
                      className="text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-900/30"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. ON-SITE SURVEY & CUSTOM QUOTATION CALLOUT */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="relative rounded-3xl bg-[#111c33] border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Professional Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Book a Free Technical Site Survey & Quotation in Kota
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                Our certified security and network engineers will visit your premises, assess camera viewing angles, cable routing paths, and network switches, providing a detailed transparent quotation.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => openInquiryModal({ name: 'On-Site Survey Booking', type: 'Complete Project / Quotation' })}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl shadow-xl shadow-blue-900/30 transition active:scale-95"
              >
                <span>Book Free Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I want to book an on-site survey and quotation in Kota.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl border border-white/10 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOLUTIONS FOR EVERY SECTOR */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
            Industry Blueprints
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tailored Solutions for Your Industry
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2">
            Custom engineered architectures for industrial facilities, commercial complexes, and private homes in Rajasthan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Factory & Industrial Plants',
              desc: 'Heavy-duty armored fiber backbone, explosion/weather-proof cameras, central control rooms, and vehicle tracking.',
              icon: Building,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10'
            },
            {
              title: 'Corporate Offices & Labs',
              desc: 'Structured Cat6 cabling, managed VLANs, Wi-Fi 6 roaming, biometric attendance, and server rack management.',
              icon: Server,
              color: 'text-blue-400',
              bg: 'bg-blue-500/10'
            },
            {
              title: 'Commercial & Retail Stores',
              desc: 'Wide-angle POS billing counter cameras, customer heatmapping, anti-theft monitoring, and off-site cloud alerts.',
              icon: Eye,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10'
            },
            {
              title: 'Educational Institutions',
              desc: 'Classroom & exam hall surveillance, campus-wide fiber network, secure staff attendance, and parent portal feeds.',
              icon: Users,
              color: 'text-purple-400',
              bg: 'bg-purple-500/10'
            },
            {
              title: 'Residential Villas & Bungalows',
              desc: 'ColorVu night vision perimeter security, smart 7" touch video door phones with remote smartphone lock control.',
              icon: Shield,
              color: 'text-rose-400',
              bg: 'bg-rose-500/10'
            },
            {
              title: 'Warehouses & Logistics Yards',
              desc: 'Long-range optical zoom PTZ cameras, perimeter tripwire AI sensors, and outdoor wireless bridging.',
              icon: Zap,
              color: 'text-cyan-400',
              bg: 'bg-cyan-500/10'
            }
          ].map((sol, idx) => {
            const Icon = sol.icon;
            return (
              <div
                key={idx}
                onClick={() => setCurrentTab('solutions')}
                className="bg-[#111c33] border border-white/5 hover:border-blue-500/30 p-6 rounded-3xl cursor-pointer transition hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${sol.bg} ${sol.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{sol.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{sol.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 uppercase tracking-wider mt-6 pt-3 border-t border-white/5">
                  <span>View architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. RECENT PROJECTS SHOWCASE */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 w-fit">
              On-Ground Execution
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Completed Deployments
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Surveillance, network cabling, and biometric installations executed across Kota.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('projects')}
            className="text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
          >
            <span>All Projects ({projects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map(proj => (
            <div
              key={proj.id}
              className="bg-[#111c33] border border-white/5 hover:border-blue-500/30 rounded-3xl overflow-hidden flex flex-col justify-between transition-all group hover:-translate-y-1"
            >
              <div>
                <div className="aspect-video bg-[#030b1c] overflow-hidden relative">
                  <img
                    src={proj.images[0]}
                    alt={proj.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#051126]/90 backdrop-blur-md text-[10px] text-blue-400 font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                    {proj.clientType}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[11px] text-rose-400 font-semibold">📍 {proj.location}</span>
                  <h3 className="text-base font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="bg-[#030b1c] p-3.5 rounded-2xl border border-white/5 text-[11px] text-slate-300 space-y-1.5">
                  {proj.camerasCount && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cameras Deployed:</span>
                      <strong className="text-white font-bold">{proj.camerasCount} IP Cameras</strong>
                    </div>
                  )}
                  {proj.networkingDetails && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Backbone:</span>
                      <span className="text-blue-400 font-medium truncate max-w-[150px]">{proj.networkingDetails}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. AMC MAINTENANCE HIGHLIGHT */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-[#111c33] border border-white/5 rounded-3xl p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Annual Maintenance Contract (AMC)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Zero Surveillance Downtime with Dedicated AMC Plans
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Keep your security cameras, NVRs, and network switches operating without failure. Scheduled preventative lens cleaning, hard disk recording health audits, and priority emergency breakdown callouts.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Scheduled Quarterly Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Standby Backup Hardware</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fast On-Site Response (4-6 Hrs)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Discounted Spare Parts</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center gap-4">
              <div className="bg-[#030b1c] p-6 rounded-3xl border border-white/5 text-center w-full max-w-sm">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Annual Maintenance SLA
                </p>
                <p className="text-2xl font-black text-emerald-400 mt-1">Bespoke AMC Plans</p>
                <p className="text-[11px] text-slate-400 mt-1">Includes scheduled preventive checkups + priority breakdown support in Kota</p>
                
                <button
                  onClick={() => setCurrentTab('amc')}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition shadow-lg shadow-blue-900/30"
                >
                  View All AMC Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHY CHOOSE IT-INFOSYSTEMS */}
      <section className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
            Core Values
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Kota Businesses Trust IT-INFOSYSTEMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Professional • Reliable • Technology Driven
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111c33] border border-white/5 p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Genuine Equipment Only</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We deal strictly with authentic products from Hikvision, CP PLUS, Dahua, TP-Link, D-Link, Ubiquiti, and Western Digital with official manufacturer warranty.
            </p>
          </div>

          <div className="bg-[#111c33] border border-white/5 p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Clean Structured Cabling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero messy hanging wires. We use heavy-duty rigid PVC conduits, casing-capping, cable managers, and labeled patch panels for durability and easy maintenance.
            </p>
          </div>

          <div className="bg-[#111c33] border border-white/5 p-6 rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Rapid Local Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based right here in Kota, Rajasthan. Our field technicians are available for quick on-site diagnostic visits, emergency repairs, and maintenance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
