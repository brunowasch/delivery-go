import { useEffect, useState } from 'react'
import { API } from '../services/api'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import RestaurantCard from '../components/RestaurantCard'

export default function RestaurantsList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.listRestaurants()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container py-4">
      <h2 className="text-center fw-semibold mb-4 page-title">Restaurantes</h2>

      {loading && <Skeleton rows={3} />}

      {!loading && error && (
        <ErrorState
          message={error}
          action={<button className="btn btn-primary" onClick={() => location.reload()}>Tentar novamente</button>}
        />
      )}

      {!loading && !error && data.length === 0 && (
        <EmptyState title="Sem restaurantes disponíveis" />
      )}

      {!loading && !error && data.length > 0 && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 justify-content-center">
          {data.map((r) => (
            <div key={r.id} className="col d-flex">
              <RestaurantCard r={r} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
