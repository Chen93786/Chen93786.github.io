# Cyber Ronin // Neural Edges

A full-viewport cyberpunk hero section — **single self-contained HTML file**, no frameworks, no build tools required at runtime.

- Cursor-following **spotlight reveal** (dual-image mask)
- Staggered **word pull-up** headline animation
- **Blur + fade-up** scroll reveals via `IntersectionObserver`
- Fully responsive (1024 / 900 / 768 / 720 / 480 / 360 px)
- Honors `prefers-reduced-motion`

---

## Project structure

```
.
├── .github/
│   ├── dependabot.yml
│   └── workflows/
│       └── deploy.yml      # build + deploy to GitHub Pages
├── public/                 # copied verbatim into dist/
│   ├── 404.html
│   └── robots.txt
├── scripts/
│   └── build.mjs           # zero-dependency build: src/ -> dist/
├── src/
│   └── index.html          # THE site (all CSS + JS inline)
├── .editorconfig
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

`src/index.html` is the deliverable. `scripts/build.mjs` only copies it to `dist/`
and drops a `.nojekyll` file, so GitHub Pages can serve the folder as-is.

---

## Local development

Requires **Node.js >= 18** (only for the copy script; the page itself needs nothing).

```bash
# 1. clone
git clone https://github.com/YOUR-USERNAME/cyber-ronin.git
cd cyber-ronin

# 2. build once (src/ -> dist/)
npm run build

# 3. serve locally
npm run serve      # python3 -m http.server 3000 --directory dist
# or
npm run dev        # build + npx serve dist -l 3000
```

Open <http://localhost:3000>.

> You can also just open `src/index.html` directly in a browser — it is fully
> self-contained. A local server is only recommended so the remote fonts and
> images load without `file://` quirks.

---

## Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `cyber-ronin`). **Do not** initialize
   it with a README.
2. Push this project:

   ```bash
   git init
   git add .
   git commit -m "feat: cyber ronin hero"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/cyber-ronin.git
   git push -u origin main
   ```

3. In the repo go to **Settings → Pages → Build and deployment**
   and set **Source = GitHub Actions**.
4. The workflow `.github/workflows/deploy.yml` runs automatically on every push
   to `main`. Watch it under the **Actions** tab.
5. Your site goes live at:

   ```
   https://YOUR-USERNAME.github.io/cyber-ronin/
   ```

   (For a `YOUR-USERNAME.github.io` repository it will be at the domain root.)

### Custom domain

1. Add a file `public/CNAME` containing exactly your domain, e.g.:

   ```
   ronin.example.com
   ```

2. In **Settings → Pages → Custom domain**, enter the same domain and enable
   **Enforce HTTPS**.
3. Create a `CNAME` DNS record pointing to `YOUR-USERNAME.github.io`.

Because `public/` is copied into `dist/`, the `CNAME` file is deployed
automatically on every build.

---

## How it works

| Piece | Where | Notes |
| --- | --- | --- |
| Spotlight mask | inline `<script>` §1 | `mousemove` / `touchmove` → `mask-image` radial-gradient, radius 120 / 160 / 260 px by viewport width |
| Word split | inline `<script>` §2 | `.words-pull-up` text is wrapped into `.pull-word` spans with `animation-delay = i * 0.1s`; `<h1>` direct `<span>`s are treated as lines with one continuous word index |
| Scroll reveal | inline `<script>` §3 | `IntersectionObserver` at `0.2` (words) and `0.15` (fade-ups), with a full reveal fallback |
| Reduced motion | CSS | all three keyframe animations are disabled |

---

## License

[MIT](./LICENSE)