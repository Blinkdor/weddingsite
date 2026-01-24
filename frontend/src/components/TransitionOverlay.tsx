import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import batUrl from '../assets/bat.svg';

export type TransitionDirection = 'up' | 'down';

export interface TransitionOverlayHandle {
  play: (direction?: TransitionDirection) => Promise<void>;
}

export const TransitionOverlay = forwardRef<TransitionOverlayHandle>((_, ref) => {
  const [isActive, setIsActive] = useState(false);
  const [direction, setDirection] = useState<TransitionDirection>('down');
  const [viewportHeight, setViewportHeight] = useState(800);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateHeight = () => setViewportHeight(window.innerHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useImperativeHandle(ref, () => ({
    play: (nextDirection = 'down') => {
      if (isActive) {
        return Promise.resolve();
      }
      setDirection(nextDirection);
      setIsActive(true);
      return new Promise<void>((resolve) => {
        const duration = prefersReducedMotion ? 300 : 1300;
        setTimeout(() => {
          setIsActive(false);
          resolve();
        }, duration);
      });
    },
  }), [isActive, prefersReducedMotion]);

  const travelEdge = viewportHeight + 200;
  const startEdge = direction === 'down' ? -200 : travelEdge;
  const endEdge = direction === 'down' ? travelEdge : -200;
  const bats = prefersReducedMotion
    ? []
    : [
        { delay: 0, startX: -180, endX: 320, yOffset: -120, scale: 1.1 },
        { delay: 0.1, startX: -60, endX: 360, yOffset: -40, scale: 0.9 },
        { delay: 0.2, startX: -220, endX: 280, yOffset: 40, scale: 1.3 },
        { delay: 0.25, startX: -100, endX: 340, yOffset: 100, scale: 0.8 },
        { delay: 0.35, startX: -140, endX: 380, yOffset: 0, scale: 1.5 },
      ];

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!prefersReducedMotion ? (
            <div className="relative h-full w-full overflow-hidden">
              {bats.map((bat, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ x: bat.startX, y: startEdge + bat.yOffset, opacity: 0, scale: bat.scale * 0.8 }}
                  animate={{
                    x: bat.endX,
                    y: endEdge + bat.yOffset,
                    opacity: [0, 1, 0.8, 0],
                    scale: [bat.scale * 0.8, bat.scale],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: bat.delay,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.img
                    src={batUrl}
                    alt=""
                    className="h-20 w-auto opacity-90 invert"
                    initial={{ rotate: -6 }}
                    animate={{ rotate: 8 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'mirror',
                      duration: 0.6,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
              ))}
              {/* <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-display text-sm uppercase tracking-[0.8em] text-bone/60">Carried onward</p>
                <p className="font-display text-4xl tracking-[0.4em] text-bone">By midnight wings</p>
              </motion.div> */}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-bone font-display text-4xl tracking-[0.4em]"
            >
              E · T
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
