interface LancetCardProps {
  label: string;
  body: string;
}

export function LancetCard({ label, body }: LancetCardProps) {
  return (
    <div className="lancet-card group relative flex flex-col items-center">
      {/* SVG Frame — the full gothic lancet window */}
      <svg
        className="lancet-frame absolute inset-0 h-full w-full"
        viewBox="0 0 200 320"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="stone-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a8a8b0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#8a8a94" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6e6e78" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="stone-inner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9898a2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#78787f" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="stone-tracery" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#b0b0ba" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8a8a94" stopOpacity="0.4" />
          </linearGradient>
          {/* Subtle inner glow for the "glass" area */}
          <radialGradient id="glass-glow" cx="0.5" cy="0.3" r="0.6">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* Background fill — dark glass effect */}
        <path
          d="M12 300 V80 C12 40 100 6 100 6 C100 6 188 40 188 80 V300 Z"
          fill="url(#glass-glow)"
        />

        {/* Outer arch frame */}
        <path
          d="M8 314 V78 C8 36 100 2 100 2 C100 2 192 36 192 78 V314 H8 Z"
          stroke="url(#stone-v)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Inner arch frame (double-line manuscript style) */}
        <path
          d="M18 306 V82 C18 46 100 16 100 16 C100 16 182 46 182 82 V306 H18 Z"
          stroke="url(#stone-inner)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Column left — side pillar */}
        <line x1="18" y1="306" x2="18" y2="120" stroke="url(#stone-v)" strokeWidth="2.5" />
        <line x1="24" y1="306" x2="24" y2="125" stroke="url(#stone-inner)" strokeWidth="1" />

        {/* Column right — side pillar */}
        <line x1="182" y1="306" x2="182" y2="120" stroke="url(#stone-v)" strokeWidth="2.5" />
        <line x1="176" y1="306" x2="176" y2="125" stroke="url(#stone-inner)" strokeWidth="1" />

        {/* Capital ornaments — left */}
        <path d="M14 120 C14 116 22 112 26 116" stroke="url(#stone-tracery)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 124 C18 118 24 116 28 120" stroke="url(#stone-inner)" strokeWidth="1" strokeLinecap="round" />

        {/* Capital ornaments — right */}
        <path d="M186 120 C186 116 178 112 174 116" stroke="url(#stone-tracery)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M186 124 C182 118 176 116 172 120" stroke="url(#stone-inner)" strokeWidth="1" strokeLinecap="round" />

        {/* Tracery — central rosette / quatrefoil at the arch peak */}
        <circle cx="100" cy="48" r="18" stroke="url(#stone-tracery)" strokeWidth="1.5" />
        <circle cx="100" cy="48" r="10" stroke="url(#stone-inner)" strokeWidth="1" />
        {/* Quatrefoil lobes */}
        <circle cx="100" cy="34" r="6" stroke="url(#stone-tracery)" strokeWidth="1" />
        <circle cx="100" cy="62" r="6" stroke="url(#stone-tracery)" strokeWidth="1" />
        <circle cx="86" cy="48" r="6" stroke="url(#stone-tracery)" strokeWidth="1" />
        <circle cx="114" cy="48" r="6" stroke="url(#stone-tracery)" strokeWidth="1" />

        {/* Tracery — sub-arches branching from center */}
        <path
          d="M100 66 C70 80 40 98 30 82"
          stroke="url(#stone-inner)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M100 66 C130 80 160 98 170 82"
          stroke="url(#stone-inner)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Trefoil — left sub-arch */}
        <path
          d="M30 82 C30 72 50 66 60 76"
          stroke="url(#stone-tracery)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M60 76 C65 82 60 92 50 90"
          stroke="url(#stone-tracery)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Trefoil — right sub-arch */}
        <path
          d="M170 82 C170 72 150 66 140 76"
          stroke="url(#stone-tracery)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M140 76 C135 82 140 92 150 90"
          stroke="url(#stone-tracery)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Bottom sill — base plate */}
        <line x1="8" y1="306" x2="192" y2="306" stroke="url(#stone-v)" strokeWidth="2.5" />
        <line x1="8" y1="314" x2="192" y2="314" stroke="url(#stone-v)" strokeWidth="3" />

        {/* Sill ornaments — small finials at base corners */}
        <path d="M8 306 L4 310 L8 314" stroke="url(#stone-tracery)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M192 306 L196 310 L192 314" stroke="url(#stone-tracery)" strokeWidth="1.5" strokeLinejoin="round" />

        {/* Crocket ornaments climbing the arch */}
        <circle cx="46" cy="36" r="2.5" stroke="url(#stone-tracery)" strokeWidth="1" />
        <circle cx="154" cy="36" r="2.5" stroke="url(#stone-tracery)" strokeWidth="1" />
        <circle cx="28" cy="58" r="2" stroke="url(#stone-inner)" strokeWidth="0.8" />
        <circle cx="172" cy="58" r="2" stroke="url(#stone-inner)" strokeWidth="0.8" />

        {/* Finial at apex */}
        <path d="M100 2 L97 -4 L100 -8 L103 -4 Z" stroke="url(#stone-tracery)" strokeWidth="1.2" fill="none" />
      </svg>

      {/* Content positioned inside the frame */}
      <div className="lancet-content relative z-10 flex h-full w-full flex-col px-8 pt-28 pb-6">
        <p className="lancet-label text-center text-xs uppercase tracking-[0.45em]">
          {label}
        </p>
        <p className="mt-4 text-center text-sm leading-relaxed text-bone/80 whitespace-pre-line">
          {body}
        </p>
      </div>
    </div>
  );
}
