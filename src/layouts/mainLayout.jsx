import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      {/* Хедер всегда сверху */}
      <Header />

      {/* Основной контент страницы (меняется роутером) */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Футер всегда снизу */}
      <Footer />
    </div>
  );
};

export default MainLayout;