import React, { useState, useMemo } from 'react';
import {
  Building,
  Camera,
  HardDrive,
  Network,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  MessageCircle,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectItem } from '../types';

interface ProjectsPageProps {
  setCurrentTab: (tab: string) => void;
  onOpenEstimator?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ setCurrentTab }) => {
  const { projects, openInquiryModal, getWhatsAppUrl } = useApp();

  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeImageModal, setActiveImageModal] = useState<string | null>(null);

  const clientTypes = [
    'all',
    'Industrial / Factory',
    'Commercial / Retail',
    'Office / Corporate',
    'Residential / Villa',
    'Institutional / School'
  ];

  const filteredProjects = useMemo(() => {
    if (selectedType === 'all') return projects;
    return projects.filter(p => p.clientType === selectedType);
  }, [projects, selectedType]);

  return (
    <div className="max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-300 text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>Proven Track Record in Kota</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Completed Deployments & Projects
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Surveillance camera installations, optical fiber terminations, network rack dressings, and biometric access setups delivered with precision.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {clientTypes.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              selectedType === type
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {type === 'all' ? 'All Project Types' : type}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between group shadow-xl"
          >
            <div>
              {/* Image Banner */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={proj.images[0]}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-950/90 text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded border border-slate-700">
                  {proj.clientType}
                </span>
                {proj.completionDate && (
                  <span className="absolute bottom-3 right-3 bg-slate-950/90 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{proj.completionDate}</span>
                  </span>
                )}
              </div>

              {/* Body Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{proj.location}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                {/* Technical Specifications Badge List */}
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
                  {proj.camerasCount !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-blue-400" />
                        <span>Cameras:</span>
                      </span>
                      <strong className="text-white">{proj.camerasCount} Units</strong>
                    </div>
                  )}
                  {proj.nvrsCount !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                        <span>NVR / Storage:</span>
                      </span>
                      <strong className="text-white">{proj.nvrsCount} NVR</strong>
                    </div>
                  )}
                  {proj.networkingDetails && (
                    <div className="pt-1 border-t border-slate-800 text-[11px]">
                      <span className="text-slate-400 block mb-0.5 flex items-center gap-1">
                        <Network className="w-3 h-3 text-cyan-400" />
                        <span>Network Infrastructure:</span>
                      </span>
                      <span className="text-slate-300">{proj.networkingDetails}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0">
              <button
                onClick={() =>
                  openInquiryModal({
                    name: `Inquiry inspired by Project: ${proj.title}`,
                    type: 'Complete Project / Quotation'
                  })
                }
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs py-2.5 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2"
              >
                <span>Inquire for Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Project Quotation CTA */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Have a similar project requirement in Kota or Rajasthan?</h3>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Contact our lead system architect for an initial site assessment, CAD schematic, and itemized bill of quantities (BOQ).
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => openInquiryModal({ name: 'Project Assessment / BOQ', type: 'Complete Project / Quotation' })}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition"
          >
            Request Site Assessment & BOQ
          </button>
          <a
            href={getWhatsAppUrl('Hello IT-INFOSYSTEMS, I have a project requirement in Kota and need a site survey.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
