import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '../../store/cartSlice';
import styles from './Cart.module.css';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const handleIncrement = useCallback((id) => {
    dispatch(incrementQuantity(id));
  }, [dispatch]);

  const handleDecrement = useCallback((id) => {
    dispatch(decrementQuantity(id));
  }, [dispatch]);

  const handleRemove = useCallback((id) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearCart());
    }
  }, [dispatch]);

  const handleCheckout = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  const handleContinueShopping = useCallback(() => {
    navigate('/shop');
  }, [navigate]);

  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <FaShoppingCart className={styles.emptyIcon} />
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары из каталога</p>
        <button className={styles.shopBtn} onClick={handleContinueShopping}>
          Перейти в магазин
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <FaArrowLeft /> Назад
          </button>
          <h1 className={styles.title}>Корзина ({totalQuantity})</h1>
          <button className={styles.clearBtn} onClick={handleClearCart}>
            <FaTrash /> Очистить
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.itemsSection}>
            {items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image || item.image_url || '/placeholder.png'}
                  alt={item.product_name || item.name}
                  className={styles.itemImage}
                  loading="lazy"
                />
                
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>
                    {item.brand && <span className={styles.itemBrand}>{item.brand}</span>}
                    {item.product_name || item.name}
                  </h3>
                  <p className={styles.itemPrice}>{(item.price || 0).toLocaleString()} сом</p>
                  
                  <div className={styles.quantityWrapper}>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => handleDecrement(item.id)}
                      disabled={item.quantity <= 1}
                    >
                      <FaMinus />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={() => handleIncrement(item.id)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className={styles.itemActions}>
                  <p className={styles.itemTotal}>
                    {((item.price || 0) * item.quantity).toLocaleString()} сом
                  </p>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrash /> Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h3>Итого заказа</h3>
              
              <div className={styles.summaryRow}>
                <span>Товары ({totalQuantity})</span>
                <span>{totalAmount.toLocaleString()} сом</span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Доставка</span>
                <span className={styles.free}>Бесплатно</span>
              </div>
              
              <div className={styles.divider}></div>
              
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>К оплате</span>
                <span className={styles.totalAmount}>{totalAmount.toLocaleString()} сом</span>
              </div>
              
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                Оформить заказ
              </button>
              
              <button className={styles.continueBtn} onClick={handleContinueShopping}>
                Продолжить покупки
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Cart);
