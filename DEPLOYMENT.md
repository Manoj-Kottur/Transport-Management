# Deployment Guide

You are deploying an Angular application to GitHub Pages. Because this is a Single Page Application (SPA), it requires specific configuration to work on a static host like GitHub Pages.

## ✅ Fixes Applied
1.  **Build Output**: Changed from `dist/` to `docs/` (GitHub Pages standard).
2.  **Routing Strategy**: Enabled `HashLocationStrategy` (`/#/offer-ride`) to prevent 404 errors on refresh.
3.  **Base URL**: Set `<base href="/Transport-Management/">` to match your repository name.
4.  **Bypass Jekyll**: Added `.nojekyll` file to ensure GitHub serves all files (like underscores).
5.  **Fallback**: Added `404.html` to handle deep links.

## 🚀 How to Deploy (Step-by-Step)

### 1. Push Changes
Open your terminal in the project folder and run:
```bash
git add .
git commit -m "Fix deployment: build to docs, enable hash routing"
git push origin master
```
*(Note: Use `main` instead of `master` if that is your default branch name)*

### 2. Configure GitHub Pages
1. Go to your GitHub Repository URL.
2. Click on **Settings** (top right tab).
3. On the left sidebar, click **Pages**.
4. Under **Build and deployment**:
    - **Source**: Select `Deploy from a branch`.
    - **Branch**: Select your branch (e.g., `master` or `main`).
    - **Folder**: **CRITICAL**: Change `/ (root)` to `/docs`.
    - Click **Save**.

### 3. Verify
Wait about 1-2 minutes. Refresh the Page Settings page. You should see a banner along the top:
> "Your site is live at https://manoj-kottur.github.io/Transport-Management/"

Click the link. It may take a few minutes for the cache to clear.

**Troubleshooting:**
- If you see a README file: You selected `/(root)` instead of `/docs`. Check Step 2.
- If you see a blank page: Open Developer Tools (F12) -> Console. If there are red errors about "MIME type" or "404", ensure the repository name matches `/Transport-Management/`.
