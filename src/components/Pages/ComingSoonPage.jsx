import React, { useState } from 'react';
import { Logo } from '../Navbar/Logo';
import { siteConfig } from '../../data/siteData';
import { Phone, Mail, MessageSquare, MapPin, HardHat, CheckCircle, Send, ArrowRight } from 'lucide-react';

export const ComingSoonPage = ({ activeTab = 'home', onTabChange, onToggleFullPreview }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'Architecture & Construction' });

  const pageDetails = {
    home: {
      title: "PAGE UNDER CONSTRUCTION",
      subtitle: "BUILDSCAPE ARCHITECTS & ENGINEER'S",
      tagline: "Masters Of Consistency & Quality — Launching Soon in Shadnagar",
      description: "Our main digital showcase is currently under construction. We are preparing a full portfolio of our luxury architecture, structural engineering, and construction projects across Telangana.",
      bgImage: "/assets/images/hero1.jpg"
    },
    about: {
      title: "ABOUT US — UNDER CONSTRUCTION",
      subtitle: "BUILDSCAPE DISCIPLINE & LEADERSHIP",
      tagline: "Established 2009 — Shadnagar & Telangana",
      description: "This page is under construction. We are uploading our corporate history, leadership credentials, and USA-licensed engineering practice details.",
      bgImage: "/assets/images/about_hero.jpg"
    },
    capabilities: {
      title: "CORE CAPABILITIES — UNDER CONSTRUCTION",
      subtitle: "ARCHITECTURE | CONSTRUCTION | INTERIORS | TURNKEY",
      tagline: "Uncompromised Standards from Foundation to Finish",
      description: "Our interactive service galleries, 3D renderings, and modular joinery manufacturing tour pages are currently under construction.",
      bgImage: "/assets/images/capability_architecture.jpg"
    },
    'why-buildscape': {
      title: "WHY BUILDSCAPE — UNDER CONSTRUCTION",
      subtitle: "ONE PRACTICE. FULL SCOPE.",
      tagline: "Interdisciplinary Intelligence & Transparent Billing",
      description: "Our proprietary design framework and project delivery portal are currently under construction. Check back soon!",
      bgImage: "/assets/images/hero3.jpg"
    },
    contact: {
      title: "CONTACT US — UNDER CONSTRUCTION",
      subtitle: "SHADNAGAR CORPORATE OFFICE",
      tagline: "Main Road, Near Flyover, Shadnagar, Telangana — 509216",
      description: "Our online booking system is under construction. For immediate inquiries, please call or WhatsApp our senior engineering team directly.",
      bgImage: "/assets/images/hero2.jpg"
    }
  };

  const currentInfo = pageDetails[activeTab] || pageDetails.home;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="coming-soon-page-wrapper">
      {/* Background Image & Overlay */}
      <div 
        className="coming-soon-bg-item" 
        style={{ backgroundImage: `url(${currentInfo.bgImage})` }} 
      />
      <div className="coming-soon-dark-overlay" />

      {/* Header Navigation */}
      <header className="coming-soon-header">
        <div className="container d-flex align-items-center justify-content-between">
          <Logo variant="light" height={54} />

          <nav className="d-none d-md-block">
            <ul className="coming-soon-nav-list">
              {['home', 'about', 'capabilities', 'why-buildscape', 'contact'].map((tab) => (
                <li key={tab}>
                  <button
                    className={`coming-soon-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => onTabChange(tab)}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            className="toggle-preview-btn" 
            onClick={onToggleFullPreview}
          >
            Preview Site <ArrowRight size={14} className="ms-1" />
          </button>
        </div>
      </header>

      {/* Main Under Construction Hero */}
      <main className="coming-soon-main-content container my-auto">
        <div className="row align-items-center">
          <div className="col-lg-7 text-white mb-5 mb-lg-0">
            <div className="under-construction-badge mb-3">
              <HardHat size={16} className="me-2 text-warning" /> PAGE UNDER CONSTRUCTION — COMING SOON
            </div>

            <h1 className="coming-soon-hero-title mb-2">
              {currentInfo.title}
            </h1>

            <h3 className="coming-soon-subtitle text-warning mb-2">
              {currentInfo.subtitle}
            </h3>

            <p className="coming-soon-tagline text-gold-light mb-4">
              <em>{currentInfo.tagline}</em>
            </p>

            <p className="coming-soon-description mb-4">
              {currentInfo.description}
            </p>

            <div className="contact-pills-row d-flex flex-wrap gap-3">
              <a href={`tel:${siteConfig.phoneNumbers[1]}`} className="contact-pill-item">
                <Phone size={16} /> Call {siteConfig.phoneNumbers[1]}
              </a>
              <a 
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20Buildscape%20Team%20inquiring%20about%20${encodeURIComponent(currentInfo.title)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="contact-pill-item whatsapp"
              >
                <MessageSquare size={16} /> WhatsApp Inquiry
              </a>
              <div className="contact-pill-item location">
                <MapPin size={16} /> Shadnagar, Telangana
              </div>
            </div>
          </div>

          {/* Consultation Form */}
          <div className="col-lg-5">
            <div className="inquiry-card-form">
              <h4 className="form-card-title mb-1">Get In Touch</h4>
              <p className="form-card-desc mb-4">
                Our site in Shadnagar is under construction. Leave your details for instant callback.
              </p>

              {formSubmitted ? (
                <div className="form-success-box text-center py-4">
                  <CheckCircle size={48} className="text-warning mb-3" />
                  <h5 className="text-white">Inquiry Received!</h5>
                  <p className="text-muted">Thank you {formData.name}. Our senior engineer will contact you at {formData.phone} shortly.</p>
                  <button 
                    className="btn btn-outline-warning btn-sm mt-3"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-light small">Your Full Name</label>
                    <input 
                      type="text" 
                      className="form-control custom-input" 
                      placeholder="e.g. Faisal Khan"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light small">Mobile Number</label>
                    <input 
                      type="tel" 
                      className="form-control custom-input" 
                      placeholder="+91 9966663838"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label text-light small">Requirement</label>
                    <select 
                      className="form-select custom-input"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Architecture & Construction">Architecture & Construction</option>
                      <option value="Interior Design">Interior Design & Turnkey</option>
                      <option value="Structural Engineering">Structural Engineering</option>
                      <option value="General Inquiry">General Inquiry - Shadnagar</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-submit-inquiry w-100">
                    <Send size={16} className="me-2" /> Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="coming-soon-footer text-center text-muted py-3">
        &copy; {new Date().getFullYear()} {siteConfig.brandFullName} — Shadnagar, Ranga Reddy, Telangana
      </footer>
    </div>
  );
};
