import React, { useMemo, useState } from "react";
import Card from "./IngCard";

export type Ingrediente = {
  id: string;
  title: string;
  desc?: string;
  icon?: string;
  imgURL?: string;
};

type ListIngredientesProps = {
  ingredientes?: Ingrediente[];
};

export default function ListIngredientes({
  ingredientes = [],
}: ListIngredientesProps) {
  const [query] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ingredientes;
    return ingredientes?.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        (i.desc?.toLowerCase().includes(q) ?? false)
    );
  }, [ingredientes, query]);

  return (
    <div className="ingredientes-wrapper">
      {/* Lista de cards */}
      <div className="grid">
        {filtered?.map((ing) => (
          <Card
            key={ing.id}
            title={ing.title}
            description={ing.desc}
            imgURL={`https://www.serebii.net/pokemonsleep/ingredients/${ing.title.toLowerCase().replace(/\s+/g, "")}.png`}
          />
        ))}

        {filtered?.length === 0 && (
          <div className="card-desc">Nenhum ingrediente encontrado.</div>
        )}
      </div>
    </div>
  );
}
