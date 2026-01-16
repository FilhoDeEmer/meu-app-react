
// src/data/repositories/mainSkill.repo.ts
import supabase from "../../service/supabase";

export type SubSkillRow = {
  id: number;
  nome: string;
  descricao?: string | null;
  informacao?: string | null; // mantenha se existir na tabela
};

/** Lê as linhas da tabela main_skills */
export async function fetchSubSkillRows(): Promise<SubSkillRow[]> {
  const { data, error } = await supabase
    .from<SubSkillRow>("sub_skills")
    .select("id, nome, efeito, qualidade")
    .order("nome", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

