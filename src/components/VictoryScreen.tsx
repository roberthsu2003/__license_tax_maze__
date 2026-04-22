/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Bird, Mic, RotateCcw, ExternalLink } from 'lucide-react';

interface VictoryScreenProps {
  onRestart: () => void;
}

export const VictoryScreen = ({ onRestart }: VictoryScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 p-6 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative mb-12"
      >
        <div className="absolute -top-10 -right-10 bg-yellow-400 p-2 rounded-full border-4 border-slate-900">
           <Mic size={40} className="text-slate-900" />
        </div>
        <Bird size={120} className="text-blue-400 fill-blue-400/20" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg mb-10 border-4 border-yellow-400"
      >
        <h2 className="text-3xl font-black text-slate-800 mb-4">大獲全勝！</h2>
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          恭喜通關！歡迎至本處官網挑戰其他租稅小遊戲！
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="flex items-center gap-2 bg-yellow-400 text-slate-900 font-bold py-3 px-8 rounded-xl text-xl shadow-lg border-2 border-yellow-500"
        >
          <RotateCcw size={20} />
          <span>再玩一次</span>
        </motion.button>
        
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="https://www.tax.ntpc.gov.tw/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-500 text-white font-bold py-3 px-8 rounded-xl text-xl shadow-lg border-2 border-blue-600"
        >
          <ExternalLink size={20} />
          <span>官網逛逛</span>
        </motion.a>
      </div>
    </div>
  );
};
