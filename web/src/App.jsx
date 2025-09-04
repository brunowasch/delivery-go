import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import RestaurantsList from './pages/RestaurantsList'
import UsersList from './pages/UsersList'
import FoodsList from './pages/FoodsList'
import CartDrawer from './components/CartDrawer'

export default function App(){
  return (
    <>
      <Header />
      <main className="pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurantes" element={<RestaurantsList />} />
          <Route path="/comidas" element={<FoodsList />} />
          <Route path="/usuarios" element={<UsersList />} />

          {/* rota de detalhes */}
          <Route path="/restaurantes/:id" element={<RestaurantDetail />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <CartDrawer />
    </>
  )
}
