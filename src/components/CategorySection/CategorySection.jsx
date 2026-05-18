import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../productCard/productCart';
import ProductSlider from '../ProductSlider/ProductSlider';
import styles from './CategorySection.module.css';

const CategorySection = ({ 
  title,
  subtitle,
  products = [],
  bannerImage,
  bannerLink = '/shop',
  bannerPosition = 'left',
  bgGradient = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
}) => {
  const navigate = useNavigate();

  const handleBannerClick = () => {
    navigate(bannerLink);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.grid} ${bannerPosition === 'right' ? styles.gridReversed : ''}`}>
          {/* Banner Side */}
          <div
            className={styles.bannerSide}
            onClick={handleBannerClick}
            style={{ cursor: 'pointer' }}
          >
            <div 
              className={styles.banner}
              style={{ background: bgGradient }}
            >
              <img 
                src={bannerImage} 
                alt={title}
                className={styles.bannerImage}
              />
              <div className={styles.bannerOverlay}>
                <h3 className={styles.bannerTitle}>{title}</h3>
                {subtitle && <p className={styles.bannerSubtitle}>{subtitle}</p>}
                <span className={styles.bannerLink}>See All Products</span>
              </div>
            </div>
          </div>

          {/* Products Side */}
          <div className={styles.productsSide}>
            <ProductSlider 
              itemsPerView={4}
              gap={20}
              showArrows={true}
              showDots={true}
              arrowPosition="top"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductSlider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
