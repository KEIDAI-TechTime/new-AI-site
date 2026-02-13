
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center gap-2 px-5 py-2.5 font-medium rounded-md transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-gradient-to-br from-[#132238] to-[#1e3a5f] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-white border border-gray-300 text-[#0a1628] hover:bg-gray-50 shadow-sm hover:shadow-md hover:-translate-y-0.5"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

export default Button;
