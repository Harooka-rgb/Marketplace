import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './productCart.module.css';
import { LuHeart, LuShoppingBag } from 'react-icons/lu';
import { toggleFavorite } from '../../store/favoritesSlice';

const fmt = (n) => `${Number(n).toLocaleString('ru-RU')} С`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ВСЕ хуки ДО любого return
  const favorites = useSelector((s) => s.favorites.items);
  const isFav = product ? favorites.some((f) => f.id === product.id) : false;

  const handleBuy = useCallback(() => {
    if (!product) return;
    navigate(`/product/${product.id}`);
  }, [navigate, product]);

  const handleFav = useCallback((e) => {
    e.stopPropagation();
    if (!product) return;
    dispatch(toggleFavorite(product));
  }, [dispatch, product]);

  if (!product) return null;

  const productName = product.product_name || product.name || 'Без названия';
  const brand      = product.brand || '';
  const price      = product.price || 0;
  const oldPrice   = product.old_price || product.discount_price || null;
  const image      = product.image || product.image_url || '/placeholder.png';
  const rating     = product.rating || 0;
  const reviewsCount = product.reviews_count || product.review_count || 0;
  const discount   = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

  return (
    <div className={styles.card} onClick={handleBuy}>

      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <img
          src={image}
          alt={productName}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.stockBadge}>in stock</span>
        <div className={styles.badges}>
          {discount && <span className={styles.discountBadge}>-{discount}%</span>}
        </div>
        <button
          className={`${styles.favoriteBtn} ${isFav ? styles.favActive : ''}`}
          onClick={handleFav}
          aria-label="Избранное"
        >
          <LuHeart size={16} />
        </button>
      </div>

      {/* INFO */}
      <div className={styles.info}>

        {/* Цена — всегда первая строка */}
        <div className={styles.priceRow}>
          <span className={styles.currentPrice}>{fmt(price)}</span>
          {oldPrice && (
            <span className={styles.oldPrice}>{fmt(oldPrice)}</span>
          )}
        </div>

        {/* Название — 2 строки фиксированно */}
        <p className={styles.title}>
          {brand && <span className={styles.brand}>{brand}</span>}
          {brand && ' / '}
          {productName}
        </p>

        {/* Рейтинг — растягивается, прижимает кнопку вниз */}
        <div className={styles.rating}>
          <span className={styles.stars}>★ {rating}</span>
          <span className={styles.reviews}>{reviewsCount} отзывов</span>
        </div>

        {/* Кнопка — всегда внизу (margin-top: auto) */}
        <button
          className={styles.cartBtn}
          onClick={handleBuy}
        >
          <span className={styles.cartIcon}><LuShoppingBag size={15} /></span>
          <span className={styles.btnText}>Купить</span>
        </button>

      </div>
    </div>
  );
};

export default memo(ProductCard);