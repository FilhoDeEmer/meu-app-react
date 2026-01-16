
import React from 'react'

export type PlusItem = {
  id: string
  title: string
  desc?: string
  icon?: string
}

type CardPlusProps = {
  title?: string
  placeholder?: string
  items: PlusItem[]        // lista mostrada no popup
  selectedIds: string[]    // itens já selecionados
  onOpen: () => void       // abre modal
  onConfirm?: (ids: string[]) => void
  onRemoveItem?: (id: string) => void
  renderFilled?: (ids: string[], items: PlusItem[]) => React.ReactNode
}

export default function CardPlus({
  title = 'Adicionar',
  placeholder = 'Clique no + para adicionar conteúdo',
  items,
  selectedIds,
  onOpen,
  onRemoveItem,
  renderFilled,
}: CardPlusProps) {
  const selectedMap = new Map(items.map(i => [i.id, i]))
  const selectedItems = selectedIds.map(id => selectedMap.get(id)).filter(Boolean) as PlusItem[]

  return (
    <section className="card card-plus" aria-label={`Card ${title}`}>
      <div className="card-plus-header">
        <h3 className="card-title">{title}</h3>
        <button
          className="btn btn-plus"
          onClick={onOpen}
          aria-label="Adicionar"
          title="Adicionar"
        >
          +
        </button>
      </div>

      {/* Se tiver seleção, mostra preenchido; caso contrário, placeholder */}
      {selectedItems.length === 0 ? (
        <p className="card-desc">{placeholder}</p>
      ) : renderFilled ? (
        renderFilled(selectedIds, items)
      ) : (
        <div className="chips" aria-label="Conteúdos selecionados">
          {selectedItems.map((it) => (
            <span key={it.id} className="chip">
              <span aria-hidden>{it.icon ?? '🏷️'}</span> {it.title}
              {onRemoveItem && (
                <span
                  role="button"
                  className="remove"
                  onClick={() => onRemoveItem(it.id)}
                  aria-label={`Remover ${it.title}`}
                >
                  ✕
                </span>
              )}
            </span>
          ))}
        </div>
      )}
    </section>
  )
}