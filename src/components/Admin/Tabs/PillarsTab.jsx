import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { Save, Layers, Plus, Trash2 } from 'lucide-react';

export const PillarsTab = () => {
  const { cmsData, updateServicePillars } = useCms();
  const [pillars, setPillars] = useState([...cmsData.servicePillars]);

  const handlePillarChange = (index, field, value) => {
    const updated = [...pillars];
    updated[index] = { ...updated[index], [field]: value };
    setPillars(updated);
  };

  const handleServiceChange = (pillarIndex, srvIndex, value) => {
    const updated = [...pillars];
    const services = [...updated[pillarIndex].services];
    services[srvIndex] = value;
    updated[pillarIndex].services = services;
    setPillars(updated);
  };

  const handleAddService = (pillarIndex) => {
    const updated = [...pillars];
    updated[pillarIndex].services = [...updated[pillarIndex].services, "New Deliverable Service"];
    setPillars(updated);
  };

  const handleRemoveService = (pillarIndex, srvIndex) => {
    const updated = [...pillars];
    updated[pillarIndex].services = updated[pillarIndex].services.filter((_, idx) => idx !== srvIndex);
    setPillars(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateServicePillars(pillars);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-tab-content">
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Core Service Pillars & Capabilities</h3>
          <p className="tab-subtitle">Manage the 3 integrated solution pillars, summaries, and bulleted scopes.</p>
        </div>
        <button type="submit" className="admin-btn-save">
          <Save size={16} /> Save All Pillars
        </button>
      </div>

      <div className="admin-pillars-stack">
        {pillars.map((pillar, pIdx) => (
          <div key={pillar.id} className="admin-card mb-4">
            <div className="admin-card-title d-flex justify-content-between">
              <span><Layers size={16} className="text-warning" /> Pillar {pillar.pillar}: {pillar.title}</span>
              <span className="badge bg-dark text-warning">Pillar ID: {pillar.id}</span>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-3">
                <label className="admin-label">Pillar Title</label>
                <input
                  type="text"
                  className="admin-input"
                  value={pillar.title}
                  onChange={(e) => handlePillarChange(pIdx, 'title', e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 form-group mb-3">
                <label className="admin-label">Featured Image URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={pillar.image || ''}
                  onChange={(e) => handlePillarChange(pIdx, 'image', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="admin-label">Pillar Summary</label>
              <textarea
                className="admin-textarea"
                rows={2}
                value={pillar.summary}
                onChange={(e) => handlePillarChange(pIdx, 'summary', e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="admin-label m-0">Core Deliverable Services Checklist</label>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => handleAddService(pIdx)}
                >
                  <Plus size={12} /> Add Service
                </button>
              </div>

              <div className="admin-services-edit-grid">
                {pillar.services.map((srv, sIdx) => (
                  <div key={sIdx} className="input-group mb-2">
                    <input
                      type="text"
                      className="admin-input"
                      value={srv}
                      onChange={(e) => handleServiceChange(pIdx, sIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => handleRemoveService(pIdx, sIdx)}
                      title="Remove service"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
