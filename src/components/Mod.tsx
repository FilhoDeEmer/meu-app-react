
import React, { useEffect, useRef } from 'react'

type ModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
  footer?: React.ReactNode
  labelledById?: string
  describedById?: string
}

export default function Modal({
  open,
  title,
  onClose,
  children,
  footer,
  labelledById,
  describedById,
}: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Foco inicial e fechar com ESC
  useEffect(() => {
    if (!open) return
    const el = containerRef.current
    el?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById ?? 'modal-title'}
        aria-describedby={describedById}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id={labelledById ?? 'modal-title'} className="modal-title">
            {title}
          </h2>
          <button className="btn" onClick={onClose} aria-label="Fechar">✕</button>
        </header>

        <div
          className="modal-body"
          tabIndex={-1}
          ref={containerRef}
        >
          {children}
        </div>

        {footer && <footer className="modal-footer">{footer}</footer>}
      </div>
    </div>
  )
}