# Sophia Lee — Personal Portfolio

Personal website for Sophia Lee: experience, projects, education, and contact.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

## Build for Production

```bash
npm run build
npm run preview
```

## Editing content

All text lives in `src/data/content.ts`. Add experience, projects, or honors there; set `featured: true` on a project to show it with a full description, and `earlier: true` on an experience to list it in the compact "Earlier" section.

## Deploy

Works with Vercel, Netlify, or GitHub Pages. For GitHub Pages, set `base: '/personalwebsite/'` in `vite.config.ts`.

## Tech Stack

- React 19 + TypeScript
- Vite
- Plain CSS (light and dark themes)
