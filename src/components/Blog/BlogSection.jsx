import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { BlogReaderModal } from './BlogReaderModal';
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles, Filter, ChevronRight, User, Layers } from 'lucide-react';

export const BlogSection = () => {
  const { data } = useCms();
  const articles = data?.blogArticles || [];
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const list = ['All'];
    articles.forEach((art) => {
      if (art.category && !list.includes(art.category)) {
        list.push(art.category);
      }
    });
    return list;
  }, [articles]);

  // Filter articles based on active category
  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((art) => art.category === activeCategory);
  }, [articles, activeCategory]);

  // Featured article (first marked featured or first in list)
  const featuredArticle = useMemo(() => {
    return articles.find((a) => a.featured) || articles[0];
  }, [articles]);

  // Secondary grid articles (excluding featured if in 'All' view, or displaying filtered)
  const gridArticles = useMemo(() => {
    if (activeCategory === 'All') {
      return articles.filter((a) => a.id !== featuredArticle?.id);
    }
    return filteredArticles;
  }, [articles, filteredArticles, activeCategory, featuredArticle]);

  const handleConsultClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="blog" className="blog-section section-padding position-relative overflow-hidden">
      {/* Background Architectural Logo Watermark */}
      <div className="section-bg-watermark watermark-left" aria-hidden="true"></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="row align-items-center mb-4">
          <div className="col-lg-7 col-md-12">
            <span className="section-subtitle">ARCHITECTURAL KNOWLEDGE & INSIGHTS</span>
            <h2 className="section-title soudha mb-2">
              Buildscape <span>Blog</span>
            </h2>
            <p className="section-lead-text mb-0">
              Deep-dive architectural essays, structural compliance guidelines, turnkey EPC advisories, and luxury interior concepts curated by chartered engineers.
            </p>
          </div>

          <div className="col-lg-5 col-md-12 d-flex justify-content-lg-end mt-3 mt-lg-0">
            <div className="blog-category-switcher">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`blog-category-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Spotlight Article (Shown in 'All' view) */}
        {activeCategory === 'All' && featuredArticle && (
          <div className="blog-spotlight-card mb-5" onClick={() => setSelectedArticle(featuredArticle)}>
            <div className="row g-0 align-items-center">
              <div className="col-lg-7 col-md-12">
                <div className="blog-spotlight-img-wrapper">
                  <img
                    src={featuredArticle.image || '/assets/images/hero1.jpg'}
                    alt={featuredArticle.title}
                    className="blog-spotlight-img"
                    loading="lazy"
                  />
                  <div className="blog-spotlight-overlay"></div>
                  <div className="blog-spotlight-badges">
                    <span className="blog-badge-featured">
                      <Sparkles size={13} className="me-1" /> Featured Spotlight
                    </span>
                    <span className="blog-badge-category">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-12">
                <div className="blog-spotlight-content">
                  <div className="blog-meta-info mb-2">
                    <span className="blog-meta-item">
                      <Calendar size={13} className="text-gold me-1" />
                      {featuredArticle.date}
                    </span>
                    <span className="blog-meta-sep">•</span>
                    <span className="blog-meta-item">
                      <Clock size={13} className="text-gold me-1" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h3 className="blog-spotlight-title">
                    {featuredArticle.title}
                  </h3>

                  <p className="blog-spotlight-excerpt">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="blog-author-row mt-4 pt-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="blog-author-avatar">
                        {featuredArticle.author ? featuredArticle.author[0] : 'B'}
                      </div>
                      <div>
                        <div className="blog-author-name">{featuredArticle.author}</div>
                        <div className="blog-author-role">{featuredArticle.authorRole}</div>
                      </div>
                    </div>

                    <button className="blog-read-btn">
                      <span>Read Article</span>
                      <ArrowRight size={14} className="ms-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Article Grid */}
        <div className="row">
          {gridArticles.map((article) => (
            <div key={article.id} className="col-lg-4 col-md-6 mb-4">
              <div 
                className="blog-grid-card h-100"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="blog-card-img-wrapper">
                  <img
                    src={article.image || '/assets/images/hero1.jpg'}
                    alt={article.title}
                    className="blog-card-img"
                    loading="lazy"
                  />
                  <div className="blog-card-img-overlay"></div>
                  <div className="blog-card-img-badges">
                    <span className="blog-badge-category">
                      {article.category}
                    </span>
                    <span className="blog-badge-time">
                      <Clock size={11} className="me-1 text-gold" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                <div className="blog-card-body">
                  <div className="blog-meta-info mb-2">
                    <span className="blog-meta-item">
                      <Calendar size={12} className="text-gold me-1" />
                      {article.date}
                    </span>
                  </div>

                  <h4 className="blog-card-title">
                    {article.title}
                  </h4>

                  <p className="blog-card-excerpt">
                    {article.excerpt}
                  </p>

                  <div className="blog-card-footer mt-auto pt-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="blog-author-avatar small">
                        {article.author ? article.author[0] : 'B'}
                      </div>
                      <span className="blog-author-name-sm">{article.author}</span>
                    </div>

                    <span className="blog-read-link">
                      <span>Read Full</span>
                      <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-5">
            <Filter size={32} className="text-gold mb-3 opacity-50" />
            <h4 className="text-white">No Articles Found</h4>
            <p className="text-muted">There are no articles published in this category yet.</p>
            <button
              className="btn btn-outline-warning mt-2"
              onClick={() => setActiveCategory('All')}
            >
              View All Articles
            </button>
          </div>
        )}

        {/* Bottom Consultation Advisory Banner */}
        <div className="blog-advisory-banner mt-4">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-12 mb-3 mb-lg-0">
              <h4 className="blog-advisory-title mb-1">
                Need Structural or Architectural Consultation in Telangana?
              </h4>
              <p className="blog-advisory-desc mb-0">
                From HMDA/GHMC approvals and soil bearing tests to luxury structural blueprints, our chartered engineering team is ready to evaluate your project.
              </p>
            </div>
            <div className="col-lg-4 col-md-12 text-lg-end">
              <button
                className="blog-advisory-btn"
                onClick={handleConsultClick}
              >
                <span>Request Architectural Brief</span>
                <ArrowRight size={15} className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Reader Modal */}
      {selectedArticle && (
        <BlogReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onConsultClick={handleConsultClick}
        />
      )}
    </section>
  );
};
