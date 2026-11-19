import type { MeioDeslocamento } from './atendimento'
import { horaPorExtenso } from './tempo'

/**
 * Meio de locomoção (RF10) e o que muda com ele: o texto da hora calculada,
 * a dica da folga e o modo da rota no mapa.
 */

export const NOME_DO_MEIO: Record<MeioDeslocamento, string> = {
  aplicativo: 'Aplicativo (Uber, 99…)',
  onibus: 'Ônibus',
  mototaxi: 'Mototáxi',
  carro: 'Carro ou moto próprios',
  outro: 'Outro',
}

export const MEIOS = Object.keys(NOME_DO_MEIO) as MeioDeslocamento[]

/** Aplicativo e mototáxi são chamados; nos outros a profissional simplesmente sai. */
export function chamaTransporte(meio: MeioDeslocamento): boolean {
  return meio === 'aplicativo' || meio === 'mototaxi'
}

/** "Chame o transporte às 13h20" ou, para quem vai por conta própria, "Saia às 13h20" (Anexo A). */
export function textoDaHora(meio: MeioDeslocamento, hora: string): string {
  return chamaTransporte(meio)
    ? `Chame o transporte às ${horaPorExtenso(hora)}`
    : `Saia às ${horaPorExtenso(hora)}`
}

/** Mesmo texto, no infinitivo, para a linha do tempo. */
export function rotuloDaHora(meio: MeioDeslocamento, hora: string): string {
  return chamaTransporte(meio)
    ? `Chamar o transporte às ${horaPorExtenso(hora)}`
    : `Sair às ${horaPorExtenso(hora)}`
}

export function dicaDaFolga(meio: MeioDeslocamento): string {
  switch (meio) {
    case 'aplicativo':
      return 'Para o carro chegar.'
    case 'mototaxi':
      return 'Para a moto chegar.'
    case 'onibus':
      return 'Para esperar o ônibus.'
    case 'carro':
      return 'Para estacionar.'
    default:
      return 'Margem extra.'
  }
}

/** Modo de rota do Google Maps para cada meio (sem modo: o Maps escolhe). */
export function modoNoMapa(meio?: MeioDeslocamento): 'driving' | 'transit' | undefined {
  if (meio === 'onibus') return 'transit'
  if (meio === 'aplicativo' || meio === 'mototaxi' || meio === 'carro') return 'driving'
  return undefined
}
