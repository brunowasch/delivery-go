import { useEffect, useState } from 'react'
import { API } from '../services/api'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import FoodCard from '../components/FoodCard'

export default function FoodsList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.listFoods()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  function handleAdd(item) {
    alert(`Adicionado: ${item.name}`)
  }

  return (
    <div className="container my-4">
      <h2 className="text-center fw-semibold mb-4 page-title">Comidas</h2>

      {loading && <Skeleton rows={3} />}

      {!loading && error && (
        <ErrorState
          message={error}
          action={
            <button className="btn btn-primary" onClick={() => location.reload()}>
              Tentar novamente
            </button>
          }
        />
      )}

      {!loading && !error && data.length === 0 && (
        <EmptyState title="Sem comidas disponíveis" />
      )}

      {!loading && !error && data.length > 0 && (
        <div className="row g-3">
          {data.map((f) => (
            <div key={f.id} className="col-12 col-sm-6 col-lg-4">
              <FoodCard f={f} onAdd={() => handleAdd(f)} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
