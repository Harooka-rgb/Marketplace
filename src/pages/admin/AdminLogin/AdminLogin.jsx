import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { supabase } from '../../../supabase';
import styles from './AdminLogin.module.css';
import { FiLock, FiMail, FiAlertCircle } from 'react-icons/fi';

const ADMIN_EMAIL = 'grenitt99@gmail.com';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated && user?.email === ADMIN_EMAIL) {
      checkAdminAccess(user.id);
    }
  }, [isAuthenticated, user]);

  const checkAdminAccess = async (userId) => {
    const { data } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (data) {
      navigate('/admin/dashboard');
    } else {
      await createAdminRecord(userId);
      navigate('/admin/dashboard');
    }
  };

  const createAdminRecord = async (userId) => {
    await supabase.from('admins').insert({
      user_id: userId,
      email: ADMIN_EMAIL
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (email !== ADMIN_EMAIL) {
      setError('Доступ запрещен. Неверный email администратора.');
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (signInError) {
      setError('Неверный пароль или ошибка входа.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <FiLock size={40} className={styles.icon} />
          <h1>Admin Panel</h1>
          <p>Вход только для администратора</p>
        </div>

        {error && (
          <div className={styles.error}>
            <FiAlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FiMail size={18} className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email администратора"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <FiLock size={18} className={styles.inputIcon} />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Вход...' : 'Войти в панель'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
