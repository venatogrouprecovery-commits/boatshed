# Local brand logo download

The brand section is now wired to local files under `public/brand-logos/`.

Run this locally before deploying if you want the demo to package cached logo images:

```bash
npm run fetch:logos
```

This downloads one local image per brand, then the site serves those files from its own `/public` folder.

For public launch, replace these cached/demo assets with permission-approved official logo files.
