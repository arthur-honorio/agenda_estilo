const MINUTOS_NO_DIA = 24 * 60

/** "14:00" → 840 */
export function paraMinutos(hora: string): number {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hora)
  if (!m) throw new Error(`Hora inválida: "${hora}"`)
  const h = Number(m[1])
  const min = Number(m[2])
  if (h > 23 || min > 59) throw new Error(`Hora inválida: "${hora}"`)
  return h * 60 + min
}

/** 800 → "13:20" (aceita só valores dentro do dia) */
export function deMinutos(total: number): string {
  if (!Number.isInteger(total) || total < 0 || total >= MINUTOS_NO_DIA) {
    throw new Error(`Minutos fora do dia: ${total}`)
  }
  const h = Math.floor(total / 60)
  const min = total % 60
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`
}

/** Soma dias a uma data "AAAA-MM-DD", usando UTC para não sofrer com horário de verão. */
export function somarDias(data: string, dias: number): string {
  const d = new Date(`${data}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) throw new Error(`Data inválida: "${data}"`)
  d.setUTCDate(d.getUTCDate() + dias)
  return d.toISOString().slice(0, 10)
}

/** Data e hora deslocadas em minutos (podem cruzar a meia-noite). */
export function deslocarMinutos(
  data: string,
  hora: string,
  minutos: number,
): { data: string; hora: string } {
  const total = paraMinutos(hora) + minutos
  const dias = Math.floor(total / MINUTOS_NO_DIA)
  const resto = total - dias * MINUTOS_NO_DIA
  return { data: somarDias(data, dias), hora: deMinutos(resto) }
}

/** "13:20" → "13h20"; "14:00" → "14h00" (formato usado nos textos do site) */
export function horaPorExtenso(hora: string): string {
  return hora.replace(':', 'h')
}
