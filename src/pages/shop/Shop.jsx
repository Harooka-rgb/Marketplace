import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../../service/productService'
import { supabase } from '../../supabase'
import ProductCard from '../../components/productCard/productCart'

const Shop = () => {
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('category')
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoryName, setCategoryName] = useState('Все товары')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Загружаем товары
        const data = await getProducts(categoryId ? parseInt(categoryId) : null)
        setProducts(data)

        // Загружаем название категории, если выбрана категория
        if (categoryId) {
          const { data: categoryData } = await supabase
            .from('categories')
            .select('category_name')
            .eq('id', parseInt(categoryId))
            .single()
          
          if (categoryData) {
            setCategoryName(categoryData.category_name)
          }
        } else {
          setCategoryName('Все товары')
        }
      } catch (err) {
        setError(err.message)
        console.error('Ошибка при загрузке:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryId])

  if (loading) return <div>Загрузка товаров...</div>
  if (error) return <div>Ошибка: {error}</div>

  return (
    <div style={{ padding: '20px' }}>
      <h1>{categoryName}</h1>
      {products.length === 0 ? (
        <p>Товары в этой категории не найдены</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop