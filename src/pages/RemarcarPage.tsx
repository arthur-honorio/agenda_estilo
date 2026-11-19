import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IconeAlerta, IconeVoltar } from '../components/Icones'
import { LinhaDoTempo } from '../components/LinhaDoTempo'
import { AvisoTransporte } from '../components/ResumoAtendimento'
import { SeletorDeData } from '../components/SeletorDeData'
import { conflitos, linhaDoTempo } from '../domain/agenda'
import { formatarData } from '../domain/tempo'
import { atualizarAtendimento, useAtendimentos } from '../storage/armazenamento'
import { NaoEncontrado } from './NaoEncontrado'

// Remarcar: escolhe o novo dia e horário vendo a linha do tempo (RF04 / HU06).
export function RemarcarPage() {
  const { id = '' } = useParams()
  const navegar = useNavigate()
  const todos = useAtendimentos()
  const original = todos.find((a) => a.id === id)
  const [data, setData] = useState(original?.data ?? '')
  const [inicio, setInicio] = useState(original?.inicio ?? '')
  if (!original) return <NaoEncontrado />

  const outros = todos.filter((a) => a.id !== id)
  const novo = { ...original, data, inicio, status: 'agendado' as const }
  const valido = /^\d{4}-\d{2}-\d{2}$/.test(data) && /^\d{2}:\d{2}$/.test(inicio)
  const choques = valido ? conflitos(novo, outros) : []
  const mudou = data !== original.data || inicio !== original.inicio || original.status === 'desmarcado'

  return (
    <section>
      <Link to={`/atendimento/${id}`} className="voltar">
        <IconeVoltar /> Voltar
      </Link>
      <h1>Remarcar {original.cliente}</h1>
      <p className="dica">
        {original.status === 'desmarcado' ? 'Estava marcado' : 'Marcado'} para {formatarData(original.data)} às{' '}
        {original.inicio}.
      </p>

      <h2>Novo dia</h2>
      <SeletorDeData data={data} aoMudar={setData} />

      <div className="campo">
        <label htmlFor="novo-inicio">Novo horário</label>
        <input id="novo-inicio" type="time" step={300} value={inicio} onChange={(e) => setInicio(e.target.value)} />
        <p className="dica">Ou toque em um horário livre abaixo.</p>
      </div>

      {valido && <AvisoTransporte atendimento={novo} />}

      {choques.length > 0 && (
        <div className="alerta" role="status">
          <IconeAlerta />
          <p>Esse horário bate com {choques.map((c) => `${c.cliente} (${c.inicio})`).join(' e ')}.</p>
        </div>
      )}

      <button
        type="button"
        className="botao botao-grande"
        disabled={!valido || !mudou}
        onClick={() => {
          atualizarAtendimento(id, { data, inicio, status: 'agendado' })
          navegar(`/atendimento/${id}?aviso=remarcado`, { replace: true })
        }}
      >
        Salvar novo horário
      </button>

      <h2>Agenda de {formatarData(data)}</h2>
      <LinhaDoTempo itens={linhaDoTempo(outros, data)} aoEscolherLivre={setInicio} rotuloLivre="Usar" comLinks={false} />
    </section>
  )
}
