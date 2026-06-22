'use client';

import { useMemo, useState } from 'react';

export type BrandLogoData = {
  name: string;
  category: string;
  domain?: string;
  logo_url?: string;
};

function initials(name: string) {
  return name
    .replace(/&/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function BrandLogo({ brand, compact = false }: { brand: BrandLogoData; compact?: boolean }) {
  const sources = useMemo(() => {
    const list: string[] = [];
    if (brand.logo_url) list.push(brand.logo_url);
    if (brand.domain) {
      list.push(`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=256`);
    }
    return list;
  }, [brand.logo_url, brand.domain]);

  const [sourceIndex, setSourceIndex] = useState(0);
  const [failed, setFailed] = useState(!sources.length);
  const src = sources[sourceIndex];

  return (
    <div className={`brand-mark ${compact ? 'brand-mark-compact' : ''}`} aria-label={`${brand.name} logo`}>
      {!failed && src ? (
        <img
          src={src}
          alt={`${brand.name} logo`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            const next = sourceIndex + 1;
            if (next < sources.length) setSourceIndex(next);
            else setFailed(true);
          }}
        />
      ) : (
        <div className="brand-mark-fallback" aria-hidden="true">
          <strong>{initials(brand.name)}</strong>
          <span>{brand.name}</span>
        </div>
      )}
    </div>
  );
}
