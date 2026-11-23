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
 * Link que abre o Google Agenda já na tela de edição do evento (o mesmo no Android e no iPhone).
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
