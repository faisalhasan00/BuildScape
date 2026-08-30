import React from 'react';
import { Users, CalendarCheck, Compass, Brain, Truck, FileText } from 'lucide-react';

const iconMap = {
  Users: Users,
  CalendarCheck: CalendarCheck,
  Compass: Compass,
  Brain: Brain,
  Truck: Truck,
  FileText: FileText
};

export const WhyUsCard = ({ iconName, title, description }) => {
  const IconComponent = iconMap[iconName] || Users;

  return (
    <div className="why-card">
      <div className="icon-circle">
        <IconComponent size={24} />
      </div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
};
