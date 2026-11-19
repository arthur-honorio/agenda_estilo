import type { Atendimento } from './atendimento'
import { deslocarMinutos } from './tempo'

/**
 * Hora de chamar o transporte (RF07, Anexo A do relatório):
 *   início do atendimento − tempo de deslocamento − folga
 *
 * Devolve data e hora porque o resultado pode cair no dia anterior
 * (atendimento logo depois da meia-noite).
 */
export function horaDeChamarTransporte(
  data: string,
  inicio: string,
  tempoMin: number,
  folgaMin: number,
): { data: string; hora: string } {
  if (tempoMin < 0 || folgaMin < 0) {
    throw new Error('Tempo de deslocamento e folga não podem ser negativos')
  }
  return deslocarMinutos(data, inicio, -(tempoMin + folgaMin))
}

/** Atalho para um atendimento; `null` quando não há deslocamento (estúdio). */
export function horaDeChamarDoAtendimento(
  a: Atendimento,
): { data: string; hora: string } | null {
  if (a.local !== 'domicilio' || !a.deslocamento) return null
  return horaDeChamarTransporte(a.data, a.inicio, a.deslocamento.tempoMin, a.deslocamento.folgaMin)
}
