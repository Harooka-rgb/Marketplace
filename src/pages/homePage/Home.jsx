import React, { useState, useEffect, useRef } from 'react'
import Banner from '../../components/banner/Banner'
import ProductCard from '../../components/productCard/productCart'
import { getProducts } from '../../service/productService'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const productsRef = useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        console.log('Home: загруженные товары:', data);
        setProducts(data)
        
        // Автоскролл к товарам
        setTimeout(() => {
          if (productsRef.current) {
            productsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 300)
      } catch (err) {
        setError(err.message)
        console.error('Ошибка при загрузке товаров:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <Banner />
      {loading && <div style={{ textAlign: 'center', padding: '40px 20px', fontSize: '18px', color: '#666' }}>Загрузка товаров...</div>}
      {error && <div style={{ textAlign: 'center', padding: '40px 20px', fontSize: '18px', color: '#d32f2f' }}>Ошибка: {error}</div>}
      {!loading && !error && (
        <div ref={productsRef} style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '30px', color: '#1e2640', fontFamily: "'Segoe UI', Tahoma, Geneva" }}>Популярные товары</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home