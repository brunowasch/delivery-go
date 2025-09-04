import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../services/api'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import FoodCard from '../components/FoodCard'
import { useCart } from '../components/CartContext.jsx'

import {
  UtensilsCrossed,
  ScrollText,
  MapPin,
  Clock,
  Bike,
  Star,
  StarHalf,
  StarOff,
  ChevronLeft
} from 'lucide-react'

const FALLBACK_POSTER = 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=1600&auto=format&fit=crop'

export default function RestaurantDetail(){
  const { id } = useParams()
  const [r, setR] = useState(null)
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addItem } = useCart()

  useEffect(() => {
    setLoading(true)
    setError('')
    Promise.all([
      API.getRestaurant(id),
      API.listFoods(),
    ])
      .then(([rest, listFoods]) => {
        setR(rest)
        setFoods(Array.isArray(listFoods) ? listFoods : [])
      })
      .catch(e => setError(e?.message || 'Erro ao carregar restaurante'))
      .finally(()=>setLoading(false))
  }, [id])

  const menu = useMemo(() => {
    const idNum = Number(id)
    const byId = foods.filter(f => Number(f.restaurantId) === idNum)
    if (byId.length > 0) return byId

    if (r?.name) {
      const name = String(r.name || '').toLowerCase()
      const byName = foods.filter(f => String(f.restaurantName || '').toLowerCase() === name)
      if (byName.length > 0) return byName
    }

    return foods.slice(0, 12) 
  }, [foods, id, r])

  const safeText = (v, fallback='—') => (v === null || v === undefined || v === '') ? fallback : String(v)
  const isOpen = r?.isOpen ?? r?.open ?? true
  const deliveryTime = r?.deliveryTime || '25–45 min'
  const deliveryFee = r?.deliveryFee === 0 ? 'Grátis' : (r?.deliveryFee ? `R$ ${Number(r.deliveryFee).toFixed(2)}` : 'R$ 6,90')

  const renderStars = (rating) => {
    const n = Math.max(0, Math.min(5, Number(rating) || 0))
    const full = Math.floor(n)
    const half = n - full >= 0.5 ? 1 : 0
    const empty = 5 - full - half
    return (
      <span className="d-inline-flex align-items-center gap-1" aria-label={`Nota ${n.toFixed(1)} de 5`}>
        {Array.from({length: full}).map((_,i)=><Star key={`f${i}`} size={16} />)}
        {Array.from({length: half}).map((_,i)=><StarHalf key={`h${i}`} size={16} />)}
        {Array.from({length: empty}).map((_,i)=><StarOff key={`e${i}`} size={16} />)}
        <span className="ms-1 small text-muted">{n.toFixed(1)}</span>
      </span>
    )
  }

  if (loading) {
    return (
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="section-title d-flex align-items-center gap-2">
            <UtensilsCrossed size={20}/> Restaurante
          </div>
          <span className="btn ghost disabled"><ChevronLeft size={16}/> Voltar</span>
        </div>
        <Skeleton rows={3} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="section-title d-flex align-items-center gap-2">
            <UtensilsCrossed size={20}/> Restaurante
          </div>
          <Link to="/restaurants" className="btn ghost"><ChevronLeft size={16}/> Voltar</Link>
        </div>
        <ErrorState message={error} />
      </div>
    )
  }

  if (!r) {
    return (
      <div className="container my-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="section-title d-flex align-items-center gap-2">
            <UtensilsCrossed size={20}/> Restaurante
          </div>
          <Link to="/restaurants" className="btn ghost"><ChevronLeft size={16}/> Voltar</Link>
        </div>
        <ErrorState message="Restaurante não encontrado." />
      </div>
    )
  }

  return (
    <div className="container my-3">
      {/* Cabeçalho / Voltar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="section-title d-flex align-items-center gap-2">
          <UtensilsCrossed size={20}/> Restaurante #{id}
        </div>
        <Link to="/restaurants" className="btn ghost">
          <ChevronLeft size={16}/> Voltar
        </Link>
      </div>

      {/* HERO */}
      <div className="position-relative mb-3 rounded-3 overflow-hidden" style={{maxHeight: 260}}>
        <img
          src={r.image || r.cover || FALLBACK_POSTER}
          alt={r.name}
          className="w-100"
          style={{objectFit:'cover', height: 260}}
          onError={(e)=>{e.currentTarget.src = FALLBACK_POSTER}}
        />
      </div>

      {/* CARD PRINCIPAL */}
      <Card
        title={
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="fw-semibold">{safeText(r.name, 'Restaurante')}</span>
            {isOpen ? (
              <Badge tone="ok" dot>Aberto</Badge>
            ) : (
              <Badge tone="warn" dot>Fechado</Badge>
            )}
          </div>
        }
        subtitle={
          <span className="d-inline-flex align-items-center gap-2 text-muted">
            <MapPin size={16}/> {safeText(r.address, `${safeText(r.city)} ${safeText(r.state, '')}`)}
          </span>
        }
        right={renderStars(r.rating)}
      >
        <div className="d-flex flex-wrap gap-2">
          <span className="chip d-inline-flex align-items-center gap-2">
            <UtensilsCrossed size={14}/> {safeText(r.cuisine)}
          </span>
          <span className="chip d-inline-flex align-items-center gap-2">
            <Clock size={14}/> {deliveryTime}
          </span>
          <span className="chip d-inline-flex align-items-center gap-2">
            <Bike size={14}/> Entrega: {deliveryFee}
          </span>
        </div>
      </Card>

      <div style={{height:12}}/>

      {/* CARDÁPIO */}
      <div className="section-title d-flex align-items-center gap-2">
        <ScrollText size={18}/> Cardápio
      </div>

      {menu.length === 0 ? (
        <ErrorState message="Este restaurante ainda não possui itens no cardápio." />
      ) : (
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
      )}

      <div style={{height:12}}/>

      {/* JSON DEBUG */}
      <Card title="JSON do restaurante (debug)">
        <pre className="pretty">{JSON.stringify(r, null, 2)}</pre>
      </Card>
    </div>
  )
}
