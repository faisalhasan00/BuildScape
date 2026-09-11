import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { 
  Building2, 
  Phone, 
  User, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck2, 
  Compass, 
  PhoneCall, 
  Calendar,
  ArrowRight
} from 'lucide-react';

export const ConsultationBookingSection = () => {
  const { cmsData, addInquiry } = useCms();
  const siteConfig = cmsData?.siteConfig || {};

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Luxury Villa / Farmhouse',
    location: '',
    plotArea: '',
    timeline: 'Immediate (Within 30 Days)',
    message: '',
    syncWhatsApp: true
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const typologies = [
    'Luxury Villa / Farmhouse',
    'Commercial Complex & Office',
    'Turnkey RCC Civil Construction',
    'High-End Interior Architecture',
    'Structural Audit & Approvals (HMDA/GHMC)'
  ];

  const timelines = [
    'Immediate (Within 30 Days)',
    '1 - 3 Months',
    '3 - 6 Months',
    'Concept & Budget Planning'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number so our team can reach you.');
      return;
    }

    setSubmitting(true);

    const newLead = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'N/A',
      projectType: formData.projectType,
      location: formData.location || 'Telangana / Hyderabad',
      budget: formData.plotArea ? `Area: ${formData.plotArea}` : 'Standard Luxury',
      message: `[Timeline: ${formData.timeline}] [Area: ${formData.plotArea || 'Not specified'}] ${formData.message}`,
      date: new Date().toISOString(),
      status: 'New'
    };

    // Save to CMS State
    addInquiry(newLead);

    // Optional WhatsApp Sync
    if (formData.syncWhatsApp) {
      const waNumber = siteConfig.whatsappNumber || '9199999999999';
      const waText = encodeURIComponent(
        `*New Architectural & Site Consultation Request*\n` +
        `-----------------------------------------\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `🏢 *Project Type:* ${formData.projectType}\n` +
        `📍 *Location:* ${formData.location || 'Hyderabad / Telangana'}\n` +
        `📐 *Plot/Built-up Area:* ${formData.plotArea || 'To be discussed'}\n` +
        `⏳ *Start Timeline:* ${formData.timeline}\n` +
        `📝 *Requirement Note:* ${formData.message || 'Requesting 1-on-1 site feasibility & structural discussion.'}`
      );
      window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
    }

    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      projectType: 'Luxury Villa / Farmhouse',
      location: '',
      plotArea: '',
      timeline: 'Immediate (Within 30 Days)',
      message: '',
      syncWhatsApp: true
    });
    setIsSubmitted(false);
  };

  const primaryPhone = (siteConfig.phoneNumbers && siteConfig.phoneNumbers[1]) || (siteConfig.phoneNumbers && siteConfig.phoneNumbers[0]) || "040-45524579";

  return (
    <section id="consultation" className="consultation-section section-padding position-relative overflow-hidden">
      {/* Subtle Architectural Grid Background & Glow */}
      <div className="consultation-bg-glow" aria-hidden="true"></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-9 col-md-11">
            <span className="section-subtitle">DIRECT BUSINESS & SITE FEASIBILITY INTAKE</span>
            <h2 className="section-title soudha mb-3">
              Book a Free <span>Architectural & Site Consultation</span>
            </h2>
            <p className="section-lead-text mx-auto" style={{ maxWidth: '780px' }}>
              Connect directly with Principal Architect <strong>Mohammad Khaja Osman</strong> & Senior Project Engineer <strong>Syed Wajeed</strong> to discuss plot feasibility, structural schedule, and fixed-rate turnkey execution.
            </p>
          </div>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Left Column: High-Impact Form */}
          <div className="col-lg-7 col-md-12">
            <div className="consultation-form-card h-100">
              {isSubmitted ? (
                <div className="consultation-success-view text-center py-5">
                  <div className="success-icon-wrap mb-4">
                    <CheckCircle2 size={56} className="text-gold" />
                  </div>
                  <h3 className="text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif", fontSize: '26px' }}>
                    Consultation Request Received!
                  </h3>
                  <p className="text-muted mb-4" style={{ fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
                    Thank you, <strong>{formData.name}</strong>. Your project brief has been routed directly to our senior structural and architectural desk. We will connect with you within <strong>2 business hours</strong>.
                  </p>
                  
                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <a
                      href={`tel:${primaryPhone}`}
                      className="btn btn-warning px-4 py-2 text-dark font-bold d-flex align-items-center gap-2"
                      style={{ borderRadius: '8px' }}
                    >
                      <PhoneCall size={16} />
                      <span>Call Office Directly</span>
                    </a>
                    <button
                      onClick={handleReset}
                      className="btn btn-outline-secondary px-4 py-2 text-white"
                      style={{ borderRadius: '8px' }}
                    >
                      Submit Another Inflow
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="consultation-form">
                  <div className="form-header-badge mb-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
                    <span className="badge-form-active">
                      <span className="pulse-dot"></span>
                      Engineering Desk Online • Instant Inquiry Intake
                    </span>
                    <span className="text-muted" style={{ fontSize: '12px' }}>
                      * 100% Confidential
                    </span>
                  </div>

                  <div className="row g-3">
                    {/* Full Name */}
                    <div className="col-md-6 col-12">
                      <label className="form-label-custom">
                        Your Full Name <span className="text-gold">*</span>
                      </label>
                      <div className="input-group-custom">
                        <User size={16} className="input-icon" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dr. Ramesh Varma"
                          className="form-control-custom"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div className="col-md-6 col-12">
                      <label className="form-label-custom">
                        Phone / WhatsApp Number <span className="text-gold">*</span>
                      </label>
                      <div className="input-group-custom">
                        <Phone size={16} className="input-icon" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          className="form-control-custom"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Project Typology */}
                    <div className="col-md-6 col-12">
                      <label className="form-label-custom">
                        Project Typology <span className="text-gold">*</span>
                      </label>
                      <div className="input-group-custom">
                        <Building2 size={16} className="input-icon" />
                        <select
                          className="form-control-custom select-custom"
                          value={formData.projectType}
                          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        >
                          {typologies.map((t, idx) => (
                            <option key={idx} value={t} style={{ background: '#111827', color: '#ffffff' }}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Plot Location */}
                    <div className="col-md-6 col-12">
                      <label className="form-label-custom">
                        Site Location / District <span className="text-gold">*</span>
                      </label>
                      <div className="input-group-custom">
                        <MapPin size={16} className="input-icon" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Shadnagar / Gachibowli / Ranga Reddy"
                          className="form-control-custom"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Plot / Built-Up Area */}
                    <div className="col-md-6 col-12">
                      <label className="form-label-custom">
                        Plot or Built-Up Area (Approx)
                      </label>
                      <div className="input-group-custom">
                        <Compass size={16} className="input-icon" />
                        <input
                          type="text"
                          placeholder="e.g. 400 Sq.Yds / 4,500 Sq.Ft"
                          className="form-control-custom"
                          value={formData.plotArea}
                          onChange={(e) => setFormData({ ...formData, plotArea: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Expected Start Timeline */}
                    <div className="col-md-6 col-12">
                      <label className="form-label-custom">
                        Expected Start Timeline
                      </label>
                      <div className="input-group-custom">
                        <Clock size={16} className="input-icon" />
                        <select
                          className="form-control-custom select-custom"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        >
                          {timelines.map((tl, idx) => (
                            <option key={idx} value={tl} style={{ background: '#111827', color: '#ffffff' }}>
                              {tl}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Requirement Note */}
                    <div className="col-12">
                      <label className="form-label-custom">
                        Specific Requirements / Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your plot orientation, budget range, or specific architectural style preference (e.g. Cantilever Luxury, Vastu compliance, Turnkey EPC)..."
                        className="form-control-custom textarea-custom"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

                    {/* WhatsApp Fast-Sync Option */}
                    <div className="col-12">
                      <div className="form-check d-flex align-items-center gap-2 p-0">
                        <input
                          type="checkbox"
                          id="syncWa"
                          className="form-check-input ms-0 me-2"
                          checked={formData.syncWhatsApp}
                          onChange={(e) => setFormData({ ...formData, syncWhatsApp: e.target.checked })}
                          style={{ cursor: 'pointer' }}
                        />
                        <label htmlFor="syncWa" className="form-check-label text-light" style={{ fontSize: '13px', cursor: 'pointer' }}>
                          <span className="text-gold font-bold">Fast-Track on WhatsApp:</span> Also forward my brief directly to the Principal Architect's phone for priority review.
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-12 mt-4">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-consultation-submit w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                      >
                        {submitting ? (
                          <span>Processing Inquiry...</span>
                        ) : (
                          <>
                            <Send size={16} />
                            <span>Request Site Feasibility Assessment</span>
                            <ArrowRight size={16} className="ms-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Business Authority & Trust Guarantees */}
          <div className="col-lg-5 col-md-12">
            <div className="consultation-guarantee-card h-100 d-flex flex-column justify-content-between p-4 p-md-5">
              <div>
                <span className="badge-guarantee-tag mb-3">
                  <ShieldCheck size={14} className="text-gold me-1" />
                  BUILDCAPE CLIENT PROTECTION CHARTER
                </span>
                
                <h3 className="guarantee-card-title text-white mb-3">
                  Why Serious Property Owners Partner With Buildscape
                </h3>

                <div className="guarantee-points-list d-flex flex-column gap-3 mt-4">
                  <div className="guarantee-point-item d-flex gap-3 align-items-start">
                    <div className="guarantee-icon-box flex-shrink-0">
                      <FileCheck2 size={20} className="text-gold" />
                    </div>
                    <div>
                      <h5 className="point-title text-white mb-1">Fixed-Rate BOQ (Zero Escalation)</h5>
                      <p className="point-desc text-muted mb-0">
                        Detailed itemized bill of quantities locked before civil excavation starts. No hidden surcharges or surprise material escalations.
                      </p>
                    </div>
                  </div>

                  <div className="guarantee-point-item d-flex gap-3 align-items-start">
                    <div className="guarantee-icon-box flex-shrink-0">
                      <ShieldCheck size={20} className="text-gold" />
                    </div>
                    <div>
                      <h5 className="point-title text-white mb-1">10-Year Structural Integrity Warranty</h5>
                      <p className="point-desc text-muted mb-0">
                        RCC columns, beam schedules, and foundation footings backed by strict IS 456 compliance and structured post-handover warranty.
                      </p>
                    </div>
                  </div>

                  <div className="guarantee-point-item d-flex gap-3 align-items-start">
                    <div className="guarantee-icon-box flex-shrink-0">
                      <Compass size={20} className="text-gold" />
                    </div>
                    <div>
                      <h5 className="point-title text-white mb-1">HMDA & GHMC Approval Assistance</h5>
                      <p className="point-desc text-muted mb-0">
                        Fast-tracked building sanction drawings, setback calculations, and layout compliance with town planning authorities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Call Authority Banner */}
              <div className="direct-call-authority-box p-3 mt-4 mt-lg-5">
                <div className="d-flex align-items-center gap-3">
                  <div className="direct-call-avatar">
                    <PhoneCall size={22} className="text-gold" />
                  </div>
                  <div>
                    <div className="text-gold" style={{ fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                      Prefer an Immediate Voice Call?
                    </div>
                    <div className="text-white font-bold" style={{ fontSize: '17px', fontFamily: "'Oswald', sans-serif" }}>
                      {primaryPhone}
                    </div>
                    <div className="text-muted" style={{ fontSize: '12px' }}>
                      Mon - Sat: 9:00 AM – 7:30 PM IST
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
