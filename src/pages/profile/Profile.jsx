import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiCalendar, FiArrowLeft, FiShoppingBag, FiHeart, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.notAuth}>
          <FiUser className={styles.notAuthIcon} />
          <h2>Вы не авторизованы</h2>
          <p>Войдите или создайте аккаунт для доступа к профилю</p>
          <div className={styles.notAuthButtons}>
            <Link to="/login" className={styles.btnPrimary}>
              Войти
            </Link>
            <Link to="/register" className={styles.btnSecondary}>
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Пользователь';
  const userEmail = user?.email || '';
  const joinedDate = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('ru-RU')
    : '';

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        <FiArrowLeft /> На главную
      </Link>

      <div className={styles.profileCard}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <FiUser className={styles.avatarIcon} />
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.name}>{userName}</h1>
            <p className={styles.email}>{userEmail}</p>
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detailItem}>
            <FiMail className={styles.detailIcon} />
            <div>
              <span className={styles.detailLabel}>Email</span>
              <span className={styles.detailValue}>{userEmail}</span>
            </div>
          </div>
          
          <div className={styles.detailItem}>
            <FiCalendar className={styles.detailIcon} />
            <div>
              <span className={styles.detailLabel}>Дата регистрации</span>
              <span className={styles.detailValue}>{joinedDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/cart" className={styles.actionBtn}>
            <FiShoppingBag />
            Моя корзина
          </Link>
          
          <button className={styles.actionBtn}>
            <FiHeart />
            Избранное
          </button>
          
          <button 
            className={`${styles.actionBtn} ${styles.logoutBtn}`}
            onClick={logout}
          >
            <FiLogOut />
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
