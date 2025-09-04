import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { API } from '../services/api'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

export default function UsersList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [q, setQ] = useState(() => {
    const usp = new URLSearchParams(window.location.search)
    return usp.get('q') ?? ''
  })

  useEffect(() => {
    API.listUsers()
      .then(res => Array.isArray(res) ? res : [])
      .then(setData)
      .catch(e => setError(e?.message || 'Erro ao carregar usuários'))
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

  const getInitials = (name='') =>
    name.split(' ').filter(Boolean).slice(0,2).map(p => p[0]?.toUpperCase()).join('') || 'US'

  const hashString = (s='') =>
    [...String(s)].reduce((a,c)=> (a + c.charCodeAt(0)) >>> 0, 0)

  const colorFor = (seed) => {
    const n = Number.isFinite(Number(seed)) ? Number(seed) : hashString(String(seed))
    const h = n % 360
    return `hsl(${h} 70% 45%)`
  }

  const reviews = {
    xis: [
      { stars: 5, text: "Simplesmente maravilhoso! O xis salada do Vini é enorme, bem recheado e muito saboroso." },
      { stars: 4, text: "Gostei bastante, muito saboroso! Só achei que veio alface demais." },
    ],
    whopper: [
      { stars: 4, text: "O Whopper é clássico, gosto muito do sabor defumado da carne." },
      { stars: 5, text: "Meu lanche favorito! Sempre peço com queijo extra, nunca decepciona." },
    ]
  }

  const renderStars = (n) => '⭐'.repeat(n) + '☆'.repeat(5 - n)

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return data
    return data.filter((u) => {
      const name = (u?.name ?? 'Usuário').toString().toLowerCase()
      const email = (u?.email ?? '').toString().toLowerCase()
      const id = (u?.id ?? '').toString().toLowerCase()
      return name.includes(term) || email.includes(term) || id.includes(term)
    })
  }, [data, q])

  return (
    <div className="container my-4">
      <div className="section-title">Amigos adicionados</div>

      {/* Pesquisa */}
      <form
        className="mb-4 d-flex justify-content-center"
        onSubmit={onSearch}
        role="search"
        aria-label="Pesquisar usuários"
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-sm"
            placeholder="Buscar usuários..."
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
      <div className="section-sub mb-3">Atividades recentes de seus amigos</div>
      {loading && <Skeleton rows={3} />}

      {!loading && error && (
        <ErrorState
          message={error}
          action={<button className="btn btn-primary" onClick={() => location.reload()}>Tentar novamente</button>}
        />
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title="Nenhum usuário encontrado"
          subtitle={q ? `Sem resultados para “${q}”.` : 'Tente ajustar sua busca.'}
        />
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="row g-4">
          {filtered.map((u, i) => {
            const rawId = u?.id
            const hasNumericId = Number.isFinite(Number(rawId))
            const displayId = hasNumericId ? Number(rawId) : null

            const name = (u?.name ?? 'Usuário').toString()
            const email = (u?.email ?? '').toString() || '—'
            const seed = hasNumericId ? displayId : `${name}:${email}`

            const key =
              (rawId != null ? String(rawId) : '') ||
              (email ? `mail:${email}` : '') ||
              `idx:${i}`

            const xisReview = reviews.xis[i % reviews.xis.length]
            const whopperReview = reviews.whopper[i % reviews.whopper.length]

            return (
              <div key={key} className="col-12 col-sm-6 col-lg-4 d-flex users-card">
                <Card
                  title={
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className="avatar avatar-lg"
                        style={{ background: colorFor(seed), outlineColor: 'rgba(0,0,0,.06)' }}
                        aria-hidden
                      >
                        {getInitials(name)}
                      </span>
                      <span className="fw-semibold">{name}</span>
                    </div>
                  }
                  subtitle={email}
                  footer={
                    <Link
                      to={hasNumericId ? `/usuarios/${displayId}` : '/usuarios'}
                      className="btn brand btn-danger"
                    >
                      Ver detalhes
                    </Link>
                  }
                >
                  <div className="mt-3">
                    <h6 className="mb-1">Xis do Vini – Xis Salada</h6>
                    <div>{renderStars(xisReview.stars)}</div>
                    <small className="text-muted">{xisReview.text}</small>
                  </div>
                  <div className="mt-3">
                    <h6 className="mb-1">Burger King – Whopper</h6>
                    <div>{renderStars(whopperReview.stars)}</div>
                    <small className="text-muted">{whopperReview.text}</small>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
