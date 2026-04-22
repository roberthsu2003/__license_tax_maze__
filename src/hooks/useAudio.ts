/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef } from 'react';

export const useAudio = () => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const playBGM = useCallback((url: string) => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio(url);
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.3;
    }
    bgmRef.current.play().catch(e => console.log('Audio playback prevented:', e));
  }, []);

  const stopBGM = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
  }, []);

  const playSFX = useCallback((url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Audio playback prevented:', e));
  }, []);

  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  return { playBGM, stopBGM, playSFX };
};
