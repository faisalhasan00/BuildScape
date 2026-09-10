import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Eye, Target, UserCheck } from 'lucide-react';

export const AboutSection = ({ onOpenComingSoon }) => {
  const { cmsData } = useCms();
  const siteConfig = cmsData.siteConfig || {};
  const [activeVmTab, setActiveVmTab] = useState('vision'); // 'vision' | 'mission'

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        {/* Narrative & Leadership */}
        <div className="row mb-4 align-items-center">
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <span className="section-subtitle">FIRM PROFILE & PHILOSOPHY</span>
            <h2 className="section-title soudha">
              About <span>{siteConfig.brandName || 'Buildscape'}</span>
            </h2>
            
            <p className="about-lead-p">
              {siteConfig.aboutSummary}
            </p>

            {/* 4 Stat Proof Badges */}
            <div className="about-stats-grid my-3">
              <div className="stat-card">
                <div className="stat-number">15+</div>
                <div className="stat-title">Years of Industry Excellence</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">900k+</div>
                <div className="stat-title">Sq.Ft Developed & Built</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">150+</div>
                <div className="stat-title">Signature Landmarks Delivered</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-title">IS & NBC Code Compliance</div>
              </div>
            </div>

            <div className="leadership-badge-box">
              <div className="leader-icon">
                <UserCheck size={24} />
              </div>
              <div>
                <div className="leader-role">{siteConfig.founderRole || 'Founder & Principal'}</div>
                <div className="leader-name">{siteConfig.founder || 'Mohammad Khaja Osman'}</div>
                <div className="leader-scope">{siteConfig.disciplinesScope}</div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="about-img">
              <img src="/assets/images/about_hero.jpg" className="img-fluid" alt="Buildscape Architecture & Engineering" />
              <div className="about-img-2 about-buro">Since {siteConfig.sinceYear}</div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Dual Cards */}
        <div className="row mt-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <div className="vision-mission-card vision-card">
              <div className="vm-header">
                <div className="vm-icon">
                  <Eye size={20} />
                </div>
                <div>
                  <span className="vm-badge">OUR VISION</span>
                  <h4 className="vm-title">{siteConfig.visionTitle || 'Shaping Timeless Landscapes'}</h4>
                </div>
              </div>
              <p className="vm-desc">{siteConfig.vision}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="vision-mission-card mission-card">
              <div className="vm-header">
                <div className="vm-icon">
                  <Target size={20} />
                </div>
                <div>
                  <span className="vm-badge">OUR MISSION</span>
                  <h4 className="vm-title">{siteConfig.missionTitle || 'Excellence & Total Integrity'}</h4>
                </div>
              </div>
              <p className="vm-desc">{siteConfig.mission}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
