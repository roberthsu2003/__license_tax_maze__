/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TitleScreen } from './components/TitleScreen';
import { MazeBoard } from './components/MazeBoard';
import { QuestionModal } from './components/QuestionModal';
import { VictoryScreen } from './components/VictoryScreen';
import { Controls } from './components/Controls';
import { MAZE_MAP, GRID_SIZE, TAX_QUESTIONS, AUDIO_URLS } from './constants';
import { GameState, Coordinate, PuzzleMarker, Direction } from './types';
import { useAudio } from './hooks/useAudio';
import { PartyPopper, RotateCcw } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('TITLE');
  const [carPos, setCarPos] = useState<Coordinate>({ x: 1, y: 1 });
  const [carDir, setCarDir] = useState<Direction>('RIGHT');
  const [puzzles, setPuzzles] = useState<PuzzleMarker[]>([
    { x: 11, y: 1, id: 0, solved: false },
    { x: 1, y: 3, id: 1, solved: false },
    { x: 5, y: 6, id: 2, solved: false },
    { x: 13, y: 9, id: 3, solved: false },
  ]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | null>(null);
  const [showExitHint, setShowExitHint] = useState(false);
  
  const { playBGM, stopBGM, playSFX } = useAudio();

  const exitPos = useMemo(() => ({ x: 14, y: 13 }), []);
  
  const solvedCount = puzzles.filter(p => p.solved).length;
  const isAllSolved = solvedCount === 4;

  const handleStart = () => {
    playBGM(AUDIO_URLS.BGM);
    playSFX(AUDIO_URLS.CLICK);
    setGameState('PLAYING');
  };

  const handleRestart = () => {
    setCarPos({ x: 1, y: 1 });
    setCarDir('RIGHT');
    setPuzzles(puzzles.map(p => ({ ...p, solved: false })));
    setActiveQuestionIdx(null);
    setShowExitHint(false);
    setGameState('TITLE');
    stopBGM();
  };

  const moveCar = useCallback((dx: number, dy: number, dir: Direction) => {
    if (gameState !== 'PLAYING' || activeQuestionIdx !== null) return;

    setCarDir(dir);

    setCarPos(prev => {
      const nextX = prev.x + dx;
      const nextY = prev.y + dy;

      // Bounds check
      if (nextX < 0 || nextX >= GRID_SIZE || nextY < 0 || nextY >= GRID_SIZE) return prev;

      // Wall collision
      if (MAZE_MAP[nextY][nextX] === 0) return prev;

      // Exit check
      if (nextX === exitPos.x && nextY === exitPos.y && isAllSolved) {
        setGameState('VICTORY');
        playSFX(AUDIO_URLS.VICTORY);
        stopBGM();
        return { x: nextX, y: nextY };
      }

      // Check for puzzles
      const puzzleIdx = puzzles.findIndex(p => p.x === nextX && p.y === nextY && !p.solved);
      if (puzzleIdx !== -1) {
        setActiveQuestionIdx(puzzleIdx);
        playSFX(AUDIO_URLS.CLICK);
      }

      return { x: nextX, y: nextY };
    });
  }, [gameState, activeQuestionIdx, puzzles, isAllSolved, exitPos, playSFX, stopBGM]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': moveCar(0, -1, 'UP'); break;
        case 'ArrowDown': moveCar(0, 1, 'DOWN'); break;
        case 'ArrowLeft': moveCar(-1, 0, 'LEFT'); break;
        case 'ArrowRight': moveCar(1, 0, 'RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveCar]);

  const handlePuzzleSolved = () => {
    setPuzzles(prev => {
      const updated = [...prev];
      if (activeQuestionIdx !== null) {
        updated[activeQuestionIdx].solved = true;
      }
      return updated;
    });
    playSFX(AUDIO_URLS.CORRECT);
    
    // Check if that was the last one
    if (solvedCount === 3) {
      setTimeout(() => {
        setShowExitHint(true);
        playSFX(AUDIO_URLS.DOOR);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans selection:bg-emerald-400 selection:text-slate-900 overflow-hidden flex flex-col md:flex-row p-4 gap-4">
      {/* Orientation Warning Overlay */}
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-8 text-center md:hidden portrait:hidden">
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mb-6 text-emerald-400"
        >
          <RotateCcw size={64} />
        </motion.div>
        <h2 className="text-2xl font-black text-white mb-4">請轉回直向操作</h2>
        <p className="text-slate-400 leading-relaxed">
          為了提供最佳的遊戲體驗，<br/>請將您的行動裝置轉回「直向」模式。
        </p>
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'TITLE' && (
          <motion.div 
            key="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex items-center justify-center h-full"
          >
            <TitleScreen onStart={handleStart} />
          </motion.div>
        )}

        {gameState === 'PLAYING' && (
          <>
            {/* Sidebar */}
            <motion.aside 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-full md:w-72 flex flex-col gap-4 z-10"
            >
              {/* App Info Header */}
              <div className="bg-slate-800/80 p-5 border-2 border-slate-700 rounded-2xl">
                <h1 className="text-2xl font-black text-emerald-400 leading-tight">
                  使用牌照稅<br/>迷宮大冒險
                </h1>
                <p className="text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest">
                  V1.0 Stable Build // {carPos.x},{carPos.y}
                </p>
              </div>

              {/* Mission Progress */}
              <div className="bg-slate-800/80 p-5 border-2 border-slate-700 rounded-2xl flex-1">
                <h2 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-[0.2em] border-b border-slate-700 pb-2">
                  任務進度系統
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">已解謎題</span>
                    <span className="text-emerald-400 font-mono text-xl">{solvedCount} / 4</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(solvedCount/4) * 100}%` }}
                      className="bg-emerald-500 h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                    />
                  </div>
                  
                  <ul className="text-[11px] space-y-3 mt-6 text-slate-400">
                    {puzzles.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${p.solved ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]' : 'border border-slate-600'}`} />
                        <span className={p.solved ? 'text-slate-200' : 'text-slate-500'}>
                          第{idx + 1}題：{TAX_QUESTIONS[idx].question.substring(0, 8)}... {p.solved ? '(完成)' : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Status Bar */}
              <div className="bg-slate-800/80 p-4 border-2 border-slate-700 rounded-2xl md:block hidden">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-2">
                  <span>SUBSYSTEM_STATUS: OK</span>
                  <span>{Date.now() % 100}%</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i < 8 ? 'bg-emerald-500/40' : 'bg-slate-700'}`} />
                  ))}
                </div>
              </div>

              {/* End Game Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRestart}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border-2 border-red-500/50 p-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
              >
                結束遊戲
              </motion.button>
            </motion.aside>

            {/* Main Game Area */}
            <motion.main 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex-1 relative bg-slate-900 rounded-2xl overflow-hidden border-4 border-slate-800 flex flex-col shadow-inner"
            >
              <div className="flex-1 flex flex-col items-center justify-center relative">
                <MazeBoard 
                  carPos={carPos}
                  carDir={carDir}
                  puzzles={puzzles}
                  showExit={isAllSolved}
                  exitPos={exitPos}
                />
                
                <div className="scanline"></div>
              </div>

              {/* Mobile Controls & Footer */}
              <div className="p-4 bg-slate-800/50 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                <div className="justify-self-center">
                  <Controls onMove={(dir) => {
                    if (dir === 'UP') moveCar(0, -1, 'UP');
                    if (dir === 'DOWN') moveCar(0, 1, 'DOWN');
                    if (dir === 'LEFT') moveCar(-1, 0, 'LEFT');
                    if (dir === 'RIGHT') moveCar(1, 0, 'RIGHT');
                  }} />
                </div>
                <div className="hidden lg:block text-[10px] font-mono text-emerald-500/60 uppercase text-center">
                  Coordinates: X={carPos.x} Y={carPos.y} | Tile: {MAZE_MAP[carPos.y][carPos.x]}
                </div>
              </div>
            </motion.main>

            {/* Exit Hint Modal */}
            <AnimatePresence>
              {showExitHint && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="fixed top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 p-4 px-8 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-4 border-2 border-emerald-300 z-50 pointer-events-none"
                >
                  <PartyPopper size={24} className="animate-bounce" />
                  <p className="font-bold text-sm tracking-tight italic">出口已解鎖：請前往右下角木門</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question Modal */}
            <AnimatePresence>
              {activeQuestionIdx !== null && (
                <QuestionModal
                  question={TAX_QUESTIONS[activeQuestionIdx]}
                  onCorrect={handlePuzzleSolved}
                  onClose={() => setActiveQuestionIdx(null)}
                />
              )}
            </AnimatePresence>
          </>
        )}

        {gameState === 'VICTORY' && (
          <motion.div 
            key="victory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <VictoryScreen onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
