import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { CapabilityCard } from './CapabilityCard';
import { Check, Compass, Hammer, Paintbrush, ArrowUpRight, Layers, LayoutGrid } from 'lucide-react';

const pillarIcons = {
  "01": Compass,
  "02": Hammer,
  "03": Paintbrush
};

export const CapabilitiesSection = ({ onOpenComingSoon }) => {
  const { cmsData } = useCms();
  const servicePillars = cmsData.servicePillars || [];
  const capabilities = cmsData.capabilities || [];
  const [activeTab, setActiveTab] = useState('pillars'); // 'pillars' | 'showcase'
  const [selectedPillarIdx, setSelectedPillarIdx] = useState(0);

  const activePillar = servicePillars[selectedPillarIdx] || servicePillars[0];
  const ActivePillarIcon = activePillar ? (pillarIcons[activePillar.pillar] || Compass) : Compass;

  return (
    <section id="capabilities" className="capabilities-section section-padding">
      <div className="container">
        
        {/* Section Header with Tab Switcher */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-7 col-md-12">
            <span className="section-subtitle">INTEGRATED SOLUTIONS</span>
            <h2 className="section-title mb-2">
              Capabilities & <span>Services</span>
            </h2>
            <p className="section-lead-text mb-0">
              Comprehensive multidisciplinary solutions spanning concept, structural physics, municipal sanctions, and luxury interior fit-outs.
            </p>
          </div>

          <div className="col-lg-5 col-md-12 d-flex justify-content-lg-end mt-3 mt-lg-0">
            <div className="standards-tab-switcher">
              <button
                className={`standards-tab-btn ${activeTab === 'pillars' ? 'active' : ''}`}
                onClick={() => setActiveTab('pillars')}
              >
                <Layers size={14} />
                <span>3 Core Pillars</span>
              </button>
              <button
                className={`standards-tab-btn ${activeTab === 'showcase' ? 'active' : ''}`}
                onClick={() => setActiveTab('showcase')}
              >
                <LayoutGrid size={14} />
                <span>Visual Gallery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: 3 Core Integrated Pillars from CMS */}
        {activeTab === 'pillars' && (
          <div className="tab-pane-fade">
            {/* Desktop: 3 Grid Cards */}
            <div className="pillars-grid d-none d-lg-grid">
              {servicePillars.map((pillar) => {
                const IconComp = pillarIcons[pillar.pillar] || Compass;
                return (
                  <div key={pillar.id} className="service-pillar-card">
                    <div className="pillar-header">
                      <div className="pillar-num-badge">{pillar.pillar}</div>
                      <div className="pillar-icon">
                        <IconComp size={22} />
                      </div>
                    </div>
                    
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-summary">{pillar.summary}</p>
                    
                    <div className="pillar-services-list">
                      <span className="services-list-title">Core Scope:</span>
                      <ul>
                        {pillar.services.map((srv, idx) => (
                          <li key={idx}>
                            <Check size={14} className="check-bullet" />
                            <span>{srv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pillar-card-footer">
                      <button
                        className="pillar-action-btn"
                        onClick={() => onOpenComingSoon && onOpenComingSoon(`${pillar.title} Consultation`)}
                      >
                        <span>Consult on {pillar.title}</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile / Tablet: Interactive Compact Pillar Switcher */}
            <div className="d-block d-lg-none">
              <div className="pillar-selector-strip mb-3">
                {servicePillars.map((pillar, pIdx) => {
                  const IconComp = pillarIcons[pillar.pillar] || Compass;
                  return (
                    <button
                      key={pillar.id}
                      onClick={() => setSelectedPillarIdx(pIdx)}
                      className={`pillar-select-btn ${selectedPillarIdx === pIdx ? 'active' : ''}`}
                    >
                      <span className="p-num">{pillar.pillar}</span>
                      <span className="p-name">{pillar.title}</span>
                    </button>
                  );
                })}
              </div>

              {activePillar && (
                <div className="service-pillar-card active-mobile-pillar">
                  <div className="pillar-header">
                    <div className="pillar-num-badge">{activePillar.pillar}</div>
                    <div className="pillar-icon">
                      <ActivePillarIcon size={22} />
                    </div>
                  </div>
                  
                  <h3 className="pillar-title">{activePillar.title}</h3>
                  <p className="pillar-summary">{activePillar.summary}</p>
                  
                  <div className="pillar-services-list">
                    <span className="services-list-title">Core Scope:</span>
                    <ul>
                      {activePillar.services.map((srv, idx) => (
                        <li key={idx}>
                          <Check size={14} className="check-bullet" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pillar-card-footer">
                    <button
                      className="pillar-action-btn"
                      onClick={() => onOpenComingSoon && onOpenComingSoon(`${activePillar.title} Consultation`)}
                    >
                      <span>Consult on {activePillar.title}</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Visual Showcase Gallery */}
        {activeTab === 'showcase' && (
          <div className="tab-pane-fade">
            <div className="capabilities-grid">
              {capabilities.map((item) => (
                <CapabilityCard
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  description={item.description}
                  onOpenComingSoon={onOpenComingSoon}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
