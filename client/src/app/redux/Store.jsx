import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import storeSlice from './slices/storeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    store: storeSlice,
  },
  devTools:process.env.Node_ENV !=='production',
});