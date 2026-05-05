# saaguero.github.io

Personal website for Santiago Agüero, built with Hugo.

## Requirements
- Hugo (extended) installed locally.

## Local development
```bash
hugo server -D
```

## Build
```bash
hugo
```
The static site is generated into `public/`.

## Content
- `content/_index.md`: home page front matter.
- `content/writing/`: long-form posts.
- `layouts/`: site templates and partials.
- `static/`: static assets copied as-is.

## Deployment (GitHub Pages)
- The custom domain is set in `CNAME`.
- Build the site and publish the `public/` directory to GitHub Pages (for example via an Actions workflow).

## Notes
- Hugo configuration lives in `hugo.toml`.
