import { NavLink, Outlet } from 'react-router-dom'

const abas = [
  { para: '/', rotulo: 'Agenda', icone: '📅' },
  { para: '/novo', rotulo: 'Novo', icone: '＋' },
  { para: '/carteira', rotulo: 'Carteira', icone: '👛' },
  { para: '/dados', rotulo: 'Meus dados', icone: '🔒' },
]

export function Layout() {
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
            <span className="aba-icone" aria-hidden="true">
              {aba.icone}
            </span>
            <span>{aba.rotulo}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
