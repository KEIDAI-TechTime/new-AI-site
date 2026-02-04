
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { TOOLTIPS } from '../constants';

interface InfoIconProps {
  id: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({ id }) => {
  const [show, setShow] = useState(false);
  const text = TOOLTIPS[id];

  if (!text) return null;

  return (
    <div className="relative inline-block ml-1">
      <Info
        size={14}
        className="text-gray-400 cursor-help hover:text-blue-500 transition-colors"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs p-2 rounded shadow-lg pointer-events-none">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};
