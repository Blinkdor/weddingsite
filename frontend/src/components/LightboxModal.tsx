import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { GalleryItem } from '../content/siteContent';

interface LightboxModalProps {
  open: boolean;
  image: GalleryItem | null;
  onClose: () => void;
}

export function LightboxModal({ open, image, onClose }: LightboxModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement;
      closeButtonRef.current?.focus();
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        } else if (event.key === 'Tab') {
          event.preventDefault();
          closeButtonRef.current?.focus();
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
    if (previousActiveElement.current instanceof HTMLElement) {
      previousActiveElement.current.focus();
    }
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && image && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
          onClick={onClose}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full rounded-2xl border border-white/20 shadow-panel"
            />
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute -top-4 -right-4 rounded-full border border-white/20 bg-ash/80 px-3 py-1 text-sm uppercase tracking-[0.3em]"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
