import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import RestaurantsList from './pages/RestaurantsList'
import UsersList from './pages/UsersList'
import FoodsList from './pages/FoodsList'
import CartDrawer from './components/CartDrawer'
import FoodDetail from './pages/FoodDetail'
import UserDetail from './pages/UserDetail'
import Checkout from './pages/Checkout'
import { CartProvider } from './components/CartContext'


export default function App(){
  return (
    <>
    <Header />
    <CartProvider>
      <main className="pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurantes" element={<RestaurantsList />} />
          <Route path="/comidas" element={<FoodsList />} />
          <Route path="/usuarios" element={<UsersList />} />

          {/* rota de detalhes */}
          <Route path="/restaurantes/:id" element={<RestaurantDetail />} />
          <Route path="/comidas/:id" element={<FoodDetail />} />
          <Route path="/usuarios/:id" element={<UserDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
    </>
  )
}
