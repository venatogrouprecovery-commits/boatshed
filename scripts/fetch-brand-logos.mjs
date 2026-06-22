import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.join(process.cwd(), 'public', 'brand-logos');
await fs.mkdir(outDir, { recursive: true });

const brands = [
  ['fairline', 'Fairline', 'fairline.com'],
  ['princess', 'Princess Yachts', 'princessyachts.com'],
  ['sunseeker', 'Sunseeker', 'sunseeker.com'],
  ['beneteau', 'Beneteau', 'beneteau.com'],
  ['jeanneau', 'Jeanneau', 'jeanneau.com'],
  ['bavaria', 'Bavaria Yachts', 'bavariayachts.com'],
  ['sealine', 'Sealine', 'sealine.com'],
  ['ribeye', 'Ribeye', 'ribeye.co.uk'],
  ['volvo-penta', 'Volvo Penta', 'volvopenta.com'],
  ['mercury', 'Mercury Marine', 'mercurymarine.com'],
  ['yamaha', 'Yamaha Marine', 'yamaha-motor.eu'],
  ['suzuki', 'Suzuki Marine', 'suzuki-marine.co.uk'],
  ['garmin', 'Garmin', 'garmin.com'],
  ['raymarine', 'Raymarine', 'raymarine.com'],
  ['victron', 'Victron Energy', 'victronenergy.com'],
  ['lewmar', 'Lewmar', 'lewmar.com'],
  ['force4', 'Force 4 Chandlery', 'force4.co.uk'],
  ['spinlock', 'Spinlock', 'spinlock.co.uk'],
  ['crewsaver', 'Crewsaver', 'crewsaver.com'],
  ['plastimo', 'Plastimo', 'plastimo.com'],
  ['gill', 'Gill Marine', 'gillmarine.com'],
  ['musto', 'Musto', 'musto.com'],
  ['helly-hansen', 'Helly Hansen', 'hellyhansen.com'],
  ['navionics', 'Navionics', 'navionics.com'],
];

async function download(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const type = res.headers.get('content-type') || '';
  if (!type.includes('image') && !type.includes('svg')) throw new Error(`not an image: ${type}`);
  return Buffer.from(await res.arrayBuffer());
}

for (const [slug, name, domain] of brands) {
  const targets = [
    { url: `https://logo.clearbit.com/${domain}?size=512`, ext: 'png' },
    { url: `https://www.google.com/s2/favicons?domain=${domain}&sz=256`, ext: 'png' },
  ];
  let done = false;
  for (const t of targets) {
    try {
      const buf = await download(t.url);
      const file = path.join(outDir, `${slug}.${t.ext}`);
      await fs.writeFile(file, buf);
      console.log(`✓ ${name}: ${file}`);
      done = true;
      break;
    } catch (err) {
      console.warn(`× ${name}: ${t.url} (${err.message})`);
    }
  }
  if (!done) console.warn(`! No logo downloaded for ${name}`);
}
