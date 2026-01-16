
export type CardData = {
  id: string           // uuid ou string única
  title: string
  description?: string
  imageUrl?: string
  badge?: string
  // conteúdo selecionado ou metadados
  items?: string[]
}


export type OptionItem = {
  id: string
  title: string
  desc?: string
  icon?: string
  imageUrl?: string
  badge?: string
}
