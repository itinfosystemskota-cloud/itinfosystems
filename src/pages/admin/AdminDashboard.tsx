import React from 'react';
import {
  ShoppingBag,
  Layers,
  Wrench,
  FolderKanban,
  MessageSquare,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Clock,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminDashboardProps {
  setActiveAdminTab: (tab: string) => void;
  onOpenFirebaseGuide: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActiveAdminTab, onOpenFirebaseGuide }) => {
  const { products, categories, services, projects, inquiries, amcPlans, updateInquiryStatus, getWhatsAppUrl } = useApp();

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
  const amcInquiriesCount = inquiries.filter(i => i.requirementType === 'AMC Contract').length;
  const recentInquiries = inquiries.slice(0, 5);

  const stats = [
    { id: 'products', label: 'Total Products', count: products.length, icon: ShoppingBag, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    { id: 'categories', label: 'Categories', count: categories.length, icon: Layers, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    { id: 'services', label: 'Services', count: services.length, icon: Wrench, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { id: 'projects', label: 'Projects Done', count: projects.length, icon: FolderKanban, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
    { id: 'inquiries', label: 'Total Inquiries', count: inquiries.length, icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: newInquiriesCount > 0 ? `${newInquiriesCount} New` : undefined },
    { id: 'amc', label: 'AMC Plans', count: amcPlans.length, icon: FileCheck, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IT-INFOSYSTEMS Administration Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome to the Command Dashboard
          </h1>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Manage your hardware catalog, customer inquiries in Kota, AMC plans, projects, and site settings in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenFirebaseGuide}
            className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <span>📖 Deployment & Setup Guide</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('products')}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(s => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              onClick={() => setActiveAdminTab(s.id)}
              className={`bg-slate-900/90 border ${s.border} p-4 rounded-2xl cursor-pointer hover:-translate-y-1 transition duration-200 flex flex-col justify-between space-y-3 group`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                {s.badge && (
                  <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full">
                    {s.badge}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-black text-white group-hover:text-blue-300 transition">
                  {s.count}
                </p>
                <p className="text-xs text-slate-400 font-medium">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveAdminTab('products')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-white">Manage CCTV Products</h4>
            <p className="text-xs text-slate-400 mt-0.5">Add, edit pricing, or upload pictures</p>
          </div>
          <ArrowRight className="w-5 h-5 text-blue-400" />
        </div>

        <div
          onClick={() => setActiveAdminTab('inquiries')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-white">Review Customer Inquiries</h4>
            <p className="text-xs text-slate-400 mt-0.5">{newInquiriesCount} leads pending response</p>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-400" />
        </div>

        <div
          onClick={() => setActiveAdminTab('settings')}
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-2xl cursor-pointer transition flex items-center justify-between"
        >
          <div>
            <h4 className="text-sm font-bold text-white">Site Settings & Phone/WA</h4>
            <p className="text-xs text-slate-400 mt-0.5">Change phone, address, and SEO</p>
          </div>
          <ArrowRight className="w-5 h-5 text-amber-400" />
        </div>
      </div>

      {/* Recent Inquiries Table (Section 16) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Recent Customer Inquiries & Quotations</h3>
            <p className="text-xs text-slate-400">Incoming leads from website visitors in Kota and Rajasthan</p>
          </div>
          <button
            onClick={() => setActiveAdminTab('inquiries')}
            className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-1"
          >
            <span>View All ({inquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Customer</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Requirement / Product</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentInquiries.map(inq => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <p className="font-bold text-white">{inq.name}</p>
                      {inq.company && <p className="text-[11px] text-slate-400">{inq.company}</p>}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-mono text-slate-200">{inq.phone}</p>
                      {inq.email && <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{inq.email}</p>}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-blue-300">{inq.requirementType}</p>
                      {inq.productName && (
                        <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          📦 {inq.productName}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {inq.location || 'Kota'}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={inq.status}
                        onChange={e => updateInquiryStatus(inq.id, e.target.value as any)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                          inq.status === 'new'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : inq.status === 'contacted'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : inq.status === 'in-progress'
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            : inq.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="new" className="bg-slate-900 text-amber-300">New</option>
                        <option value="contacted" className="bg-slate-900 text-blue-300">Contacted</option>
                        <option value="in-progress" className="bg-slate-900 text-purple-300">In Progress</option>
                        <option value="completed" className="bg-slate-900 text-emerald-300">Completed</option>
                        <option value="closed" className="bg-slate-900 text-slate-400">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`tel:${inq.phone.replace(/[^0-9+]/g, '')}`}
                          className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition"
                          title="Call Lead"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${inq.name}, Greetings from IT-INFOSYSTEMS Kota! Regarding your inquiry about ${inq.productName || inq.requirementType}...`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition"
                          title="WhatsApp Reply"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
