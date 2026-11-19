import type { Atendimento } from '../domain/atendimento'
import { custoDeslocamento, lucro, restanteAReceber } from '../domain/carteira'
import { formatarReais } from '../domain/dinheiro'
import { horaPorExtenso } from '../domain/tempo'
import { horaDeChamarDoAtendimento } from '../domain/transporte'
import { IconeCarro } from './Icones'

/** "Chame o transporte às 13h20 para chegar às 14h00" (HU02 / Anexo A). */
export function AvisoTransporte({ atendimento }: { atendimento: Atendimento }) {
  const chamar = horaDeChamarDoAtendimento(atendimento)
  if (!chamar) return null
  const outroDia = chamar.data !== atendimento.data
  return (
    <div className="aviso-transporte">
      <IconeCarro />
      <p>
        Chame o transporte às <strong>{horaPorExtenso(chamar.hora)}</strong>
        {outroDia && ' (do dia anterior)'} para chegar às {horaPorExtenso(atendimento.inicio)}
      </p>
    </div>
  )
}

/** Valores do atendimento (HU03 / HU08). */
export function ValoresDoAtendimento({ atendimento }: { atendimento: Atendimento }) {
  const emCasa = atendimento.local === 'domicilio'
  return (
    <dl className="valores">
      <div>
        <dt>Valor do serviço</dt>
        <dd>{formatarReais(atendimento.valor)}</dd>
      </div>
      <div>
        <dt>Sinal pago</dt>
        <dd>{formatarReais(atendimento.sinal)}</dd>
      </div>
      <div className="destaque">
        <dt>Falta receber</dt>
        <dd>{formatarReais(restanteAReceber(atendimento))}</dd>
      </div>
      {emCasa && (
        <div>
          <dt>Custo do deslocamento</dt>
          <dd>− {formatarReais(custoDeslocamento(atendimento))}</dd>
        </div>
      )}
      <div className="destaque">
        <dt>Seu lucro</dt>
        <dd>{formatarReais(lucro(atendimento))}</dd>
      </div>
    </dl>
  )
}
