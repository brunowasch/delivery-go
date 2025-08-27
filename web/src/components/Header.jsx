import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from './CartContext.jsx'

export default function Header() {
  const [q, setQ] = useState('')
  const { items, setOpen, total } = useCart()
  const nav = useNavigate()
  const loc = useLocation()

  function onSearch(e){
    e.preventDefault()
    // simples: joga para home com querystring ?q=
    if (loc.pathname !== '/') nav('/')
    const usp = new URLSearchParams(location.search)
    usp.set('q', q)
    history.replaceState(null, '', `/?${usp.toString()}`)
    window.dispatchEvent(new Event('popstate'))
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="dot" /> iFoodzinho
        </Link>

        <form className="search" onSubmit={onSearch}>
          <span role="img" aria-label="search">🔎</span>
          <input
            placeholder="Buscar restaurantes, pratos..."
            value={q}
            onChange={(e)=>setQ(e.target.value)}
          />
          <button className="icon-btn" title="Buscar">Buscar</button>
        </form>

        <button className="icon-btn ghost" onClick={()=>setOpen(true)} title="Carrinho">
          🛒 <span style={{marginLeft:8, fontWeight:800}}>{items.length}</span>
          <span className="kbd" style={{marginLeft:8}}>R$ {total.toFixed(2)}</span>
        </button>
      </div>
    </header>
  )
}
