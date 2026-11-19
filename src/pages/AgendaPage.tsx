import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconeBusca, IconeCarro } from '../components/Icones'
import { LinhaDoTempo } from '../components/LinhaDoTempo'
import { SeletorDeData } from '../components/SeletorDeData'
import { useDataDaUrl } from '../hooks/useDataDaUrl'
import { buscarPorCliente, linhaDoTempo, proximoTransporte } from '../domain/agenda'
import { atendimentosDeExemplo } from '../domain/exemplos'
import { dataLocal, formatarData, formatarMinutos, horaPorExtenso, minutosAgora } from '../domain/tempo'
import { carregarExemplos, useAtendimentos } from '../storage/armazenamento'

// Agenda: linha do tempo do dia (RF02), busca (RF03) e próxima hora do transporte (HU04).
export function AgendaPage() {
  const todos = useAtendimentos()
  const [data, setData] = useDataDaUrl()
  const [termo, setTermo] = useState('')
  const navegar = useNavigate()

  const hoje = dataLocal()
  const proximo = proximoTransporte(todos, data, data === hoje ? minutosAgora() : undefined)
  const resultados = buscarPorCliente(todos, termo)

  return (
    <section>
      <div className="busca">
        <IconeBusca />
        <input
          type="search"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Buscar cliente pelo nome"
          aria-label="Buscar cliente pelo nome"
          autoComplete="off"
        />
      </div>

      {termo.trim() ? (
        <ResultadosDaBusca termo={termo} resultados={resultados} />
      ) : (
        <>
          <SeletorDeData data={data} aoMudar={setData} />

          {proximo && (
            <Link to={`/atendimento/${proximo.atendimento.id}`} className="proximo-transporte">
              <IconeCarro />
              <span>
                {data === hoje ? 'Próximo transporte' : 'Primeiro transporte do dia'}:{' '}
                <strong>chame às {horaPorExtenso(formatarMinutos(proximo.minuto))}</strong>
                <br />
                <small>
                  {proximo.atendimento.cliente}, às {horaPorExtenso(proximo.atendimento.inicio)}
                </small>
              </span>
            </Link>
          )}

          {todos.length === 0 ? (
            <AgendaVazia />
          ) : (
            <LinhaDoTempo
              itens={linhaDoTempo(todos, data)}
              aoEscolherLivre={(inicio) => navegar(`/novo?data=${data}&inicio=${inicio}`)}
            />
          )}

          <Link to={`/novo?data=${data}`} className="botao botao-grande">
            + Novo atendimento
          </Link>
        </>
      )}
    </section>
  )
}

function ResultadosDaBusca({ termo, resultados }: { termo: string; resultados: ReturnType<typeof buscarPorCliente> }) {
  if (resultados.length === 0) {
    return <p className="vazio">Nenhuma cliente encontrada com "{termo.trim()}".</p>
  }
  return (
    <ul className="resultados" aria-label="Resultados da busca">
      {resultados.map((a) => (
        <li key={a.id}>
          <Link to={`/atendimento/${a.id}`} className="cartao-link">
            <strong>{a.cliente}</strong> · {a.servico}
            {a.status === 'desmarcado' && <span className="etiqueta-desmarcado"> desmarcado</span>}
            <br />
            <small>
              {formatarData(a.data)} às {a.inicio} · {a.local === 'domicilio' ? 'Domicílio' : 'Estúdio'}
            </small>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function AgendaVazia() {
  return (
    <div className="cartao vazio-cartao">
      <p>Sua agenda ainda está vazia. Cadastre o primeiro atendimento.</p>
      <p className="dica">Participando do teste? Carregue a agenda de exemplo.</p>
      <button type="button" className="botao botao-secundario" onClick={() => carregarExemplos(atendimentosDeExemplo(dataLocal()))}>
        Carregar agenda de exemplo
      </button>
    </div>
  )
}
