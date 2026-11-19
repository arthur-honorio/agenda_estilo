/**
 * Mapa incorporado (RF05). O site não lê o tempo do mapa (restrição do navegador):
 * a profissional lê e digita. O endereço é enviado ao Google (ver aviso em Meus dados).
 */

/** URL do iframe: rota quando há origem, só o local quando não há. */
export function urlMapaIncorporado(destino: string, origem?: string): string {
  const p = origem?.trim()
    ? new URLSearchParams({ saddr: origem.trim(), daddr: destino.trim(), output: 'embed' })
    : new URLSearchParams({ q: destino.trim(), output: 'embed' })
  return `https://maps.google.com/maps?${p.toString()}`
}

/** Abre a rota no app do Google Maps, que mostra o tempo estimado de cada meio. */
export function urlRotaNoGoogleMaps(destino: string, origem?: string): string {
  const p = new URLSearchParams({ api: '1', destination: destino.trim() })
  if (origem?.trim()) p.set('origin', origem.trim())
  return `https://www.google.com/maps/dir/?${p.toString()}`
}
