import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { 
  Building2, 
  MapPin, 
  User, 
  Calendar, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronLeft, 
  Eye, 
  X, 
  Search, 
  LayoutGrid, 
  ListFilter, 
  ShieldCheck, 
  Award, 
  Layers, 
  CheckCircle2, 
  Camera,
  FileCheck,
  PhoneCall,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const INITIAL_VISIBLE_COUNT = 6; 

export const ProjectsGallerySection = () => {
  const { cmsData } = useCms();
  const rawGallery = cmsData?.projectsGallery;
  const galleryCategories = (rawGallery && rawGallery.categories) || [
    { id: "all", label: "All Works" },
    { id: "villas", label: "Luxury Villas" },
    { id: "commercial", label: "Commercial Hubs" },
    { id: "interiors", label: "Interior Architecture" },
    { id: "farmhouses", label: "Country Farmhouses" },
    { id: "turnkey", label: "Turnkey EPC" }
  ];
  const galleryItems = Array.isArray(rawGallery) 
    ? rawGallery 
    : ((rawGallery && rawGallery.items) || []);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const initialCount = isMobile ? 4 : INITIAL_VISIBLE_COUNT;
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [activeModalTab, setActiveModalTab] = useState('overview'); // 'overview' | 'specs'

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    return galleryItems.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = !searchQuery.trim() || 
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.client && item.client.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.scope && item.scope.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [galleryItems, activeCategory, searchQuery]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };


  const selectedProject = selectedIdx !== null ? filteredProjects[selectedIdx] : null;

  const handleOpenModal = (project) => {
    const idx = filteredProjects.findIndex(p => p.id === project.id);
    setSelectedIdx(idx !== -1 ? idx : 0);
    setActivePhotoIdx(0);
    setActiveModalTab('overview');
  };

  const handleNextProject = (e) => {
    e.stopPropagation();
    if (filteredProjects.length === 0) return;
    setSelectedIdx((prev) => (prev + 1) % filteredProjects.length);
    setActivePhotoIdx(0);
  };

  const handlePrevProject = (e) => {
    e.stopPropagation();
    if (filteredProjects.length === 0) return;
    setSelectedIdx((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    setActivePhotoIdx(0);
  };

  return (
    <section id="gallery" className="gallery-section position-relative overflow-hidden">
      {/* Background Architectural Logo Watermark Pattern */}
      <div className="section-bg-watermark watermark-dark" aria-hidden="true"></div>

      <div className="gallery-container position-relative" style={{ zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-badge">
            Curated Portfolio & Case Studies
          </span>
          <h2 className="section-title">
            Signature Architectural <span className="text-gold">&</span> Engineering Works
          </h2>
          <p className="section-subtitle">
            A showcase of bespoke residential estates, commercial hubs, high-end interior architecture, and turnkey infrastructure executed with millimeter precision.
          </p>
        </div>


        {/* Filter Controls & Search Bar */}
        <div className="gallery-toolbar">
          {/* Category Tabs */}
          <div className="gallery-filter-tabs">
            {galleryCategories.map((cat) => {
              const count = cat.id === 'all' 
                ? galleryItems.length 
                : galleryItems.filter(i => i.category === cat.id).length;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`filter-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Search & View Toggle */}
          <div className="gallery-controls-right">
            <div className="gallery-search-wrap">
              <Search size={15} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search villas, commercial, area..."
                className="gallery-search-input"
              />
              {searchQuery && (
                <button onClick={() => handleSearchChange('')} className="search-clear-btn">
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="gallery-view-toggle">
              <button 
                onClick={() => setViewMode('grid')}
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('compact')}
                className={`view-btn ${viewMode === 'compact' ? 'active' : ''}`}
                title="Compact View"
              >
                <ListFilter size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="gallery-empty-state">
            <Building2 size={42} className="empty-icon text-gold" />
            <h3>No matching projects found</h3>
            <p>Try resetting the category filter or searching for different keywords.</p>
            <button 
              onClick={() => { handleCategoryChange('all'); handleSearchChange(''); }}
              className="btn-primary-cms mt-3"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={`gallery-grid ${viewMode === 'compact' ? 'compact-layout' : ''}`}>
            {displayedProjects.map((project) => {
              const photoCount = (project.gallery && project.gallery.length) || 1;
              return (
                <div 
                  key={project.id} 
                  className="gallery-card group"
                  onClick={() => handleOpenModal(project)}
                >
                  <div className="gallery-image-wrapper">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="gallery-image" 
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <div className="gallery-overlay-top">
                        <span className="project-category-badge">{project.category.toUpperCase()}</span>
                        <div className="d-flex align-items-center gap-2">
                          {photoCount > 1 && (
                            <span className="photo-count-badge">
                              <Camera size={11} />
                              <span>{photoCount} Photos</span>
                            </span>
                          )}
                          <span className="project-status-badge">{project.status || 'Delivered'}</span>
                        </div>
                      </div>

                      <div className="gallery-overlay-bottom">
                        <button className="gallery-quick-view-btn" aria-label="View Project Details">
                          <Eye size={15} />
                          <span>View Case Study</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="gallery-card-content">
                    <div className="gallery-card-meta">
                      <span className="meta-item"><MapPin size={12} className="text-gold" /> {project.location}</span>
                      <span className="meta-item"><Building2 size={12} className="text-gold" /> {project.area}</span>
                    </div>

                    <h3 className="gallery-card-title">{project.title}</h3>
                    <p className="gallery-card-desc">{project.shortDesc || project.description}</p>
                    
                    {project.scope && (
                      <div className="gallery-card-scope">
                        <span className="scope-dot"></span>
                        <span className="scope-text">{project.scope}</span>
                      </div>
                    )}

                    <div className="gallery-card-footer">
                      <span className="client-tag"><User size={12} /> {project.client}</span>
                      <span className="view-details-arrow">
                        <span>Inspect</span>
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Interactive Show More / Show Less Button */}
        {filteredProjects.length > INITIAL_VISIBLE_COUNT && (
          <div className="gallery-load-more-wrap text-center">
            {visibleCount < filteredProjects.length ? (
              <button 
                className="gallery-load-more-btn"
                onClick={() => setVisibleCount(filteredProjects.length)}
              >
                <span>Show More Projects</span>
                <ChevronDown size={17} />
              </button>
            ) : (
              <button 
                className="gallery-load-more-btn is-expanded"
                onClick={() => {
                  setVisibleCount(INITIAL_VISIBLE_COUNT);
                  const galleryEl = document.getElementById('gallery');
                  if (galleryEl) {
                    galleryEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Show Less</span>
                <ChevronUp size={17} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Elevated Lightbox Quick-View Modal */}
      {selectedProject && (
        <div className="gallery-modal-backdrop" onClick={() => setSelectedIdx(null)}>
          <div className="gallery-modal-content elevated-lightbox" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header Bar */}
            <div className="lightbox-top-bar">
              <div className="lightbox-breadcrumbs">
                <span className="lb-cat">{selectedProject.category.toUpperCase()}</span>
                <span className="lb-sep">/</span>
                <span className="lb-title">{selectedProject.title}</span>
              </div>
              
              <div className="lightbox-controls">
                <button 
                  onClick={handlePrevProject} 
                  className="lb-nav-btn"
                  title="Previous Project (Left Arrow)"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="lb-index-indicator">
                  {selectedIdx + 1} / {filteredProjects.length}
                </span>
                <button 
                  onClick={handleNextProject} 
                  className="lb-nav-btn"
                  title="Next Project (Right Arrow)"
                >
                  <ChevronRight size={18} />
                </button>
                <button 
                  className="lb-close-btn" 
                  onClick={() => setSelectedIdx(null)}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="gallery-modal-grid">
              {/* Media Column with Image Carousel / Thumbnails */}
              <div className="modal-media-col">
                <div className="modal-main-image-wrap">
                  <img 
                    src={
                      (selectedProject.gallery && selectedProject.gallery[activePhotoIdx]) || 
                      selectedProject.image
                    } 
                    alt={selectedProject.title} 
                    className="modal-main-image"
                  />
                  <div className="modal-image-status">
                    <CheckCircle2 size={13} />
                    <span>{selectedProject.status || 'Completed / Handed Over'}</span>
                  </div>
                </div>

                {/* Photo Thumbnail Strip */}
                {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                  <div className="modal-thumbs-strip">
                    {selectedProject.gallery.map((thumb, tIdx) => (
                      <button
                        key={tIdx}
                        onClick={() => setActivePhotoIdx(tIdx)}
                        className={`modal-thumb-btn ${activePhotoIdx === tIdx ? 'active' : ''}`}
                      >
                        <img src={thumb} alt={`View ${tIdx + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Information & Specifications Column */}
              <div className="modal-info-col">
                <div className="modal-header-meta">
                  <span className="modal-cat-pill">{selectedProject.category.toUpperCase()}</span>
                  <span className="modal-year-pill"><Calendar size={13} /> Completed {selectedProject.year}</span>
                </div>

                <h3 className="modal-project-title">{selectedProject.title}</h3>
                <div className="modal-location-row">
                  <MapPin size={15} className="text-gold" />
                  <span>{selectedProject.location}</span>
                </div>

                {/* Modal Tabs */}
                <div className="modal-tabs-nav">
                  <button 
                    onClick={() => setActiveModalTab('overview')}
                    className={`modal-tab-btn ${activeModalTab === 'overview' ? 'active' : ''}`}
                  >
                    Project Concept & Scope
                  </button>
                  <button 
                    onClick={() => setActiveModalTab('specs')}
                    className={`modal-tab-btn ${activeModalTab === 'specs' ? 'active' : ''}`}
                  >
                    Technical Specifications
                  </button>
                </div>

                {/* Tab 1: Overview */}
                {activeModalTab === 'overview' && (
                  <div className="modal-tab-pane-content">
                    <p className="modal-description">
                      {selectedProject.description || selectedProject.shortDesc}
                    </p>

                    {selectedProject.scope && (
                      <div className="modal-scope-box">
                        <span className="scope-box-label">Execution Scope:</span>
                        <p className="scope-box-text">{selectedProject.scope}</p>
                      </div>
                    )}

                    <div className="modal-deliverables-checklist">
                      <div className="deliverable-item">
                        <CheckCircle2 size={14} className="text-gold" />
                        <span>High-Definition 3D BIM Visualizations</span>
                      </div>
                      <div className="deliverable-item">
                        <CheckCircle2 size={14} className="text-gold" />
                        <span>IS / NBC Compliant Structural Schematics</span>
                      </div>
                      <div className="deliverable-item">
                        <CheckCircle2 size={14} className="text-gold" />
                        <span>Turnkey Civil Contracting & Material QC</span>
                      </div>
                      <div className="deliverable-item">
                        <CheckCircle2 size={14} className="text-gold" />
                        <span>Fixed Timeline & Milestone-Linked BOQ</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Specs Grid */}
                {activeModalTab === 'specs' && (
                  <div className="modal-tab-pane-content">
                    <div className="modal-specs-grid">
                      <div className="spec-item">
                        <span className="spec-label">Built-up Scale</span>
                        <strong className="spec-val">{selectedProject.area}</strong>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Client / Patron</span>
                        <strong className="spec-val">{selectedProject.client}</strong>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Execution Model</span>
                        <strong className="spec-val">Turnkey / EPC Contract</strong>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Structural Standard</span>
                        <strong className="spec-val">IS 456 / NBC 2016</strong>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Architectural Style</span>
                        <strong className="spec-val">Contemporary Biophilic</strong>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Location Jurisdiction</span>
                        <strong className="spec-val">{selectedProject.location}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal Action Buttons */}
                <div className="modal-action-bar">
                  <a 
                    href="#contact" 
                    className="btn-modal-inquire" 
                    onClick={() => setSelectedIdx(null)}
                  >
                    <span>Inquire About Similar Typology</span>
                    <ArrowUpRight size={16} />
                  </a>
                  <a 
                    href="#estimator" 
                    className="btn-modal-estimator" 
                    onClick={() => setSelectedIdx(null)}
                  >
                    <span>Calculate Budget</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
