import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../services/api'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'

export default function FoodDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.getFood(id)
      .then(setItem)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <div className="section-title">🍕 Food #{id}</div>
        <Link to="/foods" className="btn ghost">← Voltar</Link>
      </div>

      {loading && <Skeleton rows={2} />}
      {!loading && error && <ErrorState message={error} />}

      {!loading && !error && item && (
        <>
          <Card title={item.name} right={<Badge tone={Number(item.price) > 50 ? 'warn' : 'ok'}>R$ {Number(item.price ?? 0).toFixed(2)}</Badge>} subtitle={item.category ?? '—'}>
            <div className="card-row"><span>Disponível</span><span className="kbd">{item.available ? 'Sim' : 'Não'}</span></div>
            <div className="card-row"><span>Restaurante</span><span className="kbd">{item.restaurantName ?? '—'}</span></div>
          </Card>

          <div style={{height:12}}/>

          <Card title="JSON bruto">
            <pre className="pretty">{JSON.stringify(item, null, 2)}</pre>
          </Card>
        </>
      )}
    </div>
  )
}
