import React from 'react';

export const CapabilityCard = ({ title, image, description, onOpenComingSoon }) => {
  return (
    <div className="capability-card-item">
      <div 
        className="position-re o-hidden cursor-pointer"
        onClick={() => onOpenComingSoon && onOpenComingSoon(title)}
      >
        <img src={image} alt={title} />
      </div>
      <div className="con">
        <h5>
          <button 
            className="border-0 bg-transparent text-start p-0 cursor-pointer font-weight-bold"
            onClick={() => onOpenComingSoon && onOpenComingSoon(title)}
          >
            {title}
          </button>
        </h5>
        <p className="capability-text">{description}</p>
        <div className="line"></div>
      </div>
    </div>
  );
};
