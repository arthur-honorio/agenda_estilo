// @vitest-environment jsdom
/**
 * Roteiro do teste com usuárias (seção 7.3 do relatório) executado na interface:
 * se estes testes passam, as tarefas T1 a T4 dão as respostas certas no site.
 */
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { atendimentosDeExemplo } from './domain/exemplos'
import { dataLocal, formatarData, somarDias } from './domain/tempo'
import { apagarTudo, carregarExemplos, listarAtendimentos } from './storage/armazenamento'

const hoje = dataLocal()
const amanha = somarDias(hoje, 1)

function proximaSexta(): string {
  let d = somarDias(hoje, 1)
  while (new Date(`${d}T12:00:00Z`).getUTCDay() !== 5) d = somarDias(d, 1)
  return d
}

function abrir(rota: string) {
  render(
    <MemoryRouter initialEntries={[rota]}>
      <App />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  window.scrollTo = vi.fn()
  apagarTudo()
})
afterEach(cleanup)

describe('T1 + T4: cadastrar a Ana e ler hora do transporte, restante e lucro', () => {
  it('mostra 13h20, R$ 30 e R$ 35', async () => {
    const u = userEvent.setup()
    abrir(`/novo?data=${amanha}`)

    await u.type(screen.getByLabelText('Nome da cliente'), 'Ana')
    await u.type(screen.getByLabelText('Serviço'), 'Unhas')
    fireEvent.change(screen.getByLabelText('Início'), { target: { value: '14:00' } })
    await u.selectOptions(screen.getByLabelText('Duração'), '90')
    await u.click(screen.getByLabelText('Na casa da cliente'))
    await u.type(screen.getByLabelText('Endereço da cliente'), 'Rua X, 100')
    await u.type(screen.getByLabelText('Tempo do trajeto'), '30')
    await u.type(screen.getByLabelText('Custo do trajeto'), '15')
    await u.type(screen.getByLabelText('Valor do serviço'), '50')
    await u.type(screen.getByLabelText('Sinal já pago'), '20')

    // Resumo ao vivo, antes de salvar
    expect(screen.getByText(/Chame o transporte às/).textContent).toBe(
      'Chame o transporte às 13h20 para chegar às 14h00',
    )

    await u.click(screen.getByRole('button', { name: 'Salvar atendimento' }))

    expect(screen.getByText('Atendimento salvo!')).toBeTruthy()
    const valores = (rotulo: string) => screen.getByText(rotulo).nextElementSibling?.textContent
    expect(valores('Falta receber')).toBe('R$ 30,00')
    expect(valores('Seu lucro')).toBe('R$ 35,00')
    expect(listarAtendimentos()).toHaveLength(1)
  })

  it('aponta os campos que faltam e não salva', async () => {
    const u = userEvent.setup()
    abrir('/novo')
    await u.click(screen.getByRole('button', { name: 'Salvar atendimento' }))
    expect(screen.getByText('Informe o nome da cliente.')).toBeTruthy()
    expect(listarAtendimentos()).toHaveLength(0)
  })
})

describe('T2: buscar e remarcar a Carla para sexta às 10h', () => {
  it('acha pela busca e remarca vendo a linha do tempo', async () => {
    carregarExemplos(atendimentosDeExemplo(hoje))
    const u = userEvent.setup()
    abrir('/')

    await u.type(screen.getByLabelText('Buscar cliente pelo nome'), 'car')
    await u.click(within(screen.getByRole('list', { name: 'Resultados da busca' })).getByText('Carla'))
    await u.click(screen.getByRole('link', { name: 'Remarcar' }))

    const sexta = proximaSexta()
    fireEvent.change(screen.getByLabelText('Escolher dia'), { target: { value: sexta } })
    fireEvent.change(screen.getByLabelText('Novo horário'), { target: { value: '10:00' } })
    await u.click(screen.getByRole('button', { name: 'Salvar novo horário' }))

    expect(screen.getByText(/Atendimento remarcado/)).toBeTruthy()
    expect(screen.getByText(new RegExp(formatarData(sexta)))).toBeTruthy()
    const carla = listarAtendimentos().find((a) => a.cliente === 'Carla')!
    expect([carla.data, carla.inicio]).toEqual([sexta, '10:00'])
  })
})

describe('agenda, carteira e meus dados', () => {
  it('a linha do tempo mostra atendimentos, transporte e horários livres', () => {
    carregarExemplos(atendimentosDeExemplo(hoje))
    abrir(`/?data=${hoje}`)
    const linha = screen.getAllByRole('list')[0]
    expect(within(linha).getByText('Beatriz')).toBeTruthy()
    expect(within(linha).getByText('Chamar o transporte às 14h25')).toBeTruthy()
    expect(within(linha).getAllByText(/^Livre/).length).toBeGreaterThan(0)
  })

  it('desmarcar pede confirmação e tira o atendimento da carteira', async () => {
    carregarExemplos(atendimentosDeExemplo(hoje))
    const u = userEvent.setup()
    abrir('/atendimento/exemplo-daniela')

    await u.click(screen.getByRole('button', { name: 'Desmarcar' }))
    await u.click(screen.getByRole('button', { name: 'Sim, desmarcar' }))
    expect(screen.getByText('Desmarcado')).toBeTruthy()

    cleanup()
    abrir(`/carteira?data=${hoje}`)
    // Só a Beatriz (R$ 120, estúdio) fica no dia
    expect(screen.getByText('Lucro do dia').nextElementSibling?.textContent).toBe('R$ 120,00')
  })

  it('apagar tudo exige confirmação', async () => {
    carregarExemplos(atendimentosDeExemplo(hoje))
    const u = userEvent.setup()
    abrir('/dados')
    await u.click(screen.getByRole('button', { name: 'Apagar todos os dados' }))
    expect(listarAtendimentos()).toHaveLength(3)
    await u.click(screen.getByRole('button', { name: 'Sim, apagar tudo' }))
    expect(listarAtendimentos()).toHaveLength(0)
  })
})
