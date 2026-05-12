import React from 'react';
import styles from './Footer.module.css';
import { LuPhone, LuMail, LuMapPin, LuFacebook, LuInstagram, LuTwitter } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          
          {/* Секция 1: Контакты */}
          <div className={styles.section}>
            <h3 className={styles.title}>Electronic<span>Market</span></h3>
            <ul className={styles.contactList}>
              <li>
                <LuPhone className={styles.icon} />
                <span>+996 (555) 01-02-03</span>
              </li>
              <li>
                <LuMapPin className={styles.icon} />
                <span>Кыргызстан, г. Бишкек, ул. Киевская 148</span>
              </li>
              <li>
                <LuMail className={styles.icon} />
                <span>support@elecmarket.kg</span>
              </li>
            </ul>
          </div>

          {/* Секция 2: Навигация */}
          <div className={styles.section}>
            <h4 className={styles.subTitle}>Компания</h4>
            <nav className={styles.nav}>
              <a href="#about">О нас</a>
              <a href="#delivery">Доставка</a>
              <a href="#terms">Условия пользования</a>
              <a href="#contacts">Контакты</a>
            </nav>
          </div>

          {/* Секция 3: Соцсети */}
          <div className={styles.section}>
            <h4 className={styles.subTitle}>Мы в соцсетях</h4>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}><LuInstagram size={24} /></a>
              <a href="#" className={styles.socialIcon}><LuFacebook size={24} /></a>
              <a href="#" className={styles.socialIcon}><LuTwitter size={24} /></a>
            </div>
          </div>

        </div>

        <div className={styles.bottomBar}>
          <p>© 2026 Electronic Market Бишкек. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;