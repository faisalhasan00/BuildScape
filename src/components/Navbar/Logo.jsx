import React, { useState } from 'react';

export const Logo = ({ variant = 'light', height = 54, showText = true }) => {
  const [imgError, setImgError] = useState(false);

  const logoSrc = '/assets/images/buildscape_official_logo.png';
  const isDarkNavbar = variant === 'light'; // Light variant means on dark background

  return (
    <div className="logo-wrapper">
      <div 
        className={`logo-container brand-logo-${variant}`} 
        style={{ 
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none'
        }}
      >
        {/* Official Emblem Badge */}
        {!imgError && (
          <div 
            className="brand-logo-emblem-wrap"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isDarkNavbar ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
              padding: isDarkNavbar ? '3px 5px' : '0',
              borderRadius: '8px',
              boxShadow: isDarkNavbar ? '0 4px 15px rgba(0,0,0,0.35)' : 'none',
              transition: 'all 0.3s ease',
              flexShrink: 0
            }}
          >
            <img 
              src={logoSrc} 
              style={{ 
                height: `${height}px`, 
                width: 'auto', 
                objectFit: 'contain',
                display: 'block',
                transition: 'all 0.3s ease'
              }} 
              alt="Buildscape Architects & Engineers" 
              onError={() => setImgError(true)}
            />
          </div>
        )}

        {/* High-Definition Crisp Typography Lockup */}
        {showText && (
          <div 
            className="brand-text-lockup" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              lineHeight: 1.05 
            }}
          >
            <span 
              className="brand-primary-name"
              style={{ 
                fontFamily: "'Oswald', sans-serif", 
                fontSize: height >= 70 ? '26px' : '22px', 
                fontWeight: 700, 
                letterSpacing: '2.5px', 
                color: isDarkNavbar ? '#ffffff' : '#111111',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease'
              }}
            >
              BUILD<span style={{ color: '#d4af37' }}>SCAPE</span>
            </span>
            <span 
              className="brand-secondary-name"
              style={{ 
                fontFamily: "'Oswald', sans-serif", 
                fontSize: height >= 70 ? '11px' : '9.5px', 
                fontWeight: 600, 
                letterSpacing: '2px', 
                color: '#d4af37',
                textTransform: 'uppercase',
                marginTop: '2px'
              }}
            >
              ARCHITECTS & ENGINEER'S
            </span>
          </div>
        )}
      </div>
    </div>
  );
};


