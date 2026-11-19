# DES ICT Innovations — Aero PWA Hub

## Deployment
Upload the **contents** of this folder to the root of the GitHub Pages repository (`113866daplianes/ides-apps-hub`, `main` branch).

Required root files:
- `index.html`
- `manifest.webmanifest`
- `service-worker.js`
- `assets/` (all existing branded app and school logos, plus PWA icons)

## Included updates
- iCSM points to https://113866daplianes.github.io/iCSM
- Aero-inspired glass, layered gradients, glossy cards and depth using the existing DES navy theme `#153b59`
- Responsive single-column mobile layout and touch-friendly controls
- PWA manifest, 192px/512px icons, install prompt, and service-worker cache for the hub shell/assets

## Notes
The hub interface and its local assets can load offline after the first successful visit. The linked apps still require their own connectivity and availability. Browser installation prompts depend on browser/platform support. GitHub Pages serves the site over HTTPS, which is required for service workers.


## Visual theme update
The Hub now uses a dark-blue Aero/glass theme inspired by the supplied iSupply screenshots. Blue is the dominant color; glossy layered panels, raised buttons, and high-contrast white text are used for readability. App identity accents remain visible in their labels/metadata.
