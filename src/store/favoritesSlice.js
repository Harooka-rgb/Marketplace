import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalCount: 0,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (existing) {
        state.items = state.items.filter(item => item.id !== product.id);
        state.totalCount--;
      } else {
        state.items.push(product);
        state.totalCount++;
      }
    },
    removeFromFavorites: (state, action) => {
      const id = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalCount--;
      }
    },
    clearFavorites: (state) => {
      state.items = [];
      state.totalCount = 0;
    },
  },
});

export const { toggleFavorite, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
