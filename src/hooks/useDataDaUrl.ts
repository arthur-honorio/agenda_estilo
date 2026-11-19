import { useSearchParams } from 'react-router-dom'
import { dataLocal } from '../domain/tempo'

/** Dia consultado, guardado na URL (?data=) para o "voltar" do celular manter o dia. */
export function useDataDaUrl(): [string, (data: string) => void] {
  const [params, setParams] = useSearchParams()
  const data = params.get('data') ?? dataLocal()
  const mudar = (nova: string) => setParams({ data: nova }, { replace: true })
  return [data, mudar]
}
