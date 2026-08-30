import React, { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { HeroSlider } from './components/Hero/HeroSlider';
import { AboutSection } from './components/About/AboutSection';
import { CapabilitiesSection } from './components/Capabilities/CapabilitiesSection';
import { WhyUsSection } from './components/WhyUs/WhyUsSection';
import { Footer } from './components/Footer/Footer';
import { ComingSoonModal } from './components/ComingSoon/ComingSoonModal';

export function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: ''
  });

  const handleOpenComingSoon = (title) => {
    setModalState({
      isOpen: true,
      title: title || 'Page'
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
      {/* Full Active Home Page */}
      <Navbar onOpenComingSoon={handleOpenComingSoon} />
      <HeroSlider onOpenComingSoon={handleOpenComingSoon} />
      <div className="content-wrapper">
        <section className="content-lines-wrapper">
          <div className="content-lines-inner">
            <div className="content-lines"></div>
          </div>
        </section>
        <AboutSection onOpenComingSoon={handleOpenComingSoon} />
        <CapabilitiesSection onOpenComingSoon={handleOpenComingSoon} />
        <WhyUsSection onOpenComingSoon={handleOpenComingSoon} />
        <Footer onOpenComingSoon={handleOpenComingSoon} />
      </div>

      {/* Under Construction / Coming Soon Overlay for Sub-Pages */}
      <ComingSoonModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        pageTitle={modalState.title}
      />
    </div>
  );
}

export default App;
