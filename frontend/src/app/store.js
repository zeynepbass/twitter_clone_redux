import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '../shared/api/baseApi';
import authSlice from '../features/auth/model/authSlice';
import { sessionListener } from '../features/auth/model/sessionListener';

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().prepend(sessionListener.middleware).concat(baseApi.middleware),
});

setupListeners(store.dispatch);
