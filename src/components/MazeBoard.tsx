/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { Coordinate, PuzzleMarker, Direction } from '../types';
import { GRID_SIZE, TILE_SIZE, MAZE_MAP } from '../constants';

interface MazeBoardProps {
  carPos: Coordinate;
  carDir: Direction;
  puzzles: PuzzleMarker[];
  showExit: boolean;
  exitPos: Coordinate;
}

export const MazeBoard = ({ carPos, carDir, puzzles, showExit, exitPos }: MazeBoardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Walls and Path
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const tile = MAZE_MAP[y][x];
        if (tile === 0) {
          ctx.fillStyle = '#1e293b'; // Slate 800 - Wall
          ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          
          // Wall details
          ctx.strokeStyle = '#334155';
          ctx.strokeRect(x * TILE_SIZE + 2, y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
        } else {
          ctx.fillStyle = '#334155'; // Slate 700 - Path
          ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }
    }

    // Draw Puzzles
    puzzles.forEach(p => {
      if (!p.solved) {
        ctx.fillStyle = '#facc15'; // Yellow 400
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Q', p.x * TILE_SIZE + TILE_SIZE/2, p.y * TILE_SIZE + TILE_SIZE/2);
      }
    });

    // Draw Exit Door
    if (showExit) {
      ctx.fillStyle = '#78350f'; // Amber 900
      ctx.fillRect(exitPos.x * TILE_SIZE + 4, exitPos.y * TILE_SIZE + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      ctx.strokeStyle = '#f59e0b'; // Amber 500
      ctx.lineWidth = 2;
      ctx.strokeRect(exitPos.x * TILE_SIZE + 4, exitPos.y * TILE_SIZE + 4, TILE_SIZE - 8, TILE_SIZE - 8);
      // Knob
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(exitPos.x * TILE_SIZE + TILE_SIZE - 12, exitPos.y * TILE_SIZE + TILE_SIZE/2, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Car (Green) - Rotated
    ctx.save();
    const carCx = carPos.x * TILE_SIZE + TILE_SIZE / 2;
    const carCy = carPos.y * TILE_SIZE + TILE_SIZE / 2;
    ctx.translate(carCx, carCy);

    // Rotation based on direction
    let rotation = 0;
    if (carDir === 'UP') rotation = -Math.PI / 2;
    if (carDir === 'DOWN') rotation = Math.PI / 2;
    if (carDir === 'LEFT') rotation = Math.PI;
    if (carDir === 'RIGHT') rotation = 0;
    ctx.rotate(rotation);

    // Draw the car body relative to the center
    ctx.fillStyle = '#22c55e'; // Green 500
    // Body (longer in X axis for 'head' identification)
    ctx.fillRect(-12, -8, 24, 16); 
    
    // Front (Head) indicator - slightly lighter green
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(4, -8, 8, 16);

    // Roof
    ctx.fillStyle = '#16a34a';
    ctx.fillRect(-8, -6, 14, 12);

    // Wheels
    ctx.fillStyle = '#000';
    ctx.fillRect(-10, -10, 6, 4); // Back left
    ctx.fillRect(4, -10, 6, 4);  // Front left
    ctx.fillRect(-10, 6, 6, 4);  // Back right
    ctx.fillRect(4, 6, 6, 4);   // Front right

    ctx.restore();

    // Light Mask (Flashlight)
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    const offCtx = offscreenCanvas.getContext('2d');
    if (offCtx) {
      offCtx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      offCtx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = carPos.x * TILE_SIZE + TILE_SIZE/2;
      const centerY = carPos.y * TILE_SIZE + TILE_SIZE/2;
      const radius = TILE_SIZE * 2.5;

      const gradient = offCtx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      offCtx.globalCompositeOperation = 'destination-out';
      offCtx.fillStyle = gradient;
      offCtx.beginPath();
      offCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      offCtx.fill();

      ctx.drawImage(offscreenCanvas, 0, 0);
    }

  }, [carPos, puzzles, showExit, exitPos]);

  return (
    <div className="relative border-4 border-slate-700 rounded-xl overflow-hidden shadow-2xl bg-slate-900 maze-grid p-4">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * TILE_SIZE}
        height={GRID_SIZE * TILE_SIZE}
        className="max-w-full h-auto drop-shadow-[0_0_20px_rgba(52,211,153,0.1)]"
      />
    </div>
  );
};
