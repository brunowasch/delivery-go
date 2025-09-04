import { useEffect, useMemo, useState } from 'react'
import { API } from '../services/api'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import FoodCard from '../components/FoodCard'

export default function FoodsList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState(() => {
    const usp = new URLSearchParams(window.location.search)
    return usp.get('q') ?? ''
  })

  useEffect(() => {
    API.listFoods()
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
    return data.filter((f) => {
      const name = (f?.name ?? '').toLowerCase()
      const desc = (f?.description ?? '').toLowerCase()
      const rest = (f?.restaurant ?? '').toLowerCase()
      return name.includes(term) || desc.includes(term) || rest.includes(term)
    })
  }, [data, q])

  function handleAdd(item) {
    alert(`Adicionado: ${item.name}`)
  }

  return (
    <div className="container my-4">
      <h2 className="text-center fw-semibold mb-3 page-title">Comidas</h2>

      {/* Pesquisa */}
      <form
        className="mb-4 d-flex justify-content-center"
        onSubmit={onSearch}
        role="search"
        aria-label="Pesquisar comidas"
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-sm"
            placeholder="Buscar comidas..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {q && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={clearSearch}
              aria-label="Limpar busca"
              title="Limpar"
            >
              <i className="bi bi-x-circle"></i>
            </button>
          )}
          <button className="btn btn-danger" type="submit" aria-label="Pesquisar">
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
          title="Nenhum prato encontrado"
          subtitle={q ? `Sem resultados para “${q}”.` : 'Tente ajustar sua busca.'}
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="row g-3">
          {filtered.map((f) => (
            <div key={f.id} className="col-12 col-sm-6 col-lg-4">
              <FoodCard f={f} onAdd={() => handleAdd(f)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
