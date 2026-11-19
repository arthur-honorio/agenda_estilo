import { describe, expect, it } from 'vitest'
import { umAtendimento, umAtendimentoEmCasa } from './fabrica.test-utils'
import { gerarIcs, lembreteDoAtendimento, linkGoogleAgenda } from './lembrete'
import { urlMapaIncorporado, urlRotaNoGoogleMaps } from './mapa'

const ana = umAtendimentoEmCasa({
  id: 'ana-1',
  cliente: 'Ana',
  servico: 'Unhas',
  data: '2026-11-20',
  inicio: '14:00',
  endereco: 'Rua das Flores, 10, Fortaleza',
  tempoMin: 30,
  folgaMin: 10,
  custo: 1500,
})

describe('lembreteDoAtendimento', () => {
  it('cria o lembrete na hora de chamar o transporte (Anexo A)', () => {
    const l = lembreteDoAtendimento(ana)!
    expect(l.titulo).toBe('Chamar transporte – Ana')
    expect([l.data, l.hora, l.duracaoMin]).toEqual(['2026-11-20', '13:20', 40])
    expect(l.descricao).toContain('Unhas com Ana às 14h00')
    expect(l.descricao).toContain('Rua das Flores, 10, Fortaleza')
  })

  it('não há lembrete de transporte no estúdio', () => {
    expect(lembreteDoAtendimento(umAtendimento())).toBeNull()
  })
})

describe('gerarIcs', () => {
  const ics = gerarIcs(lembreteDoAtendimento(ana)!, 'ana-1', new Date('2026-11-19T12:00:00Z'))

  it('tem evento das 13h20 às 14h00 com alerta na hora', () => {
    expect(ics).toContain('DTSTART:20261120T132000')
    expect(ics).toContain('DTEND:20261120T140000')
    expect(ics).toContain('TRIGGER:PT0M')
    expect(ics).toContain('DTSTAMP:20261119T120000Z')
  })

  it('usa CRLF e escapa vírgulas', () => {
    expect(ics.split('\r\n')[0]).toBe('BEGIN:VCALENDAR')
    expect(ics.replace(/\r\n /g, '')).toContain('LOCATION:Rua das Flores\\, 10\\, Fortaleza')
  })

  it('nenhuma linha passa de 75 bytes, mesmo com acentos', () => {
    const longo = gerarIcs(
      { ...lembreteDoAtendimento(ana)!, descricao: 'Endereço com acentuação: ' + 'ção '.repeat(40) },
      'x',
    )
    const bytes = (l: string) => new TextEncoder().encode(l).length
    expect(Math.max(...longo.split('\r\n').map(bytes))).toBeLessThanOrEqual(75)
    // desdobrando, o texto volta inteiro
    expect(longo.replace(/\r\n /g, '')).toContain('ção '.repeat(40).trim())
  })
})

describe('linkGoogleAgenda', () => {
  it('preenche título e horário', () => {
    const url = new URL(linkGoogleAgenda(lembreteDoAtendimento(ana)!))
    expect(url.searchParams.get('text')).toBe('Chamar transporte – Ana')
    expect(url.searchParams.get('dates')).toBe('20261120T132000/20261120T140000')
  })
})

describe('mapa', () => {
  it('mostra a rota quando há origem', () => {
    const url = new URL(urlMapaIncorporado('Rua B', 'Rua A'))
    expect(url.searchParams.get('saddr')).toBe('Rua A')
    expect(url.searchParams.get('daddr')).toBe('Rua B')
    expect(url.searchParams.get('output')).toBe('embed')
  })

  it('mostra só o destino sem origem', () => {
    expect(new URL(urlMapaIncorporado('Rua B', ' ')).searchParams.get('q')).toBe('Rua B')
  })

  it('link para abrir a rota no app', () => {
    expect(urlRotaNoGoogleMaps('Rua B', 'Rua A')).toBe(
      'https://www.google.com/maps/dir/?api=1&destination=Rua+B&origin=Rua+A',
    )
  })
})
