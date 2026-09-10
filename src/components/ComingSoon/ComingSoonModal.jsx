import React, { useState } from 'react';
import { X, Phone, Mail, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Logo } from '../Navbar/Logo';
import { useCms } from '../../context/CmsContext';

export const ComingSoonModal = ({ isOpen, onClose, pageTitle = 'Consultation' }) => {
  const { cmsData, addInquiry } = useCms();
  const siteConfig = cmsData.siteConfig || {};
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: pageTitle,
    budget: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    addInquiry({
      ...formData,
      projectType: formData.projectType || pageTitle
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  const primaryPhone = (siteConfig.phoneNumbers && siteConfig.phoneNumbers[1]) || "040-45524579";

  return (
    <div className="coming-soon-backdrop" onClick={onClose}>
      <div className="coming-soon-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={22} />
        </button>

        <div className="text-center mb-3">
          <Logo variant="dark" height={44} />
        </div>

        {submitted ? (
          <div className="text-center py-4">
            <CheckCircle2 size={54} className="text-success mb-3" />
            <h3 className="modal-title mb-2">Inquiry Received!</h3>
            <p className="modal-subtitle">
              Thank you, <strong>{formData.name}</strong>. Founder Mohammad Khaja Osman and our senior architectural team will reach out to you within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="badge-coming-soon mb-2">
              <Clock size={14} className="me-1" /> PRIORITY CONSULTATION
            </div>

            <h3 className="modal-title mb-1">{pageTitle}</h3>
            <p className="modal-subtitle mb-3">
              Request an in-person or on-site consultation with Buildscape Architects & Engineers in Shadnagar, Telangana.
            </p>

            <form onSubmit={handleSubmit} className="mb-4">
              <div className="row g-2 mb-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Your Full Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    className="admin-input"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="row g-2 mb-2">
                <div className="col-md-6">
                  <input
                    type="email"
                    className="admin-input"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Estimated Budget (e.g. ₹1 Cr)"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <textarea
                  className="admin-textarea"
                  rows={2}
                  placeholder="Tell us about your plot size, location, or requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-close-modal w-100 d-flex align-items-center justify-content-center gap-2">
                <Send size={15} /> Submit Consultation Request
              </button>
            </form>

            <div className="contact-quick-box">
              <div className="d-flex justify-content-between align-items-center">
                <a href={`tel:${primaryPhone}`} className="text-dark small font-weight-bold text-decoration-none">
                  <Phone size={13} className="text-warning me-1" /> {primaryPhone}
                </a>
                <a 
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=Hello%20Buildscape%20Team%20inquiring%20about%20${encodeURIComponent(pageTitle)}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-success small font-weight-bold text-decoration-none"
                >
                  <MessageSquare size={13} className="me-1" /> WhatsApp Chat
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
