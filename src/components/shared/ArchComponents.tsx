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
  const sw = 1.4;
  const props: SVGProps<SVGSVGElement> = { width: size, height: size, viewBox: '0 0 32 32', fill: 'none', stroke: 'currentColor', strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const arch = <path d="M5 28 L5 16 A11 11 0 0 1 27 16 L27 28" stroke="currentColor" strokeWidth={sw} fill="none" />;

  switch (kind) {
    case 'immigration':
      return <svg {...props}>{arch}<rect x="11" y="10" width="10" height="12" rx="1" /><path d="M13 13H19M13 16H19M11 25C14 25 18 21 21 25" /></svg>;
    case 'humanitarian':
      return <svg {...props}>{arch}<path d="M16 23C11 20 9 17 9 14c0-2 2-3 3-3s2 1 4 3c2-2 3-3 4-3s3 1 3 3c0 3-2 6-7 9Z" /></svg>;
    case 'removal':
      return <svg {...props}>{arch}<path d="M16 23C11 20 9 17 9 14V10l7-2 7 2v4c0 3-2 6-7 9Z" /><path d="M13 14V18M16 14V18M19 14V18" /></svg>;
    case 'family':
      return <svg {...props}>{arch}<circle cx="13" cy="14" r="2" /><circle cx="19" cy="14" r="2" /><path d="M9 24c0-3 2-5 4-5s4 2 4 5M15 24c0-3 2-5 4-5s4 2 4 5" /></svg>;
    case 'consular':
      return <svg {...props}>{arch}<rect x="11" y="10" width="10" height="13" rx="1" /><circle cx="16" cy="15" r="2" /><path d="M13 19H19M9 28C13 26 19 26 23 28" strokeDasharray="1 2" /></svg>;
    case 'estate':
      return <svg {...props}><path d="M5 16L16 7l11 9M8 14v11h16V14M13 25v-6a3 3 0 0 1 6 0v6" /></svg>;
    default:
      return <svg {...props}>{arch}</svg>;
  }
}
