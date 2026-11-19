const formatador = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/** 3000 → "R$ 30,00" */
export function formatarReais(centavos: number): string {
  // Intl usa espaço não separável depois de "R$"; trocamos por espaço comum
  // para o texto ser igual em qualquer navegador e nos testes.
  return formatador.format(centavos / 100).replace(/ /g, ' ')
}

/** "50" → 5000; "15,50" → 1550; "1.234,5" → 123450. Devolve null se não for número. */
export function paraCentavos(texto: string): number | null {
  const limpo = texto.trim().replace(/^R\$\s*/i, '').replace(/\./g, '').replace(',', '.')
  if (limpo === '' || !/^\d+(\.\d{0,2})?$/.test(limpo)) return null
  return Math.round(Number(limpo) * 100)
}
