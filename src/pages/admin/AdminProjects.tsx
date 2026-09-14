import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, MapPin, Camera, Calendar, HardDrive, Network, Upload } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProjectItem } from '../../types';
import * as dataService from '../../services/dataService';

export const AdminProjects: React.FC = () => {
  const { projects, saveProject, deleteProject, showToast } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<ProjectItem> | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');

  const handleAddNew = () => {
    setCurrentProject({
      title: '',
      slug: '',
      clientType: 'Industrial / Factory',
      location: 'Ranpur Industrial Area, Kota',
      description: '',
      images: ['https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'],
      camerasCount: 16,
      nvrsCount: 1,
      networkingDetails: 'Cat6 Structured Cabling + 24-Port PoE Switch',
      completionDate: '2025'
    });
    setIsEditing(true);
  };

  const handleEdit = (proj: ProjectItem) => {
    setCurrentProject({ ...proj });
    setIsEditing(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete project "${title}"?`)) {
      try {
        await deleteProject(id);
      } catch (err: any) {
        showToast(err.message, 'error');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject?.title?.trim()) {
      showToast('Project title is required.', 'error');
      return;
    }

    try {
      const projToSave = {
        ...currentProject,
        slug: currentProject.slug || currentProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
      await saveProject(projToSave);
      setIsEditing(false);
      setCurrentProject(null);
    } catch (err: any) {
      showToast(err.message, 'error');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await dataService.uploadImage(file, 'projects');
      setCurrentProject(prev => ({
        ...prev,
        images: [...(prev?.images || []), url]
      }));
      showToast('Project image uploaded successfully!', 'success');
    } catch (err: any) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Project Deployments Showcase</h2>
          <p className="text-xs text-slate-400">Showcase past CCTV and networking installations executed in Kota</p>
        </div>

        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(proj => (
          <div
            key={proj.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="aspect-video bg-slate-950 overflow-hidden relative">
                <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 bg-slate-950/90 text-[10px] text-blue-300 font-bold px-2 py-0.5 rounded border border-slate-700">
                  {proj.clientType}
                </span>
              </div>

              <div className="p-5 space-y-2.5">
                <p className="text-[11px] text-rose-400 font-medium">📍 {proj.location}</p>
                <h4 className="text-sm font-bold text-white leading-snug">{proj.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-2">{proj.description}</p>
                <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                  <p>• {proj.camerasCount || 0} Cameras • {proj.nvrsCount || 0} NVR</p>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => handleEdit(proj)}
                className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(proj.id, proj.title)}
                className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/30 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && currentProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {currentProject.id ? 'Edit Project' : 'New Project'}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs overflow-y-auto flex-1 p-1">
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={currentProject.title || ''}
                  onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                  placeholder="e.g. 32-Camera IP Surveillance at Chemical Plant"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Client Type
                  </label>
                  <select
                    value={currentProject.clientType || 'Industrial / Factory'}
                    onChange={e => setCurrentProject({ ...currentProject, clientType: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  >
                    <option value="Industrial / Factory">Industrial / Factory</option>
                    <option value="Commercial / Retail">Commercial / Retail</option>
                    <option value="Office / Corporate">Office / Corporate</option>
                    <option value="Residential / Villa">Residential / Villa</option>
                    <option value="Institutional / School">Institutional / School</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Location
                  </label>
                  <input
                    type="text"
                    value={currentProject.location || ''}
                    onChange={e => setCurrentProject({ ...currentProject, location: e.target.value })}
                    placeholder="e.g. Ranpur Industrial Area, Kota"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Cameras Deployed
                  </label>
                  <input
                    type="number"
                    value={currentProject.camerasCount || 0}
                    onChange={e => setCurrentProject({ ...currentProject, camerasCount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    NVRs
                  </label>
                  <input
                    type="number"
                    value={currentProject.nvrsCount || 0}
                    onChange={e => setCurrentProject({ ...currentProject, nvrsCount: Number(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                    Year / Date
                  </label>
                  <input
                    type="text"
                    value={currentProject.completionDate || '2025'}
                    onChange={e => setCurrentProject({ ...currentProject, completionDate: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Networking & Cabling Summary
                </label>
                <input
                  type="text"
                  value={currentProject.networkingDetails || ''}
                  onChange={e => setCurrentProject({ ...currentProject, networkingDetails: e.target.value })}
                  placeholder="e.g. 4-Core Armored Fiber Backbone + 24-Port Gigabit PoE Switch"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-1 text-[11px]">
                  Project Description & Scope
                </label>
                <textarea
                  rows={3}
                  value={currentProject.description || ''}
                  onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              {/* Images */}
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-white uppercase tracking-wider">
                  Project Images
                </label>
                <div className="flex flex-wrap gap-2">
                  {(currentProject.images || []).map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700">
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Image URL..."
                    value={imageUrlInput}
                    onChange={e => setImageUrlInput(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (imageUrlInput.trim()) {
                        setCurrentProject(prev => ({
                          ...prev,
                          images: [...(prev?.images || []), imageUrlInput.trim()]
                        }));
                        setImageUrlInput('');
                      }
                    }}
                    className="bg-slate-800 text-slate-200 px-3 py-2 rounded-lg text-xs"
                  >
                    Add URL
                  </button>
                  <label className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
