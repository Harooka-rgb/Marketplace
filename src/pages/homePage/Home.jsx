import React, { useState, useEffect } from 'react'
import Banner from '../../components/banner/Banner'
import ProductSlider from '../../components/ProductSlider/ProductSlider'
import ProductCard from '../../components/productCard/productCart'
import CategorySection from '../../components/CategorySection/CategorySection'
import PromoBanner from '../../components/PromoBanner/PromoBanner'
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection'
import { getProducts } from '../../service/productService'
import styles from './Home.module.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [gamingProducts, setGamingProducts] = useState([])
  const [msiProducts, setMsiProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const allProducts = await getProducts()
        console.log('Home: загруженные товары:', allProducts);
        
        setProducts(allProducts)
        
        // Фильтруем товары для разных секций
        // Игровые ноутбуки (предполагаем category_id = 1 или фильтруем по названию)
        const gaming = allProducts.filter(p => 
          p.category_id === 1 || 
          p.product_name?.toLowerCase().includes('gaming') ||
          p.product_name?.toLowerCase().includes('игровой')
        ).slice(0, 8)
        setGamingProducts(gaming.length > 0 ? gaming : allProducts.slice(0, 8))
        
        // MSI ноутбуки
        const msi = allProducts.filter(p => 
          p.brand?.toLowerCase().includes('msi') ||
          p.product_name?.toLowerCase().includes('msi')
        ).slice(0, 8)
        setMsiProducts(msi.length > 0 ? msi : allProducts.slice(4, 12))
        
      } catch (err) {
        setError(err.message)
        console.error('Ошибка при загрузке товаров:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Берем первые 8 товаров для популярных
  const popularProducts = products.slice(0, 8)

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Загрузка товаров...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Ошибка: {error}</p>
        <button onClick={() => window.location.reload()}>Повторить</button>
      </div>
    )
  }

  return (
    <div className={styles.home}>
      {/* Главный баннер */}
      <Banner />
      
      {/* Популярные товары со слайдером */}
      <section className={styles.section}>
        <div className={styles.container}>
          <ProductSlider 
            itemsPerView={4}
            gap={24}
            showArrows={true}
            showDots={true}
            arrowPosition="top"
          >
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductSlider>
        </div>
      </section>

      {/* ZIP промо-баннер */}
      <PromoBanner />

      {/* Секция Custom Builds (игровые ноутбуки) */}
      <CategorySection 
        title="Custom Builds"
        subtitle="See All Products"
        products={gamingProducts}
        bannerImage="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=500&fit=crop"
        bannerLink="/shop?category=1"
        bannerPosition="left"
        bgGradient="linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
      />

      {/* Секция MSI Laptops */}
      <CategorySection 
        title="MSI Laptops"
        subtitle="See All Products"
        products={msiProducts}
        bannerImage="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=500&fit=crop"
        bannerLink="/shop?category=2"
        bannerPosition="left"
        bgGradient="linear-gradient(135deg, #7c0000 0%, #a50000 100%)"
      />

      {/* Преимущества магазина */}
      <FeaturesSection />
    </div>
  )
}

export default Home