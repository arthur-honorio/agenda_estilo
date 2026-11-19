exec(open(os.path.join(AQUI, "base.py"), encoding="utf-8").read())

def card(titulo, rfs, desc, regras, rotulo="Critérios de aceitação"):
    rows = [[Paragraph(f"<b>{titulo}</b>  <font size=8>({rfs})</font>",
                       ParagraphStyle("x", parent=cell, textColor=colors.white, fontSize=10))],
            [Paragraph(desc, cell)],
            [Paragraph(f"<b>{rotulo}:</b> " + regras, cell)]]
    t = Table(rows, colWidths=[W])
    t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), ROSA), ("BACKGROUND", (0, 1), (-1, -1), ROSA_CLARO),
                           ("BOX", (0, 0), (-1, -1), 0.5, ROSA),
                           ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                           ("LEFTPADDING", (0, 0), (-1, -1), 8)]))
    return KeepTogether([t, Spacer(1, 8)])

def NOTA(t):
    st = ParagraphStyle("nota", parent=body, backColor=ROSA_CLARO, borderPadding=6, borderColor=ROSA,
                        borderWidth=0.5, spaceBefore=6, spaceAfter=10, alignment=0, fontSize=9.3, leading=13)
    return Paragraph(t, st)

