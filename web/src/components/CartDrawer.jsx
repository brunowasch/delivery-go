import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CartDrawer(){
  const nav = useNavigate()
  const { items, inc, dec, remove, total, count, isOpen, closeCart, clear } = useCart()

  return (
    <div
      className={`cart-drawer ${isOpen ? 'open' : ''}`}
      role="dialog" aria-label="Carrinho"
      onClick={(e)=>{ if (e.target.classList.contains('cart-drawer')) closeCart() }}
    >
      <div className="panel">
        <div className="panel-head">
          <h5 className="mb-0"><i class="bi bi-cart"></i> Carrinho <span className="text-muted">({count})</span></h5>
          <button className="btn btn-sm btn-outline-secondary mt-4" onClick={closeCart}>Fechar</button>
        </div>

        <div className="panel-body">
          {!items.length && <div className="text-muted">Seu carrinho está vazio.</div>}

          {items.map(it => (
            <div key={it.id} className="cart-row">
              <div className="thumb">
                {it.image
                  ? <img src={it.image} alt={it.name}/>
                  : <div className="thumb-fallback">{(it.name||'?')[0]}</div>}
              </div>

              <div className="flex-grow-1">
                <div className="fw-semibold">{it.name}</div>
                <div className="text-muted small">R$ {it.price.toFixed(2)}</div>

                <div className="qty">
                  <button className="btn btn-sm btn-light" onClick={()=>dec(it.id)}>-</button>
                  <span className="mx-2">{it.qty}</span>
                  <button className="btn btn-sm btn-light" onClick={()=>inc(it.id)}>+</button>
                  <button className="btn btn-sm btn-link text-danger ms-2" onClick={()=>remove(it.id)}>remover</button>
                </div>
              </div>

              <div className="line-total">R$ {(it.price*it.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="panel-foot">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Total</strong>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary w-50" onClick={clear} disabled={!items.length}>Limpar</button>
            <button
              className="btn btn-danger w-50"
              disabled={!items.length}
              onClick={()=>{
                closeCart()
                nav('/checkout')
              }}
            >
              Finalizar compra
            </button>
          </div>
          <div className="text-end mt-2">
            <Link to="/comidas" onClick={closeCart} className="small">Continuar comprando</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
