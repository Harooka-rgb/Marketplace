import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import styles from './Auth.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, clearAuthError } = useAuth();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearAuthError();
  }, [error, clearAuthError]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await login(formData.email, formData.password);
    },
    [login, formData]
  );

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className={styles.authPage}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <FiArrowLeft /> На главную
        </Link>

        <div className={styles.authCard}>
          <h1 className={styles.title}>Вход в аккаунт</h1>
          <p className={styles.subtitle}>
            Введите свои данные для входа
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <FiMail className={styles.inputIcon} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <FiLock className={styles.inputIcon} />
                Пароль
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Минимум 6 символов"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className={styles.togglePassword}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className={styles.spinner} />
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </button>
          </form>

          <p className={styles.switchText}>
            Нет аккаунта?{' '}
            <Link to="/register" className={styles.switchLink}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
