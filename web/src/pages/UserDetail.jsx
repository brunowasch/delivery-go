import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../services/api'

export default function UserDetail() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return;
    let cancel = false
    async function load() {
      setLoading(true); setError('')
      const getOne = typeof API.getUser === 'function'
        ? API.getUser
        : async (uid) => {
            const list = await API.listUsers()
            return list.find(x => String(x?.id) === String(uid)) || null
          }
      try {
        const res = await getOne(id)
        if (cancel) return
        if (!res) throw new Error('Usuário não encontrado')
        setUser(res)
      } catch (e) {
        if (!cancel) setError(e?.message || 'Erro ao carregar usuário')
      } finally {
        if (!cancel) setLoading(false)
      }
    }
    load()
    return () => { cancel = true }
  }, [id])

  if (!id) return null
  
  const name = useMemo(() => (user?.name || 'Usuário').toString(), [user])
  const email = useMemo(() => (user?.email || '—').toString(), [user])
  const phone = user?.phone || '—'
  const website = user?.website || '—'
  const company = user?.company?.name || null
  const address = user?.address
    ? [user.address?.street, user.address?.suite, user.address?.city].filter(Boolean).join(', ')
    : null

  const img = user?.image || null
  const getInitials = (n='') => n.split(' ').filter(Boolean).slice(0,2).map(p=>p[0]?.toUpperCase()).join('') || 'US'
  const hashString = (s='') => [...String(s)].reduce((a,c)=>(a + c.charCodeAt(0))>>>0,0)
  const colorFor = (seed) => `hsl(${(Number(seed) || hashString(String(seed))) % 360} 70% 45%)`
  function handleImgError(e){ e.currentTarget.style.display = 'none' }

  const normalize = (s='') =>
    s.toString().trim().toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') 

  const nName = normalize(name)
  const nEmail = normalize(email)

  const USER_REVIEWS = {
    'gabriel souza': [
      { restaurant: 'Xis do Vini', food: 'Xis Salada', rating: 5,
        comment: 'Simplesmente maravilhoso! O xis salada do Vini é enorme, bem recheado e muito saboroso.' },
      { restaurant: 'Burger King', food: 'Whopper', rating: 4,
        comment: 'O Whopper é clássico, gosto muito do sabor defumado da carne.' },
    ],
    'diego candido': [
      { restaurant: 'Xis do Vini', food: 'Xis Salada', rating: 4,
        comment: 'Gostei bastante, muito saboroso! Só achei que veio alface demais.' },
      { restaurant: 'Burger King', food: 'Whopper', rating: 5,
        comment: 'Meu lanche favorito! Sempre peço com queijo extra, nunca decepciona.' },
    ],
  }

  const EMAIL_TO_USERKEY = {
    'gabriel@gmail.com': 'gabriel souza',
    'diego@gmail.com': 'diego candido',
  }

  const resolvedKey =
    EMAIL_TO_USERKEY[nEmail] ||
    (nName.includes('gabriel') && (nName.includes('souza') || nName.includes('sousa')) ? 'gabriel souza' : null) ||
    (nName.includes('diego') && nName.includes('candido') ? 'diego candido' : null)

  const reviews = resolvedKey ? USER_REVIEWS[resolvedKey] : null
  const stars = (r) => '★'.repeat(r) + '☆'.repeat(5 - r)

  if (loading) return <div className="container my-4">Carregando…</div>
  if (error) return (
    <div className="container my-4">
      <p className="text-danger mb-3">{error}</p>
      <Link to="/usuarios" className="btn btn-secondary">Voltar</Link>
    </div>
  )
  if (!user) return (
    <div className="container my-4">
      <p className="mb-3">Usuário não encontrado.</p>
      <Link to="/usuarios" className="btn btn-secondary">Voltar</Link>
    </div>
  )

  return (
    <div className="container my-4">
      <Link to="/usuarios" className="btn btn-light mb-3">← Voltar</Link>

      {/* Card único do perfil */}
      <div className="card shadow-sm rounded-4 border-0 overflow-hidden user-detail-card">
        <div className="p-3 p-md-4 pb-0 text-center">
          {img ? (
            <img
              src={img}
              alt={name}
              className="hero-img-in-card"
              onError={handleImgError}
            />
          ) : (
            <div
              className="hero-avatar-in-card"
              style={{ background: colorFor(user?.id || name) }}
              aria-hidden
            >
              {getInitials(name)}
            </div>
          )}
        </div>

        <div className="card-body p-3 p-md-4">
          <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
            <h1 className="h3 mb-0 me-2">{name}</h1>
            {user?.id != null && <span className="badge bg-light text-muted">ID #{user.id}</span>}
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <div className="list-tile">
                <div className="list-tile-title">E-mail</div>
                <div className="text-muted">{email}</div>
              </div>
            </div>
          </div>

          {/* Avaliações recentes */}
          {reviews?.length ? (
            <div className="user-reviews">
              <h5 className="mb-3">Avaliações recentes</h5>
              <div className="reviews-stack">
                {reviews.map((rev, i) => (
                  <div className="review-row" key={`u-${user.id}-rev-${i}`}>
                    <div className="review-head">
                      <span className="text-dark fw-semibold">
                        {rev.restaurant} – {rev.food}
                      </span>
                      <span className="rating-readonly">{stars(Number(rev.rating) || 0)}</span>
                    </div>
                    <p className="mb-0 text-muted">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
