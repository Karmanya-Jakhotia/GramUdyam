# GramUdyam Prototype

Static prototype screens (Rural Business Navigator), wired up to run locally with Vite.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually **http://localhost:5173**). You'll land on an
index page listing every screen — click any card to open it. The sidebar on each
screen also navigates between them.

## Notes

- These are the original exported design screens (Tailwind via CDN, no build step
  required for styling) — Vite is just acting as a local dev server here.
- `npm run build` produces a static `dist/` folder with all screens if you ever want
  to deploy this as-is (e.g. to Netlify/Vercel/GitHub Pages).
- `app.js` (at the project root) drives the shared sidebar nav + mobile menu across
  all screens.
