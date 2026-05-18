import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromoBanner.module.css';

const PromoBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/shop');
  };

  return (
    <section className={styles.section} onClick={handleClick}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.zipLogo}>
            <span className={styles.zipIcon}>Z</span>
            <span className={styles.zipText}>zip</span>
          </div>
          <div className={styles.divider}></div>
          <p className={styles.text}>
            <span className={styles.highlight}>own it now,</span> up to 6 months interest free
          </p>
          <span className={styles.learnMore}>learn more</span>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
