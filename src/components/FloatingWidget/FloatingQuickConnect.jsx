import React from 'react';
import { useCms } from '../../context/CmsContext';
import { WhatsAppIcon } from '../Common/WhatsAppIcon';
import { PhoneCall } from 'lucide-react';

export const FloatingQuickConnect = () => {
  const { cmsData } = useCms();
  const siteConfig = cmsData?.siteConfig || {};

  const primaryPhone = (siteConfig.phoneNumbers && siteConfig.phoneNumbers[1]) || (siteConfig.phoneNumbers && siteConfig.phoneNumbers[0]) || "040-45524579";
  const waNumber = siteConfig.whatsappNumber || "9199999999999";

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent("Hello Buildscape Team, I would like to inquire about an architectural/construction project in Telangana.");
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="floating-quick-connect-container">
      <div className="floating-trigger-wrap d-flex align-items-center gap-2">
        {/* Direct Phone Call Round Button */}
        <a
          href={`tel:${primaryPhone}`}
          className="floating-call-bubble"
          title={`Call Buildscape: ${primaryPhone}`}
          aria-label="Direct Phone Call"
        >
          <PhoneCall size={22} />
        </a>

        {/* Direct WhatsApp Round Button */}
        <button
          onClick={handleOpenWhatsApp}
          className="floating-wa-bubble"
          title="Chat on WhatsApp"
          aria-label="Instant WhatsApp Chat"
        >
          <WhatsAppIcon size={25} color="#ffffff" />
        </button>
      </div>
    </div>
  );
};
export default FloatingQuickConnect;
