import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart_items') || '[]') } catch { return [] }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }, [items])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const clear = () => setItems([])

  const addItem = (raw, qty = 1) => {
    if (!raw) return
    const id = String(raw.id ?? raw.fid ?? raw.name)
    const price = Number(raw.price ?? 0)
    const name = raw.name ?? 'Item'
    const image = raw.image ?? null
    setItems(prev => {
      const ix = prev.findIndex(x => x.id === id)
      if (ix >= 0) {
        const cp = [...prev]
        cp[ix] = { ...cp[ix], qty: cp[ix].qty + qty }
        return cp
      }
      return [...prev, { id, name, price, qty, image }]
    })
  }

  const inc = (id) =>
    setItems(prev => prev.map(x => x.id === String(id) ? { ...x, qty: x.qty + 1 } : x))
  const dec = (id) =>
    setItems(prev => prev.map(x => x.id === String(id) ? { ...x, qty: Math.max(1, x.qty - 1) } : x))
  const remove = (id) =>
    setItems(prev => prev.filter(x => x.id !== String(id)))

  const total = useMemo(() => items.reduce((s, x) => s + x.price * x.qty, 0), [items])
  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, inc, dec, remove, clear, total, count, isOpen, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    console.warn('useCart chamado fora de <CartProvider>.')
    return {
      items: [], addItem: () => {}, inc: () => {}, dec: () => {}, remove: () => {}, clear: () => {},
      total: 0, count: 0, isOpen: false, openCart: () => {}, closeCart: () => {}
    }
  }
  return ctx
}
