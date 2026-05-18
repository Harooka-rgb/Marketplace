import React, { useState, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { FiSearch, FiHome, FiBox, FiInfo, FiPhone, FiUser, FiLogIn } from "react-icons/fi";
import { IoCart } from 'react-icons/io5';
import CartDropdown from '../Cart/CartDropdown';


const Header = ({ onMenuClick }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleCartClick = useCallback(() => {
    setIsCartOpen(true);
  }, []);

  const handleCloseCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleCartNavigate = useCallback(() => {
    setIsCartOpen(false);
    navigate('/cart');
  }, [navigate]);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <>
    <header className={styles.header}>
      {/* Top Part */}
      <div className={styles.headerTop}>
        <div className={`${styles.container} ${styles.topInner}`}>
          <div className={styles.logoSection}>
            <div className={styles.burgerMenu} onClick={onMenuClick}>
              <span></span><span></span><span></span>
            </div>
            <h1 className={styles.logo}>Electronic<span>Market</span></h1>
          </div>

          <div className={styles.searchBar}>
            <input type="text" placeholder="Search essentials, electronics and more..." />
            <div className={styles.searchIcon}>
              <FiSearch />
            </div>
          </div>

          <div className={styles.userActions}>
            {isAuthenticated ? (
              <Link to="/profile" className={styles.profileLink}>
                <div className={styles.avatar}>
                  <FiUser />
                </div>
                <span className={styles.userName}>{userName}</span>
              </Link>
            ) : (
              <div className={styles.authButtons}>
                <Link to="/register" className={styles.btnSignUp}>
                  <FiUser />
                  Sign Up
                </Link>
                <Link to="/login" className={styles.btnSignIn}>
                  <FiLogIn />
                  Sign In
                </Link>
              </div>
            )}
            
            <div className={styles.divider}></div>
            
            <div className={styles.actionItem} onClick={handleCartClick}>
              <span className={styles.cartIconWrapper}>
                <IoCart className={styles.cartIcon} />
                {totalQuantity > 0 && (
                  <span className={styles.cartBadge}>{totalQuantity}</span>
                )}
              </span>
              <span className={styles.cartLabel}>Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part - Navigation */}
      <div className={styles.headerBottom}>
        <div className={styles.container}>
          <nav className={styles.mainNav}>
            <Link to="/" className={styles.navLink}>
              <FiHome className={styles.navIcon} />
              <span>Home</span>
            </Link>
            <Link to="/shop" className={styles.navLink}>
              <FiBox className={styles.navIcon} />
              <span>Catalog</span>
            </Link>
            <Link to="/about" className={styles.navLink}>
              <FiInfo className={styles.navIcon} />
              <span>About</span>
            </Link>
            <Link to="/contacts" className={styles.navLink}>
              <FiPhone className={styles.navIcon} />
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