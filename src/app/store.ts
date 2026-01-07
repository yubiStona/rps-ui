import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice"
import { authApi } from "../features/auth/authApi";
import { dashboardApi } from "../features/admin/dashboard/dahboardApi";
import { adminStudentApi } from "../features/admin/students/studentApi";
import { adminTeacherApi } from "../features/admin/teacher/teacherApi";
import { programApi } from "../features/admin/programs/programApi";
import { facultyApi } from "../features/admin/faculty/facultyApi";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authSlice);
export const store = configureStore({
    reducer:{
        auth: persistedReducer,
        [authApi.reducerPath]:authApi.reducer,
        [dashboardApi.reducerPath]:dashboardApi.reducer,
        [adminStudentApi.reducerPath]:adminStudentApi.reducer,
        [adminTeacherApi.reducerPath]:adminTeacherApi.reducer,
        [programApi.reducerPath]:programApi.reducer,
        [facultyApi.reducerPath]:facultyApi.reducer,

    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false,}).concat(
          authApi.middleware,
          dashboardApi.middleware,
          adminStudentApi.middleware, 
          adminTeacherApi.middleware,
          programApi.middleware,
          facultyApi.middleware
        )
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch