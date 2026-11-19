export const MINUTOS_NO_DIA = 24 * 60

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

/** Como deMinutos, mas aceita 1440 ("24:00") para o fim de um bloco que vai até a meia-noite. */
export function formatarMinutos(total: number): string {
  return total >= MINUTOS_NO_DIA ? '24:00' : deMinutos(Math.max(0, total))
}

/** 90 → "1h30"; 60 → "1h"; 45 → "45 min" */
export function formatarDuracao(minutos: number): string {
  const h = Math.floor(minutos / 60)
  const min = minutos % 60
  if (h === 0) return `${min} min`
  return min === 0 ? `${h}h` : `${h}h${String(min).padStart(2, '0')}`
}

/** Data local do aparelho em "AAAA-MM-DD" (toISOString usaria UTC e erraria à noite). */
export function dataLocal(d: Date = new Date()): string {
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

/** Hora local do aparelho em minutos desde a meia-noite. */
export function minutosAgora(d: Date = new Date()): number {
  return d.getHours() * 60 + d.getMinutes()
}

const DIAS_DA_SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

/** "2026-11-20" → "sexta, 20/11" */
export function formatarData(data: string): string {
  const d = new Date(`${data}T12:00:00Z`)
  const dia = String(d.getUTCDate()).padStart(2, '0')
  const mes = String(d.getUTCMonth() + 1).padStart(2, '0')
  return `${DIAS_DA_SEMANA[d.getUTCDay()]}, ${dia}/${mes}`
}

/** "Hoje", "Amanhã", "Ontem" ou a data por extenso. */
export function rotuloDia(data: string, hoje: string): string {
  if (data === hoje) return 'Hoje'
  if (data === somarDias(hoje, 1)) return 'Amanhã'
  if (data === somarDias(hoje, -1)) return 'Ontem'
  return formatarData(data)
}
