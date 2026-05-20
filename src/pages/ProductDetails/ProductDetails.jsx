import React, { useEffect, useState, useCallback, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LuShoppingCart, LuHeart, LuArrowLeft, LuStar,
  LuShield, LuTruck, LuRefreshCw, LuHeadphones,
  LuCheck, LuPackage
} from 'react-icons/lu';
import { addToCart } from '../../store/cartSlice';
import { toggleFavorite } from '../../store/favoritesSlice';
import { supabase } from '../../supabase';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './ProductDetails.module.css';

const fmt = (n) => `${Number(n).toLocaleString('ru-RU')} С`;

const PERKS = [
  { icon: <LuTruck size={18} />, text: 'Доставка от 1 дня по Бишкеку' },
  { icon: <LuShield size={18} />, text: 'Официальная гарантия' },
  { icon: <LuRefreshCw size={18} />, text: 'Возврат в течение 14 дней' },
  { icon: <LuHeadphones size={18} />, text: 'Живая поддержка 9:00–20:00' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [qty, setQty] = useState(1);

  const favorites = useSelector((s) => s.favorites.items);
  const isFav = favorites.some((f) => f.id === product?.id);
  const cartItems = useSelector((s) => s.cart.items);
  const inCart = cartItems.some((i) => i.id === product?.id);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) setProduct(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [dispatch, product, qty]);

  const handleToggleFav = useCallback(() => {
    if (!product) return;
    dispatch(toggleFavorite(product));
  }, [dispatch, product]);

  if (loading) {
    return (
      <div className={styles.skeleton}>
        <div className={styles.skeletonImg} />
        <div className={styles.skeletonInfo}>
          <div className={styles.skeletonLine} style={{ width: '60%' }} />
          <div className={styles.skeletonLine} style={{ width: '40%' }} />
          <div className={styles.skeletonLine} style={{ width: '80%' }} />
          <div className={styles.skeletonLine} style={{ width: '30%' }} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <LuPackage size={56} className={styles.notFoundIcon} />
        <h2>Товар не найден</h2>
        <p>Возможно, он был удалён или ссылка устарела.</p>
        <button className={styles.backBtn} onClick={() => navigate('/shop')}>
          <LuArrowLeft size={16} /> Вернуться в каталог
        </button>
      </div>
    );
  }

  const name = product.product_name || product.name || 'Без названия';
  const img = product.image || product.image_url;
  const price = product.price || 0;
  const oldPrice = product.old_price || product.discount_price;
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;
  const rating = product.rating || 4.5;
  const reviews = product.reviews_count || 0;
  const brand = product.brand || '';
  const desc = product.description || 'Описание товара не добавлено.';

  const crumbs = [
    { label: 'Home', path: '/' },
    { label: 'Catalog', path: '/shop' },
    { label: name, path: `/product/${id}` },
  ];

  return (
    <div className={styles.page}>
      <Breadcrumbs customCrumbs={crumbs} />

      <div className={styles.container}>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          <LuArrowLeft size={16} /> Назад
        </button>

        <div className={styles.grid}>
          {/* IMAGE */}
          <div className={styles.imageBlock}>
            <div className={styles.imageWrap}>
              {discount && <span className={styles.discountBadge}>-{discount}%</span>}
              <button
                className={`${styles.favBtn} ${isFav ? styles.favActive : ''}`}
                onClick={handleToggleFav}
                aria-label="Избранное"
              >
                <LuHeart size={20} />
              </button>
              {img ? (
                <img src={img} alt={name} className={styles.image} />
              ) : (
                <div className={styles.noImage}>
                  <LuPackage size={64} />
                </div>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className={styles.infoBlock}>
            {brand && <span className={styles.brand}>{brand}</span>}
            <h1 className={styles.title}>{name}</h1>

            <div className={styles.ratingRow}>
              {[1,2,3,4,5].map(s => (
                <LuStar
                  key={s}
                  size={16}
                  className={s <= Math.round(rating) ? styles.starFilled : styles.starEmpty}
                />
              ))}
              <span className={styles.ratingNum}>{rating}</span>
              {reviews > 0 && <span className={styles.reviewCount}>({reviews} отзывов)</span>}
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>{fmt(price)}</span>
              {oldPrice && (
                <span className={styles.oldPrice}>{fmt(oldPrice)}</span>
              )}
            </div>

            <div className={styles.stockRow}>
              <LuCheck size={16} className={styles.stockIcon} />
              <span>В наличии</span>
            </div>

            <div className={styles.qtyRow}>
              <span className={styles.qtyLabel}>Количество:</span>
              <div className={styles.qtyControl}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.cartBtn} ${addedToCart ? styles.added : ''}`}
                onClick={handleAddToCart}
              >
                {addedToCart ? (
                  <><LuCheck size={18} /> Добавлено!</>
                ) : (
                  <><LuShoppingCart size={18} /> {inCart ? 'Ещё в корзину' : 'В корзину'}</>
                )}
              </button>
              <button
                className={`${styles.wishBtn} ${isFav ? styles.wishActive : ''}`}
                onClick={handleToggleFav}
                aria-label="В избранное"
              >
                <LuHeart size={20} />
              </button>
            </div>

            <div className={styles.perks}>
              {PERKS.map((p, i) => (
                <div key={i} className={styles.perk}>
                  <span className={styles.perkIcon}>{p.icon}</span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className={styles.descSection}>
          <h2 className={styles.descTitle}>Описание</h2>
          <p className={styles.desc}>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetails);
