
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'navy' | 'gold' | 'success' | 'warning' | 'error' | 'gray';
  pill?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'navy', pill = false }) => {
  const variants = {
    navy: 'bg-[#0a1628] text-white',
    gold: 'bg-[#c9a962] text-[#0a1628]',
    success: 'bg-[#059669] text-white',
    warning: 'bg-[#d97706] text-white',
    error: 'bg-[#dc2626] text-white',
    gray: 'bg-gray-400 text-white',
  };

  return (
    <span className={`px-3 py-0.5 text-xs font-bold ${variants[variant]} ${pill ? 'rounded-full' : 'rounded'} whitespace-nowrap`}>
      {children}
    </span>
  );
};

export default Badge;
