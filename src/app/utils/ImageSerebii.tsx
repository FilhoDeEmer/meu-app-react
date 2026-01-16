function pad(str, length) {
  const resto = length - String(str).length;
  return '0'.repeat(resto > 0 ? resto : '0') + str;
}

export function receitaImageUrl(nome: string) {
  return `https://www.serebii.net/pokemonsleep/meals/${nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '')
  }.png`
}

export function ingredienteImageUrl(nome: string) {
  return `https://www.serebii.net/pokemonsleep/ingredients/${nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '')
  }.png`
}


export function pokemonImageUrl(dexNum: string) {
  return `https://www.serebii.net/pokemonsleep/pokemon/icon/${pad(dexNum,3)
  }.png`
}