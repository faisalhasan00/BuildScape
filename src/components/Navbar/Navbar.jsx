import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '../../data/siteData';

export const Navbar = ({ onOpenComingSoon }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', isHome: true },
    { id: 'about', label: 'About Us', pageName: 'About Us' },
    { id: 'capabilities', label: 'Capabilities', pageName: 'Capabilities & Services' },
    { id: 'why-buildscape', label: 'Why Buildscape', pageName: 'Why Buildscape' },
    { id: 'contact', label: 'Contact', pageName: 'Contact & Office Location' },
  ];

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMobileOpen(false);

    if (link.isHome) {
      setActiveNav('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveNav(link.id);
      if (onOpenComingSoon) {
        onOpenComingSoon(`${link.pageName} (Under Construction)`);
      }
    }
  };

  return (
    <header className={`custom-navbar-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="navbar-inner-container">
        {/* Brand Logo */}
        <div className="navbar-logo-area">
          <a href="#home" onClick={(e) => handleNavClick(e, { isHome: true })}>
            <Logo 
              variant={isScrolled ? 'dark' : 'light'} 
              height={isScrolled ? 46 : 56} 
            />
          </a>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="desktop-nav-menu">
          <ul className="nav-links-list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-link-item">
                <a
                  href={`#${link.id}`}
                  className={`nav-link-anchor ${activeNav === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                  {activeNav === link.id && <span className="active-indicator-bar" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button & Phone Contact */}
        <div className="navbar-actions">
          <a 
            href={`tel:${siteConfig.phoneNumbers[1]}`} 
            className={`navbar-phone-btn ${isScrolled ? 'scrolled-phone-btn' : ''}`}
          >
            <Phone size={14} className="phone-icon" />
            <span>{siteConfig.phoneNumbers[1]}</span>
          </a>

          {/* Mobile Menu Toggler */}
          <button 
            className="mobile-toggler-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Mobile Navigation Menu"
          >
            {isMobileOpen ? (
              <X size={26} color={isScrolled ? '#111111' : '#ffffff'} />
            ) : (
              <Menu size={26} color={isScrolled ? '#111111' : '#ffffff'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-nav-drawer ${isMobileOpen ? 'drawer-open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.id} className="mobile-nav-item">
              <a
                href={`#${link.id}`}
                className={`mobile-nav-anchor ${activeNav === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          <a href={`tel:${siteConfig.phoneNumbers[1]}`} className="mobile-call-action-btn">
            <Phone size={16} /> Call {siteConfig.phoneNumbers[1]}
          </a>
        </div>
      </div>
    </header>
  );
};
