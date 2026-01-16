
import type { CardData, OptionItem } from '../../types/ui'

export function baseRowToOption(row: any): OptionItem {
  return {
    id: String(row.id),
    title: row.pokemon,
    desc: row.specialty ?? undefined,
    icon: '🧬',
    badge: row.sleep_type ?? undefined,
  }
}

export function baseRowToCard(row: any, tipo?: any, mainSkill?: any): CardData {
  return {
    id: String(row.id),
    title: row.pokemon,
    description: [
      row.specialty,
      mainSkill?.nome ? `Skill: ${mainSkill.nome}` : undefined,
    ].filter(Boolean).join(' • '),
    badge: tipo?.tipo ?? undefined,
    items: [
      tipo?.berry ? `Berry: ${tipo.berry}` : undefined,
      row.frequencia ? `Freq: ${row.frequencia}` : undefined,
      row.carry_base ? `Carry: ${row.carry_base}` : undefined,
      row.dex_num ? `Dex: ${row.dex_num}` : undefined,
    ].filter(Boolean),
  }
}
