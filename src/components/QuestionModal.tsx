/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, GraduationCap } from 'lucide-react';
import { Question } from '../types';
import { useState } from 'react';

interface QuestionModalProps {
  question: Question;
  onClose: () => void;
  onCorrect: () => void;
}

export const QuestionModal = ({ question, onClose, onCorrect }: QuestionModalProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionClick = (index: number) => {
    if (isCorrect) return;
    setSelectedOption(index);
    if (index === question.answerIndex) {
      setIsCorrect(true);
      onCorrect();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
        animate={{ scale: 1, opacity: 1, rotate: 1 }}
        exit={{ scale: 0.9, opacity: 0, rotate: 0 }}
        className="relative w-full max-w-2xl bg-[#1B4D3E] border-[12px] border-[#5D4037] rounded-lg shadow-[inset_0_0_40px_rgba(0,0,0,0.5),0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Header */}
        <div className="absolute -top-2 left-6 px-4 py-1 bg-yellow-400 text-black font-bold text-sm transform -rotate-2 z-10">
           新北租稅小教室
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <X size={28} />
        </button>

        {/* Content */}
        <div className="p-10 pt-12 font-cursive text-white">
          {!isCorrect ? (
            <>
              <h3 className="text-2xl font-black mb-8 leading-relaxed tracking-wide">
                Q{question.id}：{question.question}
              </h3>
              <div className="space-y-4">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`
                      w-full text-left p-4 rounded border transition-all flex items-center gap-4 group
                      ${selectedOption === idx 
                        ? (idx === question.answerIndex 
                          ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-400' 
                          : 'border-red-500/50 bg-red-950/30 text-red-300') 
                        : 'border-white/20 hover:bg-white/10'}
                    `}
                  >
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full border border-white/40 transition-colors
                      ${selectedOption === idx && idx === question.answerIndex ? 'bg-emerald-400 text-black border-emerald-400' : 'group-hover:bg-white group-hover:text-black'}
                    `}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xl">{option}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-6"
            >
              <div className="flex items-center gap-4 mb-6 text-emerald-400">
                 <CheckCircle2 size={40} />
                 <span className="text-3xl font-black italic">答對了！</span>
              </div>
              
              <div className="mt-8 pt-6 border-t border-dashed border-white/20 text-emerald-100 text-lg leading-relaxed">
                 <p className="opacity-90">💡 {question.successMessage}</p>
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-12 rounded border border-white/30 transition-colors uppercase tracking-widest text-sm"
                >
                  確認並繼續
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chalk detail */}
        <div className="absolute bottom-2 right-10 flex gap-4 opacity-30">
          <div className="w-10 h-3 bg-white rounded-sm rotate-12" />
          <div className="w-8 h-3 bg-yellow-200 rounded-sm -rotate-6" />
        </div>
      </motion.div>
    </div>
  );
};
