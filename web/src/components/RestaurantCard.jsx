import { Link } from 'react-router-dom'
import Card from './Card'
import Badge from './Badge'

const FALLBACKS = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545193544-312983719627?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop',
]

export default function RestaurantCard({ r }){
  const img = r.image || FALLBACKS[r.id % FALLBACKS.length]
  const time = r.deliveryTime || `${20 + (r.id%20)}-${35 + (r.id%20)} min`
  const fee  = r.deliveryFee ?? (r.id%3===0 ? 0 : (3.9 + (r.id%4))).toFixed(2)
  const rating = r.rating ?? (4 + (r.id%10)/10).toFixed(1)

  return (
    <Card
      title={r.name}
      right={<Badge tone={fee===0 ? 'promo' : 'ok'}>{fee===0? 'Entrega grátis' : `Entrega R$ ${fee}`}</Badge>}
      footer={<Link to={`/restaurants/${r.id}`} className="btn brand">Ver cardápio</Link>}
    >
      <div className="r-card">
        <img className="r-thumb" src={img} alt={r.name} />
        <div>
          <div className="r-meta">
            <span>⭐ {rating}</span>
            <span className="dot" />
            <span>{time}</span>
            <span className="dot" />
            <span>{r.cuisine ?? 'Cozinha variada'}</span>
          </div>
          <p className="card-sub" style={{marginTop:6}}>{r.city ? `${r.city} • ${r.state ?? ''}` : (r.address ?? '')}</p>
        </div>
      </div>
    </Card>
  )
}
