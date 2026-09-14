import React, { useState, useEffect } from 'react';
import { Camera, ShieldCheck, Activity, Wifi, RefreshCw, Layers, Eye, Zap, Crosshair } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const LiveCommandCenter: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'4k' | 'colorvu' | 'ai-track' | 'thermal'>('ai-track');
  const [fps, setFps] = useState(60);
  const [bitrate, setBitrate] = useState(8192);
  const [activeCam, setActiveCam] = useState<'CAM-01 (Main Gate)' | 'CAM-02 (Server Room)' | 'CAM-03 (Factory Floor)'>('CAM-01 (Main Gate)');
  const [isRotating, setIsRotating] = useState(true);
  const [aiDetections, setAiDetections] = useState([
    { label: 'Person [99.2%]', box: 'top-[35%] left-[28%] w-24 h-40', color: 'border-cyan-400 text-cyan-300' },
    { label: 'Vehicle [98.7%]', box: 'top-[45%] right-[20%] w-36 h-28', color: 'border-emerald-400 text-emerald-300' },
  ]);

  // Simulate dynamic frame metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
      setBitrate(Math.floor(7900 + Math.random() * 600));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const camFeeds = {
    'CAM-01 (Main Gate)': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    'CAM-02 (Server Room)': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    'CAM-03 (Factory Floor)': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  };

  return (
    <div className="relative rounded-3xl bg-[#07132a]/95 border border-cyan-500/30 p-2.5 sm:p-4 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden group">
      {/* Holographic Edge Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl pointer-events-none" />

      {/* Cyber Top Diagnostics Bar */}
      <div className="bg-[#030b1c]/90 px-4 py-2.5 rounded-2xl border border-white/10 mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono font-bold text-white text-[11px] uppercase tracking-wider">
            LIVE AI SURVEILLANCE MATRIX
          </span>
          <span className="bg-cyan-500/20 text-cyan-300 font-mono text-[10px] px-2 py-0.5 rounded-md border border-cyan-500/30">
            {activeCam}
          </span>
        </div>

        {/* Real-time Diagnostics */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span>{fps} FPS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>{bitrate} Kbps (H.265+)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LATENCY: 0.8ms</span>
          </div>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black border border-cyan-500/20">
        {/* Active Camera Feed */}
        <img
          src={camFeeds[activeCam]}
          alt="High Definition CCTV Stream"
          className={`w-full h-full object-cover transition-all duration-700 ${
            activeMode === 'thermal'
              ? 'filter invert hue-rotate-180 contrast-150 saturate-200'
              : activeMode === 'colorvu'
              ? 'filter brightness-125 saturate-150 contrast-110'
              : ''
          } ${isRotating ? 'scale-105' : 'scale-100'}`}
        />

        {/* Cyber Hologram HUD Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#030b1c]/90 via-transparent to-[#030b1c]/40" />

        {/* Laser Grid Line Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00d2ff] animate-[bounce_4s_infinite]" />
        </div>

        {/* Crosshair Target Reticle (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-cyan-400/70 flex flex-col items-center">
          <Crosshair className="w-16 h-16 animate-pulse" />
          <span className="font-mono text-[9px] bg-black/60 px-2 py-0.5 rounded text-cyan-300 border border-cyan-500/40 mt-1">
            TARGET ACQUIRED • KOTA SECTOR-7
          </span>
        </div>

        {/* AI Tracking Bounding Boxes */}
        {activeMode === 'ai-track' && (
          <>
            {aiDetections.map((det, idx) => (
              <div
                key={idx}
                className={`absolute ${det.box} border-2 ${det.color} rounded-lg pointer-events-none transition-all duration-500 animate-pulse`}
              >
                <span className={`absolute -top-5 left-0 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/80 border ${det.color}`}>
                  {det.label}
                </span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400" />
              </div>
            ))}
          </>
        )}

        {/* Floating Holographic Brand Watermark */}
        <div className="absolute top-3 left-3 bg-[#030b1c]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 pointer-events-none">
          <BrandLogo size="xs" showText={false} glow={false} />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white uppercase font-mono">IT-INFOSYSTEMS</span>
            <span className="text-[8px] text-cyan-400 font-semibold tracking-wider uppercase">AI Optical Stream</span>
          </div>
        </div>

        {/* Pan-Tilt-Zoom Controller & Mode Badges */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          {/* Mode Switchers */}
          <div className="flex items-center gap-1.5 bg-[#030b1c]/90 backdrop-blur-md p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveMode('ai-track')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1 ${
                activeMode === 'ai-track'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>AI Vector</span>
            </button>
            <button
              onClick={() => setActiveMode('colorvu')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1 ${
                activeMode === 'colorvu'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>ColorVu 24/7</span>
            </button>
            <button
              onClick={() => setActiveMode('thermal')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition flex items-center gap-1 ${
                activeMode === 'thermal'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Thermal</span>
            </button>
          </div>

          {/* Quick Camera Channel Switcher */}
          <div className="flex items-center gap-1 bg-[#030b1c]/90 backdrop-blur-md p-1 rounded-xl border border-white/10">
            {(['CAM-01 (Main Gate)', 'CAM-02 (Server Room)', 'CAM-03 (Factory Floor)'] as const).map(cam => (
              <button
                key={cam}
                onClick={() => setActiveCam(cam)}
                className={`px-2 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition ${
                  activeCam === cam
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cam.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Metric Indicators */}
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px]">
        <div className="bg-[#030b1c]/80 border border-white/5 rounded-xl p-2 flex flex-col items-center justify-center">
          <span className="text-slate-500 uppercase font-semibold">Sensor Array</span>
          <span className="text-cyan-400 font-bold font-mono">1/1.8" Progressive CMOS</span>
        </div>
        <div className="bg-[#030b1c]/80 border border-white/5 rounded-xl p-2 flex flex-col items-center justify-center">
          <span className="text-slate-500 uppercase font-semibold">Optical Resolution</span>
          <span className="text-white font-bold font-mono">3840 × 2160 (4K UHD)</span>
        </div>
        <div className="bg-[#030b1c]/80 border border-white/5 rounded-xl p-2 flex flex-col items-center justify-center">
          <span className="text-slate-500 uppercase font-semibold">Fiber Backbone</span>
          <span className="text-emerald-400 font-bold font-mono">10 Gbps SFP+ Link</span>
        </div>
        <div className="bg-[#030b1c]/80 border border-white/5 rounded-xl p-2 flex flex-col items-center justify-center">
          <span className="text-slate-500 uppercase font-semibold">Cloud Sync</span>
          <span className="text-blue-400 font-bold font-mono">Continuous RAID-5</span>
        </div>
      </div>
    </div>
  );
};
