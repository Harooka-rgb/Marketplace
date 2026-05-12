import React from 'react'
import Header from './components/header/Header'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/mainLayout'
import Home from './pages/homePage/Home'
import Shop from './pages/shop/Shop'
import Contacts from './pages/contacts/Contacts'
import About from './pages/about/About'

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
      </Route>
    </Routes>
  )
}

export default App