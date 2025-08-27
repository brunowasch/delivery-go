import { useCart } from './CartContext.jsx'

export default function CartDrawer(){
  const { open, setOpen, items, inc, dec, remove, clear, total } = useCart()

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} role="dialog" aria-label="Carrinho">
      <div className="drawer-header">
        <strong>Seu carrinho</strong>
        <button className="icon-btn ghost" onClick={()=>setOpen(false)}>✕</button>
      </div>

      <div className="drawer-body">
        {items.length === 0 && (
          <div className="state">
            <h3>Carrinho vazio</h3>
            <p>Adicione itens do cardápio.</p>
          </div>
        )}

        {items.map(it => (
          <div className="cart-item" key={it.id}>
            <div>
              <div style={{fontWeight:700}}>{it.name}</div>
              <div className="card-sub">R$ {it.price.toFixed(2)}</div>
              <button className="badge danger" onClick={()=>remove(it.id)}>remover</button>
            </div>
            <div className="qty">
              <button onClick={()=>dec(it.id)} aria-label="Diminuir">−</button>
              <strong>{it.qty}</strong>
              <button onClick={()=>inc(it.id)} aria-label="Aumentar">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="drawer-footer">
        <div className="total-row"><span>Subtotal</span><span>R$ {total.toFixed(2)}</span></div>
        <button className="btn brand">Finalizar pedido</button>
        <button className="btn ghost" onClick={clear}>Esvaziar carrinho</button>
      </div>
    </aside>
  )
}
