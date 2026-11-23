import type { Atendimento } from './atendimento'
import { chamaTransporte, NOME_DO_MEIO } from './meio'
import { horaDeChamarDoAtendimento } from './transporte'
import { deslocarMinutos, formatarDuracao, horaPorExtenso } from './tempo'

/**
 * Lembrete da hora de chamar o transporte na agenda do celular (RF08 / HU07, Anexo A):
 * evento "Chamar transporte – [cliente]" (ou "Sair para [cliente]", para quem vai por conta própria)
 * na hora calculada, com alerta nessa hora e
 * cliente, serviço e endereço na descrição.
 */
export interface Lembrete {
  titulo: string
  descricao: string
  local: string
  data: string
  hora: string
  duracaoMin: number
}

export function lembreteDoAtendimento(a: Atendimento): Lembrete | null {
  const chamar = horaDeChamarDoAtendimento(a)
  if (!chamar || !a.deslocamento) return null
  const { tempoMin, folgaMin, meio } = a.deslocamento
  return {
    titulo: chamaTransporte(meio) ? `Chamar transporte – ${a.cliente}` : `Sair para ${a.cliente}`,
    descricao: [
      `${a.servico} com ${a.cliente} às ${horaPorExtenso(a.inicio)}.`,
      `Endereço: ${a.endereco ?? ''}`,
      `Trajeto: ${formatarDuracao(tempoMin)} + ${folgaMin} min de folga (${NOME_DO_MEIO[meio]}).`,
      'Criado pelo Agenda Estilo.',
    ].join('\n'),
    local: a.endereco ?? '',
    data: chamar.data,
    hora: chamar.hora,
    // O evento vai da hora de chamar até o início do atendimento.
    duracaoMin: Math.max(tempoMin + folgaMin, 5),
  }
}

/** "2026-11-20" + "13:20" → "20261120T132000" (hora local, sem fuso: vale a do celular). */
function carimbo(data: string, hora: string): string {
  return `${data.replaceAll('-', '')}T${hora.replace(':', '')}00`
}

function inicioEFim(l: Lembrete): [string, string] {
  const fim = deslocarMinutos(l.data, l.hora, l.duracaoMin)
  return [carimbo(l.data, l.hora), carimbo(fim.data, fim.hora)]
}

/**
 * Link que abre o Google Agenda já na tela de edição do evento (melhor opção no Android).
 * O caminho r/eventedit é o editor que se adapta ao celular; o antigo "render" abria a versão de computador.
 */
export function linkGoogleAgenda(l: Lembrete): string {
  const [inicio, fim] = inicioEFim(l)
  const p = new URLSearchParams({
    text: l.titulo,
    dates: `${inicio}/${fim}`,
    details: l.descricao,
    location: l.local,
  })
  return `https://calendar.google.com/calendar/r/eventedit?${p.toString()}`
}

function escaparIcs(texto: string): string {
  return texto.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')
}

const utf8 = new TextEncoder()

/**
 * Quebra linhas com mais de 75 bytes, como pede a RFC 5545 (a continuação começa
 * com espaço). Conta bytes UTF-8, porque letras acentuadas ocupam 2.
 */
function dobrar(linha: string): string {
  const partes: string[] = []
  let atual = ''
  let bytes = 0
  for (const letra of linha) {
    const tamanho = utf8.encode(letra).length
    // 75 na primeira linha; 74 nas seguintes, por causa do espaço inicial
    if (bytes + tamanho > (partes.length === 0 ? 75 : 74)) {
      partes.push(atual)
      atual = ''
      bytes = 0
    }
    atual += letra
    bytes += tamanho
  }
  partes.push(atual)
  return partes.join('\r\n ')
}

/** Arquivo .ics com alerta na hora do evento (melhor opção no iPhone). */
export function gerarIcs(l: Lembrete, uid: string, agora: Date = new Date()): string {
  const [inicio, fim] = inicioEFim(l)
  const dtstamp = agora.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Agenda Estilo//MVP//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}@agenda-estilo`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${inicio}`,
    `DTEND:${fim}`,
    `SUMMARY:${escaparIcs(l.titulo)}`,
    `DESCRIPTION:${escaparIcs(l.descricao)}`,
    `LOCATION:${escaparIcs(l.local)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escaparIcs(l.titulo)}`,
    'TRIGGER:PT0M',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .map(dobrar)
    .join('\r\n')
}
