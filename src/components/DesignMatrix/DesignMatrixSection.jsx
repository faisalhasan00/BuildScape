import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { 
  Sun, 
  Maximize, 
  ShieldCheck, 
  Compass, 
  Wind, 
  Sparkles, 
  Layers, 
  Globe, 
  FileCheck, 
  CheckCircle,
  Award,
  BookOpen
} from 'lucide-react';

const iconMap = {
  Sun,
  Maximize,
  ShieldCheck,
  Compass,
  Wind,
  Sparkles,
  Layers,
  Globe
};

export const DesignMatrixSection = ({ onOpenComingSoon }) => {
  const { cmsData } = useCms();
  const designMatrix = cmsData.designMatrix || { formula: [], considerations: [] };
  const operationalStandards = cmsData.operationalStandards || [];
  const technicalDeliverables = cmsData.technicalDeliverables || [];
  const [activeTab, setActiveTab] = useState('philosophy'); // 'philosophy' | 'standards' | 'deliverables'

  return (
    <section id="standards" className="design-matrix-section section-padding">
      <div className="container">
        
        {/* Section Header with Interactive Tab Switcher */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-7 col-md-12">
            <span className="section-subtitle">STANDARDS & ENGINEERING RIGOR</span>
            <h2 className="section-title mb-2">
              The Buildscape <span>Standards</span>
            </h2>
            <p className="section-lead-text mb-0">
              Architecture rooted in quantitative engineering benchmarks, microclimate intelligence, and standardized deliverables.
            </p>
          </div>

          <div className="col-lg-5 col-md-12 d-flex justify-content-lg-end mt-3 mt-lg-0">
            <div className="standards-tab-switcher">
              <button
                className={`standards-tab-btn ${activeTab === 'philosophy' ? 'active' : ''}`}
                onClick={() => setActiveTab('philosophy')}
              >
                <Sparkles size={14} />
                <span>Philosophy</span>
              </button>
              <button
                className={`standards-tab-btn ${activeTab === 'standards' ? 'active' : ''}`}
                onClick={() => setActiveTab('standards')}
              >
                <Award size={14} />
                <span>Standards</span>
              </button>
              <button
                className={`standards-tab-btn ${activeTab === 'deliverables' ? 'active' : ''}`}
                onClick={() => setActiveTab('deliverables')}
              >
                <FileCheck size={14} />
                <span>Deliverables</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Design Matrix Formula & Considerations */}
        {activeTab === 'philosophy' && (
          <div className="tab-pane-fade">
            {/* The 4-Pillar Formula Banner */}
            <div className="matrix-formula-banner mb-4">
              <div className="matrix-formula-header">THE BUILDCAPE DESIGN MATRIX</div>
              <div className="matrix-formula-items">
                {designMatrix.formula && designMatrix.formula.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="formula-pillar">
                      <span className="formula-text">{item}</span>
                    </div>
                    {idx < designMatrix.formula.length - 1 && (
                      <div className="formula-plus">+</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 8 Embedded Design Considerations */}
            <div className="considerations-grid">
              {designMatrix.considerations && designMatrix.considerations.map((c, idx) => {
                const IconComp = iconMap[c.icon] || Sparkles;
                return (
                  <div key={idx} className="consideration-card">
                    <div className="consideration-icon">
                      <IconComp size={18} />
                    </div>
                    <span className="consideration-text">{c.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: 5 Operational Standards */}
        {activeTab === 'standards' && (
          <div className="tab-pane-fade">
            <div className="standards-grid">
              {operationalStandards.map((std) => (
                <div key={std.number} className="standard-card">
                  <div className="standard-number">{std.number}</div>
                  <h5 className="standard-title">{std.title}</h5>
                  <p className="standard-desc">{std.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 12 Technical Documentation Deliverables */}
        {activeTab === 'deliverables' && (
          <div className="tab-pane-fade">
            <div className="deliverables-box">
              <div className="deliverables-header">
                <div className="d-flex align-items-center gap-2">
                  <FileCheck className="text-accent" size={22} />
                  <h4 className="m-0 deliverables-title">Technical Documentation Package</h4>
                </div>
                <span className="deliverables-sub">Every Buildscape assignment includes a standardized, fully coordinated construction documentation package:</span>
              </div>

              <div className="deliverables-grid">
                {technicalDeliverables.map((item) => (
                  <div key={item.id} className="deliverable-item">
                    <CheckCircle size={15} className="deliverable-check-icon" />
                    <span className="deliverable-name">{item.name}</span>
                    <span className="deliverable-tag">{item.category}</span>
                  </div>
                ))}
              </div>

              <div className="deliverables-footer">
                <button 
                  className="brochure-download-cta"
                  onClick={() => onOpenComingSoon && onOpenComingSoon('Technical Blueprints Sample')}
                >
                  <span>Request Sample Construction Drawings</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
