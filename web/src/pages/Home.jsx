import { useEffect, useMemo, useState } from 'react'
import { API } from '../services/api'
import CategoryChips from '../components/CategoryChips'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import RestaurantCard from '../components/RestaurantCard'

export default function Home(){
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('')

  // Busca via querystring ?q=
  const [q, setQ] = useState(new URLSearchParams(location.search).get('q') ?? '')
  useEffect(() => {
    const onPop = () => setQ(new URLSearchParams(location.search).get('q') ?? '')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    API.listRestaurants()
      .then(setRestaurants)
      .catch(e => setError(e.message))
      .finally(()=>setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let list = restaurants
    if (q) {
      const term = q.toLowerCase()
      list = list.filter(r =>
        (r.name||'').toLowerCase().includes(term) ||
        (r.cuisine||'').toLowerCase().includes(term) ||
        (r.city||'').toLowerCase().includes(term)
      )
    }
    if (category) {
      const cat = category.toLowerCase()
      list = list.filter(r => (r.cuisine||'').toLowerCase().includes(cat))
    }
    return list
  }, [restaurants, q, category])

  return (
    <div className="container">
      <div className="section-title">🍽️ Restaurantes</div>
      <p className="section-sub">Descubra opções perto de você. Use a busca no topo para filtrar por nome, cozinha ou cidade.</p>

      <CategoryChips value={category} onChange={setCategory} />

      {loading && <div style={{marginTop:12}}><Skeleton rows={3}/></div>}
      {!loading && error && <div style={{marginTop:12}}><ErrorState message={error}/></div>}
      {!loading && !error && filtered.length === 0 && <div style={{marginTop:12}}><EmptyState title="Nenhum restaurante encontrado" subtitle="Tente remover filtros ou alterar a busca."/></div>}

      {!loading && !error && filtered.length > 0 && (
        <div className="grid" style={{marginTop:12}}>
          {filtered.map(r => <RestaurantCard key={r.id} r={r}/>)}
        </div>
      )}
    </div>
  )
}
