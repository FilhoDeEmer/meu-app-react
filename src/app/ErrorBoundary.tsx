
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Ops! Algo deu errado</h1>
        <p>Status: {error.status} — {error.statusText}</p>
        <pre style={{ background: '#0b1220', padding: 12, borderRadius: 8 }}>
          {error.data as string}
        </pre>
      </div>
    )
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Ops! Alguma coisa quebrou</h1>
      <p>Tente recarregar a página.</p>
      <pre style={{ background: '#0b1220', padding: 12, borderRadius: 8 }}>
        {String(error)}
      </pre>
    </div>
  )
}
