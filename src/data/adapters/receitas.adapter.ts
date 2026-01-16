
import type { CardData, OptionItem } from '../../types/ui'

export function receitaRowToOption(row: any): OptionItem {
  return {
    id: String(row.id),
    title: row.nome,
    desc: row.tipo ? `Tipo: ${row.tipo}` : undefined,
    icon: '🍳',
    badge: row.energia_base ? `Energia: ${row.energia_base}` : undefined,
  }
}

export function receitaToCard(
  receita: any,
  ingredientes: { nome: string; raridade?: string; quantidade: number }[]
): CardData {
  return {
    id: String(receita.id),
    title: receita.nome,
    description: receita.descricao ?? undefined,
    badge: receita.tipo ?? undefined,
    items: ingredientes.map(i =>
      `${i.nome} x${i.quantidade}${i.raridade ? ` (${i.raridade})` : ''}`
    ),
  }
}
