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

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "products", "admin", "cart", "googleAuth"], // Added cart and googleAuth to persist, but not payment for security
  // We don't want to persist passwordReset and payment state for security reasons
  blacklist: ["passwordReset", "payment"],
};

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer,
  admin: adminReducer,
  cart: cartReducer, // Added cart reducer
  payment: paymentReducer, // Added payment reducer
  googleAuth: googleAuthReducer, // Added Google auth reducer
  // Add other reducers here as needed
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Infer the RootState and AppDispatch types from the store itself
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
