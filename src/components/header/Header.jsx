import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Top Part */}
      <div className={styles.headerTop}>
        <div className={`${styles.container} ${styles.topInner}`}>
          <div className={styles.logoSection}>
            <div className={styles.burgerMenu}>
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
            <div className={styles.actionItem}>
              <span>👤</span>
              <span>Sign Up</span>
              <span>Sign In</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.actionItem}>
              <span>🛒</span>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part - Navigation */}
      <div className={styles.headerBottom}>
        <div className={styles.container}>
          <nav className={styles.mainNav}>
            <Link to="/" className={styles.navLink}>🏠 Home</Link>
            <Link to="/catalog" className={styles.navLink}>📦 Catalog</Link>
            <Link to="/about" className={styles.navLink}>ℹ️ About</Link>
            <Link to="/contacts" className={styles.navLink}>📞 Contacts</Link>
          </nav>
          
          <nav className={styles.navCategories}>
            <Link to="/catalog" className={`${styles.categoryBtn} ${styles.active}`}>Groceries ⌵</Link>
            <Link to="/catalog" className={styles.categoryBtn}>Premium Fruits ⌵</Link>
            <Link to="/catalog" className={styles.categoryBtn}>Home & Kitchen ⌵</Link>
            <Link to="/catalog" className={styles.categoryBtn}>Fashion ⌵</Link>
            <Link to="/catalog" className={styles.categoryBtn}>Electronics ⌵</Link>
            <Link to="/catalog" className={styles.categoryBtn}>Beauty ⌵</Link>
            <Link to="/catalog" className={styles.categoryBtn}>Home Improvement ⌵</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;