import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import Home from './pages/homePage/Home'
import Shop from './pages/shop/Shop'
import Contacts from './pages/contacts/Contacts'
import About from './pages/about/About'
import Cart from './pages/cart/Cart'
import Checkout from './pages/checkout/Checkout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Profile from './pages/profile/Profile'
import ProtectedRoute from './components/auth/ProtectedRoute'

const Catalog = Shop

const App = () => {
  return (
    <Routes>
      {/* MainLayout становится родительским роутом */}
      <Route path="/" element={<MainLayout />}>
        {/* Эти страницы будут отрендерены внутри <Outlet /> */}
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about" element={<About />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="electronics" element={<Shop category="electronics" />} />
        <Route path="cart" element={<Cart />} />
        <Route 
          path="checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />
        <Route path="profile" element={<Profile />} />
      </Route>
      
      {/* Auth routes without MainLayout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App