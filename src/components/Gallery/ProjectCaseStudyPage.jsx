import React, { useEffect, useState } from "react";
import { useCms } from "../../context/CmsContext";
import {
  ArrowLeft, MapPin, Building2, User, Calendar, CheckCircle2,
  ArrowRight, Camera, ChevronLeft, ChevronRight, PhoneCall,
  Share2, Check, Share, Layers, Award, FileCheck, ShieldCheck,
} from "lucide-react";

export const ProjectCaseStudyPage = ({ project, onBack, onSelectProject, onOpenConsultation }) => {
  const { cmsData } = useCms();
  const allProjects = Array.isArray(cmsData?.projectsGallery)
    ? cmsData.projectsGallery
    : (cmsData?.projectsGallery?.items || []);

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActivePhotoIdx(0);
  }, [project?.id]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) return null;

  const photos = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const relatedProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="blog-article-page-wrapper">
      {/* Scroll Progress Bar */}
      <div className="blog-reading-progress-bar" style={{ width: `${scrollProgress}%` }}
        role="progressbar" aria-valuenow={scrollProgress} aria-valuemin="0" aria-valuemax="100" />

      {/* Top Navigation Bar */}
      <div className="blog-article-topbar">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 py-3">
            <div className="d-flex align-items-center gap-2">
              <button onClick={onBack} className="blog-back-btn d-flex align-items-center gap-2">
                <ArrowLeft size={16} /><span>Back to Portfolio</span>
              </button>
              <div className="blog-breadcrumb d-none d-md-flex align-items-center gap-2 ms-3 text-muted" style={{ fontSize: "13px" }}>
                <span onClick={onBack} style={{ cursor: "pointer" }} className="hover-gold">Home</span>
                <span>/</span>
                <span onClick={onBack} style={{ cursor: "pointer" }} className="hover-gold">Portfolio</span>
                <span>/</span>
                <span className="text-gold text-truncate" style={{ maxWidth: "280px" }}>{project.title}</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted d-none d-sm-inline" style={{ fontSize: "12px" }}>Share:</span>
              <button onClick={() => { const t = encodeURIComponent(`Check this Buildscape project: ${project.title}`); window.open(`https://api.whatsapp.com/send?text=${t}`, "_blank"); }} className="blog-share-icon-btn" title="Share on WhatsApp"><Share2 size={14} /></button>
              <button onClick={handleCopyLink} className="blog-share-icon-btn" title="Copy Link">
                {copied ? <Check size={14} className="text-success" /> : <Share size={14} />}
              </button>
              {copied && <span className="badge bg-success text-white" style={{ fontSize: "11px" }}>Copied!</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="blog-article-hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                <span className="blog-badge-category">{project.categoryLabel || project.category}</span>
                <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: "13px" }}>
                  <span className="d-flex align-items-center gap-1"><MapPin size={13} className="text-gold" />{project.location}</span>
                  <span>•</span>
                  <span className="d-flex align-items-center gap-1"><Calendar size={13} className="text-gold" />Completed {project.year}</span>
                  <span>•</span>
                  <span className="d-flex align-items-center gap-1"><Building2 size={13} className="text-gold" />{project.area}</span>
                </div>
              </div>

              <h1 className="blog-article-main-title">{project.title}</h1>

              <div className="blog-article-author-row my-4 pt-3 pb-3 border-top border-bottom border-secondary d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="blog-author-avatar large">{project.client ? project.client[0] : "B"}</div>
                  <div>
                    <div className="text-gold" style={{ fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>Client</div>
                    <div className="blog-author-name" style={{ fontSize: "16px" }}>{project.client}</div>
                  </div>
                </div>
                <span className="badge-buildscape-verified"><Award size={13} className="text-gold me-1" />Buildscape Delivered</span>
              </div>

              {/* Photo Gallery */}
              <div className="mb-5">
                <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden" }}>
                  <img src={photos[activePhotoIdx]} alt={project.title} className="blog-article-featured-img"
                    style={{ width: "100%", objectFit: "cover", maxHeight: "520px", display: "block" }} />
                  {photos.length > 1 && (
                    <>
                      <button onClick={() => setActivePhotoIdx((p) => (p - 1 + photos.length) % photos.length)}
                        style={{ position: "absolute", top: "50%", left: "12px", transform: "translateY(-50%)", background: "rgba(0,0,0,0.55)", border: "none", color: "#fff", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={() => setActivePhotoIdx((p) => (p + 1) % photos.length)}
                        style={{ position: "absolute", top: "50%", right: "12px", transform: "translateY(-50%)", background: "rgba(0,0,0,0.55)", border: "none", color: "#fff", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                        <ChevronRight size={20} />
                      </button>
                      <div style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.55)", color: "#fff", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Camera size={12} />{activePhotoIdx + 1} / {photos.length}
                      </div>
                    </>
                  )}
                </div>
                {photos.length > 1 && (
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
                    {photos.map((thumb, tIdx) => (
                      <button key={tIdx} onClick={() => setActivePhotoIdx(tIdx)}
                        style={{ width: "72px", height: "52px", padding: 0, border: activePhotoIdx === tIdx ? "2px solid #d4af37" : "2px solid transparent", borderRadius: "6px", overflow: "hidden", cursor: "pointer", background: "none" }}>
                        <img src={thumb} alt={`Photo ${tIdx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="blog-article-content-section pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row g-4">
                {/* Main */}
                <div className="col-lg-8 col-12">
                  <article className="blog-article-body">
                    {project.description && (
                      <div className="blog-article-lead-excerpt mb-4">
                        <p className="mb-0">"{project.description}"</p>
                      </div>
                    )}
                    {project.scope && (
                      <div className="blog-article-section-block mb-4">
                        <h2 className="blog-article-section-heading">
                          <span className="section-number-pill">1</span><span>Scope of Work</span>
                        </h2>
                        <p className="blog-article-section-paragraph">{project.scope}</p>
                      </div>
                    )}
                    <div className="blog-article-section-block mb-4">
                      <h2 className="blog-article-section-heading">
                        <span className="section-number-pill">2</span><span>Technical Specifications</span>
                      </h2>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "16px" }}>
                        {[
                          ["Built-up Scale", project.area],
                          ["Year Completed", project.year],
                          ["Client / Patron", project.client],
                          ["Location", project.location],
                          ["Structural Standard", "IS 456 / NBC 2016"],
                          ["Execution Model", "Turnkey / EPC Contract"],
                        ].map(([label, val]) => (
                          <div key={label} className="spec-item">
                            <span className="spec-label">{label}</span>
                            <strong className="spec-val">{val}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="blog-article-takeaways-card my-5">
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <CheckCircle2 size={20} className="text-gold" />
                        <h3 className="takeaways-header-title mb-0">Key Deliverables</h3>
                      </div>
                      <ul className="takeaways-list ps-0 mb-0">
                        {["High-Definition 3D BIM Visualizations","IS / NBC Compliant Structural Schematics","Turnkey Civil Contracting & Material QC","Fixed Timeline & Milestone-Linked BOQ","Municipal Approval Drawings & Liaison","Post-Handover Structural Warranty"].map((item, i) => (
                          <li key={i} className="takeaways-list-item">
                            <span className="takeaway-bullet">&#x2713;</span><span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </div>

                {/* Sidebar */}
                <div className="col-lg-4 col-12">
                  <div className="blog-article-sidebar sticky-top" style={{ top: "100px", zIndex: 10 }}>
                    <div className="sidebar-cta-card mb-4 p-4 text-center">
                      <h4 className="sidebar-cta-title mb-2">Build Something Similar?</h4>
                      <p className="sidebar-cta-desc mb-3" style={{ fontSize: "13px" }}>Talk to our senior architects about your vision, floor plans, or budget.</p>
                      <button onClick={() => { if (onOpenConsultation) { onOpenConsultation("Portfolio Consultation"); } else { onBack(); setTimeout(() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); } }}
                        className="btn-gold-cta w-100 py-2 d-flex align-items-center justify-content-center gap-2">
                        <PhoneCall size={14} /><span>Book Free Consultation</span>
                      </button>
                    </div>
                    <div className="sidebar-toc-card mb-4 p-4">
                      <h5 className="sidebar-toc-title mb-3 d-flex align-items-center gap-2">
                        <FileCheck size={16} className="text-gold" /><span>Project Snapshot</span>
                      </h5>
                      <div className="d-flex flex-column gap-3">
                        {[[MapPin, project.location],[Building2, project.area],[Calendar, `Delivered ${project.year}`],[User, project.client]].map(([Icon, val], i) => (
                          <div key={i} className="d-flex align-items-center gap-2">
                            <Icon size={14} className="text-gold" />
                            <span style={{ fontSize: "13px", color: "#ccc" }}>{val}</span>
                          </div>
                        ))}
                        <div className="d-flex align-items-center gap-2">
                          <ShieldCheck size={14} className="text-gold" />
                          <span style={{ fontSize: "13px", color: "#d4af37", fontWeight: 600 }}>{project.status || "Completed & Handed Over"}</span>
                        </div>
                      </div>
                    </div>
                    {relatedProjects.length > 0 && (
                      <div className="sidebar-related-card p-4">
                        <h5 className="sidebar-related-title mb-3 d-flex align-items-center gap-2">
                          <Layers size={16} className="text-gold" /><span>More Projects</span>
                        </h5>
                        <div className="d-flex flex-column gap-3">
                          {relatedProjects.map((rel) => (
                            <div key={rel.id} onClick={() => onSelectProject(rel)} className="sidebar-related-item d-flex gap-3 align-items-center" style={{ cursor: "pointer" }}>
                              <img src={rel.image || "/assets/images/hero1.jpg"} alt={rel.title} className="sidebar-related-thumb" />
                              <div>
                                <span className="sidebar-related-cat">{rel.categoryLabel || rel.category}</span>
                                <h6 className="sidebar-related-item-title mb-1">{rel.title}</h6>
                                <span className="sidebar-related-time text-muted"><MapPin size={11} className="text-gold me-1" />{rel.location}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="blog-article-footer-nav py-5 border-top border-secondary">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <button onClick={onBack} className="blog-back-btn d-flex align-items-center gap-2">
              <ArrowLeft size={16} /><span>Back to All Projects</span>
            </button>
            <button onClick={() => { onBack(); setTimeout(() => { const el = document.getElementById("contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); }}
              className="btn-gold-cta py-2 px-4 d-flex align-items-center gap-2">
              <span>Start Your Project</span><ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
