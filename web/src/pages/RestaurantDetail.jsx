import { useParams, Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { API } from '../services/api'

export default function RestaurantDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return;
    let cancel = false
    async function load() {
      setLoading(true)
      setError('')

      const getOne = typeof API.getRestaurant === 'function'
        ? API.getRestaurant
        : async (rid) => {
            const list = await API.listRestaurants()
            return list.find(x => String(x?.id) === String(rid)) || null
          }

      try {
        const res = await getOne(id)
        if (cancel) return
        if (!res) throw new Error('Restaurante não encontrado')
        setData(res)
      } catch (e) {
        if (cancel) return
        setError(e?.message || 'Erro ao carregar restaurante')
      } finally {
        if (!cancel) setLoading(false)
      }
    }
    load()
    return () => { cancel = true }
  }, [id])

  if (!id) return null

  const rating = useMemo(() => {
    const n = Number(data?.rating)
    return Number.isFinite(n) ? n.toFixed(1) : null
  }, [data])

  const img = data?.image || 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop'
  const category = data?.cuisine || data?.category || null
  const desc = data?.description || null

  function handleImgError(e) {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200&auto=format&fit=crop'
  }

  if (loading) return <div className="container my-4">Carregando…</div>
  if (error) return (
    <div className="container my-4">
      <p className="text-danger mb-3">{error}</p>
      <Link to="/restaurantes" className="btn btn-secondary">Voltar</Link>
    </div>
  )
  if (!data) return (
    <div className="container my-4">
      <p className="mb-3">Restaurante não encontrado.</p>
      <Link to="/restaurantes" className="btn btn-secondary">Voltar</Link>
    </div>
  )

  return (
    <div className="container my-4">
      <Link to="/restaurantes" className="btn btn-light mb-3">← Voltar</Link>

      {/* Card */}
      <div className="card shadow-sm rounded-4 border-0 overflow-hidden restaurant-detail-card">
        {}
        <div className="p-3 p-md-4 pb-0">
          <img
            src={img}
            onError={handleImgError}
            alt={data.name || 'Restaurante'}
            className="w-100 hero-img-in-card"
          />
        </div>

        {/* Detalhes */}
        <div className="card-body p-3 p-md-4">
          <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
            <h1 className="h3 mb-0 me-2">{data.name}</h1>
            {category && <span className="badge bg-light text-dark">{category}</span>}
            {rating && <span className="badge bg-success-subtle text-success">⭐ {rating}</span>}
            {data?.id && <span className="badge bg-light text-muted">ID #{data.id}</span>}
          </div>

          {desc && <p className="text-muted mb-4">{desc}</p>}

          {}
          <div className="row g-3">
            {data?.address && (
              <div className="col-12 col-md-6">
                <div className="list-tile">
                  <div className="list-tile-title">Endereço</div>
                  <div className="text-muted">
                    {[data.address?.street, data.address?.suite, data.address?.city]
                      .filter(Boolean).join(', ') || '—'}
                  </div>
                </div>
              </div>
            )}
            {data?.phone && (
              <div className="col-12 col-md-6">
                <div className="list-tile">
                  <div className="list-tile-title">Contato</div>
                  <div className="text-muted">{data.phone}</div>
                </div>
              </div>
            )}
            {data?.website && (
              <div className="col-12 col-md-6">
                <div className="list-tile">
                  <div className="list-tile-title">Site</div>
                  <a href={data.website} target="_blank" rel="noreferrer">{data.website}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
