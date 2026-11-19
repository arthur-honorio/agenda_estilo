import type { Atendimento } from './atendimento'

/** Custo do deslocamento em centavos (zero no estúdio ou sem custo informado). */
export function custoDeslocamento(a: Atendimento): number {
  return a.deslocamento?.custo ?? 0
}

/** Restante a receber = valor − sinal (RF09). */
export function restanteAReceber(a: Atendimento): number {
  return a.valor - a.sinal
}

/** Lucro = valor do serviço − custo de deslocamento (RF11). */
export function lucro(a: Atendimento): number {
  return a.valor - custoDeslocamento(a)
}

export interface ResumoCarteira {
  quantidade: number
  valorTotal: number
  sinaisRecebidos: number
  aReceber: number
  custos: number
  lucro: number
}

/** Carteira de um conjunto de atendimentos; desmarcados não entram (RF12, HU08). */
export function resumirCarteira(atendimentos: Atendimento[]): ResumoCarteira {
  const ativos = atendimentos.filter((a) => a.status !== 'desmarcado')
  return {
    quantidade: ativos.length,
    valorTotal: soma(ativos, (a) => a.valor),
    sinaisRecebidos: soma(ativos, (a) => a.sinal),
    aReceber: soma(ativos, restanteAReceber),
    custos: soma(ativos, custoDeslocamento),
    lucro: soma(ativos, lucro),
  }
}

function soma(lista: Atendimento[], valor: (a: Atendimento) => number): number {
  return lista.reduce((total, a) => total + valor(a), 0)
}
