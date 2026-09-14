import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Layers,
  Wrench,
  FolderKanban,
  FileCheck,
  MessageSquare,
  Settings,
  LogOut,
  Shield,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminServices } from './AdminServices';
import { AdminProjects } from './AdminProjects';
import { AdminAMC } from './AdminAMC';
import { AdminInquiries } from './AdminInquiries';
import { AdminSettings } from './AdminSettings';
import { FirebaseGuideModal } from './FirebaseGuideModal';
import { BrandLogo } from '../../components/common/BrandLogo';

interface AdminLayoutProps {
  setCurrentTab: (tab: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ setCurrentTab }) => {
  const { adminSession, logoutAdmin, inquiries, settings } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<string>('dashboard');
  const [guideModalOpen, setGuideModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products Catalog', icon: ShoppingBag },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'projects', label: 'Projects Done', icon: FolderKanban },
    { id: 'amc', label: 'AMC Contracts', icon: FileCheck },
    { id: 'inquiries', label: 'Leads & Inquiries', icon: MessageSquare, badge: newInquiriesCount > 0 ? newInquiriesCount : undefined },
    { id: 'settings', label: 'Site Settings & Cloud', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white p-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <BrandLogo size="sm" showSubtitle={false} glow={true} animate={false} />
            <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-500/30 uppercase tracking-widest hidden sm:inline-block">
              Admin Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Deployment Guide Trigger */}
          <button
            onClick={() => setGuideModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-orange-950/60 border border-orange-700/60 text-orange-300 hover:bg-orange-900 text-xs font-semibold px-3 py-1.5 rounded-xl transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Deployment Guide</span>
          </button>

          {/* Return to Public Website */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Website</span>
          </button>

          {/* User & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
            <div className="hidden sm:block text-right">
              <p className="text-[11px] font-bold text-white leading-tight truncate max-w-[140px]" title={adminSession?.email || 'Admin'}>
                {adminSession?.email || 'Admin'}
              </p>
              <span className="text-[9px] text-emerald-400">Authenticated</span>
            </div>
            <button
              onClick={() => logoutAdmin()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 transition text-xs font-bold shadow-sm active:scale-95"
              title="Logout from Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden md:block w-60 shrink-0 space-y-2">
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSubTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-1.5 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Direct Logout Option in Sidebar */}
            <div className="pt-2 mt-2 border-t border-slate-800">
              <button
                onClick={() => logoutAdmin()}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-950/30 hover:bg-rose-600 transition border border-rose-900/30 hover:border-rose-600 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <LogOut className="w-4 h-4" />
                  <span>Logout (लॉगआउट)</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-3 text-xs">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Quick Deployment</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Step-by-step tutorial on deploying this website for free to Cloudflare Pages and connecting Firebase Firestore.
            </p>
            <button
              onClick={() => setGuideModalOpen(true)}
              className="w-full bg-orange-600/20 hover:bg-orange-600 text-orange-300 hover:text-white font-bold py-2 rounded-xl text-[11px] border border-orange-500/30 transition"
            >
              Open Deployment Guide
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden flex flex-col justify-end">
            <div className="bg-slate-900 border-t border-slate-800 rounded-t-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white">Admin Navigation</h3>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map(item => {
                  const Icon = item.icon;
                  const isActive = activeSubTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSubTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg shadow-rose-950/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout (Admin Panel से बाहर निकलें)</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setGuideModalOpen(true);
                  }}
                  className="w-full bg-orange-600/20 hover:bg-orange-600 text-orange-300 hover:text-white border border-orange-500/30 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  📖 Open Firebase & Cloudflare Guide
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeSubTab === 'dashboard' && (
            <AdminDashboard
              setActiveAdminTab={setActiveSubTab}
              onOpenFirebaseGuide={() => setGuideModalOpen(true)}
            />
          )}
          {activeSubTab === 'products' && <AdminProducts />}
          {activeSubTab === 'categories' && <AdminCategories />}
          {activeSubTab === 'services' && <AdminServices />}
          {activeSubTab === 'projects' && <AdminProjects />}
          {activeSubTab === 'amc' && <AdminAMC />}
          {activeSubTab === 'inquiries' && <AdminInquiries />}
          {activeSubTab === 'settings' && (
            <AdminSettings onOpenFirebaseGuide={() => setGuideModalOpen(true)} />
          )}
        </main>
      </div>

      {/* Deployment & Setup Guide Modal */}
      <FirebaseGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </div>
  );
};
