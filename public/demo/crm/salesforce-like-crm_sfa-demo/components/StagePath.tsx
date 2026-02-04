
import React from 'react';
import { Check } from 'lucide-react';
// STAGES is defined in constants.tsx, not types.ts
import { OpportunityStage } from '../types';
import { STAGES } from '../constants';

interface StagePathProps {
  currentStage: OpportunityStage;
}

export const StagePath: React.FC<StagePathProps> = ({ currentStage }) => {
  const currentIndex = STAGES.indexOf(currentStage);

  return (
    <div className="flex items-center w-full overflow-x-auto py-4">
      {STAGES.map((stage, index) => {
        const isCompleted = index < currentIndex || currentStage === 'Closed Won';
        const isCurrent = index === currentIndex && currentStage !== 'Closed Won';
        
        return (
          <div key={stage} className="flex-1 flex items-center min-w-[100px]">
            <div className={`relative h-8 flex-1 flex items-center justify-center text-[10px] md:text-xs font-bold transition-colors
              ${isCompleted ? 'bg-green-600 text-white' : isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}
              ${index === 0 ? 'rounded-l-full pl-2' : ''}
              ${index === STAGES.length - 1 ? 'rounded-r-full pr-2' : ''}
              ${index !== STAGES.length - 1 ? 'mr-1' : ''}
            `}>
              {isCompleted ? <Check size={12} className="mr-1" /> : null}
              {stage}
              {/* Chevron effect (simplified) */}
              {index !== STAGES.length - 1 && (
                 <div className="absolute -right-1 top-0 bottom-0 w-2 z-10">
                   <div className="w-4 h-4 mt-2 bg-inherit transform rotate-45 translate-x-1 border-r border-t border-white"></div>
                 </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
