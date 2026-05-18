import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase';
import styles from './sideBar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: supabaseError } = await supabase
          .from('categories')
          .select('id, category_name, image')
          .order('id', { ascending: true });

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        setCategories(data || []);
      } catch (err) {
        console.error('Ошибка при загрузке категорий:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} 
        onClick={onClose}
      />

      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sideHeader}>
          <h2>Каталог</h2>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.content}>
          <span className={styles.sectionTitle}>Категории ноутбуков</span>
          
          {loading ? (
            <p className={styles.loading}>Загрузка...</p>
          ) : error ? (
            <p className={styles.error}>Ошибка загрузки: {error}</p>
          ) : categories.length === 0 ? (
            <p className={styles.empty}>Категории не найдены</p>
          ) : (
            <nav>
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/shop?category=${cat.id}`} 
                  className={styles.navItem} 
                  onClick={onClose}
                >
                  {cat.image ? (
                    <img src={cat.image} alt={cat.category_name} className={styles.catIcon} />
                  ) : (
                    <span className={styles.defaultIcon}>💻</span>
                  )}
                  {cat.category_name}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;