import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../../service/productService'
import { supabase } from '../../supabase'
import ProductCard from '../../components/productCard/productCart'
import { FiFilter, FiDollarSign, FiArrowDown, FiRefreshCw, FiGrid } from 'react-icons/fi'
import styles from './Shop.module.css'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category')

  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  // Загружаем категории один раз
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*')
      if (data) setCategories(data)
    }
    fetchCategories()
  }, [])

  // Загружаем товары при смене категории
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts(categoryId ? parseInt(categoryId) : null)
        setAllProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [categoryId])

  // Фильтрация и сортировка на клиенте
  useEffect(() => {
    let filtered = [...allProducts]

    if (minPrice !== '') {
      filtered = filtered.filter(p => (p.price || 0) >= Number(minPrice))
    }
    if (maxPrice !== '') {
      filtered = filtered.filter(p => (p.price || 0) <= Number(maxPrice))
    }

    if (sortBy === 'price_asc') filtered.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_desc') filtered.sort((a, b) => b.price - a.price)
    else filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    setProducts(filtered)
  }, [allProducts, minPrice, maxPrice, sortBy])

  const handleCategory = (id) => {
    setMinPrice('')
    setMaxPrice('')
    setSortBy('newest')
    id === null ? setSearchParams({}) : setSearchParams({ category: id })
  }

  const handleReset = () => {
    setMinPrice('')
    setMaxPrice('')
    setSortBy('newest')
    setSearchParams({})
  }

  const currentCategoryName = categoryId
    ? categories.find(c => String(c.id) === categoryId)?.category_name || 'Товары'
    : 'Все товары'

  if (error) return <div className={styles.error}>Ошибка: {error}</div>

  return (
    <div className={styles.shopPage}>

      {/* Боковая панель */}
      <aside className={styles.sidebar}>

        <div className={styles.filterBlock}>
          <h3 className={styles.filterTitle}>
            <FiGrid className={styles.filterIcon} />
            Категории
          </h3>
          <ul className={styles.categoryList}>
            <li>
              <button
                className={`${styles.categoryBtn} ${!categoryId ? styles.active : ''}`}
                onClick={() => handleCategory(null)}
              >
                Все товары
              </button>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <button
                  className={`${styles.categoryBtn} ${categoryId === String(cat.id) ? styles.active : ''}`}
                  onClick={() => handleCategory(cat.id)}
                >
                  {cat.category_name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.filterBlock}>
          <h3 className={styles.filterTitle}>
            <FiDollarSign className={styles.filterIcon} />
            Цена (сом)
          </h3>
          <div className={styles.priceInputs}>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="От"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
            <span className={styles.priceDash}>—</span>
            <input
              type="number"
              className={styles.priceInput}
              placeholder="До"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filterBlock}>
          <h3 className={styles.filterTitle}>
            <FiArrowDown className={styles.filterIcon} />
            Сортировка
          </h3>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="newest">Сначала новые</option>
            <option value="price_asc">Цена: по возрастанию</option>
            <option value="price_desc">Цена: по убыванию</option>
          </select>
        </div>

        <button className={styles.resetBtn} onClick={handleReset}>
          <FiRefreshCw className={styles.resetIcon} />
          Сбросить фильтры
        </button>

      </aside>

      {/* Основной контент */}
      <main className={styles.content}>
        <div className={styles.contentHeader}>
          <h1 className={styles.pageTitle}>{currentCategoryName}</h1>
          <span className={styles.productCount}>{products.length} товаров</span>
        </div>

        {loading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : products.length === 0 ? (
          <div className={styles.empty}>Товары не найдены</div>
        ) : (
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

    </div>
  )
}

export default Shop