import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { supabase } from './supabase';
import { setUser } from './store/auth/authSlice';
import App from './App';

// Supabase auth listener
supabase.auth.onAuthStateChange((event, session) => {
  store.dispatch(setUser(session?.user || null));
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
