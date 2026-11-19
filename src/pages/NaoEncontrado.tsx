import { Link } from 'react-router-dom'

export function NaoEncontrado() {
  return (
    <section>
      <h1>Atendimento não encontrado</h1>
      <p className="vazio">Ele pode ter sido apagado neste aparelho.</p>
      <Link to="/" className="botao">
        Voltar para a agenda
      </Link>
    </section>
  )
}
