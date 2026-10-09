# -*- coding: utf-8 -*-
# Versiones ligeras de las miniaturas para el carrusel.
# Las originales son PNG de ~2.2 MB: en el portafolio se ven a 230 px de ancho,
# asi que un WebP de 460 px pesa 50 veces menos y se ve igual.
import io, json, os, glob

from PIL import Image

ROOT = r'C:\Users\aleja\elysium-landing'
SRC = os.path.join(ROOT, 'public', 'thumbnails')
DST = os.path.join(ROOT, 'public', 'thumbs')
CAT = os.path.join(ROOT, 'public', 'catalog.json')
os.makedirs(DST, exist_ok=True)

W, H = 460, 818            # el doble de como se ve, para pantallas retina
total_src = total_dst = 0
hechos = nuevos = 0

catalogo = json.load(io.open(CAT, encoding='utf-8'))
for e in catalogo:
    src = os.path.join(SRC, e['slug'] + '.png')
    dst = os.path.join(DST, e['slug'] + '.webp')
    if not os.path.exists(src):
        print('falta:', e['slug'])
        continue
    if not os.path.exists(dst):
        im = Image.open(src).convert('RGB').resize((W, H), Image.LANCZOS)
        im.save(dst, 'WEBP', quality=72, method=5)
        nuevos += 1
    total_src += os.path.getsize(src)
    total_dst += os.path.getsize(dst)
    e['thumbnail'] = '/thumbs/' + e['slug'] + '.webp'
    hechos += 1

json.dump(catalogo, io.open(CAT, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
print('miniaturas:', hechos, '| nuevas:', nuevos)
print('antes:', round(total_src / 1048576), 'MB  ->  ahora:', round(total_dst / 1048576, 1), 'MB')
print('promedio:', round(total_dst / hechos / 1024), 'KB por invitacion')
