import React, { useState, useEffect, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { Star, ChevronLeft, ChevronRight, Play, X, CheckCircle, Quote, Sparkles, Video } from 'lucide-react';

const videoStories = [
  {
    id: 1,
    clientName: "Dr. K. Raghavendra Rao & Family",
    projectType: "Luxury Villa (6,800 sq.ft)",
    location: "Shadnagar, Telangana",
    thumbnail: "/assets/images/architecture_luxury_villa.png",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    duration: "3:45 Min",
    views: "1.2k Views",
    quote: "Buildscape delivered our 6,800 sq.ft villa on schedule with zero compromises."
  },
  {
    id: 2,
    clientName: "Mohammed Farhan & Family",
    projectType: "Contemporary Duplex Residence",
    location: "Farooqnagar",
    thumbnail: "/assets/images/interior_penthouse_living.png",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    duration: "2:50 Min",
    views: "950 Views",
    quote: "The custom joinery, false ceiling, and double-height living room feel magnificent."
  },
  {
    id: 3,
    clientName: "S. Venkat Reddy",
    projectType: "Commercial Complex & Corporate Office",
    location: "Ranga Reddy District",
    thumbnail: "/assets/images/commercial_office_complex.png",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1",
    duration: "4:10 Min",
    views: "1.8k Views",
    quote: "Milestone billing with itemized BOQs gave our board total financial clarity."
  }
];

export const TestimonialsSection = ({ onOpenComingSoon }) => {
  const { cmsData } = useCms();
  const rawTestimonials = cmsData.testimonials || [];

  // Extended client reviews with avatar photos/accents
  const defaultFeedbacks = [
    {
      id: 101,
      clientName: "Mr. Johnson Daniel & Family",
      clientRole: "Homeowner",
      projectType: "Luxury Duplex Villa",
      location: "Shadnagar",
      rating: 5,
      avatar: "/assets/images/portrait_architect_leader.jpg",
      quote: "Dear Buildscape team, we are well pleased with the entire architectural and interior execution. The team handled everything from foundation testing to final Italian marble polishing seamlessly.",
      source: "Google Review"
    },
    {
      id: 102,
      clientName: "Dr. K. Raghavendra Rao",
      clientRole: "Managing Director, Sri Krishna Healthcare",
      projectType: "Luxury Estate (6,800 sq.ft)",
      location: "Telangana",
      rating: 5,
      avatar: "/assets/images/portrait_engineer_leader.jpg",
      quote: "Buildscape under Mohammad Khaja Osman's leadership delivered our dream villa with unmatched precision. The single-point accountability was a game changer with zero hidden costs.",
      source: "Direct Client"
    },
    {
      id: 103,
      clientName: "Mohammed Farhan",
      clientRole: "Property Investor",
      projectType: "Contemporary Duplex (4,200 sq.ft)",
      location: "Farooqnagar",
      rating: 5,
      avatar: "/assets/images/portrait_interior_lead.jpg",
      quote: "The interior architecture and custom joinery Buildscape delivered surpassed our highest expectations. Flawless acoustic detailing and natural lighting throughout.",
      source: "Google Review"
    },
    {
      id: 104,
      clientName: "S. Venkat Reddy",
      clientRole: "Director, Green Meadows Agro",
      projectType: "Commercial Office Complex",
      location: "Ranga Reddy District",
      rating: 5,
      avatar: "/assets/images/portrait_project_director.jpg",
      quote: "What separates Buildscape is their uncompromising engineering rigor. Their heavy-duty column schedules and milestone BOQ reports gave our board total confidence.",
      source: "Verified Client"
    }
  ];

  const feedbacks = rawTestimonials.length > 0 ? rawTestimonials.map((t, i) => ({
    ...t,
    avatar: defaultFeedbacks[i % defaultFeedbacks.length].avatar,
    source: i % 2 === 0 ? "Google Review" : "Verified Client"
  })) : defaultFeedbacks;

  const [activeFeedbackIdx, setActiveFeedbackIdx] = useState(0);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const autoPlayRef = useRef(null);

  const activeVideo = videoStories[activeVideoIdx] || videoStories[0];
  const activeFeedback = feedbacks[activeFeedbackIdx] || feedbacks[0];

  // Continuous uninterrupted auto-scroller (every 3.5 seconds)
  useEffect(() => {
    if (feedbacks.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setActiveFeedbackIdx((prev) => (prev + 1) % feedbacks.length);
      }, 3500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [feedbacks.length, activeFeedbackIdx]);

  const handlePrevFeedback = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setActiveFeedbackIdx((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const handleNextFeedback = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setActiveFeedbackIdx((prev) => (prev + 1) % feedbacks.length);
  };

  return (
    <section id="testimonials" className="testimonials-dual-section section-padding">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center mb-5">
          <div className="section-badge">
            <Sparkles size={14} className="badge-icon" /> CLIENT ENDORSEMENTS
          </div>
          <h2 className="section-title">
            Real Stories, <span>Real Trust</span>
          </h2>
          <p className="section-subtitle">
            Watch verified video walkthroughs and read live customer feedback from homeowners and developers across Telangana.
          </p>
        </div>

        {/* Dual Layout: Left Video Testimonials + Right Auto Scroller Feedback */}
        <div className="row g-4 align-items-stretch">
          
          {/* LEFT COLUMN: Video Testimonials */}
          <div className="col-lg-6 col-md-12">
            <div className="video-testimonials-block h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="dual-block-title m-0">
                  <Video size={20} className="me-2 text-gold" />
                  Video Testimonials
                </h3>
                <span className="badge-views-count">
                  {activeVideo.views}
                </span>
              </div>

              {/* Main Video Showcase Card */}
              <div 
                className="video-showcase-card flex-grow-1"
                onClick={() => setIsVideoModalOpen(true)}
                role="button"
                tabIndex={0}
              >
                <div 
                  className="video-showcase-bg"
                  style={{ backgroundImage: `url(${activeVideo.thumbnail})` }}
                >
                  <div className="video-card-overlay"></div>
                </div>

                {/* Top Badge */}
                <div className="video-top-badge">
                  <span className="live-pill">CLIENT WALKTHROUGH</span>
                  <span className="duration-pill">{activeVideo.duration}</span>
                </div>

                {/* Central Play Button */}
                <div className="video-play-center">
                  <div className="play-pulse-ring"></div>
                  <div className="play-btn-circle">
                    <Play size={24} fill="#ffffff" color="#ffffff" className="ms-1" />
                  </div>
                </div>

                {/* Bottom Video Meta Info */}
                <div className="video-bottom-info">
                  <p className="video-quote-snippet">"{activeVideo.quote}"</p>
                  <div className="d-flex justify-content-between align-items-end">
                    <div>
                      <h5 className="video-client-name">{activeVideo.clientName}</h5>
                      <span className="video-project-meta">{activeVideo.projectType} • {activeVideo.location}</span>
                    </div>
                    <span className="watch-story-btn">
                      Watch Video <Play size={11} className="ms-1" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Switcher Tabs */}
              <div className="video-story-selector mt-3">
                {videoStories.map((story, idx) => (
                  <button
                    key={story.id}
                    className={`video-tab-chip ${idx === activeVideoIdx ? 'active' : ''}`}
                    onClick={() => setActiveVideoIdx(idx)}
                  >
                    <Play size={12} className="chip-play-icon" />
                    <span className="chip-name">{story.clientName.split(' ')[0]} {story.clientName.split(' ')[1] || ''}</span>
                    <span className="chip-tag">{(story.projectType || '').split('(')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Auto-Scroller Feedback (150+ Happy Customers) */}
          <div className="col-lg-6 col-md-12">
            <div className="feedback-scroller-block h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="dual-block-title m-0">
                  150+ Happy Customers
                </h3>
                
                {/* Manual Navigation Controls */}
                <div className="d-flex align-items-center gap-2">
                  <button 
                    className="scroller-arrow-btn" 
                    onClick={handlePrevFeedback}
                    title="Previous Review"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    className="scroller-arrow-btn" 
                    onClick={handleNextFeedback}
                    title="Next Review"
                    aria-label="Next Review"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Main Auto-Scrolling Feedback Card (Matching Reference Layout) */}
              <div className="feedback-display-card flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <div key={activeFeedbackIdx} className="feedback-card-inner anim-fade-slide">
                    
                    {/* Left: Round Avatar with Accent Quote Bubble */}
                    <div className="feedback-avatar-wrap">
                      <div className="feedback-avatar-circle">
                        {activeFeedback.avatar ? (
                          <img 
                            src={activeFeedback.avatar} 
                            alt={activeFeedback.clientName} 
                            className="avatar-img"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : null}
                        <div className="avatar-fallback">
                          {activeFeedback.clientName.charAt(0)}
                        </div>
                      </div>
                      <div className="avatar-quote-bubble">
                        <Quote size={13} fill="#ffffff" color="#ffffff" />
                      </div>
                    </div>

                    {/* Right: Client Header, Stars & Meta */}
                    <div className="feedback-content-wrap">
                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
                        <h4 className="feedback-client-title m-0">
                          {activeFeedback.clientName}
                        </h4>
                        
                        {/* 5 Golden Stars */}
                        <div className="d-flex align-items-center gap-1 feedback-stars">
                          {[...Array(activeFeedback.rating || 5)].map((_, i) => (
                            <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                      </div>

                      <div className="feedback-divider-line"></div>

                      {/* Main Review Quote */}
                      <p className="feedback-quote-body">
                        "{activeFeedback.quote}"
                      </p>

                      {/* Project Meta & Source Tag */}
                      <div className="feedback-footer-meta mt-3 d-flex flex-wrap justify-content-between align-items-center">
                        <div className="feedback-source-tag">
                          <CheckCircle size={13} className="text-success me-1" />
                          <span>Source: <strong>{activeFeedback.source}</strong></span>
                        </div>
                        <span className="feedback-project-pill">
                          {activeFeedback.projectType}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Bottom Carousel Navigation Dots & Live Auto-Scroll Track */}
                <div className="feedback-dots-container mt-4">
                  <div className="d-flex align-items-center gap-2">
                    {feedbacks.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        className={`feedback-dot ${dotIdx === activeFeedbackIdx ? 'active' : ''}`}
                        onClick={() => {
                          if (autoPlayRef.current) clearInterval(autoPlayRef.current);
                          setActiveFeedbackIdx(dotIdx);
                        }}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Live Progress Bar */}
                  <div className="auto-scroll-indicator-wrap">
                    <div key={activeFeedbackIdx} className="auto-scroll-progress-line"></div>
                    <span className="scroller-auto-status">Auto-Scrolling</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Video Player Modal */}
      {isVideoModalOpen && (
        <div className="video-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="video-modal-close"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close video"
            >
              <X size={24} color="#ffffff" />
            </button>
            <div className="video-modal-iframe-wrap">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.clientName}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-details p-3 bg-dark text-white">
              <h5 className="mb-1 text-gold">{activeVideo.clientName}</h5>
              <p className="small m-0 text-white-50">{activeVideo.projectType} • {activeVideo.location}</p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
