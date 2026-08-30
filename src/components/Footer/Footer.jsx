import React from 'react';
import { Logo } from '../Navbar/Logo';
import { siteConfig } from '../../data/siteData';
import { Phone, Smartphone, Mail, Facebook, Instagram, Linkedin, Youtube, MessageSquare } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="main-footer dark">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <Logo variant="light" height={60} />
            <p className="mt-3">
              Architecture. Structural Engineering. Construction. Interior Design. One practice, delivering timeless spaces in {siteConfig.location} & {siteConfig.state}.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="fothead">
              <h6>Contact</h6>
            </div>
            {siteConfig.phoneNumbers.map((phone, idx) => (
              <p key={idx}>
                {idx === 0 ? (
                  <Phone size={16} className="me-2 text-warning" />
                ) : (
                  <Smartphone size={16} className="me-2 text-warning" />
                )}
                {phone}
              </p>
            ))}
            <p>
              <Mail size={16} className="me-2 text-warning" />
              {siteConfig.email}
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4">
            <div className="fothead">
              <h6>Office Location</h6>
            </div>
            <p>{siteConfig.address}</p>
            <div className="footer-socials">
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
              <a href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20Buildscape%20Team`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          <div className="col-lg-3 col-md-12 mb-4">
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
          <div className="row">
            <div className="col-md-12 text-center">
              <p>&copy; {new Date().getFullYear()} {siteConfig.brandFullName} - {siteConfig.location}. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
