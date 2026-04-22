<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your app (GitHub Pages)

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0ae80722-606e-47cb-a789-9fcb5fdb55a0

## Run locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
4. Test production build locally:
   `npm run build && npm run preview`

## Deploy to GitHub Pages (Actions)

This repo is configured to deploy to GitHub Pages via GitHub Actions.

1. Push to `main`.
2. In GitHub repo settings:
   - Go to **Settings -> Pages**
   - Set **Source** to **GitHub Actions**
3. Wait for the `Deploy to GitHub Pages` workflow to complete.

The Vite `base` path is configured for this repository:

- Repo name: `__license_tax_maze__`
- Base URL: `/__license_tax_maze__/`
