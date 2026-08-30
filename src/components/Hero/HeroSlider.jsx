import React, { useState, useEffect } from 'react';
import { heroSlides } from '../../data/siteData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <header id="home" className="header slider-fade">
      <div className="hero-slider-container">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide-item ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}

        <div className="hero-slide-overlay">
          <div className="container">
            <div className="hero-caption">
              <h1>{heroSlides[currentIndex].title}</h1>
              <p>{heroSlides[currentIndex].subtitle}</p>
            </div>
          </div>
        </div>

        {/* Controls & Pagination */}
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
      </div>
    </header>
  );
};
