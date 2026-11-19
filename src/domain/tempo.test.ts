import { describe, expect, it } from 'vitest'
import { deMinutos, deslocarMinutos, horaPorExtenso, paraMinutos, somarDias } from './tempo'

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
