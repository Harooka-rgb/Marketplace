import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiUser } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import styles from './Auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { register, loading, error, clearAuthError } = useAuth();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearAuthError();
    if (validationError) setValidationError('');
  }, [error, validationError, clearAuthError]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      
      if (formData.password !== formData.confirmPassword) {
        setValidationError('Пароли не совпадают');
        return;
      }
      
      if (formData.password.length < 6) {
        setValidationError('Пароль должен содержать минимум 6 символов');
        return;
      }
      
      await register(formData.email, formData.password, formData.fullName);
    },
    [register, formData]
  );

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <div className={styles.authPage}>
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          <FiArrowLeft /> На главную
        </Link>

        <div className={styles.authCard}>
          <h1 className={styles.title}>Создать аккаунт</h1>
          <p className={styles.subtitle}>
            Зарегистрируйтесь для доступа ко всем функциям
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <FiUser className={styles.inputIcon} />
                Имя
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Введите ваше имя"
                className={styles.input}
              />
            </div>

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

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <FiLock className={styles.inputIcon} />
                Подтвердите пароль
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Повторите пароль"
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPassword}
                  className={styles.togglePassword}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {(error || validationError) && (
              <div className={styles.error}>
                {error || validationError}
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
                  Регистрация...
                </>
              ) : (
                'Зарегистрироваться'
              )}
            </button>
          </form>

          <p className={styles.switchText}>
            Уже есть аккаунт?{' '}
            <Link to="/login" className={styles.switchLink}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
