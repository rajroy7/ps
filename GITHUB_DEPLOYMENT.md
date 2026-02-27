# GitHub Deployment Guide

## Issue Resolved
The character data loading issue on GitHub has been fixed by creating a consolidated `characters-data.json` file that contains all character information in a single file.

## What Changed
1. **characters-data.json** - New consolidated file containing all 114 characters' data
2. **character.html** - Updated to load from `characters-data.json` first, with fallback to `Data/data/` folder

## For GitHub Pages Deployment

### Step 1: Push Files to GitHub
Make sure to push these files to your GitHub repository:
- ✅ `characters-data.json` (root directory) - **REQUIRED for GitHub**
- ✅ `character.html`
- ✅ `characters.html`
- ✅ `characters.json`
- ✅ All other HTML/CSS/JS files

### Step 2: Optional - Data Folder
The `Data/data/` folder with individual character JSON files is optional:
- If you include it: The app will use it (for local HTTP server development)
- If you exclude it: The app will use `characters-data.json` (recommended for GitHub)

### Step 3: Enable GitHub Pages
1. Go to your repository Settings
2. Navigate to Pages (left sidebar)
3. Set source to: `main` branch (or your branch) → `/root`
4. Save

### Step 4: Access Your Site
Your site will be at: `https://yourusername.github.io/Project-Skirk/`

## Local Development
The app works in two modes:

### Mode 1: With HTTP Server (Development)
```bash
cd "c:\Users\USER\Desktop\Project Skirk"
python -m http.server 8000
# Visit: http://localhost:8000
```
- Uses `characters-data.json` (preferred)
- Falls back to `Data/data/` folder if available

### Mode 2: File Protocol (NOT Recommended)
```
file:///C:/Users/USER/Desktop/Project%20Skirk/index.html
```
- ❌ Won't work - browser security restrictions on fetch()
- Always use HTTP server instead

## Troubleshooting

### "Failed to load character data" Error
**Cause:** Neither `characters-data.json` nor `Data/data/` folder accessible

**Solutions:**
1. **For GitHub**: Ensure `characters-data.json` is in the repository root
2. **For Local**: Run with HTTP server: `python -m http.server 8000`
3. **For Local**: Include `Data/data/` folder in repository

### Character Images Not Loading
- Ensure `characters.json` has correct image URLs
- Verify `<img>` tags have correct `src` attributes
- Character portraits use: `https://gi.yatta.moe/assets/UI/UI_{icon}.png?vh=2024123000`

### Element/Weapon Icons Not Showing
- All icons use ImageKit CDN (outside your repository)
- URLs in format: `https://ik.imagekit.io/gukc1okbd/{element}.png`
- No server-side changes needed if CDN is accessible

## File Structure for GitHub
```
your-repo/
├── index.html
├── characters.html
├── character.html
├── characters.json
├── characters-data.json       ← Required for GitHub
├── characters.js
├── styles.css
├── script.js
├── icons/
├── images/
└── Data/
    └── data/                  ← Optional (use if you want local fallback)
        ├── Aino.json
        ├── Varka.json
        └── ... (114 files)
```

## What Each File Does

| File | Purpose | Size | Required? |
|------|---------|------|-----------|
| `characters-data.json` | All character data in one file | 3.7 MB | ✅ YES (for GitHub) |
| `Data/data/*.json` | Individual character files | ~1 MB each | ❌ Optional |
| `characters.json` | Character list with metadata | ~1.4 MB | ✅ YES |
| `character_map.json` | ID to filename mapping | ~5 KB | ✅ YES |

## Performance Notes
- `characters-data.json` is 3.7 MB (loads all data at once)
- Individual files are smaller but require 114+ separate requests
- On GitHub Pages: consolidated file is better (fewer requests)
- On local HTTP: fallback system checks consolidated first, then individual files

## Summary for GitHub Upload
1. Keep `characters-data.json` in your repository ✅
2. Data folder is optional (but recommended to keep for redundancy)
3. Enable GitHub Pages in repository settings
4. Your site will work automatically once deployed
