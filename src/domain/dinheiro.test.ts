import { describe, expect, it } from 'vitest'
import { formatarReais, paraCentavos } from './dinheiro'

describe('formatarReais', () => {
  it('formata centavos em reais', () => {
    expect(formatarReais(3000)).toBe('R$ 30,00')
    expect(formatarReais(123456)).toBe('R$ 1.234,56')
  })
})

describe('paraCentavos', () => {
  it.each([
    ['50', 5000],
    ['15,50', 1550],
    ['R$ 20', 2000],
    ['1.234,5', 123450],
    ['0', 0],
  ])('"%s" → %i', (texto, esperado) => {
    expect(paraCentavos(texto)).toBe(esperado)
  })

  it.each(['', 'abc', '-5', '1,234'])('"%s" é inválido', (texto) => {
    expect(paraCentavos(texto)).toBeNull()
  })
})
