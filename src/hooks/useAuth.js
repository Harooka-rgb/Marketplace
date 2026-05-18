import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  clearError,
} from '../store/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = useCallback(
    async (email, password) => {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        navigate('/');
        return { success: true };
      }
      return { success: false, error: result.payload };
    },
    [dispatch, navigate]
  );

  const register = useCallback(
    async (email, password, fullName) => {
      const result = await dispatch(registerUser({ email, password, fullName }));
      if (registerUser.fulfilled.match(result)) {
        navigate('/');
        return { success: true };
      }
      return { success: false, error: result.payload };
    },
    [dispatch, navigate]
  );

  const logout = useCallback(async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      navigate('/');
      return { success: true };
    }
    return { success: false, error: result.payload };
  }, [dispatch, navigate]);

  const checkAuth = useCallback(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    clearAuthError,
  };
};

export default useAuth;
