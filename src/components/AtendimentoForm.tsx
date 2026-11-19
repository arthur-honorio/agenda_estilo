import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { conflitos, intervaloOcupado } from '../domain/agenda'
import type { Atendimento, MeioDeslocamento } from '../domain/atendimento'
import { validar, type CampoDoRascunho, type DadosDoAtendimento, type Rascunho } from '../domain/formulario'
import { dicaDaFolga, MEIOS, NOME_DO_MEIO } from '../domain/meio'
import { formatarDuracao, formatarMinutos } from '../domain/tempo'
import { useAtendimentos } from '../storage/armazenamento'
import { ariaDoCampo } from './aria'
import { Campo } from './Campo'
import { IconeAlerta } from './Icones'
import { MapaRota } from './MapaRota'
import { AvisoTransporte, ValoresDoAtendimento } from './ResumoAtendimento'

const DURACOES = Array.from({ length: 24 }, (_, i) => (i + 1) * 15) // 15 min a 6h
const FOLGAS = [0, 5, 10, 15, 20, 30]

interface Props {
  inicial: Rascunho
  /** Id do atendimento em edição (para não acusar conflito com ele mesmo). */
  idEditado?: string
  rotuloSalvar: string
  aoSalvar: (dados: DadosDoAtendimento) => void
}

/** Agendamento (HU01–HU03): cliente, horário, local, deslocamento e valores. */
export function AtendimentoForm({ inicial, idEditado, rotuloSalvar, aoSalvar }: Props) {
  const todos = useAtendimentos()
  const [r, setR] = useState<Rascunho>(inicial)
  const [tentouSalvar, setTentouSalvar] = useState(false)

  // O mapa só recarrega quando a digitação do endereço para por um instante
  const [enderecoDoMapa, setEnderecoDoMapa] = useState(inicial.endereco)
  useEffect(() => {
    const t = setTimeout(() => setEnderecoDoMapa(r.endereco), 900)
    return () => clearTimeout(t)
  }, [r.endereco])

  const { dados, erros } = validar(r)
  const errosVisiveis = tentouSalvar ? erros : {}

  // Prévia com o que já dá para calcular, mesmo com o formulário incompleto
  const previa: Atendimento | null = dados ? { ...dados, id: idEditado ?? 'previa', status: 'agendado' } : null
  const choques = previa ? conflitos(previa, todos) : []

  const nomesUsados = useMemo(() => [...new Set(todos.map((a) => a.cliente))].sort(), [todos])
  const servicosUsados = useMemo(() => [...new Set(todos.map((a) => a.servico))].sort(), [todos])

  function mudar<C extends CampoDoRascunho>(campo: C, valor: Rascunho[C]) {
    setR((atual) => ({ ...atual, [campo]: valor }))
  }

  function enviar(e: FormEvent) {
    e.preventDefault()
    setTentouSalvar(true)
    if (dados) {
      aoSalvar(dados)
    } else {
      // Leva a profissional ao primeiro campo com problema
      const primeiro = Object.keys(erros)[0]
      requestAnimationFrame(() => document.getElementById(`campo-${primeiro}`)?.focus())
    }
  }

  const texto = (campo: CampoDoRascunho) => ({
    ...ariaDoCampo(`campo-${campo}`, errosVisiveis[campo]),
    value: r[campo] as string,
    onChange: (e: { target: { value: string } }) => mudar(campo, e.target.value),
  })

  return (
    <form onSubmit={enviar} noValidate className="formulario">
      <fieldset>
        <legend>Cliente</legend>
        <Campo id="campo-cliente" rotulo="Nome da cliente" erro={errosVisiveis.cliente}>
          <input {...texto('cliente')} list="lista-clientes" autoComplete="off" autoCapitalize="words" />
        </Campo>
        <datalist id="lista-clientes">
          {nomesUsados.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
        <Campo id="campo-servico" rotulo="Serviço" erro={errosVisiveis.servico}>
          <input {...texto('servico')} list="lista-servicos" autoComplete="off" placeholder="Ex.: unhas, maquiagem" />
        </Campo>
        <datalist id="lista-servicos">
          {servicosUsados.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
      </fieldset>

      <fieldset>
        <legend>Quando</legend>
        <div className="linha-campos">
          <Campo id="campo-data" rotulo="Data" erro={errosVisiveis.data}>
            <input type="date" {...texto('data')} />
          </Campo>
          <Campo id="campo-inicio" rotulo="Início" erro={errosVisiveis.inicio}>
            <input type="time" step={300} {...texto('inicio')} />
          </Campo>
        </div>
        <Campo id="campo-duracaoMin" rotulo="Duração" erro={errosVisiveis.duracaoMin}>
          <select {...texto('duracaoMin')}>
            {DURACOES.map((d) => (
              <option key={d} value={d}>
                {formatarDuracao(d)}
              </option>
            ))}
          </select>
        </Campo>
      </fieldset>

      <fieldset>
        <legend>Onde</legend>
        <div className="segmentado" role="radiogroup" aria-label="Local do atendimento">
          {(['estudio', 'domicilio'] as const).map((local) => (
            <label key={local} className={r.local === local ? 'ativo' : ''}>
              <input
                type="radio"
                name="local"
                value={local}
                checked={r.local === local}
                onChange={() => mudar('local', local)}
              />
              {local === 'estudio' ? 'No estúdio' : 'Na casa da cliente'}
            </label>
          ))}
        </div>

        {r.local === 'domicilio' && (
          <>
            <Campo id="campo-endereco" rotulo="Endereço da cliente" erro={errosVisiveis.endereco}>
              <input {...texto('endereco')} autoComplete="off" placeholder="Rua, número, bairro, cidade" />
            </Campo>
            <Campo id="campo-origem" rotulo="Saindo de (opcional)" dica="Para o mapa mostrar a rota.">
              <input {...texto('origem')} autoComplete="off" placeholder="Ex.: seu estúdio ou sua casa" />
            </Campo>

            <Campo id="campo-meio" rotulo="Como você vai">
              <select {...ariaDoCampo('campo-meio')} value={r.meio} onChange={(e) => mudar('meio', e.target.value as MeioDeslocamento)}>
                {MEIOS.map((m) => (
                  <option key={m} value={m}>
                    {NOME_DO_MEIO[m]}
                  </option>
                ))}
              </select>
            </Campo>

            <MapaRota destino={enderecoDoMapa} origem={r.origem} meio={r.meio} />

            <div className="linha-campos">
              <Campo
                id="campo-tempoMin"
                rotulo="Tempo do trajeto"
                erro={errosVisiveis.tempoMin}
                dica="Veja no mapa e digite."
              >
                <div className="com-sufixo">
                  <input {...texto('tempoMin')} inputMode="numeric" pattern="[0-9]*" placeholder="30" />
                  <span>min</span>
                </div>
              </Campo>
              <Campo id="campo-folgaMin" rotulo="Folga" erro={errosVisiveis.folgaMin} dica={dicaDaFolga(r.meio)}>
                <select {...texto('folgaMin')}>
                  {FOLGAS.map((f) => (
                    <option key={f} value={f}>
                      {f} min
                    </option>
                  ))}
                </select>
              </Campo>
            </div>
            <Campo id="campo-custo" rotulo="Custo do trajeto" erro={errosVisiveis.custo}>
              <div className="com-prefixo">
                <span>R$</span>
                <input {...texto('custo')} inputMode="decimal" placeholder="0" />
              </div>
            </Campo>
          </>
        )}
      </fieldset>

      <fieldset>
        <legend>Pagamento</legend>
        <div className="linha-campos">
          <Campo id="campo-valor" rotulo="Valor do serviço" erro={errosVisiveis.valor}>
            <div className="com-prefixo">
              <span>R$</span>
              <input {...texto('valor')} inputMode="decimal" placeholder="0" />
            </div>
          </Campo>
          <Campo id="campo-sinal" rotulo="Sinal já pago" erro={errosVisiveis.sinal}>
            <div className="com-prefixo">
              <span>R$</span>
              <input {...texto('sinal')} inputMode="decimal" placeholder="0" />
            </div>
          </Campo>
        </div>
      </fieldset>

      {previa && (
        <section className="resumo" aria-live="polite">
          <h2>Resumo</h2>
          <AvisoTransporte atendimento={previa} />
          <ValoresDoAtendimento atendimento={previa} />
        </section>
      )}

      {choques.length > 0 && (
        <div className="alerta" role="status">
          <IconeAlerta />
          <p>
            Esse horário bate com{' '}
            {choques
              .map((c) => {
                const o = intervaloOcupado(c)
                return `${c.cliente} (${formatarMinutos(o.inicio)}–${formatarMinutos(o.fim)}, contando o deslocamento)`
              })
              .join(' e ')}
            . Você pode salvar mesmo assim.
          </p>
        </div>
      )}

      <button type="submit" className="botao botao-grande">
        {rotuloSalvar}
      </button>
    </form>
  )
}
