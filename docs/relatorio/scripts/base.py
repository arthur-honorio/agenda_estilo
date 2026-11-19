from reportlab.lib.pagesizes import A4
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, PageBreak,
                                Table, TableStyle, KeepTogether)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY

D = "/usr/share/fonts/truetype/dejavu/"
pdfmetrics.registerFont(TTFont("S", D + "DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("SB", D + "DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("SI", D + "DejaVuSans-Oblique.ttf"))
pdfmetrics.registerFont(TTFont("SBI", D + "DejaVuSans-BoldOblique.ttf"))
from reportlab.pdfbase.pdfmetrics import registerFontFamily
registerFontFamily("S", normal="S", bold="SB", italic="SI", boldItalic="SBI")

ROSA = colors.HexColor("#B03A6E")
ROSA_CLARO = colors.HexColor("#F7E6EE")
CINZA = colors.HexColor("#444444")
AMARELO = colors.HexColor("#FFF4C2")

body = ParagraphStyle("body", fontName="S", fontSize=10, leading=14.5, textColor=CINZA,
                      alignment=TA_JUSTIFY, spaceAfter=6)
bul = ParagraphStyle("bul", parent=body, leftIndent=14, bulletIndent=4, alignment=0, spaceAfter=3)
h1 = ParagraphStyle("h1", fontName="SB", fontSize=16, leading=20, textColor=ROSA, spaceBefore=4, spaceAfter=10)
h2 = ParagraphStyle("h2", fontName="SB", fontSize=12, leading=16, textColor=colors.HexColor("#222222"),
                    spaceBefore=10, spaceAfter=6)
cell = ParagraphStyle("cell", fontName="S", fontSize=8.8, leading=11.5, textColor=CINZA)
cellb = ParagraphStyle("cellb", parent=cell, fontName="SB", textColor=colors.white)
ph = ParagraphStyle("ph", parent=body, backColor=AMARELO, borderPadding=6, borderColor=colors.HexColor("#E0C860"),
                    borderWidth=0.6, spaceBefore=6, spaceAfter=10, alignment=0)

def P(t, s=body): return Paragraph(t, s)
def B(items): return [Paragraph(i, bul, bulletText="•") for i in items]
def FILL(t): return Paragraph("<b>[A PREENCHER]</b> " + t, ph)

def T(rows, widths, head=True):
    data = []
    for i, r in enumerate(rows):
        st = cellb if (head and i == 0) else cell
        data.append([Paragraph(str(c), st) for c in r])
    t = Table(data, colWidths=widths, repeatRows=1 if head else 0)
    style = [("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#CCCCCC")),
             ("VALIGN", (0, 0), (-1, -1), "TOP"),
             ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]
    if head:
        style.append(("BACKGROUND", (0, 0), (-1, 0), ROSA))
        for i in range(2, len(rows), 2):
            style.append(("BACKGROUND", (0, i), (-1, i), ROSA_CLARO))
    t.setStyle(TableStyle(style))
    return t

W = A4[0] - 4 * cm
