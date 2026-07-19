import React, { useState, useEffect, useContext } from 'react';
import { AppContent } from '../context/AuthContext';

export const WebCursor = () => {
    const {isDarkMode} = useContext(AppContent)
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      const newClick = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setClicks((prev) => [...prev, newClick]);

      // Clear the burst element out of memory after the animation completes
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== newClick.id));
      }, 600);
    };

    window.addEventListener('click', handleMouseClick);
    return () => window.removeEventListener('click', handleMouseClick);
  }, []);

  // Hide the click plane component entirely on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  const burstColor = isDarkMode ? '#ef4444' : '#dc2626';

  return (
    <svg className="fixed top-0 left-0 w-full h-full pointer-events-none z-9998">
      {clicks.map((click) => (
        <g key={click.id} className="animate-webBlast">
          {/* Main intersecting web threads structural lines */}
          <line x1={click.x} y1={click.y} x2={click.x} y2={click.y - 40} stroke={burstColor} strokeWidth="2" />
          <line x1={click.x} y1={click.y} x2={click.x} y2={click.y + 40} stroke={burstColor} strokeWidth="2" />
          <line x1={click.x} y1={click.y} x2={click.x - 40} y2={click.y} stroke={burstColor} strokeWidth="2" />
          <line x1={click.x} y1={click.y} x2={click.x + 40} y2={click.y} stroke={burstColor} strokeWidth="2" />
          
          {/* Diagonal secondary web threads support rings */}
          <line x1={click.x} y1={click.y} x2={click.x - 28} y2={click.y - 28} stroke={burstColor} strokeWidth="1.2" />
          <line x1={click.x} y1={click.y} x2={click.x + 28} y2={click.y - 28} stroke={burstColor} strokeWidth="1.2" />
          <line x1={click.x} y1={click.y} x2={click.x - 28} y2={click.y + 28} stroke={burstColor} strokeWidth="1.2" />
          <line x1={click.x} y1={click.y} x2={click.x + 28} y2={click.y + 28} stroke={burstColor} strokeWidth="1.2" />

          {/* Dynamic rings that swell outwards from the click center point */}
          <circle cx={click.x} cy={click.y} r="16" stroke={burstColor} strokeWidth="1" fill="none" strokeDasharray="3 2" className="animate-webRingExpandFast" />
          <circle cx={click.x} cy={click.y} r="32" stroke={burstColor} strokeWidth="0.7" fill="none" className="animate-webRingExpandSlow" />
        </g>
      ))}
    </svg>
  );
};