import React, { useEffect } from 'react';
import { X, Calendar, Clock, Share2, ArrowRight, CheckCircle2, BookOpen, Tag } from 'lucide-react';

export const BlogReaderModal = ({ article, onClose, onConsultClick }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!article) return null;

  const handleCopyLink = () => {
    const url = window.location.origin + window.location.pathname + '#blog';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div
      className="blog-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div
        className="blog-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="blog-modal-header">
          <div className="blog-modal-brand">
            <BookOpen size={16} className="text-gold me-2" />
            <span>Buildscape Architectural Blog</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Share article link"
              className="blog-modal-icon-btn"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={onClose}
              title="Close article"
              className="blog-modal-icon-btn close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="blog-modal-body">
          {/* Cover Image & Category Badges */}
          <div className="blog-modal-cover">
            <img
              src={article.image || '/assets/images/hero1.jpg'}
              alt={article.title}
              className="blog-modal-cover-img"
              loading="lazy"
            />
            <div className="blog-modal-cover-overlay"></div>
            <div className="blog-modal-cover-badges">
              <span className="blog-badge-category">
                {article.category}
              </span>
              <div className="blog-modal-meta-pill">
                <span className="d-flex align-items-center">
                  <Calendar size={13} className="text-gold me-1" />
                  {article.date}
                </span>
                <span className="mx-2">•</span>
                <span className="d-flex align-items-center">
                  <Clock size={13} className="text-gold me-1" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Title & Author Info */}
          <div className="blog-modal-title-area">
            <h1 id="article-modal-title" className="blog-modal-title">
              {article.title}
            </h1>
            
            <div className="blog-modal-author-bar">
              <div className="d-flex align-items-center gap-3">
                <div className="blog-author-avatar">
                  {article.author ? article.author[0] : 'B'}
                </div>
                <div>
                  <div className="blog-author-name">{article.author}</div>
                  <div className="blog-author-role">{article.authorRole || 'Architectural Director'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Excerpt Summary */}
          {article.excerpt && (
            <div className="blog-modal-excerpt">
              "{article.excerpt}"
            </div>
          )}

          {/* Full Article Content / Sections */}
          <div className="blog-modal-sections">
            {article.content && Array.isArray(article.content) && article.content.length > 0 ? (
              article.content.map((sec, idx) => (
                <div key={idx} className="blog-modal-section-item">
                  <h3 className="blog-modal-section-heading">
                    {sec.heading}
                  </h3>
                  <p className="blog-modal-section-text">
                    {sec.text}
                  </p>
                  {sec.tip && (
                    <div className="blog-modal-protip">
                      <strong className="text-gold me-1">PRO TIP:</strong>
                      <span>{sec.tip}</span>
                    </div>
                  )}
                </div>
              ))
            ) : typeof article.content === 'string' && article.content ? (
              <p className="blog-modal-section-text">
                {article.content}
              </p>
            ) : (
              <p className="blog-modal-section-text">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="blog-modal-takeaways">
              <h4 className="blog-takeaways-title">
                <CheckCircle2 size={16} className="text-gold me-2" />
                Key Takeaways for Property Owners
              </h4>
              <ul className="blog-takeaways-list">
                {article.keyTakeaways.map((item, i) => (
                  <li key={i} className="blog-takeaways-item">
                    <span className="text-gold me-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="blog-modal-tags">
              <span className="blog-tags-label">
                <Tag size={13} className="text-gold me-1" />
                Topics:
              </span>
              <div className="d-flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                  <span key={i} className="blog-tag-pill">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Consultation CTA Banner */}
          <div className="blog-modal-cta">
            <div className="mb-3 mb-md-0">
              <h4 className="blog-modal-cta-title">
                Planning an Architectural Project in Hyderabad & Telangana?
              </h4>
              <p className="blog-modal-cta-desc">
                Book a 1-on-1 consultation with our senior structural engineers and luxury architects.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                if (onConsultClick) {
                  onConsultClick();
                } else {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="blog-modal-cta-btn"
            >
              <span>Consult Our Team</span>
              <ArrowRight size={14} className="ms-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
