import React from 'react';

export const Logo = ({ variant = 'light', height = 58 }) => {
  const logoSrc = variant === 'dark' 
    ? '/assets/images/buildscape_logo.svg' 
    : '/assets/images/buildscape_logo_white.svg';

  return (
    <div className="logo-wrapper">
      <a className="logo" href="#home">
        <img 
          src={logoSrc} 
          style={{ height: `${height}px`, width: 'auto', transition: 'height 0.3s ease' }} 
          alt="Buildscape Architects & Engineer's" 
        />
      </a>
    </div>
  );
};
