import React from 'react';
import { Logo } from '../Navbar/Logo';
import { useCms } from '../../context/CmsContext';
import { WhatsAppIcon } from '../Common/WhatsAppIcon';
import { Phone, Smartphone, Mail, Facebook, Instagram, Linkedin, Youtube, FileDown, ShieldCheck, Lock } from 'lucide-react';

export const Footer = ({ onOpenComingSoon }) => {
  const { cmsData, openAdminDashboard } = useCms();
  const siteConfig = cmsData.siteConfig || {};

  return (
    <footer id="contact" className="main-footer dark position-relative overflow-hidden">
      {/* Background Architectural Logo Watermark */}
      <div className="section-bg-watermark watermark-footer" aria-hidden="true"></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <Logo variant="light" height={68} />
            <p className="mt-3 footer-tagline-text">
              {siteConfig.tagline}
            </p>
            <div className="footer-founder-tag mt-3">
              <span className="founder-badge">{siteConfig.founderRole || 'Founder'}:</span>
              <strong> {siteConfig.founder}</strong>
            </div>
            <p className="footer-scope mt-2 text-muted">
              {siteConfig.disciplinesScope}
            </p>

            <div className="d-flex flex-column gap-2 mt-3">
              <button 
                className="footer-brochure-download-btn"
                onClick={() => onOpenComingSoon && onOpenComingSoon('Brochure PDF Download')}
              >
                <FileDown size={15} />
                <span>Download Brochure PDF</span>
              </button>

              <button 
                className="footer-admin-btn"
                onClick={openAdminDashboard}
              >
                <Lock size={13} />
                <span>CMS Admin Portal</span>
              </button>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="fothead">
              <h6>Direct Inquiries</h6>
            </div>
            {siteConfig.phoneNumbers && siteConfig.phoneNumbers.map((phone, idx) => (
              <p key={idx} className="footer-contact-line">
                {idx === 0 ? (
                  <Phone size={16} className="me-2 text-warning flex-shrink-0" />
                ) : (
                  <Smartphone size={16} className="me-2 text-warning flex-shrink-0" />
                )}
                <a href={`tel:${phone}`} className="text-white text-decoration-none">{phone}</a>
              </p>
            ))}
            <p className="footer-contact-line">
              <Mail size={16} className="me-2 text-warning flex-shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="text-white text-decoration-none">{siteConfig.email}</a>
            </p>
            <div className="mt-3">
              <a 
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20Buildscape%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20project`}
                target="_blank" 
                rel="noreferrer"
                className="whatsapp-quick-btn d-inline-flex align-items-center gap-2"
              >
                <WhatsAppIcon size={16} color="#25d366" /> 
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="fothead">
              <h6>Office Location</h6>
            </div>
            <p className="footer-address">{siteConfig.address}</p>
            <div className="footer-socials mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="fothead">
              <h6>Shadnagar Map</h6>
            </div>
            <div className="map-box">
              <iframe
                src={siteConfig.mapsEmbedUrl}
                loading="lazy"
                title="Buildscape Corporate Office Location"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sub-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="m-0">&copy; {new Date().getFullYear()} {siteConfig.brandFullName}. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
              <span className="footer-meta-pill">
                <ShieldCheck size={14} className="me-1 text-warning" /> Licensed & Registered Architectural Practice
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
