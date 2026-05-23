import type { CSSProperties, SVGProps } from 'react';

// ── ArchMark ─────────────────────────────────────────────────────────────────
export function ArchMark({
  size = 40,
  stroke = 1.2,
  style,
  ...rest
}: { size?: number; stroke?: number; style?: CSSProperties } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size * 1.05} viewBox="0 0 60 64" fill="none" aria-hidden="true" style={style} {...rest}>
      <path d="M6 62 L6 30 A24 24 0 0 1 54 30 L54 62" stroke="currentColor" strokeWidth={stroke} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M14 62 L14 32 A16 16 0 0 1 46 32 L46 62" stroke="currentColor" strokeWidth={stroke * 0.85} fill="none" strokeLinejoin="round" strokeLinecap="round" opacity={0.55} />
      <line x1="2" y1="62" x2="58" y2="62" stroke="currentColor" strokeWidth={stroke * 0.85} strokeLinecap="round" />
    </svg>
  );
}

// ── Torch ────────────────────────────────────────────────────────────────────
export function Torch({ size = 28, stroke = 1.3, ...rest }: { size?: number; stroke?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 20 32" fill="none" aria-hidden="true" {...rest}>
      <path d="M10 1 C 7 5, 5 8, 5 11 C 5 14, 7 16, 10 16 C 13 16, 15 14, 15 11 C 15 8, 13 5, 10 1 Z" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
      <path d="M10 5 C 8.5 8, 8 10, 8 12 C 8 13.5, 9 14, 10 14 C 11 14, 12 13.5, 12 12 C 12 10, 11.5 8, 10 5 Z" stroke="currentColor" strokeWidth={stroke * 0.7} opacity={0.55} />
      <path d="M6 16 L4 19 L16 19 L14 16" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round" />
      <line x1="10" y1="19" x2="10" y2="30" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
      <line x1="7" y1="30" x2="13" y2="30" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" />
    </svg>
  );
}

// ── PathwayLine ───────────────────────────────────────────────────────────────
export function PathwayLine({ width = 280, height = 64, stroke = 1.2, dashed = false, ...rest }: { width?: number; height?: number; stroke?: number; dashed?: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 280 64" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M2 50 C 60 50, 80 14, 140 14 C 200 14, 220 50, 278 50"
        stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={dashed ? '1 6' : undefined}
      />
    </svg>
  );
}

// ── ArchBackdrop ──────────────────────────────────────────────────────────────
export function ArchBackdrop({ count = 3, opacity = 0.07, color = 'var(--primary)', ...rest }: { count?: number; opacity?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 600 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity }}
      {...rest}
    >
      {Array.from({ length: count }).map((_, i) => {
        const w = 200 + i * 110;
        const rx = w / 2;
        const x = 300 - rx;
        const y = 400 - (180 + i * 90);
        return (
          <path key={i} d={`M${x} 400 L${x} ${y + rx} A${rx} ${rx} 0 0 1 ${x + w} ${y + rx} L${x + w} 400`} stroke={color} strokeWidth="1" fill="none" />
        );
      })}
    </svg>
  );
}

// ── ServiceIcon ────────────────────────────────────────────────────────────────
export function ServiceIcon({ kind, size = 28 }: { kind: string; size?: number }) {
  const sw = 1.45;
  const props: SVGProps<SVGSVGElement> = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };

  switch (kind) {
    case 'immigration':
      // Passport: rounded rect + photo circle + text lines
      return (
        <svg {...props}>
          <rect x="8" y="4" width="16" height="21" rx="2" />
          <circle cx="16" cy="13" r="4" />
          <line x1="10" y1="20" x2="22" y2="20" />
          <line x1="10" y1="23" x2="18" y2="23" />
        </svg>
      );
    case 'humanitarian':
      // Heart: compassion / survivors
      return (
        <svg {...props}>
          <path d="M16 27C10 23 6 18 6 13c0-3.3 2.7-5.5 5.5-5.5 1.8 0 3.5 1 4.5 2.8 1-1.8 2.7-2.8 4.5-2.8C23.3 7.5 26 9.7 26 13c0 5-4 10-10 14z" />
        </svg>
      );
    case 'removal':
      // Courthouse columns: court / legal proceedings
      return (
        <svg {...props}>
          <path d="M4 11L16 4l12 7" />
          <rect x="7" y="11" width="3.5" height="14" />
          <rect x="14.25" y="11" width="3.5" height="14" />
          <rect x="21.5" y="11" width="3.5" height="14" />
          <line x1="4" y1="25" x2="28" y2="25" />
          <line x1="3" y1="28" x2="29" y2="28" />
        </svg>
      );
    case 'family':
      // Two figures: adult + child side by side
      return (
        <svg {...props}>
          <circle cx="11" cy="9" r="3.5" />
          <path d="M4 28c0-5.5 3-8.5 7-8.5s7 3 7 8.5" />
          <circle cx="22.5" cy="11.5" r="2.5" />
          <path d="M17 28c0-4 2-6.5 5.5-6.5s5.5 2.5 5.5 6.5" />
        </svg>
      );
    case 'consular':
      // Globe: overseas / international process
      return (
        <svg {...props}>
          <circle cx="16" cy="16" r="11" />
          <line x1="5" y1="16" x2="27" y2="16" />
          <path d="M16 5c-4 3-6 6.5-6 11s2 8 6 11" />
          <path d="M16 5c4 3 6 6.5 6 11s-2 8-6 11" />
          <line x1="9" y1="10" x2="23" y2="10" />
          <line x1="9" y1="22" x2="23" y2="22" />
        </svg>
      );
    case 'estate':
      // House: home / family estate
      return (
        <svg {...props}>
          <path d="M3 17L16 6l13 11" />
          <path d="M6 15v13h20V15" />
          <rect x="13" y="20" width="6" height="8" rx="1" />
          <rect x="9" y="16" width="5" height="4" rx="1" />
          <rect x="18" y="16" width="5" height="4" rx="1" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <path d="M5 28 L5 16 A11 11 0 0 1 27 16 L27 28" />
        </svg>
      );
  }
}
