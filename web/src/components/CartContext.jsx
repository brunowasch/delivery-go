import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartCtx = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem('cart_v1')
    return raw ? JSON.parse(raw) : []
  })
  const [open, setOpen] = useState(false)
  const [restaurantId, setRestaurantId] = useState(null)

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(items))
  }, [items])

  const total = useMemo(() => items.reduce((s,i)=> s + i.price * i.qty, 0), [items])

  function addItem(product) {
    // regra: carrinho de um restaurante por vez
    if (restaurantId && product.restaurantId && product.restaurantId !== restaurantId) {
      // limpa carrinho se mudar restaurante (comportamento simples)
      setItems([])
    }
    if (product.restaurantId) setRestaurantId(product.restaurantId)

    setItems(prev => {
      const idx = prev.findIndex(p => p.id === product.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
        return copy
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setOpen(true)
  }

  function inc(id){ setItems(prev => prev.map(i => i.id===id? {...i, qty:i.qty+1} : i)) }
  function dec(id){ setItems(prev => prev.flatMap(i => i.id===id? (i.qty>1? [{...i, qty:i.qty-1}] : []) : [i])) }
  function remove(id){ setItems(prev => prev.filter(i => i.id!==id)) }
  function clear(){ setItems([]); setRestaurantId(null) }

  return (
    <CartCtx.Provider value={{ items, total, open, setOpen, addItem, inc, dec, remove, clear, restaurantId }}>
      {children}
    </CartCtx.Provider>
  )
}

export function useCart(){ return useContext(CartCtx) }
