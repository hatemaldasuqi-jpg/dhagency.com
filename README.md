# DH Agency Website

Premium static website for **DH Agency** — Social • Content • Marketing.

## What is included
- Arabic / English language switch
- Light / dark mode
- Fully responsive mobile design
- Interactive 4-package selector: MINI, START, GROWTH, SCALE
- Package comparison table
- Package artwork modal previews
- Services, process, CTA, FAQ and contact sections
- Instagram contact buttons linked to `@dh.agency1`
- Scroll reveal animations and smooth navigation
- No build tools required

## Deploy on GitHub Pages
1. Create a new GitHub repository.
2. Upload all files from this folder **without changing the folder structure**.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)` then Save.

Your site will be published at the GitHub Pages URL shown there.

## Deploy on Vercel
1. Push this folder to GitHub.
2. In Vercel choose **Add New → Project**.
3. Import the GitHub repository.
4. Framework preset: **Other**.
5. No build command is required.
6. Deploy.

## Files
- `index.html` — site structure/content
- `styles.css` — full styling/responsive design
- `script.js` — language, theme, package interactions and animations
- `assets/dh-logo.jpg` — DH Agency logo supplied in chat
- `assets/packages/` — package artwork

## Edit package pricing/content
Open `script.js` and edit the `packages` object near the top.

## Contact link
The site currently sends inquiries to Instagram direct messages:
`https://ig.me/m/dh.agency1`

If you want WhatsApp later, replace those contact links in `index.html` with your WhatsApp URL.
