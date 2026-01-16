/* eslint-disable @typescript-eslint/no-explicit-any */

// src/data/repositories/ingredientes.repo.ts
import supabase from '../../service/supabase'
import type { OptionItem, CardData } from '../../types/cards'

export async function fetchIngredientesOptions(): Promise<OptionItem[]> {
  const { data, error } = await supabase
    .from('ingredientes')
    .select('id,nome,raridade')
    .order('nome', { ascending: true })

  if (error) throw error

  return (data ?? []).map((row: any) => ({
    id: String(row.id),
    title: row.nome,
    desc: row.raridade ?? undefined,
    icon: '🥕',
    badge: row.raridade ?? undefined,
  }))
}

export async function fetchIngredientesByIds(ids: string[]): Promise<CardData[]> {
  const { data, error } = await supabase
    .from('ingredientes')
    .select('*')
    .in('id', ids)

  if (error) throw error

  return (data ?? []).map((row: any) => ({
    id: String(row.id),
    title: row.nome,
    description: row.raridade ? `Raridade: ${row.raridade}` : undefined,
    items: row.raridade ? [row.raridade] : [],
    badge: row.raridade ?? undefined,
  }))
}