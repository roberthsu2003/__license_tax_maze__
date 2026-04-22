/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Car, Play, Info } from 'lucide-react';

interface TitleScreenProps {
  onStart: () => void;
}

export const TitleScreen = ({ onStart }: TitleScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F172A] border-x-gray-50 p-6 text-center w-full">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-black text-emerald-400 mb-4 drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
          使用牌照稅迷宮大冒險
        </h1>
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ 
              x: [0, 20, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
             <Car size={80} className="text-red-500 fill-red-500/20 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-2xl bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border-2 border-slate-700 mb-10 shadow-2xl"
      >
        <p className="text-xl text-slate-200 mb-6 leading-relaxed">
          暗光鳥們開車開到一座迷宮內，請幫助他們解答各樣租稅謎題，以找到回家的路吧！(共4題)
        </p>
        
        <div className="flex flex-col gap-4 text-emerald-400 text-sm md:text-base font-medium bg-black/40 p-4 rounded-xl border border-emerald-500/20">
           <div className="flex items-center gap-2 justify-center">
             <Info size={18} />
             <span>操作系統：方向鍵移動測試車輛 // 滑鼠進行診斷問答</span>
           </div>
           <p className="opacity-50 font-mono uppercase tracking-widest text-[10px]">High Density Data Build v1.0</p>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 px-12 rounded-xl text-2xl transition-all shadow-[0_6px_0_rgb(6,95,70)] hover:shadow-[0_4px_0_rgb(6,95,70)] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px]"
      >
        <Play size={28} className="transition-transform group-hover:scale-110" />
        <span>啟動系統</span>
      </motion.button>
    </div>
  );
};
