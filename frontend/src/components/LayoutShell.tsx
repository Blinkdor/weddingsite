import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import classNames from 'classnames';
import type { SectionContent, SectionId } from '../content/siteContent';

type LayoutShellProps = {
  sections: SectionContent[];
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  children: React.ReactNode;
};

export function LayoutShell({ sections, activeSection, onNavigate, children }: LayoutShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (sectionId: SectionId) => {
    setMobileOpen(false);
    onNavigate(sectionId);
  };

  return (
    <div className="relative min-h-screen text-bone">
      <DesktopNav
        sections={sections}
        activeSection={activeSection}
        onNavigate={handleNav}
      />
      <div className="relative flex-1">
        <MobileNavToggle
          isOpen={mobileOpen}
          onToggle={() => setMobileOpen((prev) => !prev)}
        />
        <AnimatePresence>
          {mobileOpen && (
            <MobileNav
              sections={sections}
              activeSection={activeSection}
              onNavigate={handleNav}
              onClose={() => setMobileOpen(false)}
            />
          )}
        </AnimatePresence>
        {children}
      </div>
    </div>
  );
}

function DesktopNav({
  sections,
  activeSection,
  onNavigate,
}: {
  sections: SectionContent[];
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}) {
  return (
    <aside className="pointer-events-none fixed inset-y-0 left-0 z-20 hidden lg:block">
      <div className="flex h-full flex-col justify-between px-4 py-12">
        <div className="pointer-events-auto space-y-3">
          {/* <p className="tracking-[0.4em] text-xs uppercase text-bone/70 drop-shadow-lg">T & A</p>
          <h1 className="text-3xl font-display text-bone drop-shadow-xl">Wedding</h1>
          <p className="text-bone/70 text-sm uppercase tracking-[0.5em] drop-shadow-lg">1 NOV 2026</p> */}
        </div>
        <nav aria-label="Primary" className="pointer-events-auto">
          <ul className="space-y-6">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  className={classNames(
                    'relative text-left font-brand tracking-[0.3em] text-lg uppercase transition-colors drop-shadow-lg',
                    activeSection === section.id ? 'text-accent' : 'text-bone/60 hover:text-bone'
                  )}
                  onClick={() => onNavigate(section.id)}
                >
                  <span className="inline-flex items-center">{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pointer-events-auto text-xs uppercase tracking-[0.4em] text-bone/60 drop-shadow-lg">
          {/* Maybe some stuff idk */}
        </div>
      </div>
    </aside>
  );
}

function MobileNavToggle({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
      className="lg:hidden fixed top-4 right-4 z-30 rounded-full border border-white/20 bg-ash/80 px-3 py-2 text-bone"
      onClick={onToggle}
    >
      <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
      <div className="flex flex-col gap-1">
        <span className="block h-0.5 w-6 bg-bone" />
        <span className="block h-0.5 w-6 bg-bone" />
        <span className="block h-0.5 w-6 bg-bone" />
      </div>
    </button>
  );
}

function MobileNav({
  sections,
  activeSection,
  onNavigate,
  onClose,
}: {
  sections: SectionContent[];
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="lg:hidden fixed inset-0 z-20 bg-midnight/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.nav
        className="h-full w-full flex flex-col items-center justify-center gap-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        onClick={(event) => event.stopPropagation()}
      >
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={classNames(
              'text-3xl font-brand tracking-wide uppercase',
              activeSection === section.id ? 'text-accent' : 'text-bone/70 hover:text-bone'
            )}
          >
            {section.title}
          </button>
        ))}
      </motion.nav>
    </motion.div>
  );
}
