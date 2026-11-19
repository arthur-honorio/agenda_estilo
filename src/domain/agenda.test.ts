import { describe, expect, it } from 'vitest'
import { buscarPorCliente, conflitos, linhaDoTempo, proximoTransporte } from './agenda'
import { umAtendimento, umAtendimentoEmCasa } from './fabrica.test-utils'
import { formatarMinutos } from './tempo'

/** Linha do tempo como texto, para ler o teste como a tela. */
function comoTexto(itens: ReturnType<typeof linhaDoTempo>): string[] {
  return itens.map((i) => {
    const faixa = `${formatarMinutos(i.inicio)}-${formatarMinutos(i.fim)}`
    return i.tipo === 'livre' ? `${faixa} livre` : `${faixa} ${i.tipo} ${i.atendimento.cliente}`
  })
}

describe('linhaDoTempo', () => {
  it('reproduz o exemplo de dia do brainstorming', () => {
    const dia = [
      umAtendimentoEmCasa({ cliente: 'B', inicio: '14:00', duracaoMin: 120, tempoMin: 30 }),
      umAtendimento({ cliente: 'A', inicio: '09:00', duracaoMin: 90 }),
      umAtendimentoEmCasa({ cliente: 'C', inicio: '17:00', duracaoMin: 60, tempoMin: 20 }),
    ]
    expect(comoTexto(linhaDoTempo(dia, '2026-11-20'))).toEqual([
      '07:00-09:00 livre',
      '09:00-10:30 atendimento A',
      '10:30-13:30 livre',
      '13:30-14:00 deslocamento B',
      '14:00-16:00 atendimento B',
      // 16:00-16:40 tem 40 min: aparece como livre
      '16:00-16:40 livre',
      '16:40-17:00 deslocamento C',
      '17:00-18:00 atendimento C',
      '18:00-21:00 livre',
    ])
  })

  it('o deslocamento inclui a folga', () => {
    const ana = umAtendimentoEmCasa({ cliente: 'Ana', inicio: '14:00', tempoMin: 30, folgaMin: 10 })
    const itens = comoTexto(linhaDoTempo([ana], '2026-11-20'))
    expect(itens).toContain('13:20-14:00 deslocamento Ana')
  })

  it('não mostra buracos menores que 30 min nem desmarcados', () => {
    const dia = [
      umAtendimento({ cliente: 'A', inicio: '07:00', duracaoMin: 60 }),
      umAtendimento({ cliente: 'B', inicio: '08:20', duracaoMin: 60 }),
      umAtendimento({ cliente: 'X', inicio: '12:00', status: 'desmarcado' }),
    ]
    expect(comoTexto(linhaDoTempo(dia, '2026-11-20'))).toEqual([
      '07:00-08:00 atendimento A',
      '08:20-09:20 atendimento B',
      '09:20-21:00 livre',
    ])
  })

  it('amplia o expediente quando há atendimento fora dele', () => {
    const tarde = umAtendimento({ cliente: 'N', inicio: '21:30', duracaoMin: 60 })
    expect(comoTexto(linhaDoTempo([tarde], '2026-11-20')).at(-1)).toBe('21:30-22:30 atendimento N')
  })

  it('dia vazio é todo livre', () => {
    expect(comoTexto(linhaDoTempo([], '2026-11-20'))).toEqual(['07:00-21:00 livre'])
  })
})

describe('conflitos', () => {
  const ana = umAtendimentoEmCasa({ cliente: 'Ana', inicio: '14:00', duracaoMin: 90, tempoMin: 30, folgaMin: 10 })

  it('acusa dois atendimentos no mesmo horário', () => {
    const outra = umAtendimento({ cliente: 'Bia', inicio: '15:00' })
    expect(conflitos(outra, [ana]).map((a) => a.cliente)).toEqual(['Ana'])
  })

  it('acusa intervalo menor que o deslocamento', () => {
    // Ana termina 15h30; Carla começa 15h45 mas precisa de 30 min de trajeto
    const carla = umAtendimentoEmCasa({ cliente: 'Carla', inicio: '15:45', tempoMin: 30 })
    expect(conflitos(carla, [ana])).toHaveLength(1)
  })

  it('aceita quando cabe o deslocamento', () => {
    const carla = umAtendimentoEmCasa({ cliente: 'Carla', inicio: '16:00', tempoMin: 30 })
    expect(conflitos(carla, [ana])).toEqual([])
  })

  it('ignora o próprio atendimento, outro dia e desmarcados', () => {
    expect(conflitos(ana, [ana])).toEqual([])
    expect(conflitos(ana, [{ ...ana, id: 'y', data: '2026-11-21' }])).toEqual([])
    expect(conflitos(ana, [{ ...ana, id: 'z', status: 'desmarcado' }])).toEqual([])
  })
})

describe('buscarPorCliente', () => {
  const todos = [
    umAtendimento({ cliente: 'Lúcia Souza', data: '2026-11-22' }),
    umAtendimento({ cliente: 'Carla', data: '2026-11-21' }),
    umAtendimento({ cliente: 'Lucia Lima', data: '2026-11-20' }),
  ]

  it('ignora acentos e maiúsculas e ordena por data', () => {
    expect(buscarPorCliente(todos, 'LUCIA').map((a) => a.cliente)).toEqual(['Lucia Lima', 'Lúcia Souza'])
  })

  it('termo vazio não traz nada', () => {
    expect(buscarPorCliente(todos, '  ')).toEqual([])
  })
})

describe('proximoTransporte', () => {
  const dia = [
    umAtendimentoEmCasa({ cliente: 'Ana', inicio: '14:00', tempoMin: 30, folgaMin: 10 }),
    umAtendimentoEmCasa({ cliente: 'Carla', inicio: '10:00', tempoMin: 20 }),
    umAtendimento({ cliente: 'Estúdio', inicio: '08:00' }),
  ]

  it('mostra o primeiro do dia', () => {
    expect(proximoTransporte(dia, '2026-11-20')?.atendimento.cliente).toBe('Carla')
  })

  it('pula os que já passaram', () => {
    const p = proximoTransporte(dia, '2026-11-20', 11 * 60)
    expect(p?.atendimento.cliente).toBe('Ana')
    expect(formatarMinutos(p!.minuto)).toBe('13:20')
  })

  it('nulo quando não há deslocamento', () => {
    expect(proximoTransporte(dia, '2026-11-20', 20 * 60)).toBeNull()
  })
})
