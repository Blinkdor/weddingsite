import { forwardRef, useImperativeHandle, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export interface TransitionOverlayHandle {
  play: () => Promise<void>;
}

export const TransitionOverlay = forwardRef<TransitionOverlayHandle>((_, ref) => {
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useImperativeHandle(ref, () => ({
    play: () => {
      if (isActive) {
        return Promise.resolve();
      }
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

  const bats = prefersReducedMotion
    ? []
    : [
        { delay: 0, startX: -200, endX: 500, startY: 40, endY: -20, scale: 1.1 },
        { delay: 0.1, startX: -150, endX: 520, startY: 160, endY: 100, scale: 0.9 },
        { delay: 0.2, startX: -100, endX: 480, startY: 260, endY: 210, scale: 1.3 },
        { delay: 0.25, startX: -220, endX: 460, startY: 340, endY: 320, scale: 0.8 },
        { delay: 0.35, startX: -80, endX: 520, startY: 80, endY: 20, scale: 1.5 },
      ];

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-black/90 via-black/80 to-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!prefersReducedMotion ? (
            <div className="relative h-full w-full overflow-hidden">
              {bats.map((bat, index) => (
                <motion.svg
                  key={index}
                  width="160"
                  height="90"
                  viewBox="0 0 160 90"
                  className="absolute text-bone/90"
                  initial={{ x: bat.startX, y: bat.startY, opacity: 0, scale: bat.scale * 0.8 }}
                  animate={{
                    x: bat.endX,
                    y: bat.endY,
                    opacity: [0, 1, 0.8, 0],
                    scale: [bat.scale * 0.8, bat.scale],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: bat.delay,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.path
                    d="M5 60 Q40 5 80 40 Q120 5 155 60 Q115 45 80 70 Q45 45 5 60 Z"
                    fill="currentColor"
                    initial={{ rotate: -5 }}
                    animate={{ rotate: 10 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'mirror',
                      duration: 0.6,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.svg>
              ))}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="font-display text-sm uppercase tracking-[0.8em] text-bone/60">Carried onward</p>
                <p className="font-display text-4xl tracking-[0.4em] text-bone">By midnight wings</p>
              </motion.div>
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
