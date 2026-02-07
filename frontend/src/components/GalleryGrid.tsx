import { useState } from 'react';
import { motion } from 'framer-motion';
import type { GalleryItem } from '../content/siteContent';
import { LightboxModal } from './LightboxModal';

type GalleryGridProps = {
  items: GalleryItem[];
};

export function GalleryGrid({ items }: GalleryGridProps) {
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.button
            type="button"
            key={item.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10"
            onClick={() => setActiveItem(item)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute bottom-3 left-4 text-xs uppercase tracking-[0.3em] text-bone/90">
              View
            </span>
          </motion.button>
        ))}
      </div>
      <LightboxModal open={Boolean(activeItem)} image={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
