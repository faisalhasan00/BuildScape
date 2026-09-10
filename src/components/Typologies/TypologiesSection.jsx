import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Home, Building2, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const TypologiesSection = ({ onOpenComingSoon }) => {
  const { cmsData } = useCms();
  const projectTypologies = cmsData.projectTypologies || [];
  const [activeTab, setActiveTab] = useState('residential');
  const [activeTypeIdx, setActiveTypeIdx] = useState(0);

  const currentSector = projectTypologies.find((s) => s.id === activeTab) || projectTypologies[0] || { types: [] };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveTypeIdx(0);
  };

  return (
    <section id="typologies" className="typologies-section section-padding position-relative overflow-hidden">
      {/* Background Architectural Logo Watermark Pattern */}
      <div className="section-bg-watermark" aria-hidden="true"></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        
        {/* Header & Sector Switcher */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-7 col-md-12">
            <span className="section-subtitle">SECTORS SERVED</span>
            <h2 className="section-title">
              Project <span>Typologies</span>
            </h2>
            <p className="section-lead-text mb-0">
              Engineered spaces customized for human lifestyle, commercial footfall, and lasting capital value.
            </p>
          </div>

          <div className="col-lg-5 col-md-12 d-flex align-items-center justify-content-lg-end mt-3 mt-lg-0">
            <div className="typologies-tab-group">
              <button
                className={`sector-tab-btn ${activeTab === 'residential' ? 'active' : ''}`}
                onClick={() => handleTabChange('residential')}
              >
                <Home size={16} />
                <span>Residential ({projectTypologies.find(s => s.id === 'residential')?.types?.length || 3})</span>
              </button>
              <button
                className={`sector-tab-btn ${activeTab === 'commercial' ? 'active' : ''}`}
                onClick={() => handleTabChange('commercial')}
              >
                <Building2 size={16} />
                <span>Commercial ({projectTypologies.find(s => s.id === 'commercial')?.types?.length || 3})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Sector Content */}
        <div className="sector-container">
          <div className="typologies-grid">
            {currentSector.types && currentSector.types.map((item, idx) => (
              <div key={idx} className="typology-card">
                <div className="typology-card-badge">
                  <Check size={14} />
                  <span>{currentSector.badge}</span>
                </div>
                <h4 className="typology-name">{item.name}</h4>
                <p className="typology-desc">{item.desc}</p>
                <button
                  className="typology-explore-btn"
                  onClick={() => onOpenComingSoon && onOpenComingSoon(`${item.name} Portfolio`)}
                >
                  <span>Explore Typology</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
