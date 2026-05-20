import React, { useState, useCallback, memo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { FiHome, FiBox, FiInfo, FiPhone, FiUser, FiLogIn } from "react-icons/fi";
import { LuHeart, LuShoppingCart } from 'react-icons/lu';
import CartDropdown from '../Cart/CartDropdown';
import SearchBar from '../SearchBar/SearchBar';

const Header = ({ onMenuClick }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { totalCount: favCount } = useSelector((state) => state.favorites);

  const handleCartClick = useCallback(() => setIsCartOpen(true), []);
  const handleCloseCart = useCallback(() => setIsCartOpen(false), []);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url;

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={`${styles.container} ${styles.topInner}`}>

            <div className={styles.logoSection}>
              <div className={styles.burgerMenu} onClick={onMenuClick}>
                <span></span><span></span><span></span>
              </div>
              <Link to="/" className={styles.logoLink}>
                <span className={styles.logo}>Electronic<span>Market</span></span>
              </Link>
            </div>

            <SearchBar />

            <div className={styles.userActions}>
              {isAuthenticated ? (
                <Link to="/profile" className={styles.profileLink}>
                  <div className={styles.avatar}>
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={userName} className={styles.avatarImg} />
                    ) : (
                      <FiUser size={18} />
                    )}
                  </div>
                  <span className={styles.userName}>{userName}</span>
                </Link>
              ) : (
                <div className={styles.authButtons}>
                  <Link to="/register" className={styles.btnSignUp}>
                    <FiUser size={14} />
                    <span>Sign Up</span>
                  </Link>
                  <Link to="/login" className={styles.btnSignIn}>
                    <FiLogIn size={14} />
                    <span>Sign In</span>
                  </Link>
                </div>
              )}

              <div className={styles.divider} />

              <Link to="/favorites" className={styles.iconAction} aria-label="Favorites">
                <span className={styles.iconWrap}>
                  <LuHeart size={22} />
                  {favCount > 0 && (
                    <span className={`${styles.badge} ${styles.favBadge}`}>{favCount}</span>
                  )}
                </span>
              </Link>

              <div className={styles.iconAction} onClick={handleCartClick} aria-label="Cart">
                <span className={styles.iconWrap}>
                  <LuShoppingCart size={22} />
                  {totalQuantity > 0 && (
                    <span className={styles.badge}>{totalQuantity}</span>
                  )}
                </span>
                <span className={styles.cartLabel}>Cart</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.headerBottom}>
          <div className={styles.container}>
            <nav className={styles.mainNav}>
              <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.navActive : ''}`}>
                <FiHome className={styles.navIcon} size={16} />
                <span>Home</span>
              </Link>
              <Link to="/shop" className={`${styles.navLink} ${isActive('/shop') ? styles.navActive : ''}`}>
                <FiBox className={styles.navIcon} size={16} />
                <span>Catalog</span>
              </Link>
              <Link to="/about" className={`${styles.navLink} ${isActive('/about') ? styles.navActive : ''}`}>
                <FiInfo className={styles.navIcon} size={16} />
                <span>About</span>
              </Link>
              <Link to="/contacts" className={`${styles.navLink} ${isActive('/contacts') ? styles.navActive : ''}`}>
                <FiPhone className={styles.navIcon} size={16} />
                <span>Contacts</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <CartDropdown isOpen={isCartOpen} onClose={handleCloseCart} />
    </>
  );
};

export default memo(Header);