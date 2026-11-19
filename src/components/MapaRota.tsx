import { urlMapaIncorporado, urlRotaNoGoogleMaps } from '../domain/mapa'

/** Mapa incorporado com a rota (RF05) e atalho para o app do Google Maps. */
export function MapaRota({ destino, origem }: { destino: string; origem?: string }) {
  if (destino.trim().length < 5) return null
  return (
    <div className="mapa">
      <iframe
        title={`Mapa da rota até ${destino}`}
        src={urlMapaIncorporado(destino, origem)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a href={urlRotaNoGoogleMaps(destino, origem)} target="_blank" rel="noreferrer" className="link">
        Abrir a rota no Google Maps
      </a>
    </div>
  )
}
