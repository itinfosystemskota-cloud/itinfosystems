import React, { useState } from 'react';
import {
  Save,
  Shield,
  Phone,
  Mail,
  MapPin,
  Globe,
  Database,
  CloudUpload,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Check,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SiteSettings } from '../../types';
import * as dataService from '../../services/dataService';
import { isFirebaseConfigured } from '../../services/firebase';

interface AdminSettingsProps {
  onOpenFirebaseGuide: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onOpenFirebaseGuide }) => {
  const {
    settings,
    saveSettings,
    products,
    categories,
    services,
    projects,
    amcPlans,
    inquiries,
    showToast,
    reloadAllData,
    adminSession,
    logoutAdmin
  } = useApp();

  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveSettings(formData);
      showToast('Settings saved successfully!', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Sync to Firestore
  const handleSyncToFirestore = async () => {
    if (!confirm('This will upload all current local products, categories, services, projects, and settings to your Cloud Firestore database. Continue?')) {
      return;
    }

    setIsSyncing(true);
    try {
      const result = await dataService.syncAllToFirestore();
      if (result.success) {
        showToast(result.message, 'success');
      } else {
        showToast(result.message, 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Sync failed', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const jsonStr = dataService.exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `it-infosystems-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Complete backup downloaded successfully!', 'info');
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async event => {
      try {
        const text = event.target?.result as string;
        const success = dataService.importDatabaseJSON(text);
        if (success) {
          await reloadAllData();
          showToast('Backup restored successfully!', 'success');
        } else {
          showToast('Failed to parse backup file.', 'error');
        }
      } catch (err) {
        showToast('Failed to read JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Reset to initial defaults
  const handleResetDefaults = async () => {
    if (confirm('⚠️ WARNING: This will reset all products, services, projects, and settings back to factory initial seed data. Are you sure?')) {
      dataService.resetAllDataToDefault();
      await reloadAllData();
      showToast('Database reset to initial defaults.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Global Business & Website Settings</h2>
          <p className="text-xs text-slate-400">Update phone numbers, WhatsApp, Kota address, hero banners & cloud sync</p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Changes...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Cloud Status Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Cloud Firestore Database Status:</span>
                {isFirebaseConfigured ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                    🟢 Cloud Connected
                  </span>
                ) : (
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-500/40">
                    ⚡ Built-in Storage Active
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">
                {isFirebaseConfigured
                  ? 'Your app is directly reading and saving changes to your live Google Firebase Firestore project.'
                  : 'Currently storing all catalog items and inquiries in browser local storage. Click below to view how to connect Firebase in 5 minutes!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenFirebaseGuide}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3.5 py-2 rounded-xl border border-slate-700 transition"
            >
              📖 Step-by-Step Guide
            </button>
            <button
              onClick={handleSyncToFirestore}
              disabled={isSyncing}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 disabled:opacity-50"
            >
              <CloudUpload className="w-4 h-4" />
              <span>{isSyncing ? 'Syncing...' : 'Sync to Cloud'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Section 1: Business Identity & Contact Info */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Business Identity & Contact Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Business Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={e => handleChange('businessName', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => handleChange('tagline', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Primary Phone (Calls)</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+91 70143 91772"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Alternate Phone</label>
              <input
                type="text"
                value={formData.alternatePhone || ''}
                onChange={e => handleChange('alternatePhone', e.target.value)}
                placeholder="+91 70143 91772"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">WhatsApp Number (with country code)</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={e => handleChange('whatsapp', e.target.value)}
                placeholder="917014391772"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Primary Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Support / Helpdesk Email</label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={e => handleChange('supportEmail', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Working Hours</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={e => handleChange('workingHours', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Full Office Address</label>
              <input
                type="text"
                value={formData.fullAddress}
                onChange={e => handleChange('fullAddress', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Google Maps Embed URL</label>
              <input
                type="text"
                value={formData.googleMapsEmbedUrl}
                onChange={e => handleChange('googleMapsEmbedUrl', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Homepage Hero & SEO Titles */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-400" />
            <span>Homepage Hero Copy & Search Engine Optimization (SEO)</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Hero Main Title</label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={e => handleChange('heroTitle', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Hero Subtitle / Description</label>
              <textarea
                rows={2}
                value={formData.heroSubtitle}
                onChange={e => handleChange('heroSubtitle', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Website Page Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={e => handleChange('metaTitle', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Meta Description</label>
              <textarea
                rows={2}
                value={formData.metaDescription}
                onChange={e => handleChange('metaDescription', e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Data Backup, JSON Import/Export & Reset */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>Database Backup, JSON Export & Recovery</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={handleExportBackup}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition"
            >
              <Download className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white">Export JSON Backup</span>
              <span className="text-[10px] text-slate-400">Download entire site database as a file</span>
            </button>

            <label className="bg-slate-800 hover:bg-slate-700 border border-slate-700 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition">
              <Upload className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-white">Import JSON Backup</span>
              <span className="text-[10px] text-slate-400">Restore products & settings from file</span>
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition"
            >
              <RotateCcw className="w-5 h-5 text-rose-400" />
              <span className="font-bold text-rose-300">Reset to Defaults</span>
              <span className="text-[10px] text-rose-400/80">Reload initial seed catalog</span>
            </button>
          </div>
        </div>

        {/* Section 4: Admin Session & Security */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Admin Authentication & Active Session</span>
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="space-y-1">
              <p className="text-xs font-bold text-white flex items-center gap-2">
                <span>Active Account:</span>
                <span className="text-blue-300 font-mono">{adminSession?.email || 'Administrator'}</span>
              </p>
              <p className="text-[11px] text-slate-400">
                You are currently logged in with full administrative privileges to update the product catalog and settings.
              </p>
            </div>

            <button
              type="button"
              onClick={() => logoutAdmin()}
              className="inline-flex items-center justify-center gap-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 font-bold px-5 py-2.5 rounded-xl text-xs transition shrink-0 shadow-sm active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Admin Panel</span>
            </button>
          </div>
        </div>

        {/* Save button sticky bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl text-xs shadow-lg shadow-blue-900/50 transition active:scale-95 disabled:opacity-50"
          >
            {isSaving ? 'Saving Changes...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
