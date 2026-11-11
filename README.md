# Photo Report BETA (v1.3.2-beta, 2026-11-11)

Test copy of the Sure Power Photo Report app. **Link:** https://dsen-261021-1302.github.io/photo-report-beta/

Lives in its own repository so it installs as its own app. The main app (`photo-report`) is not touched by anything here; storage (`sp-photo-report-beta`) and caches (`beta-*`) are separate.

## What's in the beta
- **Binder / manual pages** report type (CEO Battery Training Binder project): Dynasty binder 41-6222 tab/form chips, page numbering, edge and focus checks, optional full resolution, HTML-only send.
- **"This photo is" banner** (v1.3.1): form · title · page, and the next document in the tab.
- **New document** takes the next form in the tab automatically; **Previous doc / Skip doc** relabel the current photo.

## History
- v1.3.2-beta (2026-11-11): moved out of `photo-report/beta/` into this repo (a nested app couldn't install on its own). Removed the main-app cache repair that only mattered when nested.
- v1.3.1-beta (2026-11-10): banner, auto next document, Skip/Previous doc, no strike-through.
- v1.3.0-beta (2026-11-10): Binder / manual pages type.
