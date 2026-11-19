import type { Atendimento } from './atendimento'

/** Atendimento de estúdio com valores padrão, para os testes sobrescreverem só o que importa. */
export function umAtendimento(parcial: Partial<Atendimento> = {}): Atendimento {
  return {
    id: parcial.id ?? parcial.cliente ?? 'x',
    cliente: 'Cliente',
    servico: 'Unhas',
    data: '2026-11-20',
    inicio: '09:00',
    duracaoMin: 60,
    local: 'estudio',
    valor: 5000,
    sinal: 0,
    status: 'agendado',
    ...parcial,
  }
}

/** Atendimento a domicílio; `tempoMin` e `folgaMin` controlam o deslocamento. */
export function umAtendimentoEmCasa(
  parcial: Partial<Atendimento> & { tempoMin?: number; folgaMin?: number; custo?: number } = {},
): Atendimento {
  const { tempoMin = 30, folgaMin = 0, custo = 0, ...resto } = parcial
  return umAtendimento({
    local: 'domicilio',
    endereco: 'Rua X, 100',
    deslocamento: { tempoMin, folgaMin, meio: 'aplicativo', custo },
    ...resto,
  })
}
