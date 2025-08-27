import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../services/api'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import FoodCard from '../components/FoodCard'
import { useCart } from '../components/CartContext.jsx'

export default function RestaurantDetail(){
  const { id } = useParams()
  const [r, setR] = useState(null)
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addItem } = useCart()

  useEffect(() => {
    Promise.all([
      API.getRestaurant(id),
      API.listFoods(),
    ])
      .then(([rest, listFoods]) => {
        setR(rest)
        setFoods(listFoods)
      })
      .catch(e => setError(e.message))
      .finally(()=>setLoading(false))
  }, [id])

  const menu = useMemo(() => {
    // Tentativa de filtrar por restaurantId, caindo por nome se necessário
    const idNum = Number(id)
    const byId = foods.filter(f => f.restaurantId === idNum)
    if (byId.length > 0) return byId

    if (r?.name) {
      const name = (r.name || '').toLowerCase()
      const byName = foods.filter(f => (f.restaurantName || '').toLowerCase() === name)
      if (byName.length > 0) return byName
    }

    // fallback: mostra alguns itens quaisquer
    return foods.slice(0, 12)
  }, [foods, id, r])

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <div className="section-title">🍽️ Restaurante #{id}</div>
        <Link to="/" className="btn ghost">← Voltar</Link>
      </div>

      {loading && <Skeleton rows={2} />}
      {!loading && error && <ErrorState message={error} />}

      {!loading && !error && r && (
        <>
          <Card
            title={r.name}
            right={<Badge tone="ok" dot>Aberto</Badge>}
            subtitle={r.address ?? `${r.city ?? ''} ${r.state ?? ''}`}
          >
            <div className="card-row"><span>Cozinha</span><span className="kbd">{r.cuisine ?? '—'}</span></div>
            <div className="card-row"><span>Rating</span><span className="kbd">{r.rating ?? '—'}</span></div>
          </Card>

          <div style={{height:12}}/>

          <div className="section-title">📜 Cardápio</div>
          <div className="grid" style={{'--min':'280px'}}>
            {menu.map(f => (
              <FoodCard
                key={f.id}
                f={f}
                onAdd={()=> addItem({
                  id: f.id,
                  name: f.name,
                  price: Number(f.price ?? 0),
                  restaurantId: Number(id),
                })}
              />
            ))}
          </div>

          <div style={{height:12}}/>
          <Card title="JSON do restaurante"><pre className="pretty">{JSON.stringify(r, null, 2)}</pre></Card>
        </>
      )}
    </div>
  )
}
