import sys, glob, os, re
import pytesseract
from PIL import Image, ImageFilter, ImageDraw
src, out = sys.argv[1], sys.argv[2]
files = sorted(glob.glob(os.path.join(src, "*.jpeg")))
for i, f in enumerate(files, 1):
    im = Image.open(f).convert("RGB")
    # upscale for OCR
    big = im.resize((im.width*2, im.height*2))
    d = pytesseract.image_to_data(big, lang="eng", output_type=pytesseract.Output.DICT)
    n = len(d["text"]); boxes = []
    for k in range(n):
        t = d["text"][k].strip()
        if re.fullmatch(r"\+55|85", t) or re.search(r"\d{4,5}-\d{4}", t):
            x, y, w, h = d["left"][k]//2, d["top"][k]//2, d["width"][k]//2, d["height"][k]//2
            boxes.append((x, y, w, h, t))
    dr = ImageDraw.Draw(im)
    for x, y, w, h, t in boxes:
        # only phone area: right side of name lines
        if x > 380:
            dr.rectangle([x-4, y-4, x+w+4, y+h+4], fill=(32, 44, 51))
    im.save(os.path.join(out, f"print_{i:02d}.jpg"), quality=90)
    print(os.path.basename(f), [b[4] for b in boxes if b[0] > 380])
