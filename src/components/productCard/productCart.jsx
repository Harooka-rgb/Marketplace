import React from 'react';
import styles from './productCart.module.css';
import { IoCart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";



const ProductCard = ({ product }) => {
  console.log('ProductCard получил:', product);
  if (!product) {
    console.warn('ProductCard: product не передан!');
    return null;
  }

  // Поля из Supabase с проверкой на null/undefined
  const productName = product.product_name || product.name || 'Без названия';
  const brand = product.brand || '';
  const price = product.price || 0;
  const oldPrice = product.old_price || product.discount_price || null;
  const image = product.image || product.image_url || '/placeholder.png';
  const rating = product.rating || 0;
  const reviewsCount = product.reviews_count || product.review_count || 0;

  // Рассчитываем процент скидки, если есть старая цена
  const discount = oldPrice 
    ? Math.round(((oldPrice - price) / oldPrice) * 100) 
    : null;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={productName} className={styles.image} />
        
        {/* Бейджи поверх картинки */}
        <div className={styles.badges}>
          {discount && <span className={styles.discountBadge}>-{discount}%</span>}
          {rating > 4.5 && <span className={styles.bestPriceBadge}>👍 ХОРОШАЯ ЦЕНА</span>}
        </div>
        
        <button className={styles.favoriteBtn} >
          <IoMdHeartEmpty />
        </button>
      </div>

      <div className={styles.info}>
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>{price.toLocaleString()} сом</span>
          {oldPrice && (
            <span className={styles.oldPrice}>{oldPrice.toLocaleString()} сом</span>
          )}
        </div>

        <p className={styles.title}>
          {brand && <span className={styles.brand}>{brand}</span>}
          {brand && ' / '}
          {productName}
        </p>

        <div className={styles.rating}>
          <span className={styles.stars}>★ {rating}</span>
          <span className={styles.reviews}>{reviewsCount} отзывов</span>
        </div>

        <button className={styles.cartBtn}>
          <span className={styles.cartIcon}><IoCart /></span> В корзину
        </button>
      </div>
    </div>
  );
};

export default ProductCard;