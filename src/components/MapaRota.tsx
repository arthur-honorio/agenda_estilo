import type { MeioDeslocamento } from '../domain/atendimento'
import { urlMapaIncorporado, urlRotaNoGoogleMaps } from '../domain/mapa'

/** Mapa incorporado com a rota pelo meio escolhido (RF05) e atalho para o app do Google Maps. */
export function MapaRota({ destino, origem, meio }: { destino: string; origem?: string; meio?: MeioDeslocamento }) {
  if (destino.trim().length < 5) return null
  return (
    <div className="mapa">
      {/* O quadro corta o topo do iframe para esconder o cartão de origem/destino do Google. */}
      <div className="mapa-quadro">
        <iframe
          title={`Mapa da rota até ${destino}`}
          src={urlMapaIncorporado(destino, origem, meio)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a href={urlRotaNoGoogleMaps(destino, origem, meio)} target="_blank" rel="noreferrer" className="link">
        Ver o tempo do trajeto no Google Maps
      </a>
    </div>
  )
}
