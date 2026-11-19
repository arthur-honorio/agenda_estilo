/**
 * Modelo do atendimento (RF01, RF06, RF09, RF10, RF16).
 *
 * Convenções:
 * - datas em "AAAA-MM-DD" e horas em "HH:MM" (sem fuso: é a hora local da profissional);
 * - dinheiro em centavos (inteiro), para não haver erro de arredondamento.
 */

export type Local = 'estudio' | 'domicilio'

export type MeioDeslocamento = 'aplicativo' | 'onibus' | 'mototaxi' | 'carro' | 'outro'

export type StatusAtendimento = 'agendado' | 'desmarcado'

export interface Deslocamento {
  /** Tempo de trajeto lido no mapa e digitado pela profissional (RF06). */
  tempoMin: number
  /** Margem extra, por exemplo para o carro de aplicativo chegar (RF06). */
  folgaMin: number
  meio: MeioDeslocamento
  /** Custo do trajeto em centavos; zero é permitido (HU03). */
  custo: number
}

export interface Atendimento {
  id: string
  cliente: string
  servico: string
  data: string
  inicio: string
  duracaoMin: number
  local: Local
  /** Obrigatório quando o local é domicílio. */
  endereco?: string
  /** Só existe para atendimentos a domicílio. */
  deslocamento?: Deslocamento
  /** Valor do serviço em centavos (obrigatório). */
  valor: number
  /** Sinal já pago em centavos. */
  sinal: number
  /** Percentual combinado, só como informação, sem cálculo (RF16). */
  percentualSinal?: number
  status: StatusAtendimento
}
