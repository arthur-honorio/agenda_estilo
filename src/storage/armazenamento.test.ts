// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { umAtendimento } from '../domain/fabrica.test-utils'

const ANTIGA = 'agenda-bela:atendimentos:v1'
const NOVA = 'agenda-estilo:atendimentos:v1'

/** Carrega o módulo do zero, como na abertura do site. */
async function abrirSite() {
  vi.resetModules()
  return import('./armazenamento')
}

beforeEach(() => localStorage.clear())

describe('migração do nome Agenda Bela para Agenda Estilo', () => {
  it('leva os atendimentos salvos com o nome antigo', async () => {
    localStorage.setItem(ANTIGA, JSON.stringify([umAtendimento({ cliente: 'Ana' })]))
    const { listarAtendimentos } = await abrirSite()
    expect(listarAtendimentos().map((a) => a.cliente)).toEqual(['Ana'])
    expect(localStorage.getItem(ANTIGA)).toBeNull()
  })

  it('se já há dados novos, eles valem', async () => {
    localStorage.setItem(ANTIGA, JSON.stringify([umAtendimento({ cliente: 'Velha' })]))
    localStorage.setItem(NOVA, JSON.stringify([umAtendimento({ cliente: 'Nova' })]))
    const { listarAtendimentos } = await abrirSite()
    expect(listarAtendimentos().map((a) => a.cliente)).toEqual(['Nova'])
    expect(localStorage.getItem(ANTIGA)).toBeNull()
  })

  it('sem dados antigos, não faz nada', async () => {
    const { listarAtendimentos } = await abrirSite()
    expect(listarAtendimentos()).toEqual([])
  })
})
