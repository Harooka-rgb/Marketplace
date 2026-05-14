import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { IoCart } from 'react-icons/io5';


const Header = ({ onMenuClick }) => {
  return (
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
            <div className={styles.actionItem}>
              <span><FaRegUser /></span>
              <span>Sign Up</span>
              <span>Sign In</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.actionItem}>
              <span><IoCart /></span>
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
            <Link to="/shop" className={styles.navLink}>📦 Catalog</Link>
            <Link to="/about" className={styles.navLink}>ℹ️ About</Link>
            <Link to="/contacts" className={styles.navLink}>📞 Contacts</Link>
          </nav>
          
          <nav className={styles.navCategories}>
            <Link to="/shop" className={`${styles.categoryBtn} ${styles.active}`}>Groceries ⌵</Link>
            <Link to="/shop" className={styles.categoryBtn}>Premium Fruits ⌵</Link>
            <Link to="/shop" className={styles.categoryBtn}>Home & Kitchen ⌵</Link>
            <Link to="/shop" className={styles.categoryBtn}>Fashion ⌵</Link>
            <Link to="/shop" className={styles.categoryBtn}>Electronics ⌵</Link>
            <Link to="/shop" className={styles.categoryBtn}>Beauty ⌵</Link>
            <Link to="/shop" className={styles.categoryBtn}>Home Improvement ⌵</Link>
          </nav>
        </div>
      </div>
    </header>



  );
};

export default Header;