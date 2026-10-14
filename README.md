# Portfolio

Personal portfolio site for GitHub Pages. Plain HTML, CSS and JS with no build step.

## Editing
- Content (about, projects, tools, links) lives in `index.html`.
- Project photos: drop an image in `assets/projects/` and point that card's `<img src>` at it.
- Résumés: replace the PDFs in `assets/resume/`, keeping the same file names.

## Run locally
```sh
python3 -m http.server 8000
```
Then open http://localhost:8000.

## Deploy
Enable **Settings → Pages → Deploy from a branch → main / (root)**.
