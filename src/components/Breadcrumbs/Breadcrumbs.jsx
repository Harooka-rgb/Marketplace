import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import styles from './Breadcrumbs.module.css';

const ROUTE_LABELS = {
  shop: 'Catalog',
  about: 'About',
  contacts: 'Contacts',
  cart: 'Cart',
  checkout: 'Checkout',
  profile: 'Profile',
  favorites: 'Favorites',
  product: 'Product',
};

const Breadcrumbs = ({ customCrumbs }) => {
  const location = useLocation();

  const buildCrumbs = () => {
    if (customCrumbs) return customCrumbs;

    const segments = location.pathname.split('/').filter(Boolean);
    const crumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    segments.forEach((seg) => {
      currentPath += `/${seg}`;
      const label = ROUTE_LABELS[seg] || decodeURIComponent(seg.replace(/-/g, ' '));
      crumbs.push({ label, path: currentPath });
    });

    return crumbs;
  };

  const crumbs = buildCrumbs();

  if (crumbs.length <= 1) return null;

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className={styles.item}>
              {index === 0 ? (
                <Link to={crumb.path} className={styles.link}>
                  <FiHome size={14} className={styles.homeIcon} />
                  <span className={styles.homeLabel}>{crumb.label}</span>
                </Link>
              ) : isLast ? (
                <span className={styles.current} aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.path} className={styles.link}>
                  {crumb.label}
                </Link>
              )}
              {!isLast && (
                <FiChevronRight size={14} className={styles.separator} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default memo(Breadcrumbs);
