import { useState } from 'react'
import type { Atendimento } from '../domain/atendimento'
import { gerarIcs, lembreteDoAtendimento, linkGoogleAgenda } from '../domain/lembrete'
import { horaPorExtenso } from '../domain/tempo'

function ehIphone(): boolean {
  const ua = navigator.userAgent
  // iPad recente se apresenta como Mac, mas tem tela de toque
  return /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
}

function baixarIcs(conteudo: string, nome: string) {
  if (ehIphone()) {
    // No Safari do iPhone, abrir o .ics direto mostra "Adicionar ao Calendário"
    window.location.href = `data:text/calendar;charset=utf-8,${encodeURIComponent(conteudo)}`
    return
  }
  const url = URL.createObjectURL(new Blob([conteudo], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = nome
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/** Botão "Adicionar à minha agenda" (HU07): Google Agenda ou arquivo .ics. */
export function AdicionarLembrete({ atendimento }: { atendimento: Atendimento }) {
  const [aberto, setAberto] = useState(false)
  const lembrete = lembreteDoAtendimento(atendimento)
  if (!lembrete) return null

  const iphone = ehIphone()
  const google = (
    <a
      key="google"
      href={linkGoogleAgenda(lembrete)}
      target="_blank"
      rel="noreferrer"
      className={iphone ? 'botao botao-secundario' : 'botao'}
    >
      Google Agenda
    </a>
  )
  const ics = (
    <button
      key="ics"
      type="button"
      className={iphone ? 'botao' : 'botao botao-secundario'}
      onClick={() => baixarIcs(gerarIcs(lembrete, atendimento.id), `lembrete-${atendimento.cliente}.ics`)}
    >
      {iphone ? 'Calendário do iPhone' : 'Outro calendário (.ics)'}
    </button>
  )

  if (!aberto) {
    return (
      <button type="button" className="botao" onClick={() => setAberto(true)}>
        Adicionar à minha agenda
      </button>
    )
  }
  return (
    <div className="lembrete-opcoes" role="group" aria-label="Onde criar o lembrete">
      <p>
        O lembrete fica para as <strong>{horaPorExtenso(lembrete.hora)}</strong>. Escolha a agenda do seu celular:
      </p>
      {iphone ? [ics, google] : [google, ics]}
      <p className="dica">Depois de salvar o evento, confira se o aviso está ligado.</p>
    </div>
  )
}
