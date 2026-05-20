import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LuHeart, LuTrash2, LuShoppingCart, LuArrowRight } from 'react-icons/lu';
import { removeFromFavorites } from '../../store/favoritesSlice';
import { addToCart } from '../../store/cartSlice';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './Favorites.module.css';

const FavoriteCard = memo(({ product }) => {
  const dispatch = useDispatch();
  const name = product.product_name || product.name || 'Без названия';
  const img = product.image || product.image_url;
  const price = product.price || 0;
  const oldPrice = product.old_price || product.discount_price;
  const fmt = (n) => `${Number(n).toLocaleString('ru-RU')} С`;

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.cardImg}>
        {img ? (
          <img src={img} alt={name} loading="lazy" />
        ) : (
          <div className={styles.noImg}><LuHeart size={32} /></div>
        )}
      </Link>
      <div className={styles.cardInfo}>
        {product.brand && <span className={styles.brand}>{product.brand}</span>}
        <Link to={`/product/${product.id}`} className={styles.name}>{name}</Link>
        <div className={styles.priceRow}>
          <span className={styles.price}>{fmt(price)}</span>
          {oldPrice && <span className={styles.oldPrice}>{fmt(oldPrice)}</span>}
        </div>
      </div>
      <div className={styles.cardActions}>
        <button
          className={styles.cartBtn}
          onClick={() => dispatch(addToCart(product))}
        >
          <LuShoppingCart size={16} /> В корзину
        </button>
        <button
          className={styles.removeBtn}
          onClick={() => dispatch(removeFromFavorites(product.id))}
          aria-label="Удалить из избранного"
        >
          <LuTrash2 size={16} />
        </button>
      </div>
    </div>
  );
});

const Favorites = () => {
  const { items } = useSelector((s) => s.favorites);

  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Favorites', path: '/favorites' },
  ];

  return (
    <div className={styles.page}>
      <Breadcrumbs customCrumbs={crumbs} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <LuHeart size={28} className={styles.titleIcon} />
            <h1 className={styles.title}>Избранное</h1>
            {items.length > 0 && (
              <span className={styles.count}>{items.length}</span>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <LuHeart size={64} className={styles.emptyIcon} />
            <h2>Избранное пусто</h2>
            <p>Нажимайте на сердечко на карточках товаров — они появятся здесь.</p>
            <Link to="/shop" className={styles.shopLink}>
              Перейти в каталог <LuArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map((p) => (
              <FavoriteCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Favorites);
