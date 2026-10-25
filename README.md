# Follincraft website

Reviewed public pages and assets for https://www.follincraft.com, hosted on the existing GoDaddy Linux cPanel account.

Edit public website files in `site/`, review the changes in a pull request, and merge approved versions. The deployment configuration is prepared separately; merging an edit does not publish it.

This repository excludes PHP/mail credentials, payment and event backends, submissions, logs, backups, local editorial material, original photo folders, and other subsites. GPS EXIF was removed from 99 public image import copies; originals were not changed. Visible page attributions remain; the original local source retains provenance metadata. Import copies omit nonessential image metadata. One existing malformed JPEG remains host-only and is excluded from deployment.

`deploy/allowlist.json` defines exact permitted website paths. New paths require a reviewed allowlist change. `deploy/initial-source-hashes.json` records the imported baseline; it is not a claim that every file on hosting has been backed up.

No build step is required for these static files. PHP handlers, server configuration and runtime folders remain managed separately on hosting.
