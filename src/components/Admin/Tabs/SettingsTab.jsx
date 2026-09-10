import React, { useRef } from 'react';
import { useCms } from '../../../context/CmsContext';
import { Download, Upload, RotateCcw, ShieldCheck, AlertTriangle } from 'lucide-react';

export const SettingsTab = () => {
  const { exportBackupJson, importBackupJson, resetToFactoryDefaults, logoutAdmin } = useCms();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const res = importBackupJson(content);
        if (!res.success) {
          alert('Import failed: ' + res.error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="admin-tab-content">
      <div className="tab-header mb-4">
        <h3 className="tab-title">CMS Settings & Data Backups</h3>
        <p className="tab-subtitle">Export your site configuration, restore from backup, or reset to brochure defaults.</p>
      </div>

      <div className="row g-4">
        {/* Export Backup Card */}
        <div className="col-md-6">
          <div className="admin-card h-100">
            <div className="admin-card-title"><Download size={18} className="text-warning" /> Export Backup JSON</div>
            <p className="text-muted small mb-4">
              Download a complete snapshot of your website content including company profile, hero slides, service pillars, typologies, and testimonials.
            </p>
            <button className="admin-btn-save w-100" onClick={exportBackupJson}>
              <Download size={16} /> Download Backup JSON
            </button>
          </div>
        </div>

        {/* Import Restore Card */}
        <div className="col-md-6">
          <div className="admin-card h-100">
            <div className="admin-card-title"><Upload size={18} className="text-warning" /> Restore from JSON Backup</div>
            <p className="text-muted small mb-4">
              Upload a previously downloaded JSON backup file to instantly restore all website content and configuration.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".json"
              onChange={handleFileChange}
            />
            <button
              className="admin-btn-save w-100"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <Upload size={16} /> Choose & Restore Backup File
            </button>
          </div>
        </div>

        {/* Factory Reset Card */}
        <div className="col-md-12">
          <div className="admin-card border-danger">
            <div className="admin-card-title text-danger">
              <AlertTriangle size={18} /> Reset to Official Brochure Defaults
            </div>
            <p className="text-muted small mb-3">
              Reset all live content back to the verified 4-page corporate brochure data. This will overwrite any custom edits made in the CMS.
            </p>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Are you sure you want to reset all site content back to the original brochure defaults?')) {
                  resetToFactoryDefaults();
                }
              }}
            >
              <RotateCcw size={16} className="me-1" /> Reset All Data to Brochure Defaults
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
