import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import CartDrawer from './components/CartDrawer'

export default function App(){
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/restaurants/:id" element={<RestaurantDetail/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <CartDrawer />
    </>
  )
}
