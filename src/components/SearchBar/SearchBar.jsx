import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { LuPackage, LuLoader } from 'react-icons/lu';
import { supabase } from '../../supabase';
import styles from './SearchBar.module.css';

const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 320);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const search = async () => {
      const q = debouncedQuery.trim();
      if (q.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      setLoading(true);
      try {
        const [byName, byBrand] = await Promise.all([
          supabase
            .from('products')
            .select('*')
            .ilike('product_name', `%${q}%`)
            .limit(8),
          supabase
            .from('products')
            .select('*')
            .ilike('brand', `%${q}%`)
            .limit(5),
        ]);

        if (byName.error) console.error('SearchBar name error:', byName.error.message);
        if (byBrand.error) console.error('SearchBar brand error:', byBrand.error.message);

        const merged = [...(byName.data || []), ...(byBrand.data || [])];
        const seen = new Set();
        const unique = merged.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        }).slice(0, 8);

        setResults(unique);
        setIsOpen(true);
      } catch (err) {
        console.error('SearchBar fetch error:', err);
        setResults([]);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = useCallback((id) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/product/${id}`);
  }, [navigate]);

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  }, []);

  const formatPrice = (price) =>
    price ? `${Number(price).toLocaleString('ru-RU')} С` : '';

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={`${styles.bar} ${isOpen ? styles.active : ''}`}>
        <FiSearch className={styles.icon} size={16} />
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Поиск товаров, брендов..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          autoComplete="off"
        />
        {loading && <LuLoader className={styles.spinner} size={15} />}
        {query && !loading && (
          <button className={styles.clearBtn} onClick={handleClear} aria-label="Clear">
            <FiX size={15} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {results.length === 0 ? (
            <div className={styles.empty}>
              <LuPackage size={28} className={styles.emptyIcon} />
              <p>Ничего не найдено по «{debouncedQuery}»</p>
            </div>
          ) : (
            <>
              <div className={styles.resultsHeader}>
                Найдено: {results.length} товар(а/ов)
              </div>
              <ul className={styles.list}>
                {results.map((p) => {
                  const img = p.image || p.image_url;
                  const name = p.product_name || p.name || 'Без названия';
                  return (
                    <li key={p.id} className={styles.item} onClick={() => handleSelect(p.id)}>
                      <div className={styles.imgBox}>
                        {img ? (
                          <img src={img} alt={name} loading="lazy" />
                        ) : (
                          <LuPackage size={22} className={styles.placeholder} />
                        )}
                      </div>
                      <div className={styles.info}>
                        <span className={styles.name}>{name}</span>
                        {p.brand && <span className={styles.brand}>{p.brand}</span>}
                      </div>
                      <span className={styles.price}>{formatPrice(p.price)}</span>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchBar);
