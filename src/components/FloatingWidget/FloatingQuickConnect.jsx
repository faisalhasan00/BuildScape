import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { WhatsAppIcon } from '../Common/WhatsAppIcon';
import { 
  Phone, 
  X, 
  Calendar, 
  ChevronUp, 
  ChevronDown, 
  PhoneCall
} from 'lucide-react';

export const FloatingQuickConnect = () => {
  const { cmsData } = useCms();
  const siteConfig = cmsData?.siteConfig || {};
  const [isOpen, setIsOpen] = useState(false);

  const primaryPhone = (siteConfig.phoneNumbers && siteConfig.phoneNumbers[1]) || (siteConfig.phoneNumbers && siteConfig.phoneNumbers[0]) || "040-45524579";
  const waNumber = siteConfig.whatsappNumber || "9199999999999";

  const handleOpenWhatsApp = (customMsg) => {
    const text = encodeURIComponent(customMsg || "Hello Buildscape Team, I would like to inquire about an architectural/construction project in Telangana.");
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  const handleScrollToConsult = () => {
    const el = document.getElementById('consultation') || document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div className="floating-quick-connect-container">
      {/* Expanded Quick Action Card */}
      {isOpen && (
        <div className="floating-action-card p-3 mb-2 animate-fade-in-up">
          <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom border-secondary">
            <div className="d-flex align-items-center gap-2">
              <span className="live-status-dot"></span>
              <span className="text-gold font-bold" style={{ fontSize: '12px', letterSpacing: '0.5px' }}>
                DIRECT ARCHITECT CONNECT
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="btn-close-floating text-muted"
              title="Close Quick Menu"
            >
              <X size={15} />
            </button>
          </div>

          <p className="text-light mb-3" style={{ fontSize: '13px', lineHeight: '1.4' }}>
            Speak directly with Principal Architect <strong>Osman</strong> or Senior Engineer <strong>Wajeed</strong>.
          </p>

          <div className="d-flex flex-column gap-2">
            {/* 1-Tap WhatsApp */}
            <button
              onClick={() => handleOpenWhatsApp("Hello Buildscape, I want to discuss a new Luxury Villa / Construction Project.")}
              className="floating-btn-wa d-flex align-items-center justify-content-between px-3 py-2"
            >
              <div className="d-flex align-items-center gap-2">
                <WhatsAppIcon size={18} color="#25d366" />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Chat on WhatsApp</span>
              </div>
              <span className="badge bg-success" style={{ fontSize: '10px' }}>Fast Reply</span>
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${primaryPhone}`}
              className="floating-btn-call d-flex align-items-center justify-content-between px-3 py-2 text-decoration-none"
            >
              <div className="d-flex align-items-center gap-2">
                <Phone size={15} />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Direct Voice Call</span>
              </div>
              <span style={{ fontSize: '11px', color: '#cbd5e1' }}>{primaryPhone}</span>
            </a>

            {/* Book Consultation */}
            <button
              onClick={handleScrollToConsult}
              className="floating-btn-book d-flex align-items-center justify-content-center gap-2 px-3 py-2 mt-1"
            >
              <Calendar size={14} />
              <span style={{ fontSize: '12.5px', fontWeight: 700 }}>Book Site Feasibility Review</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Pill */}
      <div className="floating-trigger-wrap d-flex align-items-center gap-2">
        {/* Direct WhatsApp Quick Icon */}
        <button
          onClick={() => handleOpenWhatsApp()}
          className="floating-wa-bubble"
          title="Instant WhatsApp Chat"
          aria-label="Instant WhatsApp Chat"
        >
          <WhatsAppIcon size={25} color="#ffffff" />
        </button>

        {/* Expandable Action Badge */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`floating-master-pill ${isOpen ? 'active' : ''}`}
          title="Direct Consultation & Contact"
        >
          <span className="live-status-dot pulse"></span>
          <span className="floating-pill-text">Consult Architect</span>
          {isOpen ? <ChevronDown size={14} className="ms-1" /> : <ChevronUp size={14} className="ms-1" />}
        </button>
      </div>
    </div>
  );
};
