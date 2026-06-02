# Letterpress Cheat

A tiny web app that finds every word you can spell from a set of letters — a
helper for the [Letterpress](https://en.wikipedia.org/wiki/Letterpress_(video_game))
word game.

Live at **[letterpress.klimenko.dk](https://letterpress.klimenko.dk)**.

Type the letters on the board and it lists every dictionary word you can make,
longest first. An optional "required letters" field narrows the results to words
that must contain certain letters.

## Stack

- [Vite](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/) — no UI framework, just the DOM.
- The ~275k-word dictionary search runs in a **Web Worker**, so the UI never blocks.
- [Vitest](https://vitest.dev/) for unit tests.
- Deployed to **GitHub Pages** via GitHub Actions.

The dictionary (`public/en.txt`) comes from
[atebits/Words](https://github.com/atebits/Words), the word list used by the
original game.

## Develop

```sh
npm install
npm run dev      # start the dev server
npm test         # run unit tests
npm run build    # type-check and build into dist/
npm run preview  # serve the production build locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs the tests,
builds the site, and publishes `dist/` to GitHub Pages. The custom domain is
configured through `public/CNAME`.

> In the repository's **Settings → Pages**, set the source to **GitHub Actions**.
