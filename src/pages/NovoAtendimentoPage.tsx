import { useNavigate, useSearchParams } from 'react-router-dom'
import { AtendimentoForm } from '../components/AtendimentoForm'
import { rascunhoVazio } from '../domain/formulario'
import { dataLocal } from '../domain/tempo'
import { criarAtendimento, lerPreferencias, salvarPreferencias } from '../storage/armazenamento'

// Agendamento: RF01, RF05–RF07, RF09, RF10 (HU01–HU03).
export function NovoAtendimentoPage() {
  const navegar = useNavigate()
  const [params] = useSearchParams()
  const prefs = lerPreferencias()

  const inicial = rascunhoVazio(params.get('data') ?? dataLocal(), {
    inicio: params.get('inicio') ?? '',
    origem: prefs.ultimaOrigem ?? '',
    folgaMin: String(prefs.ultimaFolga ?? 10),
  })

  return (
    <section>
      <h1>Novo atendimento</h1>
      <AtendimentoForm
        inicial={inicial}
        rotuloSalvar="Salvar atendimento"
        aoSalvar={(dados) => {
          const novo = criarAtendimento(dados)
          if (dados.deslocamento) {
            salvarPreferencias({ ultimaOrigem: dados.deslocamento.origem ?? '', ultimaFolga: dados.deslocamento.folgaMin })
          }
          navegar(`/atendimento/${novo.id}?aviso=salvo`, { replace: true })
        }}
      />
    </section>
  )
}
