import type { ReactNode } from 'react';

export type PremiumIconName =
  | 'search'
  | 'pin'
  | 'ruler'
  | 'bed'
  | 'engine'
  | 'shield'
  | 'broker'
  | 'camera'
  | 'anchor'
  | 'tools'
  | 'box'
  | 'marina'
  | 'arrow';

const paths: Record<PremiumIconName, ReactNode> = {
  search: <><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></>,
  pin: <><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></>,
  ruler: <><path d="M4 17 17 4l3 3L7 20l-3-3Z"/><path d="m13 8 2 2M10 11l2 2M7 14l2 2"/></>,
  bed: <><path d="M4 11V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4"/><path d="M4 11h16v8"/><path d="M4 19v-8"/><path d="M12 11V8h5a3 3 0 0 1 3 3"/></>,
  engine: <><path d="M7 9h8l3 3v5H8l-3-3v-3h2V9Z"/><path d="M10 9V6h4v3M3 13H1M20 14h3M10 6H8M16 6h-2"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m8.8 12 2.2 2.2 4.4-5"/></>,
  broker: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/><path d="M17 3l3 3"/></>,
  camera: <><path d="M4 8h4l1.5-2h5L16 8h4v11H4V8Z"/><circle cx="12" cy="14" r="3.5"/></>,
  anchor: <><circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M7 10h10"/><path d="M5 15c1 3 3.2 5 7 5s6-2 7-5"/><path d="m5 15 3 1M19 15l-3 1"/></>,
  tools: <><path d="m14.5 6.5 3-3 3 3-3 3"/><path d="M2.5 21.5 13 11"/><path d="m7 3 4 4"/><path d="m3 7 4-4 4 4-4 4Z"/></>,
  box: <><path d="M21 8.5 12 3 3 8.5 12 14l9-5.5Z"/><path d="M3 8.5v7L12 21l9-5.5v-7"/><path d="M12 14v7"/></>,
  marina: <><path d="M3 20h18"/><path d="M6 20V8l6-4 6 4v12"/><path d="M9 20v-6h6v6"/><path d="M6 11h12"/></>,
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>
};

export function PremiumIcon({ name, className = '' }: { name: PremiumIconName; className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function BoatshedLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup-compact' : ''}`}>
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="26" r="25" fill="#081B33" />
          <path d="M15 32c5.2 3.7 16.2 3.7 22 0" stroke="#F28A2E" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M26 14v22M18 22h16" stroke="#fff" strokeWidth="3.1" strokeLinecap="round" />
          <circle cx="26" cy="13" r="4" stroke="#fff" strokeWidth="3" />
          <path d="M16 28c1.5 6.5 5.2 9.5 10 9.5s8.5-3 10-9.5" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      <span className="brand-text">
        <strong>Boatshed</strong>
        <em>Marketplace</em>
      </span>
    </div>
  );
}
