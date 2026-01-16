
import Card from '../../components/Card'

export default function Dashboard() {
  return (
    <>
      <h1 style={{ marginBottom: 12 }}>Dashboard</h1>
      <div className="grid" role="list">
        <div role="listitem">
          <Card
            title="Visão geral"
            description="Indicadores principais da UBS."
            items={['Ingredient']}
            onAdd={() => alert('Adicionar no Dashboard')}
            onView={() => alert('Ver detalhes')}
            imgURL='https://www.serebii.net/pokemonsleep/pokemon/icon/001.png'
          />
        </div>
        <div role="listitem">
          <Card
            title="Fila de atendimentos"
            description="Pacientes aguardando triagem."
            imgURL='https://www.serebii.net/pokemonsleep/pokemon/icon/001.png'
            badge="Hoje: 32"
            onAdd={() => alert('Adicionar na fila')}
            onView={() => alert('Ver fila')}
          />
        </div>
        <div role="listitem">
          <Card
            title="Fila de atendimentos"
            description="Pacientes aguardando triagem."
            imgURL='https://www.serebii.net/pokemonsleep/pokemon/icon/001.png'
            badge="Hoje: 32"
            onAdd={() => alert('Adicionar na fila')}
            onView={() => alert('Ver fila')}
          />
        </div>
        <div role="listitem">
          <Card
            title="Fila de atendimentos"
            description="Pacientes aguardando triagem."
            imgURL='https://www.serebii.net/pokemonsleep/pokemon/icon/001.png'
            badge="Hoje: 32"
            onAdd={() => alert('Adicionar na fila')}
            onView={() => alert('Ver fila')}
          />
        </div>
        <div role="listitem">
          <Card
            title="Fila de atendimentos"
            description="Pacientes aguardando triagem."
            imgURL='https://www.serebii.net/pokemonsleep/pokemon/icon/001.png'
            badge="Hoje: 32"
            onAdd={() => alert('Adicionar na fila')}
            onView={() => alert('Ver fila')}
          />
        </div>
      </div>
    </>
  )
}
