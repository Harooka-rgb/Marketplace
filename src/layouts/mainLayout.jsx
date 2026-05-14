import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './mainLayout.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sideBar/sideBar';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openMenu = () => setIsSidebarOpen(true);
  const closeMenu = () => setIsSidebarOpen(false);

  return (
    <div className={styles.wrapper}>
      {/* 2. Рендерим сайдбар и передаем ему состояние и функцию закрытия */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeMenu} />

      {/* 3. Передаем в Хедер функцию открытия через пропсы */}
      <Header onMenuClick={openMenu} />

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