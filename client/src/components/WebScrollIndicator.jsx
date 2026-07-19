import React, { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AuthContext.jsx';

export const WebScrollIndicator = ( ) => {
    const {isDarkMode} = useContext(AppContent)
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set colors based on the theme state passed from your app context
  const webColor = isDarkMode ? '#ef4444' : '#dc2626'; // Red active thread
  const baseWebColor = isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'; // Faint background matrix
  const glowColor = isDarkMode ? 'rgba(239,68,68,0.6)' : 'rgba(220,38,38,0.3)';

  return (
    <div className="fixed top-0 right-0 h-full w-16 z-50 pointer-events-none flex items-center justify-center">
      <svg className="w-full h-[90vh] opacity-90" viewBox="0 0 60 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Dynamic Spidey Neon Glow Filter */}
          <filter id="spidey-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 🕸️ THE STATIC BACKGROUND WEB MATRIX */}
        {/* Core Spine vertical cable */}
        <line x1="30" y1="0" x2="30" y2="800" stroke={baseWebColor} strokeWidth="1" />
        {/* Structural cross-web threads mapping out the spine */}
        {[100, 200, 300, 400, 500, 600, 700].map((y, i) => (
          <g key={i}>
            <line x1="0" y1={y} x2="30" y2={y - 40} stroke={baseWebColor} strokeWidth="0.5" />
            <line x1="60" y1={y} x2="30" y2={y - 40} stroke={baseWebColor} strokeWidth="0.5" />
            <path d={`M 15,${y - 20} Q 30,${y - 10} 45,${y - 20}`} stroke={baseWebColor} strokeWidth="0.5" fill="none" />
          </g>
        ))}

        {/* ⚡ THE LIVE DYNAMIC ACTION WEB THREAD (Weaves as you scroll) */}
        <line 
          x1="30" 
          y1="0" 
          x2="30" 
          y2={`${(scrollProgress / 100) * 800}`} 
          stroke={webColor} 
          strokeWidth="2.5" 
          filter="url(#spidey-glow)"
          strokeLinecap="round"
        />

        {/* 🕷️ THE FLOATING DRONE / TRACKER (Glides seamlessly along the spine) */}
        <g 
          transform={`translate(30, ${(scrollProgress / 100) * 780 + 10})`}
          className="transition-transform duration-75 ease-out"
        >
          {/* Outer Energy Pulse */}
          <circle cx="0" cy="0" r="10" fill={glowColor} className="animate-pulse" />
          {/* Main Spider Token Body */}
          <circle cx="0" cy="0" r="5" fill={webColor} filter="url(#spidey-glow)" />
          {/* Stylized Web Pincers */}
          <path d="M -4,-3 Q -8,0 -4,4" stroke={webColor} strokeWidth="1.5" fill="none" />
          <path d="M 4,-3 Q 8,0 4,4" stroke={webColor} strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    </div>
  );
};