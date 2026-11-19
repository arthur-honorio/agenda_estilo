import { useState } from 'react'
import { atendimentosDeExemplo } from '../domain/exemplos'
import { dataLocal } from '../domain/tempo'
import { apagarTudo, carregarExemplos, useAtendimentos } from '../storage/armazenamento'

// Meus dados: aviso de privacidade (Anexo B), agenda de exemplo e apagar tudo (RF20 / HU09).
export function MeusDadosPage() {
  const total = useAtendimentos().length
  const [confirmando, setConfirmando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  return (
    <section>
      <h1>Meus dados</h1>

      <div className="cartao">
        <h2>Privacidade</h2>
        <p>
          Seus dados ficam só no seu celular. O Agenda Bela não tem servidor e não guarda suas informações nem as das
          suas clientes. Para mostrar a rota, o endereço do atendimento é enviado ao Google Maps. Se você limpar os
          dados do navegador ou trocar de celular, suas informações serão perdidas. Você pode apagar tudo a qualquer
          momento aqui.
        </p>
        <p className="dica">
          Neste aparelho: {total} {total === 1 ? 'atendimento salvo' : 'atendimentos salvos'}.
        </p>
      </div>

      {mensagem && (
        <p className="aviso-sucesso" role="status">
          {mensagem}
        </p>
      )}

      <div className="cartao">
        <h2>Agenda de exemplo</h2>
        <p>Para os testes do projeto: coloca na agenda atendimentos fictícios de hoje e de amanhã.</p>
        <button
          type="button"
          className="botao botao-secundario"
          onClick={() => {
            carregarExemplos(atendimentosDeExemplo(dataLocal()))
            setMensagem('Agenda de exemplo carregada.')
          }}
        >
          Carregar agenda de exemplo
        </button>
      </div>

      <div className="cartao">
        <h2>Apagar tudo</h2>
        {confirmando ? (
          <div className="confirmacao" role="alertdialog" aria-label="Confirmar exclusão">
            <p>
              Apagar <strong>todos</strong> os atendimentos deste aparelho? Não dá para desfazer.
            </p>
            <button
              type="button"
              className="botao botao-perigo"
              onClick={() => {
                apagarTudo()
                setConfirmando(false)
                setMensagem('Todos os dados foram apagados deste aparelho.')
              }}
            >
              Sim, apagar tudo
            </button>
            <button type="button" className="botao botao-secundario" onClick={() => setConfirmando(false)}>
              Cancelar
            </button>
          </div>
        ) : (
          <button type="button" className="botao botao-secundario botao-perigo-texto" onClick={() => setConfirmando(true)}>
            Apagar todos os dados
          </button>
        )}
      </div>
    </section>
  )
}
