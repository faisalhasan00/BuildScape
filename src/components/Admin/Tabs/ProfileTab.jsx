import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { Save, Building, Phone, Mail, MapPin, Award, Quote } from 'lucide-react';

export const ProfileTab = () => {
  const { cmsData, updateSiteConfig } = useCms();
  const [formData, setFormData] = useState({ ...cmsData.siteConfig });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...(formData.phoneNumbers || [])];
    newPhones[index] = value;
    setFormData((prev) => ({ ...prev, phoneNumbers: newPhones }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSiteConfig(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-tab-content">
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Company Profile & Contact Info</h3>
          <p className="tab-subtitle">Update brand identity, founder details, location, and official statements.</p>
        </div>
        <button type="submit" className="admin-btn-save">
          <Save size={16} /> Save Profile Changes
        </button>
      </div>

      <div className="admin-form-grid">
        {/* Basic Brand Info */}
        <div className="admin-card">
          <div className="admin-card-title"><Building size={16} className="text-warning" /> Brand Identity</div>
          
          <div className="form-group mb-3">
            <label className="admin-label">Brand Short Name</label>
            <input
              type="text"
              name="brandName"
              className="admin-input"
              value={formData.brandName || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Full Registered Legal Name</label>
            <input
              type="text"
              name="brandFullName"
              className="admin-input"
              value={formData.brandFullName || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Primary Tagline</label>
            <input
              type="text"
              name="tagline"
              className="admin-input"
              value={formData.tagline || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Secondary Slogan</label>
            <input
              type="text"
              name="secondaryTagline"
              className="admin-input"
              value={formData.secondaryTagline || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Founder & Leadership */}
        <div className="admin-card">
          <div className="admin-card-title"><Award size={16} className="text-warning" /> Leadership & Scope</div>
          
          <div className="form-group mb-3">
            <label className="admin-label">Founder & Principal Name</label>
            <input
              type="text"
              name="founder"
              className="admin-input"
              value={formData.founder || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Founder Role / Title</label>
            <input
              type="text"
              name="founderRole"
              className="admin-input"
              value={formData.founderRole || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Disciplines Scope</label>
            <input
              type="text"
              name="disciplinesScope"
              className="admin-input"
              value={formData.disciplinesScope || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Practice Established Since (Year)</label>
            <input
              type="text"
              name="sinceYear"
              className="admin-input"
              value={formData.sinceYear || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="admin-card">
          <div className="admin-card-title"><Phone size={16} className="text-warning" /> Contact & Channels</div>
          
          <div className="form-group mb-3">
            <label className="admin-label">Landline Phone</label>
            <input
              type="text"
              className="admin-input"
              value={(formData.phoneNumbers && formData.phoneNumbers[0]) || ''}
              onChange={(e) => handlePhoneChange(0, e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Primary Mobile Phone</label>
            <input
              type="text"
              className="admin-input"
              value={(formData.phoneNumbers && formData.phoneNumbers[1]) || ''}
              onChange={(e) => handlePhoneChange(1, e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Official Email</label>
            <input
              type="email"
              name="email"
              className="admin-input"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">WhatsApp Number (e.g. 919966663838)</label>
            <input
              type="text"
              name="whatsappNumber"
              className="admin-input"
              value={formData.whatsappNumber || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Office Location & Address */}
        <div className="admin-card">
          <div className="admin-card-title"><MapPin size={16} className="text-warning" /> Office Location</div>
          
          <div className="form-group mb-3">
            <label className="admin-label">Location / Town</label>
            <input
              type="text"
              name="location"
              className="admin-input"
              value={formData.location || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">State / Pincode</label>
            <div className="d-flex gap-2">
              <input
                type="text"
                name="state"
                className="admin-input"
                value={formData.state || ''}
                onChange={handleChange}
                placeholder="State"
              />
              <input
                type="text"
                name="pincode"
                className="admin-input"
                value={formData.pincode || ''}
                onChange={handleChange}
                placeholder="Pincode"
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Full Corporate Address</label>
            <textarea
              name="address"
              className="admin-textarea"
              rows={3}
              value={formData.address || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Google Maps Embed URL</label>
            <input
              type="text"
              name="mapsEmbedUrl"
              className="admin-input"
              value={formData.mapsEmbedUrl || ''}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Narrative, Vision, Mission & Quote */}
        <div className="admin-card col-span-2">
          <div className="admin-card-title"><Quote size={16} className="text-warning" /> Philosophy & Statements</div>
          
          <div className="form-group mb-3">
            <label className="admin-label">About Summary</label>
            <textarea
              name="aboutSummary"
              className="admin-textarea"
              rows={3}
              value={formData.aboutSummary || ''}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Vision Statement</label>
              <textarea
                name="vision"
                className="admin-textarea"
                rows={3}
                value={formData.vision || ''}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 form-group mb-3">
              <label className="admin-label">Mission Statement</label>
              <textarea
                name="mission"
                className="admin-textarea"
                rows={3}
                value={formData.mission || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label className="admin-label">Official Founder Quote</label>
            <textarea
              name="officialQuote"
              className="admin-textarea"
              rows={2}
              value={formData.officialQuote || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
