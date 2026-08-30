import React from 'react';
import { WhyUsCard } from './WhyUsCard';
import { whyUsItems } from '../../data/siteData';

export const WhyUsSection = () => {
  return (
    <section id="why-buildscape" className="why-soudha section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="section-title soudha">
              Why <span>Buildscape</span>
            </h2>
          </div>
        </div>

        <div className="why-grid">
          {whyUsItems.map((item) => (
            <WhyUsCard
              key={item.id}
              iconName={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
