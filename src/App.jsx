import React, { useState } from 'react';
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
import { TestimonialsSection } from './components/Testimonials/TestimonialsSection';
import { Footer } from './components/Footer/Footer';
import { ComingSoonModal } from './components/ComingSoon/ComingSoonModal';
import { AdminDashboardModal } from './components/Admin/AdminDashboardModal';

function MainApp() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: ''
  });

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

  return (
    <div className="app-container">
      {/* Dynamic Header */}
      <Navbar onOpenComingSoon={handleOpenComingSoon} />
      
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

        {/* 11. Client Testimonials & Endorsements */}
        <TestimonialsSection onOpenComingSoon={handleOpenComingSoon} />

        {/* 12. Footer & Office Maps */}
        <Footer onOpenComingSoon={handleOpenComingSoon} />
      </div>

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
