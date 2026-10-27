import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import contextlib
import io
import struct
import zlib
from image_privacy import assert_public_image

spec = importlib.util.spec_from_file_location('ftps', Path(__file__).with_name('ftps.py'))
ftps = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ftps)

class BoundaryTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        (self.root/'site').mkdir()
        (self.root/'deploy').mkdir()
    def tearDown(self):
        self.tmp.cleanup()
    def allow(self, paths):
        (self.root/'deploy/allowlist.json').write_text(json.dumps({'paths': paths}))
    def test_static_file_plan(self):
        (self.root/'site/index.html').write_text('<p>Public site</p>')
        self.allow(['index.html'])
        self.assertEqual(ftps.inventory(self.root)[0]['bytes'],18)
    def test_backend_and_traversal_refused(self):
        for path in ['contact.php','adventuretime/index.html','../index.html','/index.html','.env','tmp/note.txt']:
            with self.subTest(path=path):
                self.allow([path])
                with self.assertRaises(ValueError): ftps.inventory(self.root)
    def test_unlisted_file_refused(self):
        (self.root/'site/extra.html').write_text('Public')
        self.allow([])
        with self.assertRaises(ValueError): ftps.inventory(self.root)
    def test_symlink_refused(self):
        (self.root/'outside.html').write_text('Private')
        (self.root/'site/index.html').symlink_to(self.root/'outside.html')
        self.allow(['index.html'])
        with self.assertRaises(ValueError): ftps.inventory(self.root)
    def test_secret_pattern_refused(self):
        (self.root/'site/config.js').write_text('password = "example-test-value"')
        self.allow(['config.js'])
        with self.assertRaises(ValueError): ftps.inventory(self.root)
    def test_duplicate_refused(self):
        self.allow(['index.html','index.html'])
        with self.assertRaises(ValueError): ftps.inventory(self.root)


    def test_connection_is_tls_and_read_only(self):
        calls = []
        class FakeFTP:
            def __init__(self, **kwargs):
                self.context = kwargs['context']
                self.assert_secure = self.context.check_hostname
            def connect(self, host, port): calls.append(('connect', host, port))
            def auth(self): calls.append(('auth',))
            def login(self, username, password):
                self_outer.assertEqual(calls[-1], ('auth',))
                calls.append(('login',))
            def prot_p(self): calls.append(('prot_p',))
            def set_pasv(self, value): calls.append(('passive', value))
            def pwd(self): return '/'
            def nlst(self):
                self_outer.assertIn(('prot_p',), calls)
                return ['index.html', 'assets', 'adventuretime', 'mikifollin']
            def close(self): calls.append(('close',))
        self_outer = self
        output = io.StringIO()
        with patch.object(ftps.ftplib, 'FTP_TLS', FakeFTP), patch.dict(ftps.os.environ, {'FOLLINCRAFT_FTPS_USERNAME': 'test-account', 'FOLLINCRAFT_FTPS_PASSWORD': 'test-password-value'}), contextlib.redirect_stdout(output):
            ftps.connection_check()
        result = json.loads(output.getvalue())
        self.assertEqual(result['remote_writes'], 0)
        self.assertTrue(result['shared_subsites_visible'])
        self.assertNotIn('test-password-value', output.getvalue())
        self.assertEqual(calls[-1], ('close',))

    def test_connection_rejects_primary_home_scope(self):
        class FakeFTP:
            def __init__(self, **kwargs): pass
            def connect(self, *args): pass
            def auth(self): pass
            def login(self, *args): pass
            def prot_p(self): pass
            def set_pasv(self, *args): pass
            def pwd(self): return '/'
            def nlst(self): return ['mail', 'public_html', '.ssh']
            def close(self): pass
        with patch.object(ftps.ftplib, 'FTP_TLS', FakeFTP), patch.dict(ftps.os.environ, {'FOLLINCRAFT_FTPS_USERNAME': 'test-account', 'FOLLINCRAFT_FTPS_PASSWORD': 'test-password-value'}):
            with self.assertRaises(ValueError): ftps.connection_check()


    def test_write_test_requires_exact_approval_before_connection(self):
        with patch.object(ftps, 'connect_checked') as connect, patch.dict(ftps.os.environ, {'FOLLINCRAFT_TEST_PATH': ''}):
            with self.assertRaises(ValueError): ftps.isolated_write_test()
            connect.assert_not_called()

    def test_write_test_refuses_existing_folder(self):
        class FakeFTP:
            def close(self): pass
        with patch.object(ftps, 'connect_checked', return_value=(FakeFTP(), {ftps.ISOLATED_TEST_DIR})), patch.dict(ftps.os.environ, {'FOLLINCRAFT_TEST_PATH': ftps.ISOLATED_TEST_DIR}):
            with self.assertRaises(ValueError): ftps.isolated_write_test()

    def test_isolated_roundtrip_stays_in_fixed_new_folder(self):
        calls = []
        class FakeFTP:
            files = {}
            def mkd(self, path): calls.append(('mkdir', path))
            def storbinary(self, command, stream):
                self.files[command.removeprefix('STOR ')] = stream.read()
                calls.append(('store', command.removeprefix('STOR ')))
            def retrbinary(self, command, callback):
                callback(self.files[command.removeprefix('RETR ')])
                calls.append(('retrieve', command.removeprefix('RETR ')))
            def close(self): pass
        output = io.StringIO()
        with patch.object(ftps, 'connect_checked', return_value=(FakeFTP(), {'index.html','assets'})), patch.dict(ftps.os.environ, {'FOLLINCRAFT_TEST_PATH': ftps.ISOLATED_TEST_DIR}), contextlib.redirect_stdout(output):
            ftps.isolated_write_test()
        result = json.loads(output.getvalue())
        self.assertTrue(result['add_update_backup_restore_verified'])
        self.assertEqual(result['production_files_changed'], 0)
        self.assertEqual(result['deletions'], 0)
        self.assertTrue(all(path == ftps.ISOLATED_TEST_DIR or path.startswith(ftps.ISOLATED_TEST_DIR + '/') for _, path in calls))


    def test_rejects_xmp_iptc_and_jpeg_comments(self):
        for marker, payload in [(225, b'http://ns.adobe.com/xap/1.0/\x00test'), (237, b'Photoshop 3.0\x00test'), (254, b'private comment')]:
            image = b'\xff\xd8' + bytes([255,marker]) + struct.pack('>H',len(payload)+2) + payload + b'\xff\xdatest-image-scan'
            with self.subTest(marker=marker):
                with self.assertRaises(ValueError): assert_public_image(image)

    def test_orientation_only_exif_is_allowed(self):
        payload = b'Exif\x00\x00' + b'II*\x00' + struct.pack('<I',8) + struct.pack('<H',1) + struct.pack('<HHI',274,3,1) + struct.pack('<H',6) + b'\x00\x00' + struct.pack('<I',0)
        image = b'\xff\xd8\xff\xe1' + struct.pack('>H',len(payload)+2) + payload + b'\xff\xdatest-image-scan'
        assert_public_image(image)

    def test_png_text_metadata_is_refused(self):
        def chunk(kind,data): return struct.pack('>I',len(data))+kind+data+struct.pack('>I',zlib.crc32(kind+data))
        image = b'\x89PNG\r\n\x1a\n' + chunk(b'tEXt',b'Comment\x00test') + chunk(b'IEND',b'')
        with self.assertRaises(ValueError): assert_public_image(image)

if __name__ == '__main__': unittest.main()
