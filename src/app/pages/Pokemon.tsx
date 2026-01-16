
// src/app/pages/Pokemons.tsx
import React from 'react'
import Card from '../../components/Card'
import AddContentModal from '../../components/ListIngredientes'
import { fetchPokemonBaseOptions, fetchPokemonBaseByIds } from '../../data/repositories/pokemons.repo'
import type { OptionItem, CardData } from '../../types/cards'

export default function PokemonsPage() {
  const [options, setOptions] = React.useState<OptionItem[]>([])
  const [cards, setCards] = React.useState<CardData[]>([])
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    fetchPokemonBaseOptions().then(setOptions).catch(console.error)
  }, [])

  const confirm = async (ids: string[]) => {
    const newCards = await fetchPokemonBaseByIds(ids)
    setCards(prev => [...prev, ...newCards])
    setOpen(false)
  }

  return (
    <>
      <h1 style={{ marginBottom: 12 }}>Pokémons</h1>
      <div className="grid">
        <div className="card-span-2">
          <section className="card card-plus">
            <div className="card-plus-header">
              <h3 className="card-title">Criar cards de Pokémons</h3>
              <button className="btn btn-plus" onClick={() => setOpen(true)}>+</button>
            </div>
            <p className="card-desc">Selecione pokémons para gerar cards.</p>
          </section>
        </div>

        {cards.map(c => (
          <div key={c.id}>
            <Card
              title={c.title}
              description={c.description}
              badge={c.badge}
              items={c.items}
              onView={() => console.log('Ver', c.title)}
            />
          </div>
        ))}
      </div>

      <AddContentModal
        open={open}
        title="Selecionar Pokémons"
        options={options.map(o => ({ id: o.id, title: o.title, desc: o.desc, icon: o.icon }))}
        preSelected={[]}
        onCancel={() => setOpen(false)}
        onConfirm={confirm}
      />
    </>
  )
}
