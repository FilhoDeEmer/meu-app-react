
import { useState, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import '../styles/layout.css'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`app ${collapsed ? 'collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} />

      <main>
        <header className="topbar">
          <button
            className="collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            aria-pressed={collapsed}
            aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {collapsed ? ' ⟩ ' : ' ⟨ '}
          </button>
          <div className="topbar-title">Painel principal</div>
          
        </header>

        <section className="content">
          {/* Lazy loading boundary */}
          <Suspense fallback={<p className="card-desc">Carregando página...</p>}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </div>
  )
}
