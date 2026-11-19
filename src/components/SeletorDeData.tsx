import { dataLocal, formatarData, rotuloDia, somarDias } from '../domain/tempo'
import { IconeAvancar, IconeVoltar } from './Icones'

export function SeletorDeData({ data, aoMudar }: { data: string; aoMudar: (data: string) => void }) {
  const hoje = dataLocal()
  const rotulo = rotuloDia(data, hoje)
  return (
    <div className="seletor-data">
      <button type="button" className="botao-icone" onClick={() => aoMudar(somarDias(data, -1))} aria-label="Dia anterior">
        <IconeVoltar />
      </button>

      {/* O input de data fica invisível por cima do rótulo: tocar abre o calendário do celular */}
      <label className="seletor-data-rotulo">
        <strong>{rotulo}</strong>
        {rotulo !== formatarData(data) && <span>{formatarData(data)}</span>}
        <input
          type="date"
          value={data}
          onChange={(e) => e.target.value && aoMudar(e.target.value)}
          aria-label="Escolher dia"
        />
      </label>

      <button type="button" className="botao-icone" onClick={() => aoMudar(somarDias(data, 1))} aria-label="Próximo dia">
        <IconeAvancar />
      </button>

      {data !== hoje && (
        <button type="button" className="botao-hoje" onClick={() => aoMudar(hoje)}>
          Hoje
        </button>
      )}
    </div>
  )
}
