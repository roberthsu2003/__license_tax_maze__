/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Question } from './types';

export const GRID_SIZE = 15;
export const TILE_SIZE = 40; // Pixels per tile

// 0: Wall, 1: Path, 2: Question, 3: Exit
export const MAZE_MAP: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 2, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
  [0, 2, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const TAX_QUESTIONS: Question[] = [
  {
    id: 1,
    question: '請問自用車輛的使用牌照稅要在每年幾月繳納？',
    options: ['A. 4月', 'B. 5月', 'C. 7月'],
    answerIndex: 0,
    successMessage: '恭喜答對！提醒您：自用車輛的使用牌照稅要在每年4月時繳納哦！',
  },
  {
    id: 2,
    question: '請問申請使用牌照稅繳款書歸戶，最多可將幾筆車號歸至一張稅單？',
    options: ['A. 3筆', 'B. 5筆', 'C. 10筆'],
    answerIndex: 1,
    successMessage: '恭喜答對！提醒您：申請「使用牌照稅繳款書歸戶」：1.同一直轄市或縣(市)內的車輛開立1張繳款書 2.每張繳款書以5筆車號為限 3.開徵兩個月前申請，逾期申請次期適用',
  },
  {
    id: 3,
    question: '若您持有的機車排氣量大於多少cc，須繳納使用牌照稅？',
    options: ['A. 50cc', 'B. 100cc', 'C. 150cc'],
    answerIndex: 2,
    successMessage: '恭喜答對！提醒您：若您持有的機車排氣量大於150cc (即151cc以上)，須於每年4月繳納使用牌照稅！',
  },
  {
    id: 4,
    question: '供身障者使用車輛免徵牌照稅，請問免徵以多少排氣量為限？',
    options: ['A. 1800cc', 'B. 2000cc', 'C. 2400cc'],
    answerIndex: 2,
    successMessage: '答對了！恭喜您對身心障礙者免徵牌照稅的額度有正確了解，免徵以2400cc為限！',
  },
];

export const AUDIO_URLS = {
  BGM: 'https://cdn.pixabay.com/audio/2022/01/21/audio_31743c589f.mp3', // Chill background
  CLICK: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3527e30c2.mp3', // Pop
  CORRECT: 'https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3', // Success/Ding
  DOOR: 'https://cdn.pixabay.com/audio/2022/03/24/audio_19da1e7e7a.mp3', // Door creak/unlock
  VICTORY: 'https://cdn.pixabay.com/audio/2021/08/04/audio_145d2e7428.mp3', // Fanfare
};
