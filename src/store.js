import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/admin/authSlice';
import uiReducer from './features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
