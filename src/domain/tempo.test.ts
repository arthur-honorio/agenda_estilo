import { describe, expect, it } from 'vitest'
import {
  dataLocal,
  deMinutos,
  deslocarMinutos,
  formatarData,
  formatarDuracao,
  formatarMinutos,
  horaPorExtenso,
  paraMinutos,
  rotuloDia,
  somarDias,
} from './tempo'

describe('tempo', () => {
  it('converte hora em minutos e de volta', () => {
    expect(paraMinutos('14:00')).toBe(840)
    expect(paraMinutos('9:05')).toBe(545)
    expect(deMinutos(800)).toBe('13:20')
  })

  it('recusa hora inválida', () => {
    expect(() => paraMinutos('24:00')).toThrow()
    expect(() => paraMinutos('14h')).toThrow()
  })

  it('soma dias atravessando mês e ano', () => {
    expect(somarDias('2026-11-30', 1)).toBe('2026-12-01')
    expect(somarDias('2027-01-01', -1)).toBe('2026-12-31')
  })

  it('desloca minutos para frente e para trás', () => {
    expect(deslocarMinutos('2026-11-20', '23:30', 45)).toEqual({ data: '2026-11-21', hora: '00:15' })
    expect(deslocarMinutos('2026-11-20', '14:00', -40)).toEqual({ data: '2026-11-20', hora: '13:20' })
  })

  it('escreve a hora no formato dos textos', () => {
    expect(horaPorExtenso('13:20')).toBe('13h20')
  })
})

describe('formatação', () => {
  it('formata duração', () => {
    expect(formatarDuracao(90)).toBe('1h30')
    expect(formatarDuracao(60)).toBe('1h')
    expect(formatarDuracao(45)).toBe('45 min')
  })

  it('formata minutos até a meia-noite', () => {
    expect(formatarMinutos(1440)).toBe('24:00')
    expect(formatarMinutos(-10)).toBe('00:00')
  })

  it('usa a data local do aparelho', () => {
    expect(dataLocal(new Date(2026, 10, 20, 23, 50))).toBe('2026-11-20')
  })

  it('escreve a data com o dia da semana', () => {
    expect(formatarData('2026-11-20')).toBe('sexta, 20/11')
  })

  it('usa hoje, amanhã e ontem', () => {
    expect(rotuloDia('2026-11-20', '2026-11-20')).toBe('Hoje')
    expect(rotuloDia('2026-11-21', '2026-11-20')).toBe('Amanhã')
    expect(rotuloDia('2026-11-19', '2026-11-20')).toBe('Ontem')
    expect(rotuloDia('2026-11-27', '2026-11-20')).toBe('sexta, 27/11')
  })
})
