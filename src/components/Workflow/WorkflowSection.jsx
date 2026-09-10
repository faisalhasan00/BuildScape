import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export const WorkflowSection = ({ onOpenComingSoon }) => {
  const { cmsData } = useCms();
  const deliveryWorkflow = cmsData.deliveryWorkflow || [];
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const activeStage = deliveryWorkflow[activeStepIdx] || deliveryWorkflow[0] || {};

  const handleNext = () => {
    setActiveStepIdx((prev) => (prev + 1) % deliveryWorkflow.length);
  };

  const handlePrev = () => {
    setActiveStepIdx((prev) => (prev - 1 + deliveryWorkflow.length) % deliveryWorkflow.length);
  };

  return (
    <section id="workflow" className="workflow-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-8 col-md-12">
            <span className="section-subtitle">6-STAGE FRAMEWORK</span>
            <h2 className="section-title">
              Delivery <span>Workflow</span>
            </h2>
            <p className="section-lead-text">
              From the initial client brief to key handover, our structured 6-stage framework guarantees total transparency, precision engineering, and zero delays.
            </p>
          </div>
          <div className="col-lg-4 col-md-12 d-flex align-items-center justify-content-lg-end mt-3 mt-lg-0">
            <button 
              className="consult-cta-btn"
              onClick={() => onOpenComingSoon && onOpenComingSoon('Project Consultation Booking')}
            >
              <span>Schedule Consultation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Interactive Step Navigator Bar */}
        <div className="workflow-stepper-bar mb-4">
          <div className="stepper-track">
            {deliveryWorkflow.map((stage, idx) => {
              const isActive = activeStepIdx === idx;
              const isPassed = idx < activeStepIdx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`step-nav-pill ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                >
                  <span className="step-pill-num">{stage.step}</span>
                  <span className="step-pill-title">{stage.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Featured Showcase Card */}
        {activeStage && (
          <div className="active-stage-spotlight-card">
            <div className="spotlight-card-header">
              <div className="d-flex align-items-center gap-3">
                <span className="spotlight-step-badge">Stage {activeStage.step} of 06</span>
                <span className="stage-check-badge">
                  <CheckCircle2 size={14} /> Quality Verified
                </span>
              </div>
              
              <div className="spotlight-nav-controls">
                <button 
                  onClick={handlePrev} 
                  className="step-ctrl-btn" 
                  aria-label="Previous Stage"
                  title="Previous Stage"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="step-ctrl-indicator">
                  {activeStepIdx + 1} / {deliveryWorkflow.length}
                </span>
                <button 
                  onClick={handleNext} 
                  className="step-ctrl-btn" 
                  aria-label="Next Stage"
                  title="Next Stage"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="spotlight-card-body">
              <h3 className="spotlight-stage-title">{activeStage.title}</h3>
              <div className="spotlight-summary-pill">{activeStage.summary}</div>
              <p className="spotlight-details-text">{activeStage.details}</p>
            </div>

            <div className="spotlight-card-footer">
              <div className="step-dots-row">
                {deliveryWorkflow.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => setActiveStepIdx(idx)}
                    className={`step-mini-dot ${idx === activeStepIdx ? 'active' : ''}`}
                  />
                ))}
              </div>
              
              <button
                className="btn-next-stage"
                onClick={activeStepIdx === deliveryWorkflow.length - 1 ? () => setActiveStepIdx(0) : handleNext}
              >
                <span>{activeStepIdx === deliveryWorkflow.length - 1 ? 'Restart Framework' : 'Next Stage'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
