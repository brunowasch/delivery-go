import Badge from './Badge'

const PHOTOS = [
  'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=800&auto=format&fit=crop',
]

const FOOD_IMAGES = {
  'Whopper': 'https://www.burgerking.com.br/_next/image?url=%2Fuploads%2Fproduct%2F2023%2F12%2F07%2Fwhopper.png&w=640&q=75',
  'Combo Whopper': 'https://www.burgerking.com.br/_next/image?url=%2Fuploads%2Fproduct%2F2023%2F12%2F07%2Fwhopper.png&w=640&q=75',
  'Pizza': 'https://images.unsplash.com/photo-1601924582971-c6f9fadd6f59?q=80&w=800&auto=format&fit=crop',
  'Sushi': 'https://images.unsplash.com/photo-1544378730-8b5104c60c2d?q=80&w=800&auto=format&fit=crop',
}

export default function FoodCard({ f, onAdd }) {
  const index = isNaN(Number(f?.id)) ? 0 : Number(f.id) % PHOTOS.length
  const fallback = PHOTOS[index]
  const mapped = f?.name ? FOOD_IMAGES[f.name] : null
  const img = f?.image || mapped || fallback

  const desc = f?.description || 'Delicioso e preparado na hora.'
  const available = f?.available ?? true
  const price = Number(f?.price ?? 0)

  function handleImgError(e) {
    e.currentTarget.src = fallback
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
        <h5 className="card-title mb-1">{f?.name}</h5>
        <p className="card-text text-muted mb-2" style={{ minHeight: 40 }}>
          {desc}
        </p>

        <div className="d-flex align-items-center gap-2 mb-3">
          <strong className="fs-6">R$ {price.toFixed(2)}</strong>
          <Badge tone={available ? 'ok' : 'danger'}>
            {available ? 'Disponível' : 'Indisponível'}
          </Badge>
        </div>

        <div className="mt-auto d-flex justify-content-end">
          <button
            className="btn btn-danger"
            disabled={!available}
            onClick={() => onAdd?.(f)}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}
