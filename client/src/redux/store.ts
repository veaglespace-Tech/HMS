import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import tenantReducer from "./slices/tenantSlice";
import registrationReducer from "./slices/registrationSlice";
import { arogyaApi } from "./services/arogyaApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tenant: tenantReducer,
    registration: registrationReducer,
    [arogyaApi.reducerPath]: arogyaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore certain non-serializable values if any
        ignoredActions: [],
      },
    }).concat(arogyaApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
