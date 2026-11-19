import type { Atendimento, Local, MeioDeslocamento } from './atendimento'
import { formatarReais, paraCentavos } from './dinheiro'
import { paraMinutos } from './tempo'

/**
 * Formulário de atendimento (HU01–HU03). O rascunho guarda o que está nos campos,
 * sempre como texto; `validar` converte e aponta os erros campo a campo.
 */
export interface Rascunho {
  cliente: string
  servico: string
  data: string
  inicio: string
  duracaoMin: string
  local: Local
  endereco: string
  origem: string
  tempoMin: string
  folgaMin: string
  meio: MeioDeslocamento
  custo: string
  valor: string
  sinal: string
}

export type CampoDoRascunho = keyof Rascunho
export type Erros = Partial<Record<CampoDoRascunho, string>>

export type DadosDoAtendimento = Omit<Atendimento, 'id' | 'status'>

export function rascunhoVazio(data: string, padrao: Partial<Rascunho> = {}): Rascunho {
  return {
    cliente: '',
    servico: '',
    data,
    inicio: '',
    duracaoMin: '60',
    local: 'estudio',
    endereco: '',
    origem: '',
    tempoMin: '',
    folgaMin: '10',
    meio: 'aplicativo',
    custo: '',
    valor: '',
    sinal: '',
    ...padrao,
  }
}

function centavosParaTexto(centavos: number): string {
  return formatarReais(centavos).replace('R$ ', '').replace(/,00$/, '')
}

/** Rascunho a partir de um atendimento salvo (para editar). */
export function rascunhoDe(a: Atendimento): Rascunho {
  return {
    cliente: a.cliente,
    servico: a.servico,
    data: a.data,
    inicio: a.inicio,
    duracaoMin: String(a.duracaoMin),
    local: a.local,
    endereco: a.endereco ?? '',
    origem: a.deslocamento?.origem ?? '',
    tempoMin: a.deslocamento ? String(a.deslocamento.tempoMin) : '',
    folgaMin: a.deslocamento ? String(a.deslocamento.folgaMin) : '10',
    meio: a.deslocamento?.meio ?? 'aplicativo',
    custo: a.deslocamento ? centavosParaTexto(a.deslocamento.custo) : '',
    valor: centavosParaTexto(a.valor),
    sinal: a.sinal ? centavosParaTexto(a.sinal) : '',
  }
}

function inteiro(texto: string): number | null {
  return /^\d+$/.test(texto.trim()) ? Number(texto.trim()) : null
}

function horaValida(hora: string): boolean {
  try {
    paraMinutos(hora)
    return true
  } catch {
    return false
  }
}

export function validar(r: Rascunho): { dados: DadosDoAtendimento | null; erros: Erros } {
  const erros: Erros = {}

  if (!r.cliente.trim()) erros.cliente = 'Informe o nome da cliente.'
  if (!r.servico.trim()) erros.servico = 'Informe o serviço.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.data)) erros.data = 'Escolha a data.'
  if (!horaValida(r.inicio)) erros.inicio = 'Escolha a hora de início.'

  const duracao = inteiro(r.duracaoMin)
  if (!duracao) erros.duracaoMin = 'Escolha a duração.'

  const valor = paraCentavos(r.valor)
  if (valor === null) erros.valor = 'Informe o valor do serviço (ex.: 50 ou 49,90).'

  const sinal = r.sinal.trim() ? paraCentavos(r.sinal) : 0
  if (sinal === null) erros.sinal = 'Valor inválido (ex.: 20 ou 15,50).'
  else if (valor !== null && sinal > valor) erros.sinal = 'O sinal não pode ser maior que o valor.'

  let tempo: number | null = null
  let folga: number | null = null
  let custo: number | null = 0
  if (r.local === 'domicilio') {
    if (!r.endereco.trim()) erros.endereco = 'Informe o endereço da cliente.'
    tempo = inteiro(r.tempoMin)
    if (tempo === null) erros.tempoMin = 'Digite o tempo do trajeto em minutos (veja no mapa).'
    folga = inteiro(r.folgaMin)
    if (folga === null) erros.folgaMin = 'Escolha a folga.'
    custo = r.custo.trim() ? paraCentavos(r.custo) : 0
    if (custo === null) erros.custo = 'Valor inválido (ex.: 15 ou 12,50).'
  }

  if (Object.keys(erros).length > 0) return { dados: null, erros }

  const dados: DadosDoAtendimento = {
    cliente: r.cliente.trim(),
    servico: r.servico.trim(),
    data: r.data,
    inicio: r.inicio,
    duracaoMin: duracao!,
    local: r.local,
    valor: valor!,
    sinal: sinal!,
  }
  if (r.local === 'domicilio') {
    dados.endereco = r.endereco.trim()
    dados.deslocamento = {
      ...(r.origem.trim() ? { origem: r.origem.trim() } : {}),
      tempoMin: tempo!,
      folgaMin: folga!,
      meio: r.meio,
      custo: custo!,
    }
  }
  return { dados, erros }
}
