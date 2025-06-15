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

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "products"], // ✅ Fixed: "products" matches the reducer key
  // We don't want to persist passwordReset state
  blacklist: ["passwordReset"],
};

// Root reducer
const rootReducer = combineReducers({
  user: userReducer,
  products: productReducer, // ✅ This key should match whitelist
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
