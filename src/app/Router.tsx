
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import ErrorBoundary from './ErrorBoundary'
import ReceitasPage from './pages/Receitas'
import MainSkillPage from './pages/MainSkill'
import SubSkillPage from './pages/SubSkill'
import BancoPage from './pages/Banco'
import UserPage from './pages/User'
import DexReadPage from './pages/Dex'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const IngredientesPage = lazy (() => import('./pages/Ingredientes'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // sidebar + topbar
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Dashboard /> },               
      { path: 'ingredientes', element: <IngredientesPage/>},
      { path: 'receitas', element: <ReceitasPage/>},
      { path: 'dex', element: <DexReadPage/>},
      { path: 'mainSkill', element: <MainSkillPage/>},
      { path: 'subSkill', element: <SubSkillPage/>},
      { path: 'banco', element: <BancoPage/>},
      { path: 'user', element: <UserPage/>},
      // { path: 'adm', element: <RequireAuth> <Relatorios /></RequireAuth>}, //se a pagina so puder ser acessada por login 
    ],
  },
])
