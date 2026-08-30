import React from 'react';
import { DisciplineCard } from './DisciplineCard';
import { disciplines, siteConfig } from '../../data/siteData';

export const AboutSection = ({ onOpenComingSoon }) => {
  return (
    <section id="about" className="about section-padding">
      <div className="container">
        {/* Dual Discipline Micro-Cards */}
        <div className="row bxfs mb-5">
          {disciplines.map((d) => (
            <DisciplineCard
              key={d.id}
              category={d.category}
              title={d.title}
              linkText={d.linkText}
              onOpenComingSoon={onOpenComingSoon}
            />
          ))}
        </div>

        {/* Narrative & Image */}
        <div className="row mb-30">
          <div className="col-lg-6 col-md-12 mb-4">
            <h2 className="section-title soudha">
              Buildscape <span>Architects & Engineer's</span>
            </h2>
            <p>
              Buildscape Architects & Engineer's is a premier architecture, structural engineering, construction, and interior design practice based in <strong>{siteConfig.location}, {siteConfig.state}</strong>, established in {siteConfig.sinceYear}. Our deep involvement in every project and the uncompromised standards we hold for a building's structure and spaces define our work.
            </p>
            <p>
              We work across two core disciplines under one practice. Buildscape Design Build handles architecture, structural engineering, and ground-up construction, while Buildscape Interiors designs and delivers bespoke interiors. Both disciplines share the same leadership, identical quality standards, and total commitment from start to finish for our clients across Shadnagar, Telangana, and beyond.
            </p>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="about-img">
              <img src="/assets/images/about_hero.jpg" className="img-fluid" alt="Buildscape Architecture" />
              <div className="about-img-2 about-buro">Since {siteConfig.sinceYear}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
