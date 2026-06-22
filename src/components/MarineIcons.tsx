export function BoatshedLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="brand-lockup" aria-label="Boatshed Marketplace">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" role="img">
          <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M32 12v31" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="17" r="4.5" fill="none" stroke="currentColor" strokeWidth="3" />
          <path d="M21 29h22M18 43c5 7 23 9 28 0M20 43c2 0 4-2 4-5M44 43c-2 0-4-2-4-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 51c8 4 16 4 24 0 5-2.5 9-2.5 12 0" fill="none" stroke="#ff7a1a" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-type">
          <strong>Boatshed</strong>
          <em>Marketplace</em>
        </span>
      )}
    </span>
  );
}

export function MarineIcon({ name }: { name: 'boat' | 'chandlery' | 'services' | 'marina' | 'shield' | 'broker' | 'support' | 'globe' | 'sell' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg className="marine-icon" viewBox="0 0 48 48" aria-hidden="true">
      {name === 'boat' && <><path {...common} d="M8 34h31l-4 6H14l-6-6Z"/><path {...common} d="M24 8v25"/><path {...common} d="M24 10 12 32h12V10Zm2 7 12 15H26V17Z"/></>}
      {name === 'chandlery' && <><path {...common} d="M12 19h25l-3 21H15l-3-21Z"/><path {...common} d="M18 19c0-6 3-10 7-10s7 4 7 10"/><path {...common} d="M19 27v6M25 27v6M31 27v6"/></>}
      {name === 'services' && <><path {...common} d="m16 31 15-15"/><path {...common} d="m13 34 4 4 6-6-4-4-6 6Z"/><path {...common} d="M34 11a8 8 0 0 0-9 10l-13 13"/><path {...common} d="M30 15h5v5"/></>}
      {name === 'marina' && <><path {...common} d="M24 43s13-12 13-24a13 13 0 1 0-26 0c0 12 13 24 13 24Z"/><circle cx="24" cy="19" r="5" {...common}/><path {...common} d="M12 41c8-4 16-4 24 0"/></>}
      {name === 'shield' && <><path {...common} d="M24 6 39 12v11c0 10-6 17-15 20C15 40 9 33 9 23V12l15-6Z"/><path {...common} d="m17 24 5 5 10-12"/></>}
      {name === 'broker' && <><circle cx="24" cy="15" r="7" {...common}/><path {...common} d="M9 41c2-9 8-14 15-14s13 5 15 14"/><path {...common} d="m31 31 4 4 6-7"/></>}
      {name === 'support' && <><path {...common} d="M10 26v-3a14 14 0 0 1 28 0v3"/><path {...common} d="M13 24h5v12h-5a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4Zm22 0h-5v12h5a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4Z"/><path {...common} d="M30 39h-5"/></>}
      {name === 'globe' && <><circle cx="24" cy="24" r="17" {...common}/><path {...common} d="M7 24h34M24 7c5 5 7 11 7 17s-2 12-7 17c-5-5-7-11-7-17s2-12 7-17Z"/></>}
      {name === 'sell' && <><path {...common} d="M8 14h18l14 14-12 12L14 26V14Z"/><circle cx="18" cy="20" r="2.5" {...common}/><path {...common} d="M25 25h8M25 31h5"/></>}
    </svg>
  );
}

export function YachtHeroArt() {
  return (
    <svg className="yacht-art" viewBox="0 0 760 430" role="img" aria-label="Illustrated marina with motor yacht">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#dff5ff"/><stop offset="1" stopColor="#f8fbff"/></linearGradient>
        <linearGradient id="water" x1="0" x2="1"><stop offset="0" stopColor="#75c7e8"/><stop offset="1" stopColor="#0b6fae"/></linearGradient>
        <linearGradient id="hull" x1="0" x2="1"><stop offset="0" stopColor="#ffffff"/><stop offset="1" stopColor="#dfefff"/></linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#06305e" floodOpacity=".24"/></filter>
      </defs>
      <rect width="760" height="430" rx="36" fill="url(#sky)"/>
      <path d="M0 260C120 220 220 245 340 220c190-40 290-10 420-50v260H0Z" fill="url(#water)" opacity=".88"/>
      <path d="M500 112c34-45 77-66 129-74 36-5 70 0 100 17v128H500Z" fill="#bdebd4" opacity=".7"/>
      <path d="M535 163h120v70H535z" fill="#fff7ed"/><path d="M552 132h86l34 31H518l34-31Z" fill="#ff7a1a" opacity=".88"/>
      <rect x="628" y="80" width="35" height="112" rx="8" fill="#fff"/><path d="M623 80h45l-22-26-23 26Z" fill="#ff7a1a"/><circle cx="646" cy="103" r="9" fill="#0a2d57"/>
      <path d="M86 247c60-25 144-20 246-40 71-14 147-18 205 6 33 14 54 33 64 58-117 20-253 25-407 15-52-3-91-14-108-39Z" fill="url(#hull)" filter="url(#softShadow)"/>
      <path d="M152 195c72-49 165-66 278-46 50 9 93 29 128 64-137-20-274-24-406-18Z" fill="#eef8ff" stroke="#0a2d57" strokeWidth="4"/>
      <path d="M204 175c56-26 126-35 210-20 38 7 71 22 98 45-105-13-207-16-308-25Z" fill="#fff" opacity=".96"/>
      <path d="M210 211h56m31 0h72m34 2h76" stroke="#05264a" strokeWidth="12" strokeLinecap="round" opacity=".9"/>
      <path d="M146 285c133 14 270 13 411-5" stroke="#082b55" strokeWidth="7" strokeLinecap="round"/>
      <path d="M286 132l30-56 27 63M385 142l46-86 34 117" stroke="#ffffff" strokeWidth="5"/><path d="M316 76v111M431 56v137" stroke="#0b3769" strokeWidth="3" opacity=".6"/>
      <path d="M86 330c79-15 142-15 188 0 59 19 128 19 208 0 59-14 113-14 162 0" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".9"/>
      <path d="M134 360c75-11 138-9 189 5 48 14 101 11 160-8" stroke="#dff6ff" strokeWidth="5" strokeLinecap="round" opacity=".8"/>
      <path d="M72 96c19-11 37-11 56 0M610 37c18-11 36-11 55 0M270 58c14-8 28-8 42 0" stroke="#4986b7" strokeWidth="4" strokeLinecap="round" opacity=".8"/>
    </svg>
  );
}
