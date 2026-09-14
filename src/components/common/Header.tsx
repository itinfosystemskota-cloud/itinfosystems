import React, { useState, useEffect } from 'react';
import {
  Shield,
  Phone,
  MessageCircle,
  MapPin,
  Search,
  Menu,
  X,
  Lock,
  ChevronDown,
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { settings, categories, products, getWhatsAppUrl, getCallUrl, openInquiryModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'services', label: 'Services' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'projects', label: 'Projects' },
    { id: 'amc', label: 'AMC' },
    { id: 'contact', label: 'Contact' }
  ];

  const searchResults = searchQuery.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSearchResult = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setCurrentTab(`product-${productId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Announcement Bar */}
      {settings.showAnnouncement && settings.announcementText && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white text-xs py-1.5 px-4 text-center font-medium border-b border-blue-800/40 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{settings.announcementText}</span>
        </div>
      )}

      {/* Top Contact & Utility Bar */}
      <div className="bg-[#020814] text-slate-400 text-xs py-2 px-4 border-b border-white/5 hidden md:block">
        <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <a
              href={getCallUrl()}
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{settings.phone}</span>
            </a>
            <div className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Kota, Rajasthan 324002</span>
            </div>
            <div className="text-slate-400 hidden lg:block">
              <span>⏰ {settings.workingHours}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I would like to inquire about your CCTV & networking services in Kota.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 transition-colors px-2 py-0.5 rounded text-xs uppercase tracking-wider font-semibold ${
                currentTab.startsWith('admin')
                  ? 'bg-blue-600/30 text-blue-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-[#051126]/80 backdrop-blur-md border-b border-white/10 transition-all ${
          isScrolled ? 'shadow-xl shadow-black/40 py-3' : 'py-4'
        }`}
      >
        <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group hover:opacity-95 transition-opacity"
          >
            <BrandLogo size="md" showSubtitle={true} glow={true} animate={true} />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs font-bold uppercase tracking-wide">
            {navLinks.map(link => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-lg transition-all duration-150 relative ${
                    isActive
                      ? 'text-blue-400 bg-blue-500/10 font-bold border-b-2 border-blue-400'
                      : 'text-slate-300 hover:text-blue-400 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="bg-white/5 hover:bg-white/10 p-2 rounded-md border border-white/10 transition-all text-slate-300 hover:text-white flex items-center gap-2 text-xs"
                title="Search CCTV, NVR, Switches & Networking"
              >
                <Search className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline font-semibold">Search</span>
              </button>

              {/* Search Dropdown / Popup */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-96 bg-[#111c33] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3" />
                    <input
                      type="text"
                      placeholder="Search cameras, NVRs, switches, brands..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full bg-[#030b1c] border border-white/10 rounded-lg pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Results List */}
                  {searchQuery.trim() !== '' && (
                    <div className="mt-3 max-h-64 overflow-y-auto divide-y divide-white/5">
                      {searchResults.length > 0 ? (
                        searchResults.map(prod => (
                          <div
                            key={prod.id}
                            onClick={() => handleSelectSearchResult(prod.id)}
                            className="py-2.5 px-2 hover:bg-white/5 rounded-lg cursor-pointer flex items-center gap-3 transition"
                          >
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-10 h-10 object-cover rounded bg-[#030b1c] border border-white/10"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-white truncate">{prod.name}</p>
                              <p className="text-[11px] text-blue-400 font-medium">
                                {prod.brand} • {prod.category}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">
                              Get Quote
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-xs text-slate-400">
                          No products matching "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}

                  {/* Search categories shortcut */}
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Popular: ColorVu, PoE Switch, Cat6, NVR</span>
                    <button
                      onClick={() => {
                        handleNavClick('products');
                        setIsSearchOpen(false);
                      }}
                      className="text-blue-400 hover:underline font-bold"
                    >
                      All Products →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Request Quote Button */}
            <button
              onClick={() => openInquiryModal({ name: 'General Inquiry / Quotation', type: 'Complete Project / Quotation' })}
              className="hidden sm:flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase px-4 py-2.5 rounded-md transition-all shadow-lg shadow-blue-900/30 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Get Quote</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden bg-white/5 hover:bg-white/10 p-2 rounded-md border border-white/10 text-slate-300 hover:text-white transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#051126] border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {navLinks.map(link => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center justify-between ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </button>
                );
              })}
            </div>

            {/* Mobile Action Buttons */}
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
              <a
                href={getCallUrl()}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-xs py-2.5 rounded-lg font-bold border border-white/10 uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call Us</span>
              </a>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white text-xs py-2.5 rounded-lg font-bold uppercase tracking-wider shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="mt-3">
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs py-2 rounded-lg font-bold uppercase tracking-wider"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Login & Dashboard</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
