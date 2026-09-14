import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Wrench, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import { CategoryIcon } from '../../components/common/CategoryIcon';

export const AdminServices: React.FC = () => {
  const { services, saveService, deleteService, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<ServiceItem> | null>(null);
  const [newFeature, setNewFeature] = useState('');

  const handleAddNew = () => {
    setCurrentService({
      title: '',
      slug: '',
      category: 'cctv',
      iconName: 'Camera',
      shortDesc: '',
      fullDesc: '',
      features: ['24/7 Support', 'Warranty Assurance'],
      isPublished: true,
      order: services.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (service: ServiceItem) => {
    setCurrentService({ ...service });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete service "${title}"?`)) {
      try {
        await deleteService(id);
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService?.title?.trim()) {
      showToast('Service title is required.', 'error');
      return;
    }

    try {
      const servToSave = {
        ...currentService,
        slug: currentService.slug || currentService.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
      await saveService(servToSave);
      setIsEditing(false);
      setCurrentService(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setCurrentService(prev => ({
      ...prev,
      features: [...(prev?.features || []), newFeature.trim()]
    }));
    setNewFeature('');
  };

  const handleRemoveFeature = (idx: number) => {
    setCurrentService(prev => ({
      ...prev,
      features: (prev?.features || []).filter((_, i) => i !== idx)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Engineering Services</h2>
          <p className="text-xs text-slate-400">Manage surveillance, networking, and IT support services</p>
        </div>

        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(serv => (
          <div
            key={serv.id}
            className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                    <CategoryIcon name={serv.iconName} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{serv.title}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{serv.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleEdit(serv)}
                    className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(serv.id, serv.title)}
                    className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/30 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{serv.shortDesc}</p>

              <div className="space-y-1 pt-2 border-t border-slate-800 text-xs">
                {serv.features?.slice(0, 3).map((f, i) => (
                  <p key={i} className="text-slate-400 text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>Status: {serv.isPublished ? '🟢 Published' : '⚪ Draft'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && currentService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {currentService.id ? 'Edit Service' : 'New Service'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs overflow-y-auto flex-1 p-1">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={currentService.title || ''}
                  onChange={e => setCurrentService({ ...currentService, title: e.target.value })}
                  placeholder="e.g. CCTV Surveillance Installation"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Category
                  </label>
                  <select
                    value={currentService.category || 'cctv'}
                    onChange={e => setCurrentService({ ...currentService, category: e.target.value as any })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="cctv">CCTV & Surveillance</option>
                    <option value="networking">Networking & Fiber</option>
                    <option value="it-support">IT Support & Server</option>
                    <option value="security">Security & Biometrics</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    value={currentService.iconName || 'Camera'}
                    onChange={e => setCurrentService({ ...currentService, iconName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={currentService.shortDesc || ''}
                  onChange={e => setCurrentService({ ...currentService, shortDesc: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              {/* Scope Checklist */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Service Deliverables Checklist
                </label>

                <div className="space-y-1 max-h-28 overflow-y-auto">
                  {(currentService.features || []).map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-900 p-1.5 rounded-lg text-xs text-slate-300">
                      <span>• {f}</span>
                      <button type="button" onClick={() => handleRemoveFeature(idx)} className="text-rose-400">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add feature item..."
                    value={newFeature}
                    onChange={e => setNewFeature(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  />
                  <button type="button" onClick={handleAddFeature} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                    Add
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-slate-800 text-slate-300 px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-xl"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
