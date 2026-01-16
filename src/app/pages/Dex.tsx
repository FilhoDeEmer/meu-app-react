import React from "react";
import Card from "../../components/CardDex";
import { fetchDexOptions } from "../../data/repositories/dex.repo";
import { pokemonImageUrl } from "../utils/ImageSerebii";
import type { DexRead } from "../../data/repositories/dex.repo"; // importe o tipo se estiver exportado

export default function DexReadPage() {
  const [dex, setDex] = React.useState<DexRead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchDexOptions()
      .then(setDex)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="card-desc">Carregando Dex...</p>;
  if (error) return <p className="card-desc">Erro: {error}</p>;

  return (
    <>
      <h1 style={{ marginBottom: 12 }}>Dex</h1>
      <div className="dexgrid">
        {dex.map((c) => {
          // ingredientes como lista de strings (nomes)
         // const ingredientesList = c.ingredientes.map((i) => i.nome);

          /* descrição com <br/> para quebrar linha no HTML
          const description = `
            Especialidade: ${c.specialty ?? "-"}
            Tipo: ${c.tipo?.tipo ?? "-"}
            Berry: ${c.tipo?.berry ?? "-"}
            Sleep Type: ${c.sleep_type ?? "-"}
            Carry Base: ${c.carry_base ?? "-"}
            Main Skill: ${c.main_skill ?? "-"}
            Frequência: ${c.frequencia ?? "-"}
            `.trim();
*/
          return (
            <Card
              key={c.id}
              title={c.pokemon}
              // Se seu Card não renderiza \n, use a prop como HTML ou aplique CSS `white-space: pre-line`
              //description={description}
              items={[c.specialty ?? "-"]} // array de strings
              imgURL={pokemonImageUrl(c.dex_num)}
            />
          );
        })}
      </div>
    </>
  );
}
