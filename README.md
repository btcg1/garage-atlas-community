# Garage Atlas Community

A free, static GTA Online collection and garage planner for GitHub Pages. No accounts, server or API keys required. It starts with an empty collection and no garages.

## Features

- 908 vehicle references with stock images, HSW flags, source links and design inspirations.
- Owned, Watchlist, Not interested, Not obtainable and Explore views.
- Custom garages, capacities and themes. Count owned and watchlist together.
- Protected garages and workshops kept empty for customisation.
- Suggested themed assignments, reviewed before applying.
- Current locations, planned destinations, Moved checkboxes and undo.
- Personal photos for owned vehicles. Up to 12 images per owned copy, cover selection and separate photo backups.
- Duplicate owned copies and build nicknames.
- High, low and combined watchlist budgets. Full customisation allowances, HSW and Benny’s estimates, and a 20–40% upgrade buffer.
- Search, column filters, CSV export and JSON backup/restore.
- Mobile layout. No business ownership tracking.

## GitHub Pages

Create a public repository, upload the contents of this folder and use `main` as its default branch. In Settings → Pages, choose **GitHub Actions** as the source. Push to `main` or run the included deployment workflow. No package installation is needed.

All application URLs are relative, so project sites work at a repository subpath. The workflow publishes only the application files and assets.

## Local preview

Run `python3 -m http.server 8000` in this directory and open `http://localhost:8000`. Browser modules and local photo storage require a web origin. Opening the HTML file directly is not supported.

## Backups and privacy

Collection data stays in local storage. Photos stay in IndexedDB in the same browser. There is no automatic cloud sync. Export the collection JSON and the separate photo JSON before switching devices or clearing browser data. Photo backups import from an owned car’s detail panel or Help & backups.

Photos are resized to a maximum of 1600 pixels and re-encoded without embedded metadata. They are never uploaded to GitHub or posted to a public gallery by this app.

This package includes no personal collection, owner garage map, private photos, cloud credentials or account identifiers. Source snapshots and prices are not live offers. Suggested themes use heuristics and community inspiration labels. Review them before applying.

## Tests

Run `node --test tests/*.test.mjs`.

## Credits

See each vehicle’s source links for price, storage, HSW and image attribution. Stock images reference Cfx.re/FiveM, FiveForge and GTA Wiki. Model and design data include GTACars, GTA BOOM, DurtyFree/gta-v-data-dumps and community design reference datasets.

This is an unofficial fan tool. Game names, vehicle imagery and third-party metadata belong to their respective owners and are not relicensed by this project. Original app code is available under the MIT license in LICENSE. Third-party materials are excluded.

### Restoring bundled stock images and tests

The stock images and tests are packed in small archive parts to support browser uploads. After cloning, reconstruct them before local preview or testing:

```sh
cat support-files.zip.part-* > /tmp/garage-support.zip
unzip /tmp/garage-support.zip
```

GitHub Actions restores them automatically before validation and publishing. Personal collection data and uploaded photos are never included in these archives.
