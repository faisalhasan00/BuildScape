import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSlider = () => {
  const { cmsData } = useCms();
  const heroSlides = cmsData.heroSlides || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  if (heroSlides.length === 0) return null;

  const currentSlide = heroSlides[currentIndex] || heroSlides[0];

  return (
    <header id="home" className="header slider-fade">
      <div className="hero-slider-container">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`hero-slide-item ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        <div className="hero-slide-overlay">
          <div className="container">
            <div className="hero-caption">
              <h1>{currentSlide.title}</h1>
              <p>{currentSlide.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Controls & Pagination */}
        {heroSlides.length > 1 && (
          <>
            <button className="slider-control prev" onClick={prevSlide} aria-label="Previous Slide">
              <ChevronLeft size={28} />
            </button>
            <button className="slider-control next" onClick={nextSlide} aria-label="Next Slide">
              <ChevronRight size={28} />
            </button>

            <div className="slider-dots">
              {heroSlides.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
};
