# Garage Atlas Community

A free, static GTA Online collection and garage planner for GitHub Pages. No accounts, server or API keys required. It starts with an empty collection and no garages.

## Features

- 908 vehicle references, including 681 sourced real-vehicle comparisons on cards and detail views. Factory bases, concepts and competition models are labeled separately.
- HSW, Benny’s donor/custom models, full Imani Tech and missile jammer compatibility filters. Installed upgrades remain personal records.
- Colour-coded collection dropdowns and a featured-vehicle slideshow with previous, next and pause controls.
- Owned, Watchlist, Not interested, Not obtainable and Explore views.
- Searchable directory of 158 garage, storage and service presets, including 85 named residential garages. Fill names and capacities, add all floors, include separate bicycle racks, and enforce vehicle-specific storage rules. Service and temporary parking entries do not add fictional garage capacity.
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

Open **Privacy & storage** in the app for the full notice. Collection records use localStorage, and photos use IndexedDB in the same browser profile. Both are local and unencrypted. Browser profile access, permitted extensions, and scripts on the same origin can access browser storage. Exported backups are also unencrypted.

Fonts and reference images are hosted locally. A Content Security Policy restricts scripts and background connections to this origin, blocks frames and network form submission, and disables remote image fallbacks. Referrer information is suppressed. There is no analytics or collection-upload endpoint. GitHub Pages still receives connection information and logs visitor IPs for security, as described in its hosting documentation.


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
for archive in comparison-assets-*.zip; do
  [ -f "$archive" ] && unzip -o "$archive"
done
```

GitHub Actions restores them automatically before validation and publishing. Personal collection data and uploaded photos are never included in these archives.
