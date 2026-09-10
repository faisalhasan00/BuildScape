import React from 'react';
import { useCms } from '../../../context/CmsContext';
import { Mail, Phone, MapPin, Calendar, Trash2, CheckCircle2, Clock, CheckCircle } from 'lucide-react';

export const InquiriesTab = () => {
  const { cmsData, updateInquiryStatus, deleteInquiry } = useCms();
  const inquiries = cmsData.inquiries || [];

  return (
    <div className="admin-tab-content">
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Consultation Inquiries & Leads</h3>
          <p className="tab-subtitle">Real-time submissions from prospective clients booking consultations.</p>
        </div>
        <span className="badge bg-warning text-dark px-3 py-2 fs-6">
          Total Leads: {inquiries.length}
        </span>
      </div>

      {inquiries.length === 0 ? (
        <div className="admin-card text-center py-5">
          <Mail size={40} className="text-muted mb-3" />
          <h5>No Inquiries Yet</h5>
          <p className="text-muted">When visitors submit a consultation request on the website, they will appear here.</p>
        </div>
      ) : (
        <div className="admin-inquiries-list">
          {inquiries.map((inq) => (
            <div key={inq.id} className="admin-card mb-3">
              <div className="d-flex flex-wrap justify-content-between align-items-start mb-3">
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <h5 className="m-0 text-dark font-weight-bold">{inq.name}</h5>
                    <span className={`badge ${inq.status === 'New' ? 'bg-danger' : inq.status === 'Contacted' ? 'bg-primary' : 'bg-success'}`}>
                      {inq.status}
                    </span>
                  </div>
                  <div className="text-muted small mt-1">
                    <Calendar size={12} className="me-1" />
                    {new Date(inq.date).toLocaleString()}
                  </div>
                </div>

                {/* Status Switcher & Delete */}
                <div className="d-flex align-items-center gap-2">
                  <select
                    className="admin-input py-1 px-2 text-sm"
                    value={inq.status}
                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                  >
                    <option value="New">Mark New</option>
                    <option value="Contacted">Mark Contacted</option>
                    <option value="Closed">Mark Closed</option>
                  </select>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      if (window.confirm(`Delete inquiry from ${inq.name}?`)) {
                        deleteInquiry(inq.id);
                      }
                    }}
                    title="Delete lead"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="row bg-light p-3 rounded mb-3">
                <div className="col-md-4 mb-2 mb-md-0">
                  <div className="small text-muted">Phone Number</div>
                  <div className="font-weight-bold">
                    <Phone size={13} className="me-1 text-warning" />
                    <a href={`tel:${inq.phone}`} className="text-dark text-decoration-none">{inq.phone}</a>
                  </div>
                </div>
                <div className="col-md-4 mb-2 mb-md-0">
                  <div className="small text-muted">Email Address</div>
                  <div className="font-weight-bold">
                    <Mail size={13} className="me-1 text-warning" />
                    <a href={`mailto:${inq.email}`} className="text-dark text-decoration-none">{inq.email || 'N/A'}</a>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="small text-muted">Project & Budget</div>
                  <div className="font-weight-bold">
                    {inq.projectType} {inq.budget ? `(${inq.budget})` : ''}
                  </div>
                </div>
              </div>

              {inq.message && (
                <div className="inquiry-message-box p-3 border rounded bg-white">
                  <div className="small text-muted mb-1">Client Message:</div>
                  <p className="m-0 text-dark">{inq.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
