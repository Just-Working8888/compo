import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReduser from './slices/ProductSlice'
import cartReduser from './slices/cartSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReduser,
    cart: cartReduser
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



