//Pokemons.repo.ts
import supabase from '../../service/supabase'
import { baseRowToOption, baseRowToCard } from '../adapters/pokemons.adapter'

export async function fetchPokemonBaseOptions() {
  const { data, error } = await supabase
    .from('pokemon_base')
    .select('id,pokemon,specialty,sleep_type')
    .order('pokemon', { ascending: true })
  if (error) throw error
  return (data ?? []).map(baseRowToOption)
}

export async function fetchPokemonBaseByIds(ids: string[]) {
  const { data: bases, error: e1 } = await supabase
    .from('pokemon_base')
    .select('*')
    .in('id', ids)
  if (e1) throw e1

  // tipos
  const typeIds = Array.from(new Set((bases ?? []).map(b => b.type).filter(Boolean)))
  const { data: tipos, error: e2 } = await supabase
    .from('tipo')
    .select('*')
    .in('id', typeIds.length ? typeIds : [-1])
  if (e2) throw e2
  const tipoMap = new Map((tipos ?? []).map(t => [t.id, t]))

  // main skills
  const skillIds = Array.from(new Set((bases ?? []).map(b => b.main_skill).filter(Boolean)))
  const { data: skills, error: e3 } = await supabase
    .from('main_skills')
    .select('id,nome,descricao')
    .in('id', skillIds.length ? skillIds : [-1])
  if (e3) throw e3
  const skillMap = new Map((skills ?? []).map(s => [s.id, s]))

  return (bases ?? []).map(b => baseRowToCard(b, tipoMap.get(b.type), skillMap.get(b.main_skill)))
}
