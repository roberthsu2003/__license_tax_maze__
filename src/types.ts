/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GameState = 'TITLE' | 'PLAYING' | 'VICTORY';

export interface Coordinate {
  x: number;
  y: number;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  successMessage: string;
}

export interface PuzzleMarker extends Coordinate {
  id: number;
  solved: boolean;
}

export type TileType = 0 | 1 | 2 | 3; // 0: wall, 1: path, 2: puzzle, 3: exit

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
