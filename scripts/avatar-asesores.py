# -*- coding: utf-8 -*-
# Foto de perfil para el grupo de asesores: el sello dorado de Elysium sobre
# fondo espresso, con el nombre del grupo. 640x640, se recorta en circulo.
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SELLO = r'C:\Users\aleja\AppData\Local\Temp\claude\C--Users-aleja\11d6fec4-da9f-4afe-b3c1-66dc446e0184\images\1.jpg'
OUT = r'C:\Users\aleja\elysium-landing\scripts\avatar-asesores'
FONTS = r'C:\Windows\Fonts'
os.makedirs(OUT, exist_ok=True)

S = 3                     # supersampling
W = 640
ORO = (212, 175, 127)
ORO_CLARO = (240, 222, 190)

def fuente(nombre, tam):
    for f in (nombre, 'georgia.ttf', 'arial.ttf'):
        p = os.path.join(FONTS, f)
        if os.path.exists(p):
            return ImageFont.truetype(p, tam)
    return ImageFont.load_default()

def fondo(w):
    """Espresso con un halo calido al centro."""
    base = Image.new('RGB', (w, w), (26, 18, 9))
    halo = Image.new('L', (w, w), 0)
    d = ImageDraw.Draw(halo)
    cx, cy, r = w // 2, int(w * 0.42), int(w * 0.52)
    for i in range(60):
        k = i / 60
        d.ellipse([cx - r * (1 - k), cy - r * (1 - k), cx + r * (1 - k), cy + r * (1 - k)],
                  fill=int(150 * k))
    halo = halo.filter(ImageFilter.GaussianBlur(w // 18))
    return Image.composite(Image.new('RGB', (w, w), (74, 56, 38)), base, halo)

def sello(diam):
    """Recorta el sello en circulo y le pone un borde de luz."""
    im = Image.open(SELLO).convert('RGB')
    lado = min(im.size)
    im = im.crop(((im.width - lado) // 2, (im.height - lado) // 2,
                  (im.width + lado) // 2, (im.height + lado) // 2))
    # El sello trae un margen oscuro; nos acercamos para que llene el circulo.
    m = int(lado * 0.055)
    im = im.crop((m, m, lado - m, lado - m)).resize((diam, diam), Image.LANCZOS)
    mask = Image.new('L', (diam, diam), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, diam - 1, diam - 1], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(diam // 260 + 1))
    im.putalpha(mask)
    return im

def avatar(titulo, subtitulo, archivo, fam='Great'):
    w = W * S
    img = fondo(w).convert('RGBA')
    d = ImageDraw.Draw(img)

    # anillos
    for rad, grosor, alpha in ((0.455, 3, 150), (0.425, 1, 80)):
        r = int(w * rad)
        c = w // 2
        d.ellipse([c - r, c - r, c + r, c + r], outline=ORO + (alpha,), width=grosor * S)

    # sello
    # Con texto, el sello sube y se achica: el avatar se recorta en circulo
    # y todo lo que pase de ~0.82 de alto se pierde.
    diam = int(w * (0.50 if titulo else 0.62))
    s = sello(diam)
    sy = int(w * 0.155) if titulo else (w - diam) // 2
    sombra = Image.new('RGBA', (w, w), (0, 0, 0, 0))
    sm = Image.new('L', (w, w), 0)
    ImageDraw.Draw(sm).ellipse([(w - diam) // 2, sy + 8 * S,
                                (w + diam) // 2, sy + diam + 8 * S], fill=130)
    sombra.putalpha(sm.filter(ImageFilter.GaussianBlur(10 * S)))
    img = Image.alpha_composite(img, sombra)
    img.paste(s, ((w - diam) // 2, sy), s)
    d = ImageDraw.Draw(img)

    if titulo:
        f1 = fuente('georgiab.ttf', int(w * 0.075))
        tw = d.textbbox((0, 0), titulo, font=f1)
        x = (w - (tw[2] - tw[0])) // 2 - tw[0]
        y = sy + diam + int(w * 0.055)
        d.text((x, y), titulo, font=f1, fill=ORO_CLARO)
        if subtitulo:
            f2 = fuente('georgia.ttf', int(w * 0.034))
            sw = d.textbbox((0, 0), subtitulo, font=f2)
            sx = (w - (sw[2] - sw[0])) // 2 - sw[0]
            d.text((sx, y + int(w * 0.088)), subtitulo, font=f2, fill=(176, 148, 110))

    img = img.convert('RGB').resize((W, W), Image.LANCZOS)
    p = os.path.join(OUT, archivo)
    img.save(p, 'JPEG', quality=92)
    print('  ', archivo, os.path.getsize(p) // 1024, 'KB')

print('avatares:')
avatar('ASESORES',      'ELYSIUM',            'a1-asesores.jpg')
avatar('CÍRCULO',       'ELYSIUM · ASESORES', 'a2-circulo.jpg')
avatar('CASA ELYSIUM',  'EQUIPO DE VENTAS',   'a3-casa.jpg')
avatar('ÉLITE',         'ASESORES ELYSIUM',   'a4-elite.jpg')
avatar(None, None, 'a5-solo-sello.jpg')
avatar('LEADS',         'ELYSIUM',            'a6-leads.jpg')
avatar('LEADS',         'ELYSIUM · ASESORES', 'a7-leads-asesores.jpg')
