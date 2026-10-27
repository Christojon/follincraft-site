"""Reject nonessential image metadata before a deployment plan can proceed."""
import struct

def orientation(b):
 at=b.find(b'Exif\0\0')
 if at<0:return None
 t=b[at+6:];e='<' if t[:2]==b'II' else '>';off=struct.unpack(e+'I',t[4:8])[0];n=struct.unpack(e+'H',t[off:off+2])[0]
 for i in range(n):
  en=t[off+2+12*i:off+14+12*i];tag,typ,count=struct.unpack(e+'HHI',en[:8])
  if tag==274 and typ==3 and count==1:return struct.unpack(e+'H',en[8:10])[0]
 return None

def clean_jpeg(b):
 if b[:2]!=b'\xff\xd8':raise ValueError('Not JPEG')
 ori=orientation(b);out=b[:2];i=2;old_scan=None
 while i<len(b):
  start=i
  if b[i]!=255:raise ValueError('Invalid marker')
  while i<len(b) and b[i]==255:i+=1
  m=b[i];i+=1
  if m in (218,217):old_scan=b[start:];out+=old_scan;break
  if m in range(208,216) or m==1:out+=b[start:i];continue
  n=int.from_bytes(b[i:i+2],'big');end=i+n
  if n<2 or end>len(b):raise ValueError('Malformed segment length')
  p=b[i+2:end]
  if m==224 and p.startswith(b'JFIF\0') and len(p)>=14:
   p=p[:12]+b'\0\0';out+=b'\xff\xe0'+struct.pack('>H',len(p)+2)+p
  elif m==226 and p.startswith(b'ICC_PROFILE\0'):out+=b[start:end]
  elif m==238 and p.startswith(b'Adobe') and len(p)>=12:out+=b'\xff\xee'+struct.pack('>H',14)+p[:12]
  elif 224<=m<=239 or m==254:pass
  else:out+=b[start:end]
  i=end
 if old_scan is None:raise ValueError('No image scan')
 if ori not in (None,1):
  if ori not in range(2,9):raise ValueError('Invalid orientation')
  p=b'Exif\0\0'+b'II*\0'+struct.pack('<I',8)+struct.pack('<H',1)+struct.pack('<HHI',274,3,1)+struct.pack('<H',ori)+b'\0\0'+struct.pack('<I',0)
  out=out[:2]+b'\xff\xe1'+struct.pack('>H',len(p)+2)+p+out[2:]
 assert out.endswith(old_scan)
 return out,ori

def clean_png(b):
 if not b.startswith(b'\x89PNG\r\n\x1a\n'):raise ValueError('Not PNG')
 out=b[:8];i=8
 while i+12<=len(b):
  n=int.from_bytes(b[i:i+4],'big');kind=b[i+4:i+8];end=i+n+12
  if end>len(b):raise ValueError('Malformed PNG chunk')
  if kind not in {b'eXIf',b'tEXt',b'zTXt',b'iTXt',b'tIME'}:out+=b[i:end]
  i=end
 if i!=len(b):raise ValueError('PNG trailing bytes')
 return out,None

def assert_public_image(data):
    if data.startswith(b'\xff\xd8'):
        clean, _ = clean_jpeg(data)
    elif data.startswith(b'\x89PNG\r\n\x1a\n'):
        clean, _ = clean_png(data)
    else:
        raise ValueError('Image format is unrecognized; review it locally')
    if clean != data:
        raise ValueError('Image contains nonessential metadata; sanitize it locally before publishing')
