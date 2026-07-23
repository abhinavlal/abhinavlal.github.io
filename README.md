# abhinavlal.in

Personal website of Abhinav Lal — built with [Astro](https://astro.build) and the [AstroPaper](https://github.com/satnaing/astro-paper) theme.

- **Home** — intro + recent writing
- **About** — `src/content/pages/about.md`
- **Posts** — markdown files in `src/content/posts/`
- **Projects** — `/projects`, rendered live from the GitHub API
- **Twitter** — `/twitter`, embedded X timeline
- `llms.txt` / `llms-full.txt` / per-page markdown via [astro-llms-md](https://github.com/tfmurad/astro-llms-md)

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

Deployed to GitHub Pages by `.github/workflows/deploy.yml` on push to `master`.
