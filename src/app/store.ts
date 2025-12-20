import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice"
import { authApi } from "../features/auth/authApi";
import { dashBoardApi } from "../features/admin/dashboard/dahboardApi";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice);
export const store = configureStore({
    reducer:{
        auth: persistedReducer,
        [authApi.reducerPath]:authApi.reducer,
        [dashBoardApi.reducerPath]:dashBoardApi.reducer
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false,}).concat(authApi.middleware,dashBoardApi.middleware)
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch