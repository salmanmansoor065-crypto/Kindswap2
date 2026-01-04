
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  direction?: 'row' | 'col';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'dark', 
  direction = 'col',
  showText = true 
}) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-5xl'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };

  const textColors = variant === 'dark' ? 'text-stone-900' : 'text-white';
  const brandColor = '#065f46'; // Deep Emerald
  const heartColor = '#f43f5e'; // Vibrant Rose

  return (
    <div className={`flex ${direction === 'row' ? 'flex-row items-center gap-3' : 'flex-col items-center gap-1'} font-extrabold ${textColors} ${sizes[size]}`}>
      <div className={`relative ${iconSizes[size]} flex items-center justify-center animate-in zoom-in duration-700`}>
        {/* Background Glow */}
        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl scale-150"></div>
        
        {/* The Merged Hearts SVG */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-full h-full drop-shadow-sm" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Heart 1 (Left - Emerald) */}
          <path 
            d="M11 5C9 3 5.5 3 3.5 5C1.5 7 1.5 10.5 3.5 12.5L11 20" 
            stroke={brandColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Heart 2 (Right - Emerald) */}
          <path 
            d="M13 5C15 3 18.5 3 20.5 5C22.5 7 22.5 10.5 20.5 12.5L13 20" 
            stroke={brandColor} 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Merging Core (Heart shape overlay to blend) */}
          <path 
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
            fill={brandColor}
            className="opacity-10"
          />
          {/* Small Center Heart (The Soul of the Swap) */}
          <path 
            d="M12 13l-0.72-0.66C8.7 10.01 7 8.47 7 6.58 7 5.04 8.21 3.83 9.75 3.83c0.87 0 1.7.41 2.25 1.05 0.55-0.64 1.38-1.05 2.25-1.05C15.79 3.83 17 5.04 17 6.58c0 1.89-1.7 3.43-4.28 5.76L12 13z"
            fill={heartColor}
            className="animate-pulse"
          />
        </svg>
      </div>
      
      {showText && (
        <div className={`flex flex-col ${direction === 'row' ? 'items-start' : 'items-center'} -mt-1`}>
          <span className="tracking-tighter">
            Kind<span style={{ color: brandColor }}>Swap</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
