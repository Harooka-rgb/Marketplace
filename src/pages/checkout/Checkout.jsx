import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft, FaCheck, FaTruck, FaCreditCard } from 'react-icons/fa';
import { clearCart } from '../../store/cartSlice';
import styles from './Checkout.module.css';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'card',
    deliveryMethod: 'courier'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки заказа
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Очищаем корзину после успешного заказа
    dispatch(clearCart());
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Рассчитываем итоговую сумму с доставкой
  const deliveryCost = formData.deliveryMethod === 'courier' ? 300 : 0;
  const finalTotal = totalAmount + deliveryCost;

  // Показываем пустую корзину если нет товаров и не успешный заказ
  if (items.length === 0 && !isSuccess) {
    return (
      <div className={styles.emptyState}>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары для оформления заказа</p>
        <button 
          className={styles.backBtn}
          onClick={() => navigate('/cart')}
        >
          <FaArrowLeft /> В корзину
        </button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>
          <FaCheck />
        </div>
        <h2>Заказ успешно оформлен!</h2>
        <p>Спасибо за покупку. Мы свяжемся с вами в ближайшее время.</p>
        <button 
          className={styles.continueBtn}
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button 
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Назад
          </button>
          <h1 className={styles.title}>Оформление заказа</h1>
        </div>

        <div className={styles.grid}>
          {/* Form Section */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Contact Info */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Контактная информация</h3>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Имя</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Введите имя"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Фамилия</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Введите фамилию"
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+996 XXX XXX XXX"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <FaTruck /> Доставка
                </h3>
                <div className={styles.deliveryOptions}>
                  <label className={`${styles.option} ${formData.deliveryMethod === 'courier' ? styles.optionActive : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === 'courier'}
                      onChange={handleInputChange}
                    />
                    <div className={styles.optionContent}>
                      <span className={styles.optionTitle}>Курьерская доставка</span>
                      <span className={styles.optionPrice}>300 сом</span>
                    </div>
                  </label>
                  <label className={`${styles.option} ${formData.deliveryMethod === 'pickup' ? styles.optionActive : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleInputChange}
                    />
                    <div className={styles.optionContent}>
                      <span className={styles.optionTitle}>Самовывоз</span>
                      <span className={styles.optionPrice}>Бесплатно</span>
                    </div>
                  </label>
                </div>
                {formData.deliveryMethod === 'courier' && (
                  <div className={styles.inputGroup}>
                    <label>Адрес доставки</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Улица, дом, квартира"
                      rows="3"
                    />
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <FaCreditCard /> Оплата
                </h3>
                <div className={styles.paymentOptions}>
                  <label className={`${styles.option} ${formData.paymentMethod === 'card' ? styles.optionActive : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <div className={styles.optionContent}>
                      <span className={styles.optionTitle}>Банковская карта</span>
                      <span className={styles.optionDesc}>Онлайн оплата</span>
                    </div>
                  </label>
                  <label className={`${styles.option} ${formData.paymentMethod === 'cash' ? styles.optionActive : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                    />
                    <div className={styles.optionContent}>
                      <span className={styles.optionTitle}>Наличными</span>
                      <span className={styles.optionDesc}>При получении</span>
                    </div>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Оформляем...' : 'Подтвердить заказ'}
              </button>
            </form>
          </div>

          {/* Summary Section */}
          <div className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Ваш заказ</h3>
              
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.id} className={styles.productInfo}>
                    <img 
                      src={item.image || item.image_url || '/placeholder.png'} 
                      alt={item.product_name || item.name} 
                      className={styles.productImage} 
                    />
                    <div className={styles.productDetails}>
                      <p className={styles.productBrand}>{item.brand}</p>
                      <p className={styles.productName}>{item.product_name || item.name}</p>
                      <p className={styles.productQuantity}>x{item.quantity}</p>
                    </div>
                    <div className={styles.productPrice}>
                      {((item.price || 0) * item.quantity).toLocaleString()} сом
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.priceBreakdown}>
                <div className={styles.priceRow}>
                  <span>Товары ({totalQuantity})</span>
                  <span>{totalAmount.toLocaleString()} сом</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Доставка</span>
                  <span>{formData.deliveryMethod === 'courier' ? '300 сом' : 'Бесплатно'}</span>
                </div>
                <div className={`${styles.priceRow} ${styles.totalRow}`}>
                  <span>Итого</span>
                  <span className={styles.totalPrice}>
                    {finalTotal.toLocaleString()} сом
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
