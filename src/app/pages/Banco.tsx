import { useEffect, useMemo, useState } from "react";
import  supabase  from "../../service/supabase"; // ajuste o caminho se necessário

type PokemonBancoRow = {
  id: number;
  id_base: number;
  level: number | null;
  hab_level: number | null;
  gold_seed: string | null;
  nature: number | null;
  ingredient_1: number | null;
  ingredient_2: number | null;
  ingredient_3: number | null;
  sub_skill1: number | null;
  sub_skill2: number | null;
  sub_skill3: number | null;
  sub_skill4: number | null;
  sub_skill5: number | null;

  // join
  pokemon_base?: {
    id: number;
    pokemon: string;
    dex_num: number | null;
    specialty: string | null;
    carry_base: string | null;
  } | null;
};

type Option = { id: number; nome: string };

function pad3(n: number | null | undefined) {
  const v = typeof n === "number" ? n : 0;
  return String(v).padStart(3, "0");
}

function spriteUrlFromDex(dex: number | null | undefined) {
  // serebii icons (pokemon sleep)
  return `https://www.serebii.net/pokemonsleep/pokemon/icon/${pad3(dex)}.png`;
}

export default function BancoPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [items, setItems] = useState<PokemonBancoRow[]>([]);

  // opções do formulário
  const [bases, setBases] = useState<Option[]>([]);
  const [natures, setNatures] = useState<Option[]>([]);
  const [ingredientes, setIngredientes] = useState<Option[]>([]);
  const [subSkills, setSubSkills] = useState<Option[]>([]);

  // modal
  const [open, setOpen] = useState(false);

  // form state (MVP)
  const [form, setForm] = useState({
    id_base: "" as string, // obrigatório
    level: "1",
    hab_level: "1",
    gold_seed: "N",
    nature: "" as string,
    ingredient_1: "" as string,
    ingredient_2: "" as string,
    ingredient_3: "" as string,
    sub_skill1: "" as string,
    sub_skill2: "" as string,
    sub_skill3: "" as string,
    sub_skill4: "" as string,
    sub_skill5: "" as string,
  });

  const resetForm = () => {
    setForm({
      id_base: "",
      level: "1",
      hab_level: "1",
      gold_seed: "N",
      nature: "",
      ingredient_1: "",
      ingredient_2: "",
      ingredient_3: "",
      sub_skill1: "",
      sub_skill2: "",
      sub_skill3: "",
      sub_skill4: "",
      sub_skill5: "",
    });
  };

  async function loadList() {
    setLoading(true);
    setErrorMsg(null);

    // ⚠️ Se sua tabela se chama "banco", troque aqui:
    // .from("banco")
    const { data, error } = await supabase
      .from("pokemon_banco")
      .select(
        `
        id,
        id_base,
        level,
        hab_level,
        gold_seed,
        nature,
        ingredient_1,
        ingredient_2,
        ingredient_3,
        sub_skill1,
        sub_skill2,
        sub_skill3,
        sub_skill4,
        sub_skill5,
        pokemon_base:id_base (
          id,
          pokemon,
          dex_num,
          specialty,
          carry_base
        )
      `
      )
      .order("id", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setItems([]);
    } else {
      setItems((data as any) ?? []);
    }

    setLoading(false);
  }

  async function loadOptions() {
    // Bases
    const [basesRes, naturesRes, ingRes, subRes] = await Promise.all([
      supabase.from("pokemon_base").select("id,pokemon").order("pokemon", { ascending: true }),
      supabase.from("natures").select("id,nome").order("nome", { ascending: true }),
      supabase.from("ingredientes").select("id,nome").order("nome", { ascending: true }),
      supabase.from("sub_skills").select("id,nome").order("nome", { ascending: true }),
    ]);

    if (!basesRes.error) setBases((basesRes.data ?? []).map((x: any) => ({ id: x.id, nome: x.pokemon })));
    if (!naturesRes.error) setNatures((naturesRes.data ?? []).map((x: any) => ({ id: x.id, nome: x.nome })));
    if (!ingRes.error) setIngredientes((ingRes.data ?? []).map((x: any) => ({ id: x.id, nome: x.nome })));
    if (!subRes.error) setSubSkills((subRes.data ?? []).map((x: any) => ({ id: x.id, nome: x.nome })));
  }

  useEffect(() => {
    loadList();
    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const baseById = useMemo(() => {
    const m = new Map<number, string>();
    bases.forEach((b) => m.set(b.id, b.nome));
    return m;
  }, [bases]);

  async function handleSave() {
    setErrorMsg(null);

    if (!form.id_base) {
      setErrorMsg("Selecione um Pokémon (Base).");
      return;
    }

    setSaving(true);

    const payload = {
      id_base: Number(form.id_base),
      level: form.level ? Number(form.level) : null,
      hab_level: form.hab_level ? Number(form.hab_level) : null,
      gold_seed: form.gold_seed || null,
      nature: form.nature ? Number(form.nature) : null,

      ingredient_1: form.ingredient_1 ? Number(form.ingredient_1) : null,
      ingredient_2: form.ingredient_2 ? Number(form.ingredient_2) : null,
      ingredient_3: form.ingredient_3 ? Number(form.ingredient_3) : null,

      sub_skill1: form.sub_skill1 ? Number(form.sub_skill1) : null,
      sub_skill2: form.sub_skill2 ? Number(form.sub_skill2) : null,
      sub_skill3: form.sub_skill3 ? Number(form.sub_skill3) : null,
      sub_skill4: form.sub_skill4 ? Number(form.sub_skill4) : null,
      sub_skill5: form.sub_skill5 ? Number(form.sub_skill5) : null,
    };

    // ⚠️ Se sua tabela se chama "banco", troque aqui:
    // .from("banco")
    const { error } = await supabase.from("pokemon_banco").insert(payload);

    if (error) {
      setErrorMsg(error.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setOpen(false);
    resetForm();
    await loadList();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar fixa */}
      <div className="shrink-0">
        {/* se seu Sidebar já tiver width fixa, ótimo */}
        {/* caso contrário, coloque w-16 / w-20 dentro do componente */}
      </div>

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Banco</h1>
          <div className="text-xs text-zinc-400">
            {loading ? "Carregando..." : `${items.length} Pokémon(s)`}
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {errorMsg}
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {/* Card + sempre primeiro */}
          <button
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            className="h-32 rounded-2xl border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900/80 transition
                       flex items-center justify-center text-zinc-200"
            title="Adicionar Pokémon"
          >
            <span className="text-4xl leading-none">+</span>
          </button>

          {/* Cards do banco */}
          {items.map((p) => {
            const nome = p.pokemon_base?.pokemon ?? baseById.get(p.id_base) ?? `#${p.id_base}`;
            const dex = p.pokemon_base?.dex_num ?? null;

            return (
              <div
                key={p.id}
                className="h-32 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 flex flex-col items-center justify-center gap-2"
              >
                <img
                  src={spriteUrlFromDex(dex)}
                  alt={nome}
                  className="w-12 h-12 object-contain"
                />
                <div className="text-xs font-semibold text-center truncate w-full">{nome}</div>
                <div className="text-[11px] text-zinc-300">Nv {p.level ?? "—"}</div>
              </div>
            );
          })}
        </div>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl border border-zinc-700 bg-zinc-900 p-5">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold">Adicionar Pokémon</h2>
                <button
                  className="text-zinc-300 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Pokemon base */}
                <label className="text-sm">
                  <div className="mb-1 text-zinc-300">Pokémon</div>
                  <select
                    value={form.id_base}
                    onChange={(e) => setForm((s) => ({ ...s, id_base: e.target.value }))}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700 p-2 text-sm"
                  >
                    <option value="">Selecione...</option>
                    {bases.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.nome}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <div className="mb-1 text-zinc-300">Nature</div>
                  <select
                    value={form.nature}
                    onChange={(e) => setForm((s) => ({ ...s, nature: e.target.value }))}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700 p-2 text-sm"
                  >
                    <option value="">(opcional)</option>
                    {natures.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.nome}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm">
                  <div className="mb-1 text-zinc-300">Level</div>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={form.level}
                    onChange={(e) => setForm((s) => ({ ...s, level: e.target.value }))}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700 p-2 text-sm"
                  />
                </label>

                <label className="text-sm">
                  <div className="mb-1 text-zinc-300">Hab Level</div>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={form.hab_level}
                    onChange={(e) => setForm((s) => ({ ...s, hab_level: e.target.value }))}
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700 p-2 text-sm"
                  />
                </label>

                <label className="text-sm md:col-span-2">
                  <div className="mb-1 text-zinc-300">Gold Seed</div>
                  <input
                    value={form.gold_seed}
                    onChange={(e) => setForm((s) => ({ ...s, gold_seed: e.target.value }))}
                    placeholder="ex: Y / N"
                    className="w-full rounded-lg bg-zinc-950 border border-zinc-700 p-2 text-sm"
                  />
                </label>

                {/* Ingredientes */}
                <div className="md:col-span-2 text-sm font-semibold text-zinc-200 mt-2">
                  Ingredientes
                </div>

                {(["ingredient_1", "ingredient_2", "ingredient_3"] as const).map((k) => (
                  <label key={k} className="text-sm">
                    <div className="mb-1 text-zinc-300">{k.toUpperCase()}</div>
                    <select
                      value={form[k]}
                      onChange={(e) => setForm((s) => ({ ...s, [k]: e.target.value }))}
                      className="w-full rounded-lg bg-zinc-950 border border-zinc-700 p-2 text-sm"
                    >
                      <option value="">(opcional)</option>
                      {ingredientes.map((ing) => (
                        <option key={ing.id} value={ing.id}>
                          {ing.nome}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}

                {/* Subskills */}
                <div className="md:col-span-2 text-sm font-semibold text-zinc-200 mt-2">
                  Sub Skills
                </div>

                {(
                  ["sub_skill1", "sub_skill2", "sub_skill3", "sub_skill4", "sub_skill5"] as const
                ).map((k) => (
                  <label key={k} className="text-sm">
                    <div className="mb-1 text-zinc-300">{k.toUpperCase()}</div>
                    <select
                      value={form[k]}
                      onChange={(e) => setForm((s) => ({ ...s, [k]: e.target.value }))}
                      className="w-full rounded-lg bg-zinc-950 border border-zinc-700 p-2 text-sm"
                    >
                      <option value="">(opcional)</option>
                      {subSkills.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.nome}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>

              <div className="flex gap-2 mt-5">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-950 py-2 text-sm hover:bg-zinc-900"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-xl bg-blue-600 py-2 text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
                  disabled={saving}
                >
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
