import { describe, expect, it } from 'vitest'
import { lucro, restanteAReceber } from './carteira'
import { rascunhoDe, rascunhoVazio, validar, type Rascunho } from './formulario'
import { horaDeChamarDoAtendimento } from './transporte'

/** Exatamente o que a participante digita na Tarefa 1. */
const tarefa1: Rascunho = {
  ...rascunhoVazio('2026-11-20'),
  cliente: 'Ana',
  servico: 'Unhas',
  inicio: '14:00',
  duracaoMin: '90',
  local: 'domicilio',
  endereco: 'Rua X, 100',
  tempoMin: '30',
  folgaMin: '10',
  meio: 'aplicativo',
  custo: '15',
  valor: '50',
  sinal: '20',
}

describe('validar', () => {
  it('a Tarefa 1 gera as respostas certas da Tarefa 4', () => {
    const { dados, erros } = validar(tarefa1)
    expect(erros).toEqual({})
    const ana = { ...dados!, id: 'ana', status: 'agendado' as const }
    expect(horaDeChamarDoAtendimento(ana)?.hora).toBe('13:20')
    expect(restanteAReceber(ana)).toBe(3000)
    expect(lucro(ana)).toBe(3500)
  })

  it('aponta os campos obrigatórios', () => {
    const { dados, erros } = validar(rascunhoVazio('2026-11-20'))
    expect(dados).toBeNull()
    expect(Object.keys(erros).sort()).toEqual(['cliente', 'inicio', 'servico', 'valor'])
  })

  it('domicílio exige endereço e tempo de trajeto', () => {
    const { erros } = validar({ ...tarefa1, endereco: ' ', tempoMin: '' })
    expect(Object.keys(erros).sort()).toEqual(['endereco', 'tempoMin'])
  })

  it('sinal maior que o valor é erro', () => {
    expect(validar({ ...tarefa1, sinal: '60' }).erros.sinal).toMatch(/maior/)
  })

  it('sinal e custo vazios valem zero', () => {
    const { dados } = validar({ ...tarefa1, sinal: '', custo: '' })
    expect(dados?.sinal).toBe(0)
    expect(dados?.deslocamento?.custo).toBe(0)
  })

  it('estúdio descarta os campos de deslocamento', () => {
    const { dados } = validar({ ...tarefa1, local: 'estudio', tempoMin: 'lixo' })
    expect(dados?.endereco).toBeUndefined()
    expect(dados?.deslocamento).toBeUndefined()
  })
})

describe('rascunhoDe', () => {
  it('ida e volta mantém o atendimento', () => {
    const { dados } = validar({ ...tarefa1, valor: '49,90', origem: 'Estúdio' })
    const salvo = { ...dados!, id: 'ana', status: 'agendado' as const }
    expect(validar(rascunhoDe(salvo)).dados).toEqual(dados)
  })
})
