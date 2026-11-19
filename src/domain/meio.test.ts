import { describe, expect, it } from 'vitest'
import { umAtendimentoEmCasa } from './fabrica.test-utils'
import { lembreteDoAtendimento } from './lembrete'
import { urlMapaIncorporado, urlRotaNoGoogleMaps } from './mapa'
import { dicaDaFolga, rotuloDaHora, textoDaHora } from './meio'

describe('texto da hora conforme o meio', () => {
  it('aplicativo e mototáxi: chamar o transporte (texto da T4)', () => {
    expect(textoDaHora('aplicativo', '13:20')).toBe('Chame o transporte às 13h20')
    expect(rotuloDaHora('mototaxi', '13:20')).toBe('Chamar o transporte às 13h20')
  })

  it('ônibus e carro próprio: sair (Anexo A)', () => {
    expect(textoDaHora('onibus', '13:20')).toBe('Saia às 13h20')
    expect(rotuloDaHora('carro', '13:20')).toBe('Sair às 13h20')
  })

  it('a dica da folga acompanha o meio', () => {
    expect(dicaDaFolga('aplicativo')).toMatch(/carro chegar/)
    expect(dicaDaFolga('onibus')).toMatch(/ônibus/)
  })

  it('o lembrete muda de título', () => {
    const deOnibus = umAtendimentoEmCasa({ cliente: 'Ana' })
    deOnibus.deslocamento!.meio = 'onibus'
    expect(lembreteDoAtendimento(deOnibus)?.titulo).toBe('Sair para Ana')
  })
})

describe('rota no mapa conforme o meio', () => {
  it('ônibus usa transporte público', () => {
    expect(new URL(urlMapaIncorporado('B', 'A', 'onibus')).searchParams.get('dirflg')).toBe('r')
    expect(new URL(urlRotaNoGoogleMaps('B', 'A', 'onibus')).searchParams.get('travelmode')).toBe('transit')
  })

  it('aplicativo, mototáxi e carro usam rota de carro', () => {
    for (const meio of ['aplicativo', 'mototaxi', 'carro'] as const) {
      expect(new URL(urlMapaIncorporado('B', 'A', meio)).searchParams.get('dirflg')).toBe('d')
      expect(new URL(urlRotaNoGoogleMaps('B', 'A', meio)).searchParams.get('travelmode')).toBe('driving')
    }
  })

  it('"outro" deixa o Google escolher', () => {
    expect(new URL(urlMapaIncorporado('B', 'A', 'outro')).searchParams.has('dirflg')).toBe(false)
    expect(new URL(urlRotaNoGoogleMaps('B', 'A', 'outro')).searchParams.has('travelmode')).toBe(false)
  })
})
