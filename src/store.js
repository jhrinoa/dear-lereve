import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./app/services/auth";
import authReducer from "./features/admin/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
