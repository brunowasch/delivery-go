import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API } from '../services/api'
import { useCart } from '../components/CartContext'

export default function FoodDetail() {
  const cart = useCart()
  const { id } = useParams()

  const [item, setItem]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return;               
    let cancel = false
    async function load() {
      setLoading(true); setError('')
      const getOne = typeof API.getFood === 'function'
        ? API.getFood
        : async (fid) => {
            const list = await API.listFoods()
            return list.find(x => String(x?.id) === String(fid)) || null
          }
      try {
        const res = await getOne(id)
        if (cancel) return
        if (!res) throw new Error('Comida não encontrada')
        setItem(res)
      } catch (e) {
        if (!cancel) setError(e?.message || 'Erro ao carregar comida')
      } finally {
        if (!cancel) setLoading(false)
      }
    }
    load()
    return () => { cancel = true }
  }, [id])

 if (!id) return null  

  const img = item?.image || 'https://images.unsplash.com/photo-1601924582971-c6f9fadd6f59?q=80&w=1200&auto=format&fit=crop'
  const name = item?.name || 'Comida'
  const desc = item?.description || null
  const price = useMemo(() => Number(item?.price), [item])
  const available = item?.available ?? true
  const category = item?.category || null
  const restaurant = item?.restaurantName || null
  const rating = useMemo(() => {
    const n = Number(item?.rating)
    return Number.isFinite(n) ? n.toFixed(1) : null
  }, [item])

  function handleImgError(e) {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1601924582971-c6f9fadd6f59?q=80&w=1200&auto=format&fit=crop'
  }

  const renderComments = () => {
    if (name.toLowerCase().includes("xis")) {
      return (
        <>
          <h4 className="mt-4">Comentários</h4>
          <div className="border rounded p-3 mb-2">
            <strong>Gabriel Souza</strong>
            <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
            <p>Simplesmente maravilhoso! O xis salada do Vini é enorme, bem recheado e muito saboroso.</p>
          </div>
          <div className="border rounded p-3 mb-2">
            <strong>Diego Candido</strong>
            <p>⭐ ⭐ ⭐ ⭐</p>
            <p>Gostei bastante, muito saboroso! Só achei que veio alface demais.</p>
          </div>
        </>
      )
    } else if (name.toLowerCase().includes("whopper")) {
      return (
        <>
          <h4 className="mt-4">Comentários</h4>
          <div className="border rounded p-3 mb-2">
            <strong>Gabriel Souza</strong>
            <p>⭐ ⭐ ⭐ ⭐</p>
            <p>O Whopper é clássico, gosto muito do sabor defumado da carne.</p>
          </div>
          <div className="border rounded p-3 mb-2">
            <strong>Diego Candido</strong>
            <p>⭐ ⭐ ⭐ ⭐ ⭐</p>
            <p>Meu lanche favorito! Sempre peço com queijo extra, nunca decepciona.</p>
          </div>
        </>
      )
    } else {
      return <p className="mt-4">Não há comentários para este item.</p>
    }
  }

  if (loading) return <div className="container my-4">Carregando…</div>
  if (error) return (
    <div className="container my-4">
      <p className="text-danger mb-3">{error}</p>
      <Link to="/comidas" className="btn btn-secondary">Voltar</Link>
    </div>
  )
  if (!item) return (
    <div className="container my-4">
      <p className="mb-3">Comida não encontrada.</p>
      <Link to="/comidas" className="btn btn-secondary">Voltar</Link>
    </div>
  )

  return (
    <div className="container my-4">
      <Link to="/comidas" className="btn btn-light mb-3">← Voltar</Link>

      <div className="card shadow-sm rounded-4 border-0 overflow-hidden food-detail-card">
        {/* imagem grande no topo */}
        <div className="p-3 p-md-4 pb-0 text-center">
          <img
            src={img}
            onError={handleImgError}
            alt={name}
            className="w-100 hero-img-in-card"
          />
        </div>

        {/* detalhes */}
        <div className="card-body p-3 p-md-4">
          <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
            <h1 className="h3 mb-0 me-2">{name}</h1>
            {category && <span className="badge bg-light text-dark">{category}</span>}
            {rating && <span className="badge bg-success-subtle text-success">⭐ {rating}</span>}
            {item?.id && <span className="badge bg-light text-muted">ID #{item.id}</span>}
            <span className={`badge ${available ? 'bg-primary-subtle text-primary' : 'bg-danger-subtle text-danger'}`}>
              {available ? 'Disponível' : 'Indisponível'}
            </span>
          </div>

          {/* preço */}
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div>
              <span className="fs-5 fw-semibold">R$ {Number.isFinite(price) ? price.toFixed(2) : '0,00'}</span>
              {restaurant && <span className="text-muted small ms-2">• restaurante: {restaurant}</span>}
            </div>
            <button
              className="btn btn-danger"
              disabled={!available}
              onClick={()=>{
                cart.addItem({ id: item.id, name, price: Number(price), image: img })
                cart.openCart()
              }}
            >
              Adicionar ao carrinho
            </button>
          </div>

          {desc && <p className="text-muted mb-0">{desc}</p>}

          {/* Sessão de comentários */}
          {renderComments()}
        </div>
      </div>
    </div>
  )
}
