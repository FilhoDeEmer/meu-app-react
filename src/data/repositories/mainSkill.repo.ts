
// src/data/repositories/mainSkill.repo.ts
import supabase from "../../service/supabase";

export type MainSkillRow = {
  id: number;
  nome: string;
  descricao?: string | null;
  informacao?: string | null; // mantenha se existir na tabela
};

/** Lê as linhas da tabela main_skills */
export async function fetchMainSkillRows(): Promise<MainSkillRow[]> {
  const { data, error } = await supabase
    .from<MainSkillRow>("main_skills")
    .select("id, nome, descricao, informacao")
    .order("nome", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/** Atualiza um registro (patch parcial) */
export async function updateMainSkill(
  row: MainSkillRow,
  patch: Partial<MainSkillRow>
): Promise<void> {
  const { error } = await supabase
    .from("main_skills")
    .update(patch)
    .eq("id", row.id);
  if (error) throw error;
}

/** Exclui um registro por id */
export async function deleteMainSkill(row: MainSkillRow): Promise<void> {
  const { error } = await supabase
    .from("main_skills")
    .delete()
    .eq("id", row.id);
  if (error) throw error;
}

