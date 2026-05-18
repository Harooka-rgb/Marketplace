import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import styles from './CartDropdown.module.css';

const CartDropdown = ({ isOpen, onClose }) => {
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

  const handleCheckout = useCallback(() => {
    onClose();
    navigate('/checkout');
  }, [navigate, onClose]);

  const handleViewCart = useCallback(() => {
    onClose();
    navigate('/cart');
  }, [navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <FaShoppingCart className={styles.cartIcon} />
            <h3 className={styles.title}>Корзина ({totalQuantity})</h3>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <FaShoppingCart className={styles.emptyIcon} />
            <p>Ваша корзина пуста</p>
            <button className={styles.continueBtn} onClick={onClose}>
              Продолжить покупки
            </button>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <img
                    src={item.image || item.image_url || '/placeholder.png'}
                    alt={item.product_name || item.name}
                    className={styles.itemImage}
                    loading="lazy"
                  />
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>
                      {item.brand && <span className={styles.itemBrand}>{item.brand}</span>}
                      {item.product_name || item.name}
                    </p>
                    <p className={styles.itemPrice}>{(item.price || 0).toLocaleString()} сом</p>
                    <div className={styles.quantityControls}>
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
                      <button
                        className={styles.removeBtn}
                        onClick={() => handleRemove(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemTotal}>
                    {((item.price || 0) * item.quantity).toLocaleString()} сом
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Итого:</span>
                <span className={styles.totalAmount}>{totalAmount.toLocaleString()} сом</span>
              </div>
              <div className={styles.actions}>
                <button className={styles.viewCartBtn} onClick={handleViewCart}>
                  В корзину
                </button>
                <button className={styles.checkoutBtn} onClick={handleCheckout}>
                  Оформить заказ
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CartDropdown);
