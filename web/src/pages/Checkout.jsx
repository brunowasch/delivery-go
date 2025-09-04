import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../components/CartContext'

export default function Checkout(){
  const { items, total, clear } = useCart()
  const nav = useNavigate()

  useEffect(() => {
    if (!items.length) {
      nav('/comidas', { replace: true })
    }
  }, [items, nav])

  if (!items.length) return null

  return (
    <div className="container my-4">
      <h1 className="h4 mb-3">Finalizar compra</h1>

      <div className="card p-3 p-md-4 shadow-sm border-0 rounded-4">
        <h6 className="mb-3">Resumo do pedido</h6>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr><th>Item</th><th>Qtde</th><th>Preço</th><th>Subtotal</th></tr>
            </thead>
            <tbody>
              {items.map(it => (
                <tr key={it.id}>
                  <td>{it.name}</td>
                  <td>{it.qty}</td>
                  <td>R$ {it.price.toFixed(2)}</td>
                  <td>R$ {(it.price*it.qty).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-end"><strong>Total</strong></td>
                <td><strong>R$ {total.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* mock de envio */}
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Link to="/comidas" className="btn btn-light">Adicionar mais itens</Link>
          <button
            className="btn btn-danger"
            onClick={()=>{
              alert('Pedido confirmado!')
              clear()
              nav('/', { replace: true })
            }}
          >
            Confirmar pedido
          </button>
        </div>
      </div>
    </div>
  )
}
