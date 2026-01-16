
/* exemplo simples de guard
import { useEffect, useState } from 'react'
import { supabase } from '../../services/supabase'
import { Navigate } from 'react-router-dom'

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [ok, setOk] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setOk(!!user)
      setLoading(false)
    })
  }, [])

  if (loading) return <p className="card-desc">Verificando acesso...</p>
  if (!ok) return <Navigate to="/" replace />
  return <>{children}</>
*/