import React, { useState, useEffect } from 'react'
import { getProducts } from '../../service/productService'
import ProductCard from '../../components/productCard/productCart'

const Shop = ({ category }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts(category)
        setProducts(data)
      } catch (err) {
        setError(err.message)
        console.error('Ошибка при загрузке товаров:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  if (loading) return <div>Загрузка товаров...</div>
  if (error) return <div>Ошибка: {error}</div>

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Shop