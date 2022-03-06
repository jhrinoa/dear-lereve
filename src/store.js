import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/admin/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
