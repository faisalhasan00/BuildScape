import React, { useState } from 'react';
import { useCms } from '../../../context/CmsContext';
import { Save, GitCommit } from 'lucide-react';

export const WorkflowTab = () => {
  const { cmsData, updateDeliveryWorkflow } = useCms();
  const [stages, setStages] = useState([...cmsData.deliveryWorkflow]);

  const handleStageChange = (index, field, value) => {
    const updated = [...stages];
    updated[index] = { ...updated[index], [field]: value };
    setStages(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDeliveryWorkflow(stages);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-tab-content">
      <div className="tab-header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="tab-title">6-Stage Delivery Workflow</h3>
          <p className="tab-subtitle">Edit the structured progression framework from brief to warranty handover.</p>
        </div>
        <button type="submit" className="admin-btn-save">
          <Save size={16} /> Save Workflow
        </button>
      </div>

      <div className="admin-workflow-grid">
        {stages.map((stage, idx) => (
          <div key={stage.step} className="admin-card mb-3">
            <div className="admin-card-title d-flex justify-content-between">
              <span><GitCommit size={16} className="text-warning" /> Stage {stage.step}</span>
              <span className="badge bg-dark text-warning">{stage.step}</span>
            </div>

            <div className="form-group mb-2">
              <label className="admin-label">Stage Name (e.g. CONSULT, BUILD)</label>
              <input
                type="text"
                className="admin-input"
                value={stage.title}
                onChange={(e) => handleStageChange(idx, 'title', e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label className="admin-label">Summary Subtitle</label>
              <input
                type="text"
                className="admin-input"
                value={stage.summary}
                onChange={(e) => handleStageChange(idx, 'summary', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="admin-label">Detailed Execution Notes</label>
              <textarea
                className="admin-textarea"
                rows={3}
                value={stage.details}
                onChange={(e) => handleStageChange(idx, 'details', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
