import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AgendaPage } from './pages/AgendaPage'
import { CarteiraPage } from './pages/CarteiraPage'
import { MeusDadosPage } from './pages/MeusDadosPage'
import { NovoAtendimentoPage } from './pages/NovoAtendimentoPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AgendaPage />} />
        <Route path="novo" element={<NovoAtendimentoPage />} />
        <Route path="carteira" element={<CarteiraPage />} />
        <Route path="dados" element={<MeusDadosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
