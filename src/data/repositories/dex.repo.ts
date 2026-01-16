//dex.repo.ts

import supabase from "../../service/supabase";

type DexRow = {
  id: string;
  pokemon: string;
  specialty: string;
  frequencia: string;
  sleep_type: string;
  carry_base: string;
  dex_num: string;
  // Relação 1:1
  tipo: {
    tipo: string ;
    berry: string ;
    type: string ;
  } ;
  // Relação 1:1
  main_skill: {
    nome: string;
  };
  // Relação 1:N ou N:N
  pokemon_ingrediente: {
    ingrediente: {
        id: string
        nome: string
    };
  }[] ;
};


export type DexRead = {
    id: string
    pokemon: string
    specialty: string
    frequencia: string
    sleep_type: string
    carry_base: string
    dex_num: string
    tipo: {
        tipo?: string
        berry?: string
        type?: string
    }
    main_skill?: string
    ingredientes: {
        id: string
        nome: string
    }[]
}

export async function fetchDexOptions(): Promise<DexRead[]> {
    const {data, error} = await supabase
        .from('pokemon_base')
        .select(`
            id,
            pokemon,
            specialty,
            frequencia,
            sleep_type,
            carry_base,
            dex_num,
            tipo : tipo(
                tipo,
                berry,
                type
            ),
            main_skill: main_skill(
                nome
                ),
            pokemon_ingrediente(
            ingrediente:ingredientes(
            id,
            nome
            )
            )
            `)
        .order('dex_num', {ascending: true})
    if (error) throw error
    
    const rows = (data ?? []) as unknown as DexRow[]

    return rows.map((p) => ({
        id: p.id,
        pokemon: p.pokemon,
        specialty: p.specialty,
        frequencia:p.frequencia,
        sleep_type: p.sleep_type,
        carry_base: p.carry_base,
        dex_num: p.dex_num,
        ingredientes: (p.pokemon_ingrediente)
        .map((rel) => ({ 
            id: rel.ingrediente.id ,
            nome: rel.ingrediente.nome,     
        })),
        tipo: {
            tipo: p.tipo.tipo,
            berry: p.tipo.berry,
            type: p.tipo.type,
            },
        main_skill: p.main_skill.nome,
    }))
}

    
