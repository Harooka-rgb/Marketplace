import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import styles from './mainLayout.module.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sideBar/sideBar';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const HIDE_BREADCRUMBS = ['/'];

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const openMenu = () => setIsSidebarOpen(true);
  const closeMenu = () => setIsSidebarOpen(false);

  const showBreadcrumbs = !HIDE_BREADCRUMBS.includes(location.pathname);

  return (
    <div className={styles.wrapper}>
      <Sidebar isOpen={isSidebarOpen} onClose={closeMenu} />
      <Header onMenuClick={openMenu} />
      {showBreadcrumbs && <Breadcrumbs />}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;