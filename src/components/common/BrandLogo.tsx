import React from 'react';

interface BrandLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  showSubtitle?: boolean;
  showText?: boolean;
  animate?: boolean;
  className?: string;
  glow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  showText = true,
  animate = true,
  className = '',
  glow = true,
}) => {
  // Dimensions based on size
  const dimensions = {
    xs: { iconSize: 28, textClass: 'text-sm', subClass: 'text-[7px]' },
    sm: { iconSize: 36, textClass: 'text-base', subClass: 'text-[8px]' },
    md: { iconSize: 46, textClass: 'text-lg', subClass: 'text-[9px]' },
    lg: { iconSize: 58, textClass: 'text-xl', subClass: 'text-[10px]' },
    xl: { iconSize: 76, textClass: 'text-2xl', subClass: 'text-xs' },
    '2xl': { iconSize: 96, textClass: 'text-3xl', subClass: 'text-sm' },
    hero: { iconSize: 130, textClass: 'text-4xl', subClass: 'text-base' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 3D High-Tech Vector Logo Emblem */}
      <div
        className={`relative flex items-center justify-center shrink-0 ${
          glow ? 'filter drop-shadow-[0_0_16px_rgba(37,99,235,0.45)]' : ''
        }`}
        style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
      >
        {/* Animated Cyber Hologram Ring */}
        {animate && (
          <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping pointer-events-none opacity-30" />
        )}

        <svg
          viewBox="0 0 500 500"
          className={`w-full h-full transform transition-transform duration-300 ${
            animate ? 'hover:scale-105 hover:rotate-1' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Metallic Silver 3D Gradient */}
            <linearGradient id="chromeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#d1d5db" />
              <stop offset="45%" stopColor="#9ca3af" />
              <stop offset="60%" stopColor="#f3f4f6" />
              <stop offset="85%" stopColor="#6b7280" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>

            {/* Vibrant Electric Blue Gradient */}
            <linearGradient id="electricBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="40%" stopColor="#2563eb" />
              <stop offset="80%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Deep Blue Arc Gradient */}
            <linearGradient id="arcBlueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Gold RJ45 Pins */}
            <linearGradient id="goldPins" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* 3D Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. TOP CRESCENT 3D METALLIC BLUE ARCH */}
          <path
            d="M 190 75 C 290 55 400 115 425 210 C 435 245 420 270 395 260 C 375 250 380 230 370 200 C 350 140 270 100 200 115 Z"
            fill="url(#arcBlueGrad)"
            filter="url(#neonGlow)"
          />
          <path
            d="M 195 80 C 285 62 385 118 410 205 C 388 150 320 112 210 120 Z"
            fill="url(#chromeMetal)"
            opacity="0.85"
          />

          {/* 2. RIGHT-SIDE CIRCUIT BOARD TRACKS & NODES */}
          <g stroke="#00d2ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
            {/* Upper Track */}
            <path d="M 330 185 L 390 185 L 430 185" />
            <circle cx="435" cy="185" r="7" fill="#030b1c" stroke="#00e5ff" strokeWidth="5" />

            {/* Middle Track */}
            <path d="M 320 205 L 375 205 L 415 225 L 470 225" />
            <circle cx="475" cy="225" r="7" fill="#030b1c" stroke="#00e5ff" strokeWidth="5" />

            {/* Lower Track */}
            <path d="M 320 225 L 360 245 L 450 245" />
            <circle cx="455" cy="245" r="7" fill="#030b1c" stroke="#00e5ff" strokeWidth="5" />

            {/* Bottom-most track */}
            <path d="M 315 245 L 345 270 L 420 270" />
            <circle cx="425" cy="270" r="6" fill="#00d2ff" stroke="#ffffff" strokeWidth="3" />
          </g>

          {/* 3. DIGITAL BLUE PIXEL DATA CUBES (Top Left Eruption) */}
          <g fill="url(#electricBlue)">
            <rect x="150" y="70" width="22" height="22" rx="3" transform="rotate(-10 150 70)" />
            <rect x="180" y="85" width="26" height="26" rx="4" transform="rotate(5 180 85)" />
            <rect x="130" y="95" width="20" height="20" rx="3" />
            <rect x="155" y="115" width="24" height="24" rx="3" />
            <rect x="185" y="125" width="18" height="18" rx="2" />
            <rect x="140" y="145" width="16" height="16" rx="2" />
            <rect x="165" y="155" width="14" height="14" rx="2" />
          </g>

          {/* 4. BASE BLUE SWEEP ARCS */}
          <path
            d="M 130 290 C 160 370 290 395 385 320 C 370 345 320 375 250 375 C 170 375 125 330 115 285 Z"
            fill="url(#electricBlue)"
          />
          <path
            d="M 155 315 C 200 365 305 375 365 320 C 320 355 230 355 175 310 Z"
            fill="url(#chromeMetal)"
          />

          {/* 5. 3D "I" METALLIC & BLUE LETTER */}
          <g>
            {/* Left Electric Blue Facet of "I" */}
            <path
              d="M 165 140 L 225 140 L 225 330 L 165 330 Z"
              fill="url(#electricBlue)"
              filter="url(#neonGlow)"
            />
            {/* Chrome Front highlight */}
            <path
              d="M 185 140 L 225 140 L 225 330 L 185 330 Z"
              fill="url(#chromeMetal)"
            />
          </g>

          {/* 6. 3D "T" CHROME & METALLIC LETTER */}
          <g>
            {/* Crossbar */}
            <path
              d="M 230 135 L 355 135 L 340 185 L 230 185 Z"
              fill="url(#chromeMetal)"
            />
            {/* Crossbar Bevel Top */}
            <path
              d="M 230 135 L 355 135 L 350 145 L 235 145 Z"
              fill="#ffffff"
            />
            {/* Vertical Stem */}
            <path
              d="M 265 185 L 315 185 L 315 325 L 265 325 Z"
              fill="url(#chromeMetal)"
            />
            {/* Stem Right Shadow */}
            <path
              d="M 295 185 L 315 185 L 315 325 L 295 325 Z"
              fill="#94a3b8"
            />
          </g>

          {/* 7. RJ-45 ETHERNET CONNECTOR CABLE (Left to Bottom Wrapping) */}
          <g transform="translate(-10, 0)">
            {/* Cable Cord Curve */}
            <path
              d="M 115 250 C 130 330 240 370 320 335"
              stroke="url(#electricBlue)"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
              filter="url(#neonGlow)"
            />

            {/* RJ45 Modular Plug Body */}
            <g transform="rotate(-38 75 220)">
              {/* Boot Strain Relief */}
              <path d="M 60 215 L 75 200 L 95 215 L 80 230 Z" fill="#1e3a8a" />
              
              {/* Transparent / Blue Body */}
              <rect x="75" y="195" width="48" height="32" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <rect x="79" y="199" width="30" height="24" rx="2" fill="#0f172a" />
              
              {/* Locking Clip */}
              <path d="M 85 190 L 115 190 L 105 195 L 90 195 Z" fill="#94a3b8" />
              
              {/* 8 Gold Contact Pins */}
              <g fill="url(#goldPins)">
                <rect x="117" y="198" width="6" height="3" rx="0.5" />
                <rect x="117" y="202" width="6" height="3" rx="0.5" />
                <rect x="117" y="206" width="6" height="3" rx="0.5" />
                <rect x="117" y="210" width="6" height="3" rx="0.5" />
                <rect x="117" y="214" width="6" height="3" rx="0.5" />
                <rect x="117" y="218" width="6" height="3" rx="0.5" />
                <rect x="117" y="222" width="6" height="3" rx="0.5" />
              </g>
            </g>
          </g>

          {/* 8. 3D GLOSS HIGHLIGHT ARC */}
          <ellipse cx="270" cy="110" rx="90" ry="8" fill="#ffffff" opacity="0.3" transform="rotate(-15 270 110)" />
        </svg>
      </div>

      {/* Brand Typography (3D Chrome & Blue) */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center tracking-tight font-black uppercase">
            <span
              className={`font-mono bg-gradient-to-r from-blue-500 via-cyan-400 to-white bg-clip-text text-transparent filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${dimensions.textClass}`}
              style={{ letterSpacing: '0.04em' }}
            >
              IT-INFOSYSTEMS
            </span>
          </div>

          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span
                className={`font-bold tracking-[0.25em] uppercase text-cyan-400/90 font-sans ${dimensions.subClass}`}
              >
                Total Network Solution
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
