import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AgendaPage } from './pages/AgendaPage'
import { AtendimentoPage } from './pages/AtendimentoPage'
import { CarteiraPage } from './pages/CarteiraPage'
import { EditarAtendimentoPage } from './pages/EditarAtendimentoPage'
import { MeusDadosPage } from './pages/MeusDadosPage'
import { NovoAtendimentoPage } from './pages/NovoAtendimentoPage'
import { RemarcarPage } from './pages/RemarcarPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AgendaPage />} />
        <Route path="novo" element={<NovoAtendimentoPage />} />
        <Route path="atendimento/:id" element={<AtendimentoPage />} />
        <Route path="atendimento/:id/editar" element={<EditarAtendimentoPage />} />
        <Route path="atendimento/:id/remarcar" element={<RemarcarPage />} />
        <Route path="carteira" element={<CarteiraPage />} />
        <Route path="dados" element={<MeusDadosPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
