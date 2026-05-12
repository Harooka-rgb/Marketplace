import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      {/* Кнопки навигации */}
      <button className={`${styles.navBtn} ${styles.prevBtn}`}>
        <IoIosArrowBack />
      </button>

      <div className={styles.bannerContent}>
        <div className={styles.textSection}>
          <p className={styles.subTitle}>Best Deal Online on smart watches</p>
          <h1 className={styles.mainTitle}>SMART WEARABLE.</h1>
          <p className={styles.promoText}>UP to 80% OFF</p>
          
          {/* Пагинация */}
          <div className={styles.pagination}>
            <span className={`${styles.dot} ${styles.active}`}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        </div>

        <div className={styles.imageSection}>
          <img 
            src="https://ibox-store.net/upload/iblock/4a9/b28ylkm6nnrxmhwelxp8eliz7nkpr45d/smart_chasy_samsung_galaxy_fit3_grafitovyy.png" 
            alt="Smart Watch" 
            className={styles.watchImage}
          />
        </div>
      </div>

      <button className={`${styles.navBtn} ${styles.nextBtn}`}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Banner;