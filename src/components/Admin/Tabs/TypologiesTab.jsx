import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { Save, Plus, Trash2, Home, Building2 } from 'lucide-react';

export const TypologiesTab = () => {
  const { cmsData, updateProjectTypologies } = useCms();
  const [sectors, setSectors] = useState(JSON.parse(JSON.stringify(cmsData.projectTypologies)));

  const handleSectorChange = (sectorIdx, field, value) => {
    const updated = [...sectors];
    updated[sectorIdx][field] = value;
    setSectors(updated);
  };

  const handleTypeChange = (sectorIdx, typeIdx, field, value) => {
    const updated = [...sectors];
    updated[sectorIdx].types[typeIdx][field] = value;
    setSectors(updated);
  };

  const handleAddType = (sectorIdx) => {
    const updated = [...sectors];
    updated[sectorIdx].types.push({
      name: "New Typology",
      desc: "Architecturally engineered space customized for client requirements."
    });
    setSectors(updated);
  };

  const handleRemoveType = (sectorIdx, typeIdx) => {
    const updated = [...sectors];
    updated[sectorIdx].types = updated[sectorIdx].types.filter((_, idx) => idx !== typeIdx);
    setSectors(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProjectTypologies(sectors);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-tab-content">
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">Project Typologies & Sectors</h3>
          <p className="tab-subtitle">Manage Residential and Commercial sectors, badges, and typology offerings.</p>
        </div>
        <button type="submit" className="admin-btn-save">
          <Save size={16} /> Save Typologies
        </button>
      </div>

      <div className="admin-sectors-stack">
        {sectors.map((sec, sIdx) => (
          <div key={sec.id} className="admin-card mb-4">
            <div className="admin-card-title d-flex align-items-center gap-2">
              {sec.id === 'residential' ? <Home size={18} className="text-warning" /> : <Building2 size={18} className="text-warning" />}
              <span>{sec.category}</span>
            </div>

            <div className="row">
              <div className="col-md-6 form-group mb-3">
                <label className="admin-label">Sector Name</label>
                <input
                  type="text"
                  className="admin-input"
                  value={sec.category}
                  onChange={(e) => handleSectorChange(sIdx, 'category', e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 form-group mb-3">
                <label className="admin-label">Badge Label</label>
                <input
                  type="text"
                  className="admin-input"
                  value={sec.badge}
                  onChange={(e) => handleSectorChange(sIdx, 'badge', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <label className="admin-label">Sector Tagline</label>
              <input
                type="text"
                className="admin-input"
                value={sec.tagline}
                onChange={(e) => handleSectorChange(sIdx, 'tagline', e.target.value)}
              />
            </div>

            <div className="form-group">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="admin-label m-0">Typologies List</label>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning"
                  onClick={() => handleAddType(sIdx)}
                >
                  <Plus size={12} /> Add Typology
                </button>
              </div>

              <div className="admin-types-grid">
                {sec.types.map((type, tIdx) => (
                  <div key={tIdx} className="admin-type-edit-card p-3 mb-2 bg-light border rounded">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong className="text-dark">#{tIdx + 1} Typology</strong>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveType(sIdx, tIdx)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Typology Name"
                        value={type.name}
                        onChange={(e) => handleTypeChange(sIdx, tIdx, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="admin-textarea"
                        rows={2}
                        placeholder="Description"
                        value={type.desc}
                        onChange={(e) => handleTypeChange(sIdx, tIdx, 'desc', e.target.value)}
                      />
                    </div>
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
