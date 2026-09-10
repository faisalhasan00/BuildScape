import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import * as defaultData from '../../data/siteData';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Building2, 
  Layers, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

export const ProjectEstimatorSection = () => {
  const { cmsData } = useCms();
  const rawConfig = cmsData?.estimatorConfig || defaultData.estimatorConfig;
  
  const typologies = (rawConfig && rawConfig.typologies && rawConfig.typologies.length > 0)
    ? rawConfig.typologies
    : defaultData.estimatorConfig.typologies;
    
  const qualityMultipliers = (rawConfig && rawConfig.qualityMultipliers)
    ? rawConfig.qualityMultipliers
    : defaultData.estimatorConfig.qualityMultipliers;

  const [builtUpArea, setBuiltUpArea] = useState(3500);
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]?.id || 'residential');
  const [selectedQuality, setSelectedQuality] = useState('premium');
  const [includeInterior, setIncludeInterior] = useState(true);

  const curTypology = typologies.find(t => t.id === selectedTypology) || typologies[0] || { baseRateSqFt: 2200, name: 'Residential' };
  const curQuality = qualityMultipliers[selectedQuality] || qualityMultipliers.premium || { mult: 1.35, name: 'Premium Luxury' };

  const baseRate = curTypology.baseRateSqFt || 2200;
  const multiplier = curQuality.mult || 1.35;
  const interiorAddonRate = includeInterior && selectedTypology !== 'interior' ? 650 : 0;

  const totalRatePerSqFt = Math.round((baseRate * multiplier) + interiorAddonRate);
  const estimatedCost = Math.round(builtUpArea * totalRatePerSqFt);
  
  const minCost = Math.round(estimatedCost * 0.95);
  const maxCost = Math.round(estimatedCost * 1.08);

  // Format INR in Lakhs / Crores
  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section id="estimator" className="estimator-section">
      <div className="section-container">
        {/* Header */}
        <div className="section-header text-center">
          <span className="section-badge">
            <Calculator size={14} className="badge-icon" />
            Transparent Budgeting
          </span>
          <h2 className="section-title">
            Interactive Construction & Architecture Cost Estimator
          </h2>
          <p className="section-subtitle">
            Calculate realistic turnkey investment projections tailored to your square footage, typology, and specification grade before breaking ground.
          </p>
        </div>

        <div className="estimator-grid">
          {/* Controls Form */}
          <div className="estimator-card controls-card">
            <h3 className="estimator-card-heading">1. Project Specifications</h3>

            {/* Typology Select */}
            <div className="estimator-group">
              <label className="estimator-label">Select Project Typology</label>
              <div className="typology-btn-grid">
                {typologies.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTypology(t.id)}
                    className={`typology-btn ${selectedTypology === t.id ? 'active' : ''}`}
                  >
                    <Building2 size={16} className="t-icon" />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Built up area Slider & Input */}
            <div className="estimator-group">
              <div className="area-label-row">
                <label className="estimator-label">Approximate Built-up Area</label>
                <div className="area-input-wrap">
                  <input
                    type="number"
                    min="500"
                    max="50000"
                    step="100"
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(Number(e.target.value) || 500)}
                    className="area-num-input"
                  />
                  <span className="area-unit">sq. ft</span>
                </div>
              </div>
              <input
                type="range"
                min="800"
                max="25000"
                step="250"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="area-range-slider"
              />
              <div className="slider-ticks">
                <span>1,000 sq.ft</span>
                <span>5,000 sq.ft</span>
                <span>15,000 sq.ft</span>
                <span>25,000+ sq.ft</span>
              </div>
            </div>

            {/* Specification Grade */}
            <div className="estimator-group">
              <label className="estimator-label">Specification & Finish Tier</label>
              <div className="quality-cards-grid">
                {Object.entries(qualityMultipliers).map(([key, q]) => (
                  <div
                    key={key}
                    onClick={() => setSelectedQuality(key)}
                    className={`quality-tier-card ${selectedQuality === key ? 'active' : ''}`}
                  >
                    <div className="tier-header">
                      <span className="tier-name">{q.name}</span>
                      <span className="tier-check">
                        {selectedQuality === key && <Check size={14} />}
                      </span>
                    </div>
                    <p className="tier-desc">{q.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkbox toggle */}
            {selectedTypology !== 'interior' && (
              <div className="estimator-group checkbox-group">
                <label className="custom-checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeInterior}
                    onChange={(e) => setIncludeInterior(e.target.checked)}
                  />
                  <span className="checkbox-text">
                    <strong>Include Complete Architectural Interior Fitout (+ ₹650 / sq.ft)</strong>
                    <span className="checkbox-subtext">Includes custom false ceilings, modular wardrobes, ambient lighting & designer partitions.</span>
                  </span>
                </label>
              </div>
            )}
          </div>

          {/* Result Output Card */}
          <div className="estimator-card result-card">
            <div className="result-header">
              <span className="result-tag">Estimated Budget Projection</span>
              <div className="result-main-value">
                <span className="cost-range">{formatINR(minCost)} – {formatINR(maxCost)}</span>
              </div>
              <p className="result-unit-rate">
                Estimated composite rate: <strong>₹{totalRatePerSqFt.toLocaleString('en-IN')}</strong> / sq.ft
              </p>
            </div>

            <div className="result-breakdown-list">
              <div className="breakdown-item">
                <span>Built-up Area</span>
                <strong>{builtUpArea.toLocaleString('en-IN')} sq.ft</strong>
              </div>
              <div className="breakdown-item">
                <span>Typology</span>
                <strong>{curTypology.name}</strong>
              </div>
              <div className="breakdown-item">
                <span>Finish Quality</span>
                <strong>{curQuality.name}</strong>
              </div>
              <div className="breakdown-item">
                <span>Architectural BIM & 3D Deliverables</span>
                <strong className="text-gold">Included (Free)</strong>
              </div>
              <div className="breakdown-item">
                <span>Structural Stability Guarantee</span>
                <strong className="text-gold">IS Compliant</strong>
              </div>
            </div>

            <div className="result-guarantee-box">
              <ShieldCheck size={20} className="text-gold" />
              <p>
                <strong>Zero Hidden Cost Assurance:</strong> Buildscape executes turnkey projects under rigorous itemized BOQ (Bill of Quantities) to prevent mid-project price escalations.
              </p>
            </div>

            <a href="#contact" className="estimator-cta-btn">
              <span>Lock In Your Formal Estimate & BOQ</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
