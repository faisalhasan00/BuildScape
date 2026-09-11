import React, { useState } from 'react';
import { WhyUsCard } from './WhyUsCard';
import { useCms } from '../../context/CmsContext';
import { Quote, ShieldCheck, Cpu, Layers, LayoutGrid, ChevronLeft, ChevronRight, Rows } from 'lucide-react';

export const WhyUsSection = () => {
  const { cmsData } = useCms();
  const whyUsItems = cmsData.whyUsItems || [];
  const siteConfig = cmsData.siteConfig || {};
  const [activeCategory, setActiveCategory] = useState('all');
  const [pageIdx, setPageIdx] = useState(0);
  const [isFullGrid, setIsFullGrid] = useState(false);

  const filteredItems = whyUsItems.filter((item, idx) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'qa' && [0, 1, 6, 9].includes(idx)) return true;
    if (activeCategory === 'engineering' && [2, 3, 7].includes(idx)) return true;
    if (activeCategory === 'craft' && [4, 5, 8].includes(idx)) return true;
    return false;
  });

  const ITEMS_PER_PAGE = 4;
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const displayedItems = isFullGrid
    ? filteredItems
    : filteredItems.slice(pageIdx * ITEMS_PER_PAGE, (pageIdx + 1) * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setPageIdx(0);
  };

  const handleNextPage = () => {
    setPageIdx((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setPageIdx((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="why-buildscape" className="why-soudha section-padding position-relative overflow-hidden">
      {/* Background Architectural Logo Watermark */}
      <div className="section-bg-watermark watermark-left" aria-hidden="true"></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-7 col-md-12">
            <span className="section-subtitle">COMPETITIVE ADVANTAGES</span>
            <h2 className="section-title soudha mb-2">
              Why <span>Buildscape?</span>
            </h2>
            <p className="section-lead-text mb-0">
              10 proven benchmarks that separate our integrated architectural practice from conventional contractors.
            </p>
          </div>

          <div className="col-lg-5 col-md-12 d-flex justify-content-lg-end mt-3 mt-lg-0">
            <div className="standards-tab-switcher">
              <button
                className={`standards-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                <LayoutGrid size={14} />
                <span>All 10</span>
              </button>
              <button
                className={`standards-tab-btn ${activeCategory === 'qa' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('qa')}
              >
                <ShieldCheck size={14} />
                <span>QA</span>
              </button>
              <button
                className={`standards-tab-btn ${activeCategory === 'engineering' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('engineering')}
              >
                <Cpu size={14} />
                <span>Engineering</span>
              </button>
              <button
                className={`standards-tab-btn ${activeCategory === 'craft' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('craft')}
              >
                <Layers size={14} />
                <span>3D & Interiors</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Compact Grid View */}
        <div className="why-grid tab-pane-fade">
          {displayedItems.map((item) => {
            const originalIndex = whyUsItems.findIndex(w => w.id === item.id);
            return (
              <WhyUsCard
                key={item.id}
                iconName={item.icon}
                title={item.title}
                description={item.description}
                index={originalIndex !== -1 ? originalIndex : 0}
              />
            );
          })}
        </div>

        {/* Carousel Pagination & Full Grid Controls */}
        {filteredItems.length > ITEMS_PER_PAGE && (
          <div className="why-us-pagination-bar mt-3">
            {!isFullGrid && totalPages > 1 && (
              <div className="d-flex align-items-center gap-2">
                <button 
                  onClick={handlePrevPage} 
                  className="step-ctrl-btn"
                  title="Previous Benchmarks"
                  aria-label="Previous Benchmarks"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="step-dots-row">
                  {Array.from({ length: totalPages }).map((_, pIdx) => (
                    <span
                      key={pIdx}
                      onClick={() => setPageIdx(pIdx)}
                      className={`step-mini-dot ${pIdx === pageIdx ? 'active' : ''}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={handleNextPage} 
                  className="step-ctrl-btn"
                  title="Next Benchmarks"
                  aria-label="Next Benchmarks"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            <button
              className="why-toggle-view-btn"
              onClick={() => setIsFullGrid(!isFullGrid)}
            >
              {isFullGrid ? (
                <>
                  <Rows size={14} />
                  <span>Compact Slider View</span>
                </>
              ) : (
                <>
                  <LayoutGrid size={14} />
                  <span>View All {filteredItems.length} Benchmarks</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Official Brochure Leadership Quote Callout */}
        <div className="official-quote-banner mt-4">
          <div className="quote-icon-badge">
            <Quote size={26} />
          </div>
          <blockquote className="quote-text">
            "{siteConfig.officialQuote}"
          </blockquote>
          <div className="quote-attribution">
            <div className="founder-name">{siteConfig.founder}</div>
            <div className="founder-title">{siteConfig.founderRole}, {siteConfig.brandFullName}</div>
          </div>
        </div>

      </div>
    </section>
  );
};
