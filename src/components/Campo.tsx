import type { ReactNode } from 'react'

/** Rótulo + controle + dica/erro, com o erro ligado ao campo para leitores de tela. */
export function Campo({
  id,
  rotulo,
  erro,
  dica,
  children,
}: {
  id: string
  rotulo: string
  erro?: string
  dica?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={erro ? 'campo campo-com-erro' : 'campo'}>
      <label htmlFor={id}>{rotulo}</label>
      {children}
      {dica && !erro && <p className="dica">{dica}</p>}
      {erro && (
        <p className="erro" id={`${id}-erro`} role="alert">
          {erro}
        </p>
      )}
    </div>
  )
}
