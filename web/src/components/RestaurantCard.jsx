import { Link } from 'react-router-dom'
import { useMemo } from 'react'

const FALLBACKS = {
  'Outback': 'https://upload.wikimedia.org/wikipedia/commons/6/69/Outback_Steakhouse_Logo.svg',
  'Burger King': 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Burger_King_2020.svg',
  'Pizza Hut': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Pizza_Hut_logo.svg',
}

export default function RestaurantCard({ r }) {
  const rating = Number(r?.rating ?? 4.7).toFixed(1)
  const category = r?.cuisine || r?.category || 'Variado'
  const img = useMemo(() => {
    if (r?.image) return r.image
    const key = Object.keys(FALLBACKS).find(k =>
      (r?.name || '').toLowerCase().includes(k.toLowerCase())
    )
    return key ? FALLBACKS[key] : 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=512&auto=format&fit=crop'
  }, [r])

  function onImgError(e) {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=512&auto=format&fit=crop'
  }

  const id = r?.id

  return (
    <div className="card restaurant-card shadow-sm rounded-4 border-0 w-100 position-relative">
      {/* Nota */}
      <div className="rating-pill">
        <span className="me-1">{rating}</span> ⭐
      </div>

      <div className="card-body d-flex align-items-center gap-3">
        <div className="logo-wrap">
          <img src={img} onError={onImgError} alt={r?.name || 'Restaurante'} />
        </div>

        <div className="flex-grow-1">
          <div className="fw-semibold text-dark">{r?.name || 'Restaurante'}</div>
          <div className="text-muted small">{category}</div>
        </div>

        {/* coração */}
        <button className="icon-heart" aria-label="Favoritar" type="button">♡</button>
      </div>

      {/* Link invisível que cobre todo o card */}
      {id != null && (
        <Link
          to={`/restaurantes/${id}`}
          className="stretched-link"
          aria-label={`Ver detalhes de ${r?.name || 'restaurante'}`}
          tabIndex={0}
        />
      )}
    </div>
  )
}
