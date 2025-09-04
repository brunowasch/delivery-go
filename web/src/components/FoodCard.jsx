import { Link } from 'react-router-dom'
import { useCart } from './CartContext'
import Badge from './Badge'

const SAFE_FALLBACK =
  'https://images.unsplash.com/photo-1601924582971-c6f9fadd6f59?q=80&w=1200&auto=format&fit=crop'

const PHOTOS = []
const FOOD_IMAGES = {}

export default function FoodCard({ f, onAdd }) {
  const cart = useCart()

  // Escolha da imagem com fallback
  const index = isNaN(Number(f?.id)) ? 0 : Number(f.id) % Math.max(1, (PHOTOS.length || 1))
  const fallback = PHOTOS.length ? PHOTOS[index] : SAFE_FALLBACK
  const mapped = f?.name ? FOOD_IMAGES[f.name] : null
  const img = f?.image || mapped || fallback

  const desc = f?.description || 'Delicioso e preparado na hora.'
  const available = f?.available ?? true
  const price = Number(f?.price ?? 0)

  function handleImgError(e) {
    e.currentTarget.src = SAFE_FALLBACK
  }

  function handleAdd() {
    if (!available) return
    if (onAdd) return onAdd(f)
    cart.addItem({ id: f?.id, name: f?.name, price, image: img })
    cart.openCart?.()
  }

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={img}
        alt={f?.name || 'Comida'}
        className="card-img-top"
        style={{ height: 180, objectFit: 'cover' }}
        onError={handleImgError}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-1">{f?.name || 'Item do cardápio'}</h5>
        <p className="card-text text-muted mb-2" style={{ minHeight: 40 }}>
          {desc}
        </p>

        <div className="d-flex align-items-center gap-2 mb-3">
          <strong className="fs-6">R$ {price.toFixed(2)}</strong>
          <Badge tone={available ? 'ok' : 'danger'}>
            {available ? 'Disponível' : 'Indisponível'}
          </Badge>
        </div>

        {/* Ações */}
        <div className="mt-auto d-flex gap-2 justify-content-end">
          <Link
            to={`/comidas/${f?.id}`}
            className="btn btn-danger text-white"
            aria-label={`Ver detalhes de ${f?.name || 'comida'}`}
          >
            Ver detalhes
          </Link>
        </div>
      </div>
    </div>
  )
}
