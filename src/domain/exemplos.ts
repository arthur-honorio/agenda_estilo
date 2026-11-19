import type { Atendimento } from './atendimento'
import { somarDias } from './tempo'

/**
 * Agenda de exemplo para os testes com usuárias (seção 7.3 do relatório).
 * - A Carla precisa existir para a Tarefa 2 ("remarcar a Carla para sexta às 10h").
 * - Amanhã às 14h fica livre para a Tarefa 1 (cadastrar a Ana).
 * - Nenhum exemplo ocupa as 10h, para a remarcação caber em qualquer sexta.
 * Os nomes são fictícios.
 */
export function atendimentosDeExemplo(hoje: string): Atendimento[] {
  const amanha = somarDias(hoje, 1)
  return [
    {
      id: 'exemplo-beatriz',
      cliente: 'Beatriz',
      servico: 'Maquiagem',
      data: hoje,
      inicio: '08:00',
      duracaoMin: 90,
      local: 'estudio',
      valor: 12000,
      sinal: 3600,
      status: 'agendado',
    },
    {
      id: 'exemplo-daniela',
      cliente: 'Daniela',
      servico: 'Penteado',
      data: hoje,
      inicio: '15:00',
      duracaoMin: 60,
      local: 'domicilio',
      endereco: 'Av. Santos Dumont, 1500, Aldeota, Fortaleza',
      deslocamento: { tempoMin: 25, folgaMin: 10, meio: 'aplicativo', custo: 1800 },
      valor: 9000,
      sinal: 2700,
      status: 'agendado',
    },
    {
      id: 'exemplo-carla',
      cliente: 'Carla',
      servico: 'Unhas',
      data: amanha,
      inicio: '17:00',
      duracaoMin: 60,
      local: 'domicilio',
      endereco: 'Rua Monsenhor Bruno, 800, Meireles, Fortaleza',
      deslocamento: { tempoMin: 20, folgaMin: 10, meio: 'aplicativo', custo: 1200 },
      valor: 4500,
      sinal: 1350,
      status: 'agendado',
    },
  ]
}
