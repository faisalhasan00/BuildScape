import React from 'react';
import { 
  Users, 
  Key, 
  FileSpreadsheet, 
  ShieldAlert, 
  Box, 
  Layers, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Award,
  CalendarCheck, 
  Compass, 
  Brain, 
  Truck, 
  FileText 
} from 'lucide-react';

const iconMap = {
  Users,
  Key,
  FileSpreadsheet,
  ShieldAlert,
  Box,
  Layers,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  CalendarCheck,
  Compass,
  Brain,
  Truck,
  FileText
};

export const WhyUsCard = ({ iconName, title, description, index }) => {
  const IconComponent = iconMap[iconName] || Users;

  return (
    <div className="why-card">
      <div className="why-card-header">
        <div className="icon-circle">
          <IconComponent size={22} />
        </div>
        {index !== undefined && (
          <span className="why-card-index">{String(index + 1).padStart(2, '0')}</span>
        )}
      </div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
};
