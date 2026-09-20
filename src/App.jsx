import React, { useState, useEffect } from 'react';
import { CmsProvider } from './context/CmsContext';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSlider } from './components/Hero/HeroSlider';
import { AboutSection } from './components/About/AboutSection';
import { ProjectsGallerySection } from './components/Gallery/ProjectsGallerySection';
import { CapabilitiesSection } from './components/Capabilities/CapabilitiesSection';
import { TypologiesSection } from './components/Typologies/TypologiesSection';
import { WorkflowSection } from './components/Workflow/WorkflowSection';
import { DesignMatrixSection } from './components/DesignMatrix/DesignMatrixSection';
import { WhyUsSection } from './components/WhyUs/WhyUsSection';
import { BlogSection } from './components/Blog/BlogSection';
import { BlogArticlePage } from './components/Blog/BlogArticlePage';
import { TestimonialsSection } from './components/Testimonials/TestimonialsSection';
import { ConsultationBookingSection } from './components/Consultation/ConsultationBookingSection';
import { FloatingQuickConnect } from './components/FloatingWidget/FloatingQuickConnect';
import { Footer } from './components/Footer/Footer';
import { ComingSoonModal } from './components/ComingSoon/ComingSoonModal';
import { AdminDashboardModal } from './components/Admin/AdminDashboardModal';

function MainApp() {
  const [currentArticle, setCurrentArticle] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: ''
  });
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById('home');
      if (hero) {
        const heroBottom = hero.getBoundingClientRect().bottom;
        setPastHero(heroBottom <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenComingSoon = (title) => {
    setModalState({
      isOpen: true,
      title: title || 'Consultation'
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      title: ''
    });
  };

  const handleNavigate = (targetId) => {
    if (currentArticle) {
      setCurrentArticle(null);
      setTimeout(() => {
        if (targetId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackToBlog = () => {
    setCurrentArticle(null);
    setTimeout(() => {
      const el = document.getElementById('blog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="app-container">
      {/* Global Background Watermark — hidden in hero, visible after scroll */}
      <div
        aria-hidden="true"
        className={`global-watermark${pastHero ? ' visible' : ''}`}
      />

      {/* Dynamic Header */}
      <Navbar 
        onOpenComingSoon={handleOpenComingSoon} 
        onNavigate={handleNavigate}
      />
      
      {currentArticle ? (
        /* Dedicated Full-Page Article Reader View */
        <div className="article-page-view-container">
          <BlogArticlePage
            article={currentArticle}
            onBack={handleBackToBlog}
            onSelectArticle={(art) => {
              setCurrentArticle(art);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenConsultation={handleOpenComingSoon}
          />
          <Footer onOpenComingSoon={handleOpenComingSoon} />
        </div>
      ) : (
        /* Standard Landing Page Experience */
        <>
          {/* Luxury Hero Carousel */}
          <HeroSlider />
          
          <div className="content-wrapper">
            <section className="content-lines-wrapper">
              <div className="content-lines-inner">
                <div className="content-lines"></div>
              </div>
            </section>

            {/* 1. About & Leadership (Stat-Driven) */}
            <AboutSection onOpenComingSoon={handleOpenComingSoon} />

            {/* 2. Curated Live Architectural Portfolio & Projects Gallery */}
            <ProjectsGallerySection />

            {/* 3. 3 Core Integrated Solution Pillars & Services */}
            <CapabilitiesSection onOpenComingSoon={handleOpenComingSoon} />

            {/* 5. Project Typologies (Residential & Commercial Sectors) */}
            <TypologiesSection onOpenComingSoon={handleOpenComingSoon} />

            {/* 6. 6-Stage Delivery Workflow Framework */}
            <WorkflowSection onOpenComingSoon={handleOpenComingSoon} />

            {/* 7. Design Matrix, Operational Standards & Technical Deliverables */}
            <DesignMatrixSection onOpenComingSoon={handleOpenComingSoon} />

            {/* 10. Why Buildscape & Founder's Statement */}
            <WhyUsSection />

            {/* 11. Architectural Journal & Blog Articles */}
            <BlogSection onReadArticle={(art) => setCurrentArticle(art)} />

            {/* 12. Client Testimonials & Endorsements */}
            <TestimonialsSection onOpenComingSoon={handleOpenComingSoon} />

            {/* 13. High-Converting Direct Lead Consultation Booking Section */}
            <ConsultationBookingSection />

            {/* 14. Footer & Office Maps */}
            <Footer onOpenComingSoon={handleOpenComingSoon} />
          </div>
        </>
      )}

      {/* 24/7 Direct Floating Quick-Connect Widget (WhatsApp + Call) */}
      <FloatingQuickConnect />

      {/* Interactive Consultation Modal */}
      <ComingSoonModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        pageTitle={modalState.title}
      />

      {/* Complete CMS Admin Dashboard */}
      <AdminDashboardModal />
    </div>
  );
}

export function App() {
  return (
    <CmsProvider>
      <MainApp />
    </CmsProvider>
  );
}

export default App;
