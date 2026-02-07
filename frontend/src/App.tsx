import { useCallback, useEffect, useRef, useState } from 'react';
import { LayoutShell } from './components/LayoutShell';
import { Section } from './components/Section';
import {
  TransitionOverlay,
  type TransitionDirection,
  type TransitionOverlayHandle,
} from './components/TransitionOverlay';
import { GalleryGrid } from './components/GalleryGrid';
import { LancetCard } from './components/LancetCard';
import type { SectionContent, SectionId } from './content/siteContent';
import { detailItems, galleryItems, sections } from './content/siteContent';

type SectionRefs = Record<SectionId, HTMLElement | null>;

const initialRefs: SectionRefs = {
  announcement: null,
  details: null,
  gallery: null,
};

const sectionIndex = new Map(
  sections.map((section, index) => [section.id, index])
);

const getScrollDirection = (current: SectionId, next: SectionId): TransitionDirection => {
  const currentIndex = sectionIndex.get(current);
  const nextIndex = sectionIndex.get(next);
  if (currentIndex === undefined || nextIndex === undefined) {
    return 'down';
  }
  return nextIndex < currentIndex ? 'up' : 'down';
};

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('announcement');
  const sectionRefs = useRef<SectionRefs>({ ...initialRefs });
  const observerRef = useRef<IntersectionObserver | null>(null);
  const transitionRef = useRef<TransitionOverlayHandle>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (inView[0]) {
          const nextId = inView[0].target.getAttribute('id') as SectionId;
          setActiveSection(nextId);
        }
      },
      { threshold: [0.3, 0.6, 0.8], rootMargin: '-20% 0px -20% 0px' }
    );

    const observer = observerRef.current;
    Object.values(sectionRefs.current).forEach((node) => {
      if (node) observer?.observe(node);
    });

    return () => observer?.disconnect();
  }, []);

  const registerSection = useCallback(
    (sectionId: SectionId) => (node: HTMLElement | null) => {
      const observer = observerRef.current;
      const previous = sectionRefs.current[sectionId];
      if (previous && observer) {
        observer.unobserve(previous);
      }
      if (node && observer) {
        observer.observe(node);
      }
      sectionRefs.current[sectionId] = node;
    },
    []
  );

  const scrollToSection = useCallback(
    (id: SectionId) => {
      const node = sectionRefs.current[id];
      if (!node) return;
      const direction = getScrollDirection(activeSection, id);
      void transitionRef.current?.play(direction);
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      window.history.replaceState(null, '', `#${id}`);
    },
    [activeSection]
  );

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as SectionId;
    if (!hash) {
      return;
    }
    const timer = window.setTimeout(() => {
      const node = sectionRefs.current[hash];
      if (node) {
        node.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(hash);
      }
    }, 200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, '', `#${activeSection}`);
  }, [activeSection]);

  return (
    <div className="relative">
      <TransitionOverlay ref={transitionRef} />
      <LayoutShell sections={sections} activeSection={activeSection} onNavigate={scrollToSection}>
        <main>
          {sections.map((section) => (
            <Section key={section.id} content={section} ref={registerSection(section.id)}>
              {renderSectionBlock(section)}
            </Section>
          ))}
        </main>
      </LayoutShell>
    </div>
  );
}

function renderSectionBlock(section: SectionContent) {
  if (section.id === 'announcement') {
    return (
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.6em] text-bone/60">{section.subtitle}</p>
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl">{section.title}</h2>
        <p className="text-bone/80 lg:max-w-2xl mx-auto">{section.description}</p>
        {section.accentLine && (
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-bone/40" />
            <span className="tracking-[0.4em] uppercase text-xs text-accent">{section.accentLine}</span>
            <span className="h-px w-12 bg-bone/40" />
          </div>
        )}
      </div>
    );
  }

  if (section.id === 'details') {
    const lancetItems = detailItems.slice(0, 3);
    const simpleItems = detailItems.slice(3);

    return (
      <div className="space-y-10">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-bone/60">{section.subtitle}</p>
          <h2 className="font-display text-3xl lg:text-4xl">{section.title}</h2>
          <p className="text-bone/70 lg:max-w-2xl mx-auto">{section.description}</p>
        </header>

        {/* Cathedral lancet window cards — top 3 */}
        <div className="grid gap-6 md:grid-cols-3">
          {lancetItems.map((item) => (
            <LancetCard key={item.label} label={item.label} body={item.body} />
          ))}
        </div>

        {/* Simpler cards for remaining items */}
        {simpleItems.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {simpleItems.map((item) => (
              <div
                key={item.label}
                className="rounded border border-white/10 bg-black/20 p-4 backdrop-blur-lg"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-[#a0a0aa]">{item.label}</p>
                <p className="mt-3 text-sm text-bone/80 whitespace-pre-line">{item.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3 text-center lg:text-left">
        <p className="text-xs uppercase tracking-[0.6em] text-bone/60">{section.subtitle}</p>
        <h2 className="font-display text-3xl lg:text-4xl">{section.title}</h2>
        <p className="text-bone/70 lg:max-w-2xl">{section.description}</p>
      </header>
      <GalleryGrid items={galleryItems} />
    </div>
  );
}

export default App;
