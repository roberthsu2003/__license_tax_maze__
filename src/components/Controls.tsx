/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface ControlsProps {
  onMove: (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
}

export const Controls = ({ onMove }: ControlsProps) => {
  const btnClass = "w-12 h-12 flex items-center justify-center bg-white/10 border-2 border-white/20 rounded-lg text-white active:bg-emerald-500 active:text-slate-900 transition-colors shadow-lg";

  return (
    <div className="grid grid-cols-3 gap-2">
      <div />
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => onMove('UP')}
        className={btnClass}
      >
        <ChevronUp size={24} />
      </motion.button>
      <div />

      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => onMove('LEFT')}
        className={btnClass}
      >
        <ChevronLeft size={24} />
      </motion.button>
      <div className="w-12 h-12 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
        Wash
      </div>
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => onMove('RIGHT')}
        className={btnClass}
      >
        <ChevronRight size={24} />
      </motion.button>

      <div />
      <motion.button 
        whileTap={{ scale: 0.9 }}
        onClick={() => onMove('DOWN')}
        className={btnClass}
      >
        <ChevronDown size={24} />
      </motion.button>
      <div />
    </div>
  );
};
