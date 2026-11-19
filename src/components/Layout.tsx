import { useEffect, type ReactNode } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { IconeAgenda, IconeCadeado, IconeCarteira, IconeMais } from './Icones'

const abas: { para: string; rotulo: string; icone: ReactNode }[] = [
  { para: '/', rotulo: 'Agenda', icone: <IconeAgenda /> },
  { para: '/novo', rotulo: 'Novo', icone: <IconeMais /> },
  { para: '/carteira', rotulo: 'Carteira', icone: <IconeCarteira /> },
  { para: '/dados', rotulo: 'Meus dados', icone: <IconeCadeado /> },
]

export function Layout() {
  const { pathname } = useLocation()
  // Cada tela nova começa do topo
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app">
      <header className="topo">
        <span className="marca">Agenda Bela</span>
      </header>

      <main className="conteudo">
        <Outlet />
      </main>

      <nav className="abas" aria-label="Navegação principal">
        {abas.map((aba) => (
          <NavLink key={aba.para} to={aba.para} end className="aba">
            {aba.icone}
            <span>{aba.rotulo}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
