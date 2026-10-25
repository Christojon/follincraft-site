#!/usr/bin/env python3
"""Manual plans, read-only checks and a separately approved isolated write test. Production blocked."""
import argparse
import ftplib
import hashlib
import io
import json
import os
from pathlib import Path, PurePosixPath
import re
import ssl
import sys
from image_privacy import assert_public_image

HOST = 'p3plzcpnl507809.prod.phx3.secureserver.net'
ISOLATED_TEST_DIR = '__follincraft_publish_test_20261024_cf01'
PROTECTED = {'adventuretime', 'mikifollin', 'uploads', 'submissions', 'logs', 'tmp', 'vendor', 'phpmailer', 'editorial', 'qa-screenshots', 'colorado-photos', 'scripts', 'backups'}
STATIC = {'.html', '.css', '.js', '.json', '.xml', '.txt', '.webmanifest', '.svg', '.jpg', '.jpeg', '.png', '.webp', '.gif', '.ico', '.mp4', '.woff', '.woff2', '.ttf'}
SECRET_PATTERNS = [re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'), re.compile(rb'(?:sk_live_|sk_test_|whsec_|ghp_|github_pat_)[A-Za-z0-9_]{12,}'), re.compile(rb'''(?i)(?:password|secret|api[_-]?key|access[_-]?token)\s*[=:]\s*["'][^"']+["']''')]

def inventory(root):
    root = root.resolve()
    site = root / 'site'
    allowed = json.loads((root / 'deploy/allowlist.json').read_text())['paths']
    if len(allowed) != len(set(allowed)):
        raise ValueError('Duplicate allowlist paths')
    rows = []
    for name in allowed:
        p = PurePosixPath(name)
        if p.is_absolute() or p.as_posix() != name or any(part in {'..', '.'} or part.startswith('.') for part in p.parts):
            raise ValueError('Unsafe allowlist path')
        if any(part in PROTECTED for part in p.parts) or p.suffix.lower() not in STATIC or name == 'assets/forest.mp4':
            raise ValueError('Protected or unsupported path in allowlist')
        f = site.joinpath(*p.parts)
        if any(parent.is_symlink() for parent in [f, *f.parents]) or not f.is_file() or not f.resolve().is_relative_to(site.resolve()):
            raise ValueError('Symlink, missing file or path escape')
        data = f.read_bytes()
        if f.suffix.lower() in {'.jpg', '.jpeg', '.png'}:
            assert_public_image(data)
        if f.suffix.lower() in {'.html', '.css', '.js', '.json', '.xml', '.txt', '.webmanifest', '.svg'}:
            if any(pattern.search(data) for pattern in SECRET_PATTERNS):
                raise ValueError('Credential-like content; review locally without publishing logs')
        rows.append({'path': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
    actual = {f.relative_to(site).as_posix() for f in site.rglob('*') if f.is_file() or f.is_symlink()}
    if actual != set(allowed):
        raise ValueError('Site tree differs from exact allowlist; review new or removed paths')
    return rows

def connect_checked():
    username = os.environ.get('FOLLINCRAFT_FTPS_USERNAME', '')
    password = os.environ.get('FOLLINCRAFT_FTPS_PASSWORD', '')
    if not username or not password:
        raise ValueError('Dedicated FTPS account secrets have not been configured')
    ctx = ssl.create_default_context()
    ctx.minimum_version = ssl.TLSVersion.TLSv1_2
    ftp = ftplib.FTP_TLS(context=ctx, timeout=30)
    try:
        ftp.connect(HOST, 21)
        ftp.auth()  # Validate certificate and hostname before credentials.
        ftp.login(username, password)
        ftp.prot_p()
        ftp.set_pasv(True)
        if ftp.pwd() != '/':
            raise ValueError('Unexpected account root; verify dedicated account scope in cPanel')
        names = {PurePosixPath(name.rstrip('/')).name for name in ftp.nlst()}
        if not {'index.html', 'assets'}.issubset(names) or names & {'.ssh', 'mail', 'etc', 'ssl', 'public_html'}:
            raise ValueError('Unexpected root contents; verify dedicated public_html account scope in cPanel')
        return ftp, names
    except Exception:
        ftp.close()
        raise

def connection_check():
    ftp, names = connect_checked()
    try:
        print(json.dumps({'mode': 'connection-test', 'tls_verified': True, 'protected_data_channel': True, 'root_listing_succeeded': True, 'shared_subsites_visible': bool(names & {'adventuretime', 'mikifollin'}), 'remote_writes': 0}))
    finally:
        ftp.close()

def isolated_write_test():
    # This mode requires separate approval for this exact new folder. It never
    # writes existing site paths, deletes anything, or implements production.
    if os.environ.get('FOLLINCRAFT_TEST_PATH') != ISOLATED_TEST_DIR:
        raise ValueError('Isolated write test requires explicit confirmation of its exact folder')
    ftp, names = connect_checked()
    try:
        if ISOLATED_TEST_DIR in names:
            raise ValueError('Test folder already exists; refusing to overwrite or reuse it')
        folder = ISOLATED_TEST_DIR
        ftp.mkd(folder)
        ftp.mkd(folder + '/backup')
        initial = b'Follincraft isolated publishing test version 1. No private data.\n'
        changed = b'Follincraft isolated publishing test version 2. No private data.\n'
        target = folder + '/probe.txt'
        backup = folder + '/backup/probe-v1.txt'
        def put(path, data):
            if path not in {target, backup}:
                raise ValueError('Test target escaped the fixed isolated folder')
            ftp.storbinary('STOR ' + path, io.BytesIO(data))
        def get(path):
            out = io.BytesIO()
            ftp.retrbinary('RETR ' + path, out.write)
            return out.getvalue()
        put(target, initial)
        if get(target) != initial:
            raise ValueError('Initial isolated test upload did not verify')
        put(backup, initial)
        if get(backup) != initial:
            raise ValueError('Isolated test backup did not verify')
        put(target, changed)
        if get(target) != changed:
            raise ValueError('Isolated test update did not verify; test files retained')
        put(target, get(backup))
        if get(target) != initial:
            raise ValueError('Isolated test restore did not verify; test files retained')
        print(json.dumps({'mode': 'isolated-write-test', 'folder': folder, 'add_update_backup_restore_verified': True, 'test_files_retained': True, 'production_files_changed': 0, 'deletions': 0}))
    finally:
        ftp.close()

def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('mode', choices=['plan', 'connection-test', 'isolated-write-test', 'publish'])
    args = ap.parse_args()
    root = Path(__file__).resolve().parents[1]
    rows = inventory(root)
    if args.mode == 'plan':
        print(json.dumps({'mode': 'plan', 'files': len(rows), 'bytes': sum(r['bytes'] for r in rows), 'manifest_sha256': hashlib.sha256(json.dumps(rows, sort_keys=True).encode()).hexdigest(), 'remote_connections': 0, 'remote_writes': 0}))
    elif args.mode == 'connection-test':
        connection_check()
    elif args.mode == 'isolated-write-test':
        isolated_write_test()
    else:
        raise ValueError('Production publishing is intentionally blocked until credential scope, durable private backup/restore and a specific isolated write test are approved and implemented')

if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, ftplib.Error, ssl.SSLError) as exc:
        # Never print server error strings, credentials, environment or tracebacks.
        safe = str(exc) if isinstance(exc, ValueError) else type(exc).__name__
        print('Stopped safely: ' + safe, file=sys.stderr)
        sys.exit(1)
