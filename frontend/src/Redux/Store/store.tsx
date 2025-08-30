// frontend/src/Redux/Store/store.tsx
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import userReducer from "../Slicers/authSlice";
import productReducer from "../Slicers/productSlice";
import adminReducer from "../Slicers/adminSlice";
import cartReducer from "../Slicers/cartSlice"; // Added cart reducer
import paymentReducer from "../Slicers/paymentSlice"; // Added payment reducer
import googleAuthReducer from "../Slicers/googleAuthSlice"; // Added Google auth reducer
import orderReducer from "../Slicers/orderSlice";

// Enhanced persist config specifically for auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated", "initialAuthAttempted"], // Only persist essential auth data
  blacklist: ["loading", "error"], // Don't persist loading/error states
};

// General persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"], // Only persist user auth and cart, not admin data
  blacklist: ["products", "admin", "payment", "orders", "googleAuth"], // Don't persist these
};

// Create persisted auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, userReducer);

// Root reducer
const rootReducer = combineReducers({
  user: persistedAuthReducer, // Use persisted auth reducer
  products: productReducer,
  admin: adminReducer, // Don't persist admin data
  cart: cartReducer,
  payment: paymentReducer, // Don't persist payment data for security
  googleAuth: googleAuthReducer, // Don't persist google auth
  orders: orderReducer, // Don't persist orders
});

// Apply general persistence (this will only affect cart now since user is handled separately)
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Infer the RootState and AppDispatch types from the store itself
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Ignore these field paths in all actions
        ignoredActionsPaths: ["meta.arg", "payload.timestamp"],
        // Ignore these paths in the state
        ignoredPaths: ["items.dates"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store, null, () => {
  console.log("🔄 [Store] Persistence rehydration completed");
});

// Add a listener to log when persistence is ready
persistor.subscribe(() => {
  const state = persistor.getState();
  console.log("🔄 [Store] Persistor state:", state);
});

// Types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
