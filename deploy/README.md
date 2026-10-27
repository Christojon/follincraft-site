# Manual publishing preparation

This draft uses only workflow_dispatch. No push, pull-request, schedule, or third-party uploader triggers exist. The only external action is GitHub's official checkout action pinned to its v4.2.2 commit. Credentials are not persisted by checkout; workflow permissions are read-only.

Modes:

- `plan`: validates every exact allowlisted path, rejects symlinks/traversal/backend files, scans text for credential patterns, and prints only counts and a content-manifest hash. No hosting access.
- `connection-test`: uses environment-scoped secrets to authenticate with explicit FTPS, verifies certificate/hostname before credentials, requires TLS 1.2+, protects the data channel, and reads the account root listing. No uploads, edits, deletes or directory creation. The user explicitly approved the shared public_html scope including Adventuretime and Miki Follin; this check reports shared visibility and refuses obvious primary-account home-directory scope. The deployment allowlist excludes the additional subsites.
- `isolated-write-test`: requires separate approval and exact confirmation of `__follincraft_publish_test_20261024_cf01`; creates only that fresh folder, `backup/`, `probe.txt` and `backup/probe-v1.txt`. It verifies add/update/backup/restore with harmless text, retains all test files and performs no deletions. It refuses a pre-existing test folder. This mode has not been run.
- `publish`: deliberately fails before reading hosting credentials or connecting. Production writes are not implemented yet.

Every run must specify a full reviewed commit SHA already on main, and must itself start from main. A merge does not publish. The `follincraft-production` environment must be configured deliberately; approval restrictions must be verified in the actual GitHub plan, not assumed. Workflow and deploy-code modifications need careful review because a malicious workflow could misuse available secrets.

Credential scope is now explicitly approved: the verified public_html document root includes adventuretime/ and mikifollin/. A public_html-rooted FTP account is narrower than the primary hosting account but still grants write access to these other subsites and PHP files. The user approved this disclosed broader folder scope. No GoDaddy account/password has yet been created; credential entry/submission is prepared for user handoff. GitHub environment follincraft-production now requires Christojon approval, disables administrator bypass, and permits only the main branch. Password creation/entry must use the user's supported secure browser handoff; never print a password or commit it.

Before implementing publish: establish and verify a durable private backup outside the public web root with a restore test; enumerate hidden server config and runtime-upload paths; approve an isolated test target; implement allowlist-only uploads with per-file preconditions, backups and verification; serialize runs; preserve remote-only files; never mirror or delete. A runner's temporary folder is not a durable backup, and public Actions artifacts must never contain private host backups.

Proposed isolated test after scope is approved: create a uniquely named, parent-approved non-public staging directory containing one harmless text file, verify add/update and download hashes, verify backup/restore, and prove that protected paths are refused. It writes remotely, so it requires separate approval. The currently prepared connection test is read-only.

The imported source is 1,130 reviewed, already-public website files. Existing third-party attributions remain in source. The user controls site content; this review does not establish new rights to third-party materials. New website paths require an explicit allowlist update. PHP, backends, secrets and submissions do not belong under site/.

Concrete isolated test target for approval: `/public_html/__follincraft_publish_test_20261024_cf01/`. The new unlinked test text may be publicly reachable; it contains no private data. This tests the dedicated connection and mechanics, not a durable private backup of production. The private production backup decision remains unresolved.

Image privacy validation rejects nonessential JPEG application metadata (including XMP/IPTC and comments) and PNG EXIF/text/time metadata, while retaining standard color segments and orientation-only EXIF. Pixel payloads are preserved. The malformed original camp/doublesprings/doublesprings6.jpg is host-only: never overwrite or delete it; its local copy is quarantined for later review.
