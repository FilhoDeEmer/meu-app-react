/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Card from "../../components/Card";
import { fetchAllReceitas } from "../../data/repositories/receitas.repo";
import { receitaImageUrl } from "../utils/ImageSerebii";

export default function ReceitasReadPage() {
  const [receitas, setReceitas] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchAllReceitas()
      .then(setReceitas)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="card-desc">Carregando receitas...</p>;
  if (error) return <p className="card-desc">Erro: {error}</p>;

  return (
    <>
      <h1 style={{ marginBottom: 12 }}>Receitas</h1>

      <div className="grid">
        {receitas.map((r) => (
          <Card
            key={r.id}
            title={r.nome}
            imgURL={receitaImageUrl(r.nome)}
            description={`Total de ingredientes: ${r.ingredientes.reduce(
              (total: any, ing: { quantidade: any; }) => total + ing.quantidade,
              0
            )}`}
            badge={`⚡ ${r.energia_base ?? 0}`}
            items={r.ingredientes.map((i: any) => `${i.nome} x${i.quantidade}`)}
          />
        ))}
      </div>
    </>
  );
}
