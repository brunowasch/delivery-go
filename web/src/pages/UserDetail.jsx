import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../services/api'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Skeleton from '../components/Skeleton'
import ErrorState from '../components/ErrorState'

export default function UserDetail() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.getUser(id)
      .then(setUser)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
        <div className="section-title">👤 User #{id}</div>
        <Link to="/users" className="btn ghost">← Voltar</Link>
      </div>

      {loading && <Skeleton rows={2} />}
      {!loading && error && <ErrorState message={error} />}

      {!loading && !error && user && (
        <>
          <Card title={user.name} right={<Badge tone="brand" dot>ID #{user.id}</Badge>} subtitle={user.email}>
            <div className="card-row"><span>Phone</span><span className="kbd">{user.phone ?? '—'}</span></div>
            <div className="card-row"><span>Website</span><span className="kbd">{user.website ?? '—'}</span></div>
            <div className="card-row"><span>Company</span><span className="kbd">{user.company?.name ?? '—'}</span></div>
          </Card>

          <div style={{height:12}}/>

          <Card title="JSON bruto">
            <pre className="pretty">{JSON.stringify(user, null, 2)}</pre>
          </Card>
        </>
      )}
    </div>
  )
}
