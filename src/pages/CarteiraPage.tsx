import { Link } from 'react-router-dom'
import { SeletorDeData } from '../components/SeletorDeData'
import { useDataDaUrl } from '../hooks/useDataDaUrl'
import { ativo, porHorario } from '../domain/agenda'
import { lucro, restanteAReceber, resumirCarteira } from '../domain/carteira'
import { formatarReais } from '../domain/dinheiro'
import { useAtendimentos } from '../storage/armazenamento'

// Carteira do dia: a receber, sinais, custos e lucro (RF11, RF12 / HU08).
export function CarteiraPage() {
  const todos = useAtendimentos()
  const [data, setData] = useDataDaUrl()
  const doDia = todos.filter((a) => a.data === data && ativo(a)).sort(porHorario)
  const r = resumirCarteira(doDia)

  return (
    <section>
      <h1>Carteira</h1>
      <SeletorDeData data={data} aoMudar={setData} />

      <div className="painel-lucro">
        <span>Lucro do dia</span>
        <strong>{formatarReais(r.lucro)}</strong>
        <small>
          {r.quantidade} {r.quantidade === 1 ? 'atendimento' : 'atendimentos'} · valor total {formatarReais(r.valorTotal)}
        </small>
      </div>

      <dl className="totais">
        <div>
          <dt>Falta receber</dt>
          <dd>{formatarReais(r.aReceber)}</dd>
        </div>
        <div>
          <dt>Sinais recebidos</dt>
          <dd>{formatarReais(r.sinaisRecebidos)}</dd>
        </div>
        <div>
          <dt>Custos de deslocamento</dt>
          <dd>{formatarReais(r.custos)}</dd>
        </div>
      </dl>

      {doDia.length === 0 ? (
        <p className="vazio">Nenhum atendimento neste dia.</p>
      ) : (
        <ul className="resultados" aria-label="Atendimentos do dia">
          {doDia.map((a) => (
            <li key={a.id}>
              <Link to={`/atendimento/${a.id}`} className="cartao-link linha-carteira">
                <span>
                  <strong>
                    {a.inicio} {a.cliente}
                  </strong>
                  <br />
                  <small>
                    falta {formatarReais(restanteAReceber(a))} de {formatarReais(a.valor)}
                  </small>
                </span>
                <span className="valor-lucro">
                  <small>lucro</small>
                  <br />
                  {formatarReais(lucro(a))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="dica">Lucro = valor do serviço − custo do deslocamento. Desmarcados não entram na conta.</p>
    </section>
  )
}
