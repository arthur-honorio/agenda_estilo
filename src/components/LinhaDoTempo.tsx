import { Link } from 'react-router-dom'
import type { ItemLinhaDoTempo } from '../domain/agenda'
import { formatarDuracao, formatarMinutos, horaPorExtenso } from '../domain/tempo'
import { IconeCarro } from './Icones'

interface Props {
  itens: ItemLinhaDoTempo[]
  /** Toque num horário livre (ex.: abrir o cadastro já com a hora). */
  aoEscolherLivre?: (inicio: string) => void
  /** Texto do botão do horário livre. */
  rotuloLivre?: string
  /** Atendimentos viram links para o detalhe (padrão: sim). */
  comLinks?: boolean
}

/** Linha do tempo do dia (HU04): deslocamentos, atendimentos e horários livres. */
export function LinhaDoTempo({ itens, aoEscolherLivre, rotuloLivre = 'Encaixar', comLinks = true }: Props) {
  return (
    <ol className="linha-do-tempo">
      {itens.map((item) => {
        const faixa = `${formatarMinutos(item.inicio)} – ${formatarMinutos(item.fim)}`

        if (item.tipo === 'livre') {
          return (
            <li key={`livre-${item.inicio}`} className="item item-livre">
              <span className="item-hora">{formatarMinutos(item.inicio)}</span>
              <div className="item-corpo">
                <span>
                  Livre · {faixa} <small>({formatarDuracao(item.fim - item.inicio)})</small>
                </span>
                {aoEscolherLivre && (
                  <button type="button" className="botao-pequeno" onClick={() => aoEscolherLivre(formatarMinutos(item.inicio))}>
                    {rotuloLivre}
                  </button>
                )}
              </div>
            </li>
          )
        }

        const a = item.atendimento
        if (item.tipo === 'deslocamento') {
          return (
            <li key={`desl-${a.id}`} className="item item-deslocamento">
              <span className="item-hora">{formatarMinutos(item.inicio)}</span>
              <div className="item-corpo">
                <IconeCarro />
                <span>
                  <strong>Chamar o transporte às {horaPorExtenso(formatarMinutos(item.inicio))}</strong>
                  <br />
                  <small>
                    {formatarDuracao(a.deslocamento!.tempoMin)} de trajeto + {a.deslocamento!.folgaMin} min de folga
                  </small>
                </span>
              </div>
            </li>
          )
        }

        const conteudo = (
          <>
            <strong>{a.cliente}</strong> · {a.servico}
            <br />
            <small>
              {faixa} · {a.local === 'domicilio' ? 'Domicílio' : 'Estúdio'}
            </small>
          </>
        )
        return (
          <li key={a.id} className={`item item-atendimento ${a.local}`}>
            <span className="item-hora">{formatarMinutos(item.inicio)}</span>
            {comLinks ? (
              <Link to={`/atendimento/${a.id}`} className="item-corpo cartao-link">
                <span>{conteudo}</span>
              </Link>
            ) : (
              <div className="item-corpo">
                <span>{conteudo}</span>
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
