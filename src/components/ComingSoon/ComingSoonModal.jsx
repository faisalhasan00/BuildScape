import React from 'react';
import { X, Phone, Mail, MessageSquare, Clock } from 'lucide-react';
import { Logo } from '../Navbar/Logo';
import { siteConfig } from '../../data/siteData';

export const ComingSoonModal = ({ isOpen, onClose, pageTitle = 'Page' }) => {
  if (!isOpen) return null;

  return (
    <div className="coming-soon-backdrop" onClick={onClose}>
      <div className="coming-soon-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        <div className="text-center mb-4">
          <Logo variant="dark" height={50} />
        </div>

        <div className="badge-coming-soon mb-3">
          <Clock size={14} className="me-1" /> UNDER DEVELOPMENT
        </div>

        <h3 className="modal-title mb-2">{pageTitle}</h3>
        <p className="modal-subtitle mb-4">
          We are currently crafting a dedicated showcase for <strong>{pageTitle}</strong> at Buildscape Architects & Engineer's in Shadnagar, Telangana. Stay tuned for the full digital experience!
        </p>

        <div className="contact-quick-box mb-4">
          <h6 className="contact-heading mb-3">Need Immediate Consultation?</h6>
          <div className="d-flex flex-column gap-2">
            <a href={`tel:${siteConfig.phoneNumbers[1]}`} className="modal-action-btn phone">
              <Phone size={16} /> Call {siteConfig.phoneNumbers[1]}
            </a>
            <a 
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20Buildscape%20Team%20inquiring%20about%20${encodeURIComponent(pageTitle)}`} 
              target="_blank" 
              rel="noreferrer" 
              className="modal-action-btn whatsapp"
            >
              <MessageSquare size={16} /> WhatsApp Inquiry
            </a>
            <a href={`mailto:${siteConfig.email}`} className="modal-action-btn email">
              <Mail size={16} /> {siteConfig.email}
            </a>
          </div>
        </div>

        <button className="btn-close-modal" onClick={onClose}>
          Back to Main Site
        </button>
      </div>
    </div>
  );
};
