import { useEffect, useState } from 'react'
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

  useEffect(() => {
    API.listUsers()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container">
      <div className="section-title">👥 Users</div>
      <div className="section-sub">Lista dos usuários cadastrados na API fake.</div>

      {loading && <Skeleton rows={3} />}
      {!loading && error && <ErrorState message={error} action={<button className="btn" onClick={()=>location.reload()}>Tentar novamente</button>} />}
      {!loading && !error && data.length === 0 && <EmptyState title="Sem usuários" subtitle="A API não retornou dados." />}

      {!loading && !error && data.length > 0 && (
        <div className="grid">
          {data.map(u => (
            <Card
              key={u.id}
              title={`${u.name ?? 'Usuário'} `}
              right={<Badge tone="brand" dot>ID #{u.id}</Badge>}
              subtitle={u.email}
              footer={<Link to={`/users/${u.id}`} className="btn brand">Ver detalhes</Link>}
            >
              <div className="card-row"><span>Phone</span><span className="kbd">{u.phone ?? '—'}</span></div>
              <div className="card-row"><span>Website</span><span className="kbd">{u.website ?? '—'}</span></div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
