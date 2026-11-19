import type { MeioDeslocamento } from './atendimento'
import { modoNoMapa } from './meio'

/**
 * Mapa incorporado (RF05). O site não lê o tempo do mapa (restrição do navegador):
 * a profissional lê e digita. O endereço é enviado ao Google (ver aviso em Meus dados).
 */

/** Parâmetro "dirflg" do mapa incorporado: r = transporte público, d = carro. */
const DIRFLG = { transit: 'r', driving: 'd' } as const

/** URL do iframe: rota pelo meio escolhido quando há origem; só o local quando não há. */
export function urlMapaIncorporado(destino: string, origem?: string, meio?: MeioDeslocamento): string {
  if (!origem?.trim()) {
    return `https://maps.google.com/maps?${new URLSearchParams({ q: destino.trim(), output: 'embed' })}`
  }
  const p = new URLSearchParams({ saddr: origem.trim(), daddr: destino.trim() })
  const modo = modoNoMapa(meio)
  if (modo) p.set('dirflg', DIRFLG[modo])
  p.set('output', 'embed')
  return `https://maps.google.com/maps?${p}`
}

/** Abre a rota no app do Google Maps, já no meio escolhido, com o tempo estimado. */
export function urlRotaNoGoogleMaps(destino: string, origem?: string, meio?: MeioDeslocamento): string {
  const p = new URLSearchParams({ api: '1', destination: destino.trim() })
  if (origem?.trim()) p.set('origin', origem.trim())
  const modo = modoNoMapa(meio)
  if (modo) p.set('travelmode', modo)
  return `https://www.google.com/maps/dir/?${p}`
}
