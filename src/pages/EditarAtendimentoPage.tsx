import { useNavigate, useParams } from 'react-router-dom'
import { AtendimentoForm } from '../components/AtendimentoForm'
import { rascunhoDe } from '../domain/formulario'
import { atualizarAtendimento, buscarAtendimento } from '../storage/armazenamento'
import { NaoEncontrado } from './NaoEncontrado'

// Editar atendimento: RF04.
export function EditarAtendimentoPage() {
  const { id = '' } = useParams()
  const navegar = useNavigate()
  const atendimento = buscarAtendimento(id)
  if (!atendimento) return <NaoEncontrado />

  return (
    <section>
      <h1>Editar atendimento</h1>
      <AtendimentoForm
        inicial={rascunhoDe(atendimento)}
        idEditado={id}
        rotuloSalvar="Salvar alterações"
        aoSalvar={(dados) => {
          // Campos que deixaram de existir (ex.: mudou de domicílio para estúdio) somem
          atualizarAtendimento(id, { endereco: undefined, deslocamento: undefined, ...dados })
          navegar(`/atendimento/${id}?aviso=editado`, { replace: true })
        }}
      />
    </section>
  )
}
