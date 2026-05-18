import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabase';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Валидация на клиенте
      if (!email || !password) {
        return rejectWithValue('Введите email и пароль');
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        // Обработка специфичных ошибок Supabase
        if (error.message.includes('Invalid login credentials')) {
          return rejectWithValue('Неверный email или пароль');
        }
        if (error.message.includes('Email not confirmed')) {
          return rejectWithValue('Email не подтверждён. Проверьте почту');
        }
        return rejectWithValue(error.message);
      }
      
      return data.user;
    } catch (error) {
      return rejectWithValue('Ошибка входа. Попробуйте позже');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, fullName }, { rejectWithValue }) => {
    try {
      // Валидация на клиенте
      if (!email || !password) {
        return rejectWithValue('Введите email и пароль');
      }
      
      if (password.length < 6) {
        return rejectWithValue('Пароль должен содержать минимум 6 символов');
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split('@')[0],
          },
        },
      });
      
      if (error) {
        // Обработка специфичных ошибок Supabase
        if (error.message.includes('User already registered')) {
          return rejectWithValue('Пользователь с таким email уже существует');
        }
        if (error.message.includes('invalid email')) {
          return rejectWithValue('Некорректный email');
        }
        return rejectWithValue(error.message);
      }
      
      return data.user;
    } catch (error) {
      return rejectWithValue('Ошибка регистрации. Попробуйте позже');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) throw error;
      
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
