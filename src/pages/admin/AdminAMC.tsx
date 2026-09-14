import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Shield, Check, Clock, Wrench } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AMCPlan } from '../../types';

export const AdminAMC: React.FC = () => {
  const { amcPlans, saveAMCPlan, deleteAMCPlan, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Partial<AMCPlan> | null>(null);
  const [newService, setNewService] = useState('');
  const [newTerm, setNewTerm] = useState('');

  const handleAddNew = () => {
    setCurrentPlan({
      name: 'Standard CCTV AMC',
      slug: 'standard-cctv-amc',
      duration: '1 Year (12 Months)',
      price: '₹5,999/year',
      responseTime: '4-6 Hours',
      visitFrequency: '4 Scheduled Quarterly Checkups',
      servicesIncluded: [
        'Quarterly Lens Cleaning & Camera Alignment',
        'HDD Recording Health & Sector Check',
        'Unlimited Breakdown Emergency Calls',
        'Power Supply & Cable Re-crimping'
      ],
      terms: [
        'Spare parts charged at special AMC discount',
        'Physical water/fire damage excluded'
      ],
      isPopular: false,
      order: amcPlans.length + 1
    });
    setIsEditing(true);
  };

  const handleEdit = (plan: AMCPlan) => {
    setCurrentPlan({ ...plan });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete AMC plan "${name}"?`)) {
      try {
        await deleteAMCPlan(id);
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlan?.name?.trim()) {
      showToast('Plan name is required.', 'error');
      return;
    }

    try {
      const planToSave = {
        ...currentPlan,
        slug: currentPlan.slug || currentPlan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
      await saveAMCPlan(planToSave);
      setIsEditing(false);
      setCurrentPlan(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Annual Maintenance Contracts (AMC)</h2>
          <p className="text-xs text-slate-400">Configure preventive maintenance plans, SLA response times, and pricing</p>
        </div>

        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New AMC Tier</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {amcPlans.map(plan => (
          <div
            key={plan.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition relative"
          >
            {plan.isPopular && (
              <span className="absolute -top-3 left-6 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                Featured Plan
              </span>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400">{plan.duration}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id, plan.name)}
                    className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 w-fit">{plan.price}</p>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] space-y-1 text-slate-300">
                <p className="flex items-center gap-1.5 text-blue-300">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>SLA: {plan.responseTime}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                  <span>Visits: {plan.visitFrequency}</span>
                </p>
              </div>

              <div className="space-y-1 text-xs">
                {plan.servicesIncluded?.slice(0, 4).map((s, idx) => (
                  <p key={idx} className="text-slate-300 text-[11px] flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{s}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && currentPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {currentPlan.id ? 'Edit AMC Plan' : 'New AMC Plan'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs overflow-y-auto flex-1 p-1">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  value={currentPlan.name || ''}
                  onChange={e => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Price Label
                  </label>
                  <input
                    type="text"
                    value={currentPlan.price || ''}
                    onChange={e => setCurrentPlan({ ...currentPlan, price: e.target.value })}
                    placeholder="e.g. ₹5,999/year"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={currentPlan.duration || ''}
                    onChange={e => setCurrentPlan({ ...currentPlan, duration: e.target.value })}
                    placeholder="e.g. 1 Year (12 Months)"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Response Time SLA
                  </label>
                  <input
                    type="text"
                    value={currentPlan.responseTime || ''}
                    onChange={e => setCurrentPlan({ ...currentPlan, responseTime: e.target.value })}
                    placeholder="e.g. 4-6 Hours"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Visit Frequency
                  </label>
                  <input
                    type="text"
                    value={currentPlan.visitFrequency || ''}
                    onChange={e => setCurrentPlan({ ...currentPlan, visitFrequency: e.target.value })}
                    placeholder="e.g. 4 Scheduled Checkups"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="checkbox"
                  checked={!!currentPlan.isPopular}
                  onChange={e => setCurrentPlan({ ...currentPlan, isPopular: e.target.checked })}
                />
                <span>Mark as "Most Popular" on AMC Page</span>
              </label>

              {/* Services Included */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Services Included
                </label>
                <div className="space-y-1 max-h-28 overflow-y-auto">
                  {(currentPlan.servicesIncluded || []).map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-900 p-1.5 rounded-lg text-xs text-slate-300">
                      <span>• {s}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPlan(prev => ({
                            ...prev,
                            servicesIncluded: (prev?.servicesIncluded || []).filter((_, i) => i !== idx)
                          }))
                        }
                        className="text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add service feature..."
                    value={newService}
                    onChange={e => setNewService(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newService.trim()) {
                        setCurrentPlan(prev => ({
                          ...prev,
                          servicesIncluded: [...(prev?.servicesIncluded || []), newService.trim()]
                        }));
                        setNewService('');
                      }
                    }}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
                  >
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
                  Save AMC Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
