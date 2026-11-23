import type { Atendimento } from '../domain/atendimento'
import { lembreteDoAtendimento, linkGoogleAgenda } from '../domain/lembrete'
import { horaPorExtenso } from '../domain/tempo'

/**
 * Botão "Adicionar ao Google Agenda" (HU07). É a mesma opção no Android e no iPhone:
 * o calendário nativo do iPhone, por arquivo .ics, não funcionava de forma confiável no Safari.
 */
export function AdicionarLembrete({ atendimento }: { atendimento: Atendimento }) {
  const lembrete = lembreteDoAtendimento(atendimento)
  if (!lembrete) return null

  return (
    <div className="lembrete-opcoes">
      <p>
        O lembrete fica para as <strong>{horaPorExtenso(lembrete.hora)}</strong>.
      </p>
      <a href={linkGoogleAgenda(lembrete)} target="_blank" rel="noreferrer" className="botao">
        Adicionar ao Google Agenda
      </a>
      <p className="dica">No Google Agenda, deixe a notificação "No horário do evento" e toque em Salvar.</p>
    </div>
  )
}
