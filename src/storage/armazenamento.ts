import { useSyncExternalStore } from 'react'
import type { Atendimento } from '../domain/atendimento'
import type { DadosDoAtendimento } from '../domain/formulario'

/**
 * Dados só no navegador (RNF07): nada sai do aparelho.
 * O sufixo de versão na chave permite mudar o formato no futuro sem quebrar dados antigos.
 */
const CHAVE_ATENDIMENTOS = 'agenda-estilo:atendimentos:v1'
const CHAVE_PREFERENCIAS = 'agenda-estilo:preferencias:v1'

/** Chaves do nome inicial do projeto (Agenda Bela) → chaves atuais. */
const CHAVES_ANTIGAS: Record<string, string> = {
  'agenda-bela:atendimentos:v1': CHAVE_ATENDIMENTOS,
  'agenda-bela:preferencias:v1': CHAVE_PREFERENCIAS,
}

/**
 * Leva os dados salvos com o nome antigo para as chaves novas, uma única vez.
 * Se já houver dados nas chaves novas, eles valem e os antigos são descartados.
 */
export function migrarChavesAntigas(): void {
  try {
    for (const [antiga, nova] of Object.entries(CHAVES_ANTIGAS)) {
      const valor = localStorage.getItem(antiga)
      if (valor === null) continue
      if (localStorage.getItem(nova) === null) localStorage.setItem(nova, valor)
      localStorage.removeItem(antiga)
    }
  } catch {
    // Navegador sem localStorage (ex.: modo restrito): não há o que migrar.
  }
}
migrarChavesAntigas()

export interface Preferencias {
  /** Último "saindo de" usado, para pré-preencher o próximo cadastro. */
  ultimaOrigem?: string
  /** Última folga escolhida. */
  ultimaFolga?: number
}

type Ouvinte = () => void
const ouvintes = new Set<Ouvinte>()
let cache: Atendimento[] | null = null

function ler<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(chave)
    return bruto ? (JSON.parse(bruto) as T) : padrao
  } catch {
    return padrao
  }
}

function avisar() {
  ouvintes.forEach((o) => o())
}

/** Lista atual (mesma referência enquanto nada muda, como o React espera). */
export function listarAtendimentos(): Atendimento[] {
  if (cache === null) {
    const lidos = ler<unknown>(CHAVE_ATENDIMENTOS, [])
    cache = Array.isArray(lidos) ? (lidos as Atendimento[]) : []
  }
  return cache
}

function gravar(lista: Atendimento[]) {
  cache = lista
  localStorage.setItem(CHAVE_ATENDIMENTOS, JSON.stringify(lista))
  avisar()
}

function novoId(): string {
  // randomUUID só existe em HTTPS/localhost; no teste pela rede local (http) usamos o reserva.
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function buscarAtendimento(id: string): Atendimento | undefined {
  return listarAtendimentos().find((a) => a.id === id)
}

export function criarAtendimento(dados: DadosDoAtendimento): Atendimento {
  const novo: Atendimento = { ...dados, id: novoId(), status: 'agendado' }
  gravar([...listarAtendimentos(), novo])
  return novo
}

export function atualizarAtendimento(id: string, mudancas: Partial<Atendimento>): void {
  gravar(listarAtendimentos().map((a) => (a.id === id ? { ...a, ...mudancas, id } : a)))
}

/** Acrescenta os exemplos, trocando versões antigas deles (mesmo id). */
export function carregarExemplos(exemplos: Atendimento[]): void {
  const ids = new Set(exemplos.map((e) => e.id))
  gravar([...listarAtendimentos().filter((a) => !ids.has(a.id)), ...exemplos])
}

/** RF20: apaga tudo deste site neste aparelho. */
export function apagarTudo(): void {
  localStorage.removeItem(CHAVE_ATENDIMENTOS)
  localStorage.removeItem(CHAVE_PREFERENCIAS)
  cache = []
  avisar()
}

export function lerPreferencias(): Preferencias {
  return ler<Preferencias>(CHAVE_PREFERENCIAS, {})
}

export function salvarPreferencias(p: Preferencias): void {
  localStorage.setItem(CHAVE_PREFERENCIAS, JSON.stringify({ ...lerPreferencias(), ...p }))
}

function assinar(ouvinte: Ouvinte) {
  ouvintes.add(ouvinte)
  // Outra aba do mesmo site mudou os dados
  const aoMudarEmOutraAba = (e: StorageEvent) => {
    if (e.key === CHAVE_ATENDIMENTOS || e.key === null) {
      cache = null
      ouvinte()
    }
  }
  window.addEventListener('storage', aoMudarEmOutraAba)
  return () => {
    ouvintes.delete(ouvinte)
    window.removeEventListener('storage', aoMudarEmOutraAba)
  }
}

/** Hook: a tela re-renderiza sempre que os atendimentos mudam. */
export function useAtendimentos(): Atendimento[] {
  return useSyncExternalStore(assinar, listarAtendimentos)
}
