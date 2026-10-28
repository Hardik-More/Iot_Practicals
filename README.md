# IoT Practical Library

A React + Vite, Windows File Explorer-style library for six Arduino/IoT practicals. Each record is stored in `src/data/experiments.js`, and circuit images are in `public/diagrams/`.

## Local setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Run `npm run dev`.
4. Run `npm run build` to make the production `dist/` folder.

## Add content

Edit or add an object in `src/data/experiments.js`. Add any lab-specific diagram under `public/diagrams/` and set the object `image` to its URL, such as `/diagrams/my-circuit.png`. The explorer will automatically show new experiment objects.

The built-in non-uploaded schematics are explicitly illustrative; validate every connection before using hardware.

## Deploy to Vercel

Push this folder to GitHub, import its repository in Vercel, then deploy. Vercel automatically recognizes Vite. If asked, use build command `npm run build` and output directory `dist`. Every later Git push redeploys the site.