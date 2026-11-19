import { describe, expect, it } from 'vitest'
import type { Atendimento } from './atendimento'
import { lucro, restanteAReceber, resumirCarteira } from './carteira'

// Cenário da Tarefa 1 do teste com usuárias (seção 7.3 do relatório).
const ana: Atendimento = {
  id: 'ana',
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

const estudio: Atendimento = {
  id: 'b',
  cliente: 'Beatriz',
  servico: 'Maquiagem',
  data: '2026-11-20',
  inicio: '09:00',
  duracaoMin: 90,
  local: 'estudio',
  valor: 8000,
  sinal: 2400,
  status: 'agendado',
}

describe('carteira de um atendimento (respostas da T4)', () => {
  it('restante a receber da Ana é R$ 30', () => {
    expect(restanteAReceber(ana)).toBe(3000)
  })

  it('lucro da Ana é R$ 35', () => {
    expect(lucro(ana)).toBe(3500)
  })

  it('no estúdio o lucro é o valor cheio', () => {
    expect(lucro(estudio)).toBe(8000)
  })
})

describe('resumirCarteira', () => {
  it('soma os atendimentos do dia', () => {
    expect(resumirCarteira([ana, estudio])).toEqual({
      quantidade: 2,
      valorTotal: 13000,
      sinaisRecebidos: 4400,
      aReceber: 8600,
      custos: 1500,
      lucro: 11500,
    })
  })

  it('ignora atendimentos desmarcados', () => {
    const desmarcado: Atendimento = { ...estudio, status: 'desmarcado' }
    expect(resumirCarteira([ana, desmarcado]).quantidade).toBe(1)
    expect(resumirCarteira([ana, desmarcado]).lucro).toBe(3500)
  })

  it('dia vazio dá tudo zero', () => {
    expect(resumirCarteira([]).lucro).toBe(0)
  })
})
