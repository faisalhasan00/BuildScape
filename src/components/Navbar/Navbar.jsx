import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { useCms } from '../../context/CmsContext';
import { Menu, X, Phone, FileDown } from 'lucide-react';

export const Navbar = ({ onOpenComingSoon, onNavigate }) => {
  const { cmsData } = useCms();
  const siteConfig = cmsData.siteConfig || {};
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

      // Auto update active section based on scroll position
      const sections = ['home', 'about', 'gallery', 'capabilities', 'typologies', 'workflow', 'standards', 'why-buildscape', 'blog', 'testimonials', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveNav(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About', target: 'about' },
    { id: 'capabilities', label: 'Services', target: 'capabilities' },
    { id: 'gallery', label: 'Portfolio', target: 'gallery' },
    { id: 'blog', label: 'Blog', target: 'blog' },
    { id: 'contact', label: 'Contact', target: 'contact' }
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileOpen(false);
    setActiveNav(targetId);

    if (onNavigate) {
      onNavigate(targetId);
      return;
    }

    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const primaryPhone = (siteConfig.phoneNumbers && siteConfig.phoneNumbers[1]) || "+91-9966663838";

  return (
    <header className={`custom-navbar-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="navbar-inner-container">
        {/* Brand Logo */}
        <div className="navbar-logo-area">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')}>
            <Logo 
              variant={isScrolled ? 'dark' : 'light'} 
              height={isScrolled ? 48 : 58} 
            />
          </a>
        </div>

        {/* Desktop Navigation Menu (Streamlined Luxury Architecture Links) */}
        <nav className="desktop-nav-menu">
          <ul className="nav-links-list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-link-item">
                <a
                  href={`#${link.target}`}
                  className={`nav-link-anchor ${activeNav === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.target)}
                >
                  {link.label}
                  {activeNav === link.id && <span className="active-indicator-bar" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Buttons: Brochure & Phone */}
        <div className="navbar-actions">
          <button 
            className={`navbar-brochure-btn ${isScrolled ? 'scrolled-btn' : ''}`}
            onClick={() => onOpenComingSoon && onOpenComingSoon('Brochure PDF Download')}
            title="Download Corporate Architectural Brochure"
          >
            <FileDown size={14} />
            <span>Brochure</span>
          </button>

          <a 
            href={`tel:${primaryPhone}`} 
            className={`navbar-phone-btn ${isScrolled ? 'scrolled-phone-btn' : ''}`}
            title={`Call Buildscape: ${primaryPhone}`}
          >
            <Phone size={13} className="phone-icon" />
            <span className="d-none d-lg-inline">{primaryPhone}</span>
          </a>

          {/* Mobile Menu Toggler */}
          <button 
            className="mobile-toggler-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? (
              <X size={24} color={isScrolled ? '#111111' : '#ffffff'} />
            ) : (
              <Menu size={24} color={isScrolled ? '#111111' : '#ffffff'} />
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
                href={`#${link.target}`}
                className={`mobile-nav-anchor ${activeNav === link.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.target)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          <button 
            className="mobile-brochure-action-btn mb-2 w-100"
            onClick={() => {
              setIsMobileOpen(false);
              onOpenComingSoon && onOpenComingSoon('Brochure PDF Download');
            }}
          >
            <FileDown size={16} /> Download Corporate Brochure
          </button>
          
          <a href={`tel:${primaryPhone}`} className="mobile-call-action-btn">
            <Phone size={16} /> Call {primaryPhone}
          </a>
        </div>
      </div>
    </header>
  );
};
