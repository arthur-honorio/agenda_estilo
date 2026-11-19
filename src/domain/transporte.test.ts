import { describe, expect, it } from 'vitest'
import type { Atendimento } from './atendimento'
import { horaDeChamarDoAtendimento, horaDeChamarTransporte } from './transporte'

describe('horaDeChamarTransporte', () => {
  it('exemplo do brainstorming: 14h00 com 30 min de trajeto → 13h30', () => {
    expect(horaDeChamarTransporte('2026-11-20', '14:00', 30, 0)).toEqual({
      data: '2026-11-20',
      hora: '13:30',
    })
  })

  it('cenário da T4: 14h00, 30 min de trajeto e 10 min de folga → 13h20', () => {
    expect(horaDeChamarTransporte('2026-11-20', '14:00', 30, 10).hora).toBe('13:20')
  })

  it('volta para o dia anterior quando cruza a meia-noite', () => {
    expect(horaDeChamarTransporte('2026-12-01', '00:20', 30, 10)).toEqual({
      data: '2026-11-30',
      hora: '23:40',
    })
  })

  it('recusa tempo negativo', () => {
    expect(() => horaDeChamarTransporte('2026-11-20', '14:00', -5, 0)).toThrow()
  })
})

describe('horaDeChamarDoAtendimento', () => {
  const base: Atendimento = {
    id: '1',
    cliente: 'Ana',
    servico: 'Unhas',
    data: '2026-11-20',
    inicio: '14:00',
    duracaoMin: 90,
    local: 'domicilio',
    endereco: 'Rua X, 100',
    deslocamento: { tempoMin: 30, folgaMin: 10, meio: 'aplicativo', custo: 1500 },
    valor: 5000,
    sinal: 2000,
    status: 'agendado',
  }

  it('calcula para atendimento a domicílio', () => {
    expect(horaDeChamarDoAtendimento(base)?.hora).toBe('13:20')
  })

  it('não há hora de transporte no estúdio', () => {
    expect(
      horaDeChamarDoAtendimento({ ...base, local: 'estudio', deslocamento: undefined }),
    ).toBeNull()
  })
})
