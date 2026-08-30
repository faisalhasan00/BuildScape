import React from 'react';
import { ArrowRight } from 'lucide-react';

export const DisciplineCard = ({ category, title, linkText = 'Enter site', onOpenComingSoon }) => {
  return (
    <div className="col-lg-6 col-md-12 mb-4">
      <div className="discipline-card">
        <p>{category}</p>
        <h5>{title}</h5>
        <button 
          className="buildscape-btn border-0 bg-transparent cursor-pointer p-0"
          onClick={() => onOpenComingSoon && onOpenComingSoon(title)}
        >
          {linkText} <ArrowRight size={16} className="arrow" />
        </button>
      </div>
    </div>
  );
};
