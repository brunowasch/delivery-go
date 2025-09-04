import { useEffect, useMemo, useState } from 'react'
import { API } from '../services/api'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import RestaurantCard from '../components/RestaurantCard'

export default function RestaurantsList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState(() => {
    const usp = new URLSearchParams(window.location.search)
    return usp.get('q') ?? ''
  })

  useEffect(() => {
    API.listRestaurants()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const onPop = () => {
      const usp = new URLSearchParams(window.location.search)
      setQ(usp.get('q') ?? '')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function onSearch(e) {
    e.preventDefault()
    const usp = new URLSearchParams(window.location.search)
    if (q) usp.set('q', q)
    else usp.delete('q')
    history.replaceState(null, '', `?${usp.toString()}`)
  }

  function clearSearch() {
    setQ('')
    const usp = new URLSearchParams(window.location.search)
    usp.delete('q')
    history.replaceState(null, '', `?${usp.toString()}`)
    window.dispatchEvent(new Event('popstate'))
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return data
    return data.filter((r) => {
      const name = (r?.name ?? '').toLowerCase()
      const cuisine = (r?.cuisine ?? r?.category ?? '').toLowerCase()
      const desc = (r?.description ?? '').toLowerCase()
      return (
        name.includes(term) ||
        cuisine.includes(term) ||
        desc.includes(term)
      )
    })
  }, [data, q])

  return (
    <div className="container py-4">
      <h2 className="text-center fw-semibold mb-3 page-title">Restaurantes</h2>

      {/* Pesquisa */}
      <form
        className="mb-4 d-flex justify-content-center"
        onSubmit={onSearch}
        role="search"
        aria-label="Pesquisar restaurantes"
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-sm"
            placeholder="Buscar restaurantes..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={clearSearch}
            >
              <i className="bi bi-x-circle"></i>
            </button>
          )}
          <button className="btn btn-danger" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </form>

      {loading && <Skeleton rows={3} />}
      {!loading && error && (
        <ErrorState
          message={error}
          action={<button className="btn btn-primary" onClick={() => location.reload()}>Tentar novamente</button>}
        />
      )}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title="Nenhum restaurante encontrado"
          subtitle={q ? `Sem resultados para “${q}”.` : 'Tente ajustar sua busca.'}
        />
      )}
      {!loading && !error && filtered.length > 0 && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 justify-content-center">
          {filtered.map((r) => (
            <div key={r.id} className="col d-flex">
              <RestaurantCard r={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
