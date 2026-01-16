/* eslint-disable @typescript-eslint/no-explicit-any */

// src/app/pages/Ingredientes.tsx
import React from 'react'
import ListIngredientes, {type Ingrediente} from '../../components/ListIngredientes'
import { fetchIngredientesOptions } from '../../data/repositories/ingredientes.repo'
import { receitaImageUrl } from '../utils/ImageSerebii'

export default function IngredientesPage() {
  const [ingredientes, setIngredientes] = React.useState<Ingrediente[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const opts = await fetchIngredientesOptions()
        if (mounted) { 
          setIngredientes(
            opts.map(o => ({
              id: o.id,
              title: o.title,
              desc: o.desc,
              icon: o.icon,
              imgURL:receitaImageUrl(o.title)
            }))
          )
      }
    } catch (err: any ) {
      setError(err?.message ?? 'Falha ao carregar os ingredientes')
    } finally{
      if (mounted) setLoading(false)
    }
  })()
    return () => { mounted = false }
  }, [])
 
  if (loading) return <p className="card-desc">Carregando ingredientes...</p>
  if (error) return <p className="card-desc">Erro: {error}</p>

  return (
    <>
      <h1 style={{ marginBottom: 12 }}>Ingredientes</h1>
      <ListIngredientes ingredientes={ingredientes} />
    </>
  )
}

