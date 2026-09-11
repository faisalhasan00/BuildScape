import React, { useEffect, useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { WhatsAppIcon } from '../Common/WhatsAppIcon';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Check, 
  Tag, 
  User, 
  ChevronRight, 
  BookOpen, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  Bookmark,
  Share,
  Layers,
  Award
} from 'lucide-react';

export const BlogArticlePage = ({ article, onBack, onSelectArticle, onOpenConsultation }) => {
  const { data } = useCms();
  const allArticles = data?.blogArticles || [];
  
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on mount / article change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article?.id]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) return null;

  // Related articles (excluding the current one)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(`Read this article on Buildscape: ${article.title} - ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  return (
    <div className="blog-article-page-wrapper">
      {/* Scroll Reading Progress Bar */}
      <div 
        className="blog-reading-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      />

      {/* Top Breadcrumb & Navigation Bar */}
      <div className="blog-article-topbar">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 py-3">
            <div className="d-flex align-items-center gap-2">
              <button 
                onClick={onBack} 
                className="blog-back-btn d-flex align-items-center gap-2"
                title="Return to Blog & Home"
              >
                <ArrowLeft size={16} />
                <span>Back to Articles</span>
              </button>

              <div className="blog-breadcrumb d-none d-md-flex align-items-center gap-2 ms-3 text-muted" style={{ fontSize: '13px' }}>
                <span onClick={onBack} style={{ cursor: 'pointer' }} className="hover-gold">Home</span>
                <span>/</span>
                <span onClick={onBack} style={{ cursor: 'pointer' }} className="hover-gold">Blog</span>
                <span>/</span>
                <span className="text-gold text-truncate" style={{ maxWidth: '280px' }}>{article.title}</span>
              </div>
            </div>

            {/* Quick Share Icons */}
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted d-none d-sm-inline" style={{ fontSize: '12px' }}>Share:</span>
              <button 
                onClick={handleShareWhatsapp} 
                className="blog-share-icon-btn" 
                title="Share on WhatsApp"
              >
                <WhatsAppIcon size={14} color="#25d366" />
              </button>
              <button 
                onClick={handleShareLinkedIn} 
                className="blog-share-icon-btn" 
                title="Share on LinkedIn"
              >
                <Share2 size={14} />
              </button>
              <button 
                onClick={handleCopyLink} 
                className="blog-share-icon-btn" 
                title="Copy Link"
              >
                {copied ? <Check size={14} className="text-success" /> : <Share size={14} />}
              </button>
              {copied && (
                <span className="badge bg-success text-white" style={{ fontSize: '11px' }}>
                  Copied!
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Article Main Hero Section */}
      <div className="blog-article-hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              {/* Category & Metadata Header */}
              <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                <span className="blog-badge-category">
                  {article.category || 'Architecture'}
                </span>
                <div className="d-flex align-items-center gap-3 text-muted" style={{ fontSize: '13px' }}>
                  <span className="d-flex align-items-center gap-1">
                    <Calendar size={13} className="text-gold" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="d-flex align-items-center gap-1">
                    <Clock size={13} className="text-gold" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Main Headline Title */}
              <h1 className="blog-article-main-title">
                {article.title}
              </h1>

              {/* Author Info Bar */}
              <div className="blog-article-author-row my-4 pt-3 pb-3 border-top border-bottom border-secondary d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <div className="blog-author-avatar large">
                    {article.author ? article.author[0] : 'B'}
                  </div>
                  <div>
                    <div className="blog-author-name" style={{ fontSize: '16px' }}>{article.author}</div>
                    <div className="blog-author-role text-muted" style={{ fontSize: '13px' }}>
                      {article.authorRole || 'Chartered Architectural Engineer'}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="badge-buildscape-verified">
                    <Award size={13} className="text-gold me-1" />
                    Buildscape Peer-Reviewed
                  </span>
                </div>
              </div>

              {/* Featured High-Res Cover Image */}
              <div className="blog-article-featured-img-container mb-5">
                <img
                  src={article.image || '/assets/images/hero1.jpg'}
                  alt={article.title}
                  className="blog-article-featured-img"
                />
                <div className="blog-article-img-caption">
                  <span>Buildscape Architectural & Civil Engineering Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Body & Sidebar Grid */}
      <div className="blog-article-content-section pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12">
              <div className="row g-4">
                {/* Main Content Column */}
                <div className="col-lg-8 col-12">
                  <article className="blog-article-body">
                    {/* Executive Summary / Pull Quote */}
                    {article.excerpt && (
                      <div className="blog-article-lead-excerpt mb-4">
                        <p className="mb-0">
                          "{article.excerpt}"
                        </p>
                      </div>
                    )}

                    {/* Dynamic Structured Sections */}
                    <div className="blog-article-sections">
                      {article.content && Array.isArray(article.content) && article.content.length > 0 ? (
                        article.content.map((sec, idx) => (
                          <div key={idx} id={`section-${idx}`} className="blog-article-section-block mb-4">
                            <h2 className="blog-article-section-heading">
                              <span className="section-number-pill">{idx + 1}</span>
                              <span>{sec.heading}</span>
                            </h2>
                            <p className="blog-article-section-paragraph">
                              {sec.text}
                            </p>
                            {sec.tip && (
                              <div className="blog-article-protip-box my-3">
                                <div className="d-flex align-items-start gap-2">
                                  <div className="protip-tag">ENGINEERING TIP</div>
                                </div>
                                <p className="mb-0 mt-2 text-light" style={{ fontSize: '14.5px', lineHeight: '1.6' }}>
                                  {sec.tip}
                                </p>
                              </div>
                            )}
                          </div>
                        ))
                      ) : typeof article.content === 'string' && article.content ? (
                        <p className="blog-article-section-paragraph">
                          {article.content}
                        </p>
                      ) : (
                        <p className="blog-article-section-paragraph">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Key Takeaways Box */}
                    {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                      <div className="blog-article-takeaways-card my-5">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <CheckCircle2 size={20} className="text-gold" />
                          <h3 className="takeaways-header-title mb-0">
                            Key Architectural & Property Takeaways
                          </h3>
                        </div>
                        <ul className="takeaways-list ps-0 mb-0">
                          {article.keyTakeaways.map((takeaway, i) => (
                            <li key={i} className="takeaways-list-item">
                              <span className="takeaway-bullet">✓</span>
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Topic Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="blog-article-tags-wrap my-4 pt-3 border-top border-secondary">
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '13px' }}>
                            <Tag size={13} className="text-gold" />
                            Filed under:
                          </span>
                          {article.tags.map((tag, i) => (
                            <span key={i} className="blog-tag-pill">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Author Signature Box */}
                    <div className="blog-author-signature-box p-4 mt-5">
                      <div className="d-flex align-items-center gap-3">
                        <div className="blog-author-avatar large">
                          {article.author ? article.author[0] : 'B'}
                        </div>
                        <div>
                          <div className="text-gold" style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
                            Written By
                          </div>
                          <h4 className="text-white mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>{article.author}</h4>
                          <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                            {article.authorRole || 'Architectural Lead at Buildscape Architects & Engineers'}. Specializing in turnkey RCC execution, luxury spatial planning, and structural compliance in Telangana.
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Sidebar Column */}
                <div className="col-lg-4 col-12">
                  <div className="blog-article-sidebar sticky-top" style={{ top: '100px', zIndex: 10 }}>
                    {/* Quick Consultation CTA */}
                    <div className="sidebar-cta-card mb-4 p-4 text-center">
                      <h4 className="sidebar-cta-title mb-2">
                        Planning a Build in Telangana?
                      </h4>
                      <p className="sidebar-cta-desc mb-3" style={{ fontSize: '13px' }}>
                        Discuss your floor plans, structural requirements, or turnkey budget directly with our senior engineers.
                      </p>
                      <button
                        onClick={() => {
                          if (onOpenConsultation) {
                            onOpenConsultation('Architectural Article Consultation');
                          } else {
                            onBack();
                            setTimeout(() => {
                              const el = document.getElementById('contact');
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }
                        }}
                        className="btn-gold-cta w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                      >
                        <PhoneCall size={14} />
                        <span>Book 1-on-1 Consultation</span>
                      </button>
                    </div>

                    {/* Table of Contents / Key Highlights */}
                    {article.content && Array.isArray(article.content) && article.content.length > 0 && (
                      <div className="sidebar-toc-card mb-4 p-4">
                        <h5 className="sidebar-toc-title mb-3 d-flex align-items-center gap-2">
                          <BookOpen size={16} className="text-gold" />
                          <span>Table of Contents</span>
                        </h5>
                        <ul className="sidebar-toc-list ps-0 mb-0">
                          {article.content.map((sec, idx) => (
                            <li key={idx} className="sidebar-toc-item mb-2">
                              <a 
                                href={`#section-${idx}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  const el = document.getElementById(`section-${idx}`);
                                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="sidebar-toc-link d-flex align-items-start gap-2"
                              >
                                <span className="text-gold">{idx + 1}.</span>
                                <span>{sec.heading}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Related Articles Widget */}
                    {relatedArticles.length > 0 && (
                      <div className="sidebar-related-card p-4">
                        <h5 className="sidebar-related-title mb-3 d-flex align-items-center gap-2">
                          <Layers size={16} className="text-gold" />
                          <span>More From Blog</span>
                        </h5>
                        <div className="d-flex flex-column gap-3">
                          {relatedArticles.map((rel) => (
                            <div 
                              key={rel.id}
                              onClick={() => onSelectArticle(rel)}
                              className="sidebar-related-item d-flex gap-3 align-items-center"
                              style={{ cursor: 'pointer' }}
                            >
                              <img
                                src={rel.image || '/assets/images/hero1.jpg'}
                                alt={rel.title}
                                className="sidebar-related-thumb"
                              />
                              <div>
                                <span className="sidebar-related-cat">{rel.category}</span>
                                <h6 className="sidebar-related-item-title mb-1">
                                  {rel.title}
                                </h6>
                                <span className="sidebar-related-time text-muted">
                                  <Clock size={11} className="text-gold me-1" />
                                  {rel.readTime}
                                </span>
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

      {/* Bottom Back Navigation Bar */}
      <div className="blog-article-footer-nav py-5 border-top border-secondary">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <button 
              onClick={onBack} 
              className="blog-back-btn d-flex align-items-center gap-2"
            >
              <ArrowLeft size={16} />
              <span>Back to All Articles</span>
            </button>

            <button
              onClick={() => {
                onBack();
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="btn-gold-cta py-2 px-4 d-flex align-items-center gap-2"
            >
              <span>Speak to Principal Architect</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
