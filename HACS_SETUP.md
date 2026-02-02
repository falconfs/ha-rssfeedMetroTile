# HACS Setup Guide

## Problem
HACS shows error: "Repository structure for v2.2.0 is not compliant"

## Root Cause
- HACS looks for files in this order: `dist/` → latest release → root
- Our `dist/` directory is in `.gitignore` (not committed)
- No GitHub release exists yet
- Therefore HACS can't find the required `.js` file

## Solution Options

### Option A: Create GitHub Release (Recommended)

This is the cleanest approach and follows best practices.

1. **Push all commits to GitHub:**
   ```bash
   git push origin main
   ```

2. **Create and push the v2.2.0 tag:**
   ```bash
   git tag -a v2.2.0 -m "Release v2.2.0 - Dynamic Configuration System"
   git push origin v2.2.0
   ```

3. **The GitHub Action will automatically:**
   - Build the project
   - Create a release
   - Attach `dist/rssfeed-metro-tile.js` to the release

4. **HACS will now work:**
   - HACS will find the file in the v2.2.0 release
   - Repository will be compliant

### Option B: Commit dist/ Files (Quick Fix)

If you need immediate access without waiting for GitHub Actions:

1. **Remove dist/ from .gitignore:**
   ```bash
   sed -i '' '/^dist\/$/d' .gitignore
   ```

2. **Commit the built file:**
   ```bash
   git add dist/rssfeed-metro-tile.js
   git commit -m "chore: Add dist files for HACS compatibility"
   ```

3. **Push to GitHub:**
   ```bash
   git push origin main
   ```

4. **HACS will now work:**
   - HACS will find the file in the `dist/` directory
   - Repository will be compliant

## Verification

After either option, test HACS:

1. Go to HACS → Frontend
2. Click menu (⋮) → Custom repositories
3. Add: `https://github.com/falconfs/ha-rssfeedMetroTile`
4. Category: Lovelace
5. Click "Add"

Should now work without errors!

## Recommendation

**Use Option A (GitHub Releases)**

Advantages:
- Cleaner git history (no large JS files)
- Automatic builds via GitHub Actions
- Release notes and changelogs
- Users can download specific versions
- Industry best practice

The only downside is the 1-2 minute wait for GitHub Actions to build and create the release.
