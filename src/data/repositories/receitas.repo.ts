/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from '../../service/supabase'

export type ReceitaRead = {
  id: string
  nome: string
  energia_base: number
  ingredientes: {
    nome: string
    quantidade: number
  }[]
}

export async function fetchAllReceitas(): Promise<ReceitaRead[]> {
  const { data, error } = await supabase
    .from('receitas')
    .select(`
      id,
      nome,
      energia_base,
      receita_ingredientes (
        quantidade,
        ingredientes (
          nome
        )
      )
    `)
    .order('nome')

  if (error) throw error

  return (data ?? []).map(r => ({
    id: String(r.id),
    nome: r.nome,
    energia_base: r.energia_base,
    ingredientes:
      r.receita_ingredientes?.map((ri: any) => ({
        nome: ri.ingredientes?.nome,
        quantidade: ri.quantidade,
      })) ?? [],
  }))
}
