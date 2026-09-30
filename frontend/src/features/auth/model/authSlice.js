import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../../shared/lib/storage';

export const SESSION_KEY = 'session';

const readSession = () => {
  const session = storage.read(SESSION_KEY);
  return session?.token && session?.user ? session : { token: null, user: null };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: readSession,
  reducers: {
    sessionStarted: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    userUpdated: (state, { payload }) => {
      state.user = payload;
    },
    loggedOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  selectors: {
    selectToken: (state) => state.token,
    selectCurrentUser: (state) => state.user,
    selectIsAuthenticated: (state) => Boolean(state.token),
  },
});

export const { sessionStarted, userUpdated, loggedOut } = authSlice.actions;
export const { selectToken, selectCurrentUser, selectIsAuthenticated } = authSlice.selectors;
export default authSlice;
