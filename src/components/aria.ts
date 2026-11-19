/** Props de acessibilidade para o controle dentro de <Campo>. */
export function ariaDoCampo(id: string, erro?: string) {
  return { id, 'aria-invalid': erro ? true : undefined, 'aria-describedby': erro ? `${id}-erro` : undefined }
}
