import type { Atendimento } from './atendimento'
import { MINUTOS_NO_DIA, paraMinutos } from './tempo'

/**
 * Regras da tela Agenda: linha do tempo do dia (RF02), conflito de horários (RF13 / HU01),
 * busca por cliente (RF03) e próxima hora de chamar o transporte (HU04).
 * Os horários aqui são minutos desde a meia-noite do dia consultado.
 */

export interface Intervalo {
  inicio: number
  fim: number
}

export type ItemLinhaDoTempo =
  | ({ tipo: 'deslocamento'; atendimento: Atendimento } & Intervalo)
  | ({ tipo: 'atendimento'; atendimento: Atendimento } & Intervalo)
  | ({ tipo: 'livre' } & Intervalo)

export function ativo(a: Atendimento): boolean {
  return a.status !== 'desmarcado'
}

/** Minutos de antecedência: trajeto + folga (zero no estúdio). */
function antecedencia(a: Atendimento): number {
  if (a.local !== 'domicilio' || !a.deslocamento) return 0
  return a.deslocamento.tempoMin + a.deslocamento.folgaMin
}

/** Tempo ocupado pelo atendimento, incluindo o deslocamento antes dele. */
export function intervaloOcupado(a: Atendimento): Intervalo {
  const inicio = paraMinutos(a.inicio)
  return { inicio: inicio - antecedencia(a), fim: inicio + a.duracaoMin }
}

function sobrepoe(x: Intervalo, y: Intervalo): boolean {
  return x.inicio < y.fim && y.inicio < x.fim
}

/**
 * Atendimentos do mesmo dia que batem com o candidato (contando o deslocamento de cada um).
 * Cobre o "dois atendimentos no mesmo horário" e o "intervalo menor que o deslocamento".
 */
export function conflitos(candidato: Atendimento, todos: Atendimento[]): Atendimento[] {
  const alvo = intervaloOcupado(candidato)
  return todos
    .filter((a) => a.id !== candidato.id && a.data === candidato.data && ativo(a))
    .filter((a) => sobrepoe(alvo, intervaloOcupado(a)))
    .sort(porHorario)
}

export function porHorario(a: Atendimento, b: Atendimento): number {
  return a.data === b.data ? paraMinutos(a.inicio) - paraMinutos(b.inicio) : a.data < b.data ? -1 : 1
}

export interface OpcoesLinhaDoTempo {
  /** Início do expediente exibido (padrão 07:00). */
  abre?: number
  /** Fim do expediente exibido (padrão 21:00). */
  fecha?: number
  /** Menor intervalo mostrado como livre (padrão 30 min). */
  livreMinimo?: number
}

/** Linha do tempo do dia: deslocamentos, atendimentos e horários livres, em ordem. */
export function linhaDoTempo(
  todos: Atendimento[],
  data: string,
  { abre = 7 * 60, fecha = 21 * 60, livreMinimo = 30 }: OpcoesLinhaDoTempo = {},
): ItemLinhaDoTempo[] {
  const doDia = todos.filter((a) => a.data === data && ativo(a)).sort(porHorario)

  const ocupados: ItemLinhaDoTempo[] = []
  for (const a of doDia) {
    const inicio = paraMinutos(a.inicio)
    const fim = Math.min(inicio + a.duracaoMin, MINUTOS_NO_DIA)
    const ante = antecedencia(a)
    if (ante > 0) {
      ocupados.push({ tipo: 'deslocamento', atendimento: a, inicio: Math.max(0, inicio - ante), fim: inicio })
    }
    ocupados.push({ tipo: 'atendimento', atendimento: a, inicio, fim })
  }

  // Horários livres: buracos entre os blocos ocupados dentro do expediente.
  const itens: ItemLinhaDoTempo[] = []
  let cursor = Math.min(abre, ...ocupados.map((o) => o.inicio))
  const limite = Math.max(fecha, ...ocupados.map((o) => o.fim))
  for (const o of ocupados) {
    if (o.inicio - cursor >= livreMinimo) itens.push({ tipo: 'livre', inicio: cursor, fim: o.inicio })
    itens.push(o)
    cursor = Math.max(cursor, o.fim)
  }
  if (limite - cursor >= livreMinimo) itens.push({ tipo: 'livre', inicio: cursor, fim: limite })
  return itens
}

/** Tira acentos e caixa para comparar nomes ("Lúcia" acha "lucia"). */
export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

/** Atendimentos cuja cliente contém o termo, em ordem de data e hora (RF03). */
export function buscarPorCliente(todos: Atendimento[], termo: string): Atendimento[] {
  const t = normalizar(termo)
  if (!t) return []
  return todos.filter((a) => normalizar(a.cliente).includes(t)).sort(porHorario)
}

/**
 * Próxima hora de chamar o transporte no dia. Se `agora` for informado (dia de hoje),
 * ignora as que já passaram.
 */
export function proximoTransporte(
  todos: Atendimento[],
  data: string,
  agora?: number,
): { atendimento: Atendimento; minuto: number } | null {
  const candidatos = todos
    .filter((a) => a.data === data && ativo(a) && antecedencia(a) > 0)
    .map((a) => ({ atendimento: a, minuto: paraMinutos(a.inicio) - antecedencia(a) }))
    .filter((c) => agora === undefined || c.minuto >= agora)
    .sort((x, y) => x.minuto - y.minuto)
  return candidatos[0] ?? null
}
