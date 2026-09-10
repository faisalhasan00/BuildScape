import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import * as defaultData from '../../data/siteData';
import { 
  FileText, 
  Layers, 
  Compass, 
  Maximize2, 
  X, 
  CheckCircle, 
  ArrowRight,
  ShieldAlert,
  Cpu
} from 'lucide-react';

export const BlueprintShowcase = () => {
  const { cmsData } = useCms();
  const blueprints = (cmsData?.technicalBlueprints && cmsData.technicalBlueprints.length > 0)
    ? cmsData.technicalBlueprints
    : defaultData.technicalBlueprints;

  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomModal, setZoomModal] = useState(null);

  const activeBlueprint = blueprints[activeIdx] || blueprints[0] || {
    id: "bp-1",
    title: "Ground Floor Architectural Plan",
    subtitle: "Vastu Compliant Floor Layout",
    image: "/assets/images/First.png",
    description: "Detailed dimensioned architectural space planning with column alignments."
  };

  if (!activeBlueprint) return null;

  return (
    <section id="blueprints" className="blueprint-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-badge">
            <Compass size={14} className="badge-icon" />
            Architectural Precision
          </span>
          <h2 className="section-title">
            Technical Blueprints & Structural Working Drawings
          </h2>
          <p className="section-subtitle">
            Every Buildscape structure is engineered on millimeter-precise structural drawings, MEP schematics, and vastu-aligned space plans.
          </p>
        </div>

        {/* Blueprint Viewer Grid */}
        <div className="blueprint-viewer-wrapper">
          {/* Navigation Sidebar */}
          <div className="blueprint-nav-list">
            {blueprints.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`blueprint-nav-item ${activeIdx === idx ? 'active' : ''}`}
              >
                <div className="bp-nav-icon">
                  <FileText size={18} />
                </div>
                <div className="bp-nav-text">
                  <span className="bp-nav-title">{item.title}</span>
                  <span className="bp-nav-subtitle">{item.subtitle}</span>
                </div>
              </button>
            ))}

            <div className="bp-compliance-note">
              <div className="bp-compliance-header">
                <Cpu size={16} className="text-gold" />
                <span>BIM Level-2 & NBC 2016</span>
              </div>
              <p className="bp-compliance-desc">
                All drawings generated via AutoCad Architecture & Revit BIM with full structural peer-review.
              </p>
            </div>
          </div>

          {/* Main Blueprint Canvas */}
          <div className="blueprint-canvas-card">
            <div className="bp-canvas-topbar">
              <div className="bp-canvas-title-group">
                <span className="bp-sheet-code">DWG-REF: #{activeBlueprint.id.toUpperCase()}</span>
                <h3 className="bp-canvas-title">{activeBlueprint.title}</h3>
              </div>
              <button 
                className="bp-zoom-btn"
                onClick={() => setZoomModal(activeBlueprint)}
                title="Inspect High-Res Blueprint"
              >
                <Maximize2 size={16} />
                <span>Inspect Drawing</span>
              </button>
            </div>

            <div className="bp-canvas-image-wrap" onClick={() => setZoomModal(activeBlueprint)}>
              <img 
                src={activeBlueprint.image} 
                alt={activeBlueprint.title} 
                className="bp-canvas-img" 
                loading="lazy"
              />
              <div className="bp-canvas-overlay-hint">
                <Maximize2 size={24} />
                <span>Click to expand high-res drawing</span>
              </div>
            </div>

            <div className="bp-canvas-footer">
              <p className="bp-canvas-desc">{activeBlueprint.description}</p>
              
              <div className="bp-tags-cloud">
                {activeBlueprint.tags?.map((tag, tIdx) => (
                  <span key={tIdx} className="bp-tag-pill">
                    <CheckCircle size={12} className="text-gold" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blueprint Lightbox */}
      {zoomModal && (
        <div className="gallery-modal-backdrop" onClick={() => setZoomModal(null)}>
          <div className="blueprint-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="bp-lightbox-header">
              <div>
                <h3 className="bp-lightbox-title">{zoomModal.title}</h3>
                <span className="bp-lightbox-sub">{zoomModal.subtitle}</span>
              </div>
              <button 
                className="gallery-modal-close" 
                onClick={() => setZoomModal(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="bp-lightbox-img-wrap">
              <img 
                src={zoomModal.image} 
                alt={zoomModal.title} 
                className="bp-lightbox-img" 
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
