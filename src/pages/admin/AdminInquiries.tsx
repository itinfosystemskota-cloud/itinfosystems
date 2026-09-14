import React, { useState } from 'react';
import {
  Search,
  Phone,
  MessageCircle,
  Clock,
  MapPin,
  Building,
  CheckCircle2,
  Trash2,
  Filter,
  FileText,
  Save,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Inquiry } from '../../types';

export const AdminInquiries: React.FC = () => {
  const { inquiries, updateInquiryStatus, deleteInquiry, showToast, getWhatsAppUrl } = useApp();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  const filtered = inquiries.filter(i => {
    const matchStatus = statusFilter === 'all' || i.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      i.name.toLowerCase().includes(q) ||
      i.phone.toLowerCase().includes(q) ||
      (i.company && i.company.toLowerCase().includes(q)) ||
      (i.location && i.location.toLowerCase().includes(q)) ||
      (i.productName && i.productName.toLowerCase().includes(q));
    return matchStatus && matchSearch;
  });

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete inquiry from "${name}"?`)) {
      try {
        await deleteInquiry(id);
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleOpenDetail = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setAdminNotes(inq.adminNotes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    try {
      await updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, adminNotes);
      setSelectedInquiry({ ...selectedInquiry, adminNotes });
      showToast('Admin notes saved!', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Lead & Inquiry Management</h2>
          <p className="text-xs text-slate-400">Track prospective customers, site visits, and instant WhatsApp replies</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-amber-500/20 text-amber-300 font-bold px-3 py-1.5 rounded-xl border border-amber-500/30">
            {inquiries.filter(i => i.status === 'new').length} New Leads
          </span>
          <span className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700">
            {inquiries.length} Total
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by customer name, phone, company, or location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New (Uncontacted)</option>
            <option value="contacted">Contacted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed / Won</option>
            <option value="closed">Closed / Lost</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Date / Time</th>
                <th className="py-3 px-4">Customer Info</th>
                <th className="py-3 px-4">Requirement</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Response</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map(inq => (
                <tr
                  key={inq.id}
                  onClick={() => handleOpenDetail(inq)}
                  className="hover:bg-slate-800/40 cursor-pointer transition"
                >
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                    {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-bold text-white">{inq.name}</p>
                    <p className="font-mono text-[11px] text-blue-300">{inq.phone}</p>
                    {inq.company && <p className="text-[10px] text-slate-400">🏢 {inq.company}</p>}
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-semibold text-white">{inq.requirementType}</p>
                    {inq.productName && (
                      <p className="text-[11px] text-emerald-400 truncate max-w-[200px]">
                        📦 {inq.productName}
                      </p>
                    )}
                    <p className="text-[11px] text-slate-400 line-clamp-1 max-w-[250px]">{inq.message}</p>
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    {inq.location || 'Kota'}
                  </td>

                  <td className="py-3 px-4" onClick={e => e.stopPropagation()}>
                    <select
                      value={inq.status}
                      onChange={e => updateInquiryStatus(inq.id, e.target.value as any)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
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

                  <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`tel:${inq.phone.replace(/[^0-9+]/g, '')}`}
                        className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hello ${inq.name}, Greetings from IT-INFOSYSTEMS Kota! We received your inquiry regarding ${inq.productName || inq.requirementType}. How can we assist you?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition"
                        title="Reply via WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(inq.id, inq.name)}
                        className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/30 transition"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Inquiry Details</h3>
                <p className="text-[11px] text-slate-400">ID: {selectedInquiry.id}</p>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 text-xs text-slate-300">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Client Name:</span>
                  <p className="text-sm font-bold text-white">{selectedInquiry.name}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Phone Number:</span>
                  <p className="text-sm font-bold text-emerald-400">{selectedInquiry.phone}</p>
                </div>
                {selectedInquiry.email && (
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Email:</span>
                    <p className="text-slate-200">{selectedInquiry.email}</p>
                  </div>
                )}
                {selectedInquiry.company && (
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Company:</span>
                    <p className="text-slate-200">{selectedInquiry.company}</p>
                  </div>
                )}
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Location:</span>
                  <p className="text-slate-200">{selectedInquiry.location || 'Kota'}</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Requirement Type:</span>
                  <p className="text-blue-300 font-semibold">{selectedInquiry.requirementType}</p>
                </div>
              </div>

              {selectedInquiry.productName && (
                <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-800/50">
                  <span className="text-[10px] text-blue-400 font-bold uppercase">Referenced Hardware:</span>
                  <p className="text-white font-semibold mt-0.5">{selectedInquiry.productName}</p>
                </div>
              )}

              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Customer Message / Notes:</span>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mt-1 leading-relaxed">
                  {selectedInquiry.message || 'No additional note provided.'}
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Admin Internal Follow-up Notes:</span>
                </span>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={e => setAdminNotes(e.target.value)}
                  placeholder="Record site visit dates, agreed price quotation, client callbacks..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white mt-1 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="mt-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                >
                  <Save className="w-3.5 h-3.5 text-blue-400" />
                  <span>Save Internal Notes</span>
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${selectedInquiry.name}, Greetings from IT-INFOSYSTEMS Kota! Regarding your inquiry about ${selectedInquiry.productName || selectedInquiry.requirementType}...`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
