import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { 
  TrendingUp, 
  Mail, 
  Star, 
  Image as ImageIcon, 
  Users, 
  Layers, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Download,
  Building,
  Award
} from 'lucide-react';

export const OverviewTab = ({ setActiveTab }) => {
  const { cmsData, currentAdmin, exportBackupJson } = useCms();
  const inquiries = cmsData.inquiries || [];
  const testimonials = cmsData.testimonials || [];
  const heroSlides = cmsData.heroSlides || [];
  const admins = cmsData.admins || [];
  const siteConfig = cmsData.siteConfig || {};

  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="admin-tab-content">
      {/* Welcome Banner */}
      <div className="admin-overview-welcome-banner mb-4">
        <div className="row align-items-center">
          <div className="col-lg-8 mb-3 mb-lg-0">
            <span className="admin-welcome-pill">EXECUTIVE CONSOLE</span>
            <h2 className="admin-welcome-title">
              Welcome back, <span>{(currentAdmin && currentAdmin.name) || 'Mohammad Khaja Osman'}</span>
            </h2>
            <p className="admin-welcome-desc">
              Managing <strong>{siteConfig.brandFullName || 'Buildscape Architects & Engineers'}</strong> in {siteConfig.location || 'Shadnagar'}, Telangana. All changes sync in real-time.
            </p>
          </div>

          <div className="col-lg-4 d-flex flex-wrap justify-content-lg-end gap-2">
            <button className="admin-btn-quick" onClick={() => setActiveTab('hero')}>
              <Plus size={14} /> Add Slide
            </button>
            <button className="admin-btn-quick" onClick={() => setActiveTab('testimonials')}>
              <Plus size={14} /> Add Review
            </button>
            <button className="admin-btn-quick-outline" onClick={exportBackupJson}>
              <Download size={14} /> Backup JSON
            </button>
          </div>
        </div>
      </div>

      {/* 4 Hero KPI Metric Cards */}
      <div className="admin-kpi-grid mb-4">
        {/* KPI 1: Inquiries */}
        <div className="admin-kpi-card" onClick={() => setActiveTab('inquiries')}>
          <div className="kpi-card-header">
            <span className="kpi-label">Consultation Leads</span>
            <div className="kpi-icon-box mail">
              <Mail size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{inquiries.length}</h3>
            {newInquiriesCount > 0 && (
              <span className="kpi-badge-alert">{newInquiriesCount} New</span>
            )}
          </div>
          <p className="kpi-footer-text">
            <span>Click to manage inbox</span>
            <ArrowRight size={13} />
          </p>
        </div>

        {/* KPI 2: Hero Slides */}
        <div className="admin-kpi-card" onClick={() => setActiveTab('hero')}>
          <div className="kpi-card-header">
            <span className="kpi-label">Hero Carousel Slides</span>
            <div className="kpi-icon-box image">
              <ImageIcon size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{heroSlides.length}</h3>
            <span className="kpi-badge-success">Active Live</span>
          </div>
          <p className="kpi-footer-text">
            <span>Customize visual headers</span>
            <ArrowRight size={13} />
          </p>
        </div>

        {/* KPI 3: Testimonials */}
        <div className="admin-kpi-card" onClick={() => setActiveTab('testimonials')}>
          <div className="kpi-card-header">
            <span className="kpi-label">Verified Client Reviews</span>
            <div className="kpi-icon-box star">
              <Star size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{testimonials.length}</h3>
            <span className="kpi-badge-gold">★ 4.9 / 5.0</span>
          </div>
          <p className="kpi-footer-text">
            <span>Manage endorsements</span>
            <ArrowRight size={13} />
          </p>
        </div>

        {/* KPI 4: Team Admins */}
        <div className="admin-kpi-card" onClick={() => setActiveTab('admins')}>
          <div className="kpi-card-header">
            <span className="kpi-label">Admin & Sub-Admins</span>
            <div className="kpi-icon-box user">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h3 className="kpi-value">{admins.length}</h3>
            <span className="kpi-badge-info">Active Staff</span>
          </div>
          <p className="kpi-footer-text">
            <span>Manage team access</span>
            <ArrowRight size={13} />
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Recent Inquiries List */}
        <div className="col-lg-8">
          <div className="admin-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="admin-card-title m-0">
                <Clock size={16} className="text-warning" /> Recent Consultation Inquiries
              </div>
              <button className="btn btn-sm btn-link text-warning text-decoration-none p-0" onClick={() => setActiveTab('inquiries')}>
                View All Leads ({inquiries.length}) &rarr;
              </button>
            </div>

            {inquiries.length === 0 ? (
              <p className="text-muted small py-4 text-center">No inquiries received yet.</p>
            ) : (
              <div className="admin-overview-table-wrap">
                <table className="admin-overview-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Project Scope</th>
                      <th>Phone</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.slice(0, 4).map((inq) => (
                      <tr key={inq.id}>
                        <td>
                          <strong>{inq.name}</strong>
                          <div className="text-muted extra-small">{inq.location || 'Shadnagar'}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">{inq.projectType}</span>
                        </td>
                        <td>
                          <a href={`tel:${inq.phone}`} className="text-dark text-decoration-none small">
                            {inq.phone}
                          </a>
                        </td>
                        <td>
                          <span className={`badge ${inq.status === 'New' ? 'bg-danger' : inq.status === 'Contacted' ? 'bg-primary' : 'bg-success'}`}>
                            {inq.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Practice Quick Overview */}
        <div className="col-lg-4">
          <div className="admin-card h-100">
            <div className="admin-card-title mb-3">
              <Building size={16} className="text-warning" /> Practice Information
            </div>

            <div className="practice-mini-profile mb-3">
              <div className="small text-muted">Practice Legal Name</div>
              <strong className="text-dark">{siteConfig.brandFullName}</strong>
            </div>

            <div className="practice-mini-profile mb-3">
              <div className="small text-muted">Founder & Principal</div>
              <strong className="text-dark">{siteConfig.founder}</strong>
              <div className="text-warning extra-small">{siteConfig.founderRole}</div>
            </div>

            <div className="practice-mini-profile mb-3">
              <div className="small text-muted">Corporate Office</div>
              <div className="small text-dark">{siteConfig.address}</div>
            </div>

            <div className="practice-mini-profile border-top pt-3">
              <div className="d-flex align-items-center gap-2 text-success small font-weight-bold">
                <ShieldCheck size={16} />
                <span>Live Website Synced & Published</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
