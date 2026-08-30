import React from 'react';
import { CapabilityCard } from './CapabilityCard';
import { capabilities } from '../../data/siteData';

export const CapabilitiesSection = ({ onOpenComingSoon }) => {
  return (
    <section id="capabilities" className="projects section-padding">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-12">
            <h2 className="section-title">
              Core <span>Capabilities</span>
            </h2>
          </div>
        </div>

        <div className="row">
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
      </div>
    </section>
  );
};
