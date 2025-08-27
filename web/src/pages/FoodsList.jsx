import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../services/api'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

export default function FoodsList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.listFoods()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container">
      <div className="section-title">🍕 Foods</div>
      <div className="section-sub">Cardápio de itens retornados pela API.</div>

      {loading && <Skeleton rows={3} />}
      {!loading && error && <ErrorState message={error} action={<button className="btn" onClick={()=>location.reload()}>Tentar novamente</button>} />}
      {!loading && !error && data.length === 0 && <EmptyState title="Sem itens" />}

      {!loading && !error && data.length > 0 && (
        <div className="grid">
          {data.map(f => (
            <Card
              key={f.id}
              title={f.name}
              right={<Badge tone={Number(f.price) > 50 ? 'warn' : 'ok'}>R$ {Number(f.price ?? 0).toFixed(2)}</Badge>}
              subtitle={f.category ?? '—'}
              footer={<Link to={`/foods/${f.id}`} className="btn brand">Ver detalhes</Link>}
            >
              <div className="card-row"><span>Disponível</span><span className="kbd">{f.available ? 'Sim' : 'Não'}</span></div>
              <div className="card-row"><span>Restaurante</span><span className="kbd">{f.restaurantName ?? '—'}</span></div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
