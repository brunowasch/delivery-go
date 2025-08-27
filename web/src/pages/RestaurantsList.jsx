import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../services/api'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

export default function RestaurantsList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.listRestaurants()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container">
      <div className="section-title">🍽️ Restaurants</div>
      <div className="section-sub">Catálogo de restaurantes disponíveis.</div>

      {loading && <Skeleton rows={3} />}
      {!loading && error && <ErrorState message={error} action={<button className="btn" onClick={()=>location.reload()}>Tentar novamente</button>} />}
      {!loading && !error && data.length === 0 && <EmptyState title="Sem restaurantes" />}

      {!loading && !error && data.length > 0 && (
        <div className="grid">
          {data.map(r => (
            <Card
              key={r.id}
              title={r.name}
              right={<Badge tone="ok" dot>Ativo</Badge>}
              subtitle={r.city ? `${r.city}, ${r.state ?? ''}` : (r.address ?? '—')}
              footer={<Link to={`/restaurants/${r.id}`} className="btn brand">Ver detalhes</Link>}
            >
              <div className="card-row"><span>Cozinha</span><span className="kbd">{r.cuisine ?? '—'}</span></div>
              <div className="card-row"><span>Rating</span><span className="kbd">{r.rating ?? '—'}</span></div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
