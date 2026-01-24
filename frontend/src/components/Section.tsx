import { forwardRef } from 'react';
import type { SectionContent } from '../content/siteContent';
import { ParallaxLayer } from './ParallaxLayer';
import { assetPath } from '../utils/assetPath';

interface SectionProps {
  content: SectionContent;
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(function Section({ content, children }, ref) {
  const ornament = (name: string) => assetPath(`/ornaments/${name}`);
  const layers = content.layerVariant === 'arches'
    ? [
        { src: ornament('gothic-arch-3.svg'), strength: 0.04, className: 'max-w-lg opacity-40' },
        { src: ornament('tracery.svg'), strength: 0.02, className: 'max-w-2xl opacity-20' },
      ]
    : [
        { src: ornament('tracery.svg'), strength: 0.05, className: 'max-w-3xl opacity-35' },
        { src: ornament('gothic-arch-3.svg'), strength: 0.03, className: 'max-w-lg opacity-20' },
      ];

  return (
    <section
      ref={ref}
      id={content.id}
      aria-label={content.title}
      className="relative min-h-screen snap-start overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(5,3,8,0.35), rgba(5,3,8,0.15)), url(${content.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 z-0 bg-black/30" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-24 lg:px-20">
        <div className="gothic-textbox">
          {children}
        </div>
      </div>
      {layers.map((layer, idx) => (
        <ParallaxLayer key={`${content.id}-layer-${idx}`} {...layer} />
      ))}
    </section>
  );
});
