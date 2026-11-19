import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { AdicionarLembrete } from '../components/AdicionarLembrete'
import { IconeVoltar } from '../components/Icones'
import { AvisoTransporte, ValoresDoAtendimento } from '../components/ResumoAtendimento'
import { NOME_DO_MEIO } from '../domain/lembrete'
import { urlRotaNoGoogleMaps } from '../domain/mapa'
import { formatarData, formatarDuracao, formatarMinutos, paraMinutos } from '../domain/tempo'
import { atualizarAtendimento, useAtendimentos } from '../storage/armazenamento'
import { NaoEncontrado } from './NaoEncontrado'

const AVISOS: Record<string, string> = {
  salvo: 'Atendimento salvo!',
  editado: 'Alterações salvas.',
  remarcado: 'Atendimento remarcado. Se você já tinha criado o lembrete, crie de novo com o horário novo.',
}

// Detalhe do atendimento: lembrete (RF08), remarcar/editar/desmarcar (RF04), valores (RF09–RF11).
export function AtendimentoPage() {
  const { id = '' } = useParams()
  const [params] = useSearchParams()
  const atendimento = useAtendimentos().find((a) => a.id === id)
  const [confirmando, setConfirmando] = useState(false)
  if (!atendimento) return <NaoEncontrado />

  const a = atendimento
  const desmarcado = a.status === 'desmarcado'
  const aviso = AVISOS[params.get('aviso') ?? '']
  const fim = formatarMinutos(paraMinutos(a.inicio) + a.duracaoMin)

  return (
    <section className="detalhe">
      <Link to={`/?data=${a.data}`} className="voltar">
        <IconeVoltar /> Agenda
      </Link>

      {aviso && (
        <p className="aviso-sucesso" role="status">
          {aviso}
        </p>
      )}

      <h1>
        {a.cliente} <span className="subtitulo">· {a.servico}</span>
      </h1>
      {desmarcado && <p className="etiqueta-desmarcado">Desmarcado</p>}

      <p className="quando">
        {formatarData(a.data)} · {a.inicio} – {fim} ({formatarDuracao(a.duracaoMin)})
        <br />
        {a.local === 'domicilio' ? `Na casa da cliente: ${a.endereco}` : 'No estúdio'}
      </p>

      {a.local === 'domicilio' && a.deslocamento && !desmarcado && (
        <div className="cartao">
          <AvisoTransporte atendimento={a} />
          <p className="dica">
            {formatarDuracao(a.deslocamento.tempoMin)} de trajeto + {a.deslocamento.folgaMin} min de folga ·{' '}
            {NOME_DO_MEIO[a.deslocamento.meio]}
          </p>
          <AdicionarLembrete atendimento={a} />
          <a href={urlRotaNoGoogleMaps(a.endereco ?? '', a.deslocamento.origem)} target="_blank" rel="noreferrer" className="link">
            Ver a rota no Google Maps
          </a>
        </div>
      )}

      <div className="cartao">
        <ValoresDoAtendimento atendimento={a} />
      </div>

      <div className="acoes">
        <Link to={`/atendimento/${a.id}/remarcar`} className="botao">
          {desmarcado ? 'Remarcar (voltar à agenda)' : 'Remarcar'}
        </Link>
        <Link to={`/atendimento/${a.id}/editar`} className="botao botao-secundario">
          Editar
        </Link>
        {!desmarcado &&
          (confirmando ? (
            <div className="confirmacao" role="alertdialog" aria-label="Confirmar desmarcação">
              <p>Desmarcar o atendimento de {a.cliente}? Ele sai da agenda e da carteira.</p>
              <button
                type="button"
                className="botao botao-perigo"
                onClick={() => {
                  atualizarAtendimento(a.id, { status: 'desmarcado' })
                  setConfirmando(false)
                }}
              >
                Sim, desmarcar
              </button>
              <button type="button" className="botao botao-secundario" onClick={() => setConfirmando(false)}>
                Não
              </button>
            </div>
          ) : (
            <button type="button" className="botao botao-secundario botao-perigo-texto" onClick={() => setConfirmando(true)}>
              Desmarcar
            </button>
          ))}
      </div>
    </section>
  )
}
