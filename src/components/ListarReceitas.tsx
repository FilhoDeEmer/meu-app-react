import React, { useMemo, useState } from "react";
import Card from "./Card";

export type Receitas = {
  id: string;
  nome: string;
  descricao?: string;
  ingredientes: {
    id: string;
    nome: string;
    imageem?: string;
    quantidade: number;
  };
};

type ListReceitasProps = {
  receitas?: Receitas[];
};

export default function ListReceitas({ receitas = [] }: ListReceitasProps) {
  const [query] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    if (!q) return receitas;
    return receitas?.filter(
      (r) =>
        r.nome.toLowerCase().includes(q) ||
        (r.descricao?.toLowerCase().includes(q) ?? false)
    );
  }, [receitas, query]);

  return (
    <div className="receitas-wrapper">
      <div className="grid">
        {filtered?.map((rec) => (
          <Card
            key={rec.id}
            title={rec.nome}
            description={rec.descricao}
            imgURL={`https://www.serebii.net/pokemonsleep/meals/${rec.nome.toLowerCase().replace(/s+/g, "")}.png`}
          />
        ))}

        {filtered?.length === 0 && (
            <div className="card-desc">Nenhuma receita encontrada.</div>
        )}
      </div>
    </div>
  );
}
