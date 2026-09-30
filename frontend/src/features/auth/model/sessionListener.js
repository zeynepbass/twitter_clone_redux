import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { storage } from '../../../shared/lib/storage';
import { baseApi, UNAUTHORIZED } from '../../../shared/api/baseApi';
import { loggedOut, sessionStarted, SESSION_KEY, userUpdated } from './authSlice';

export const sessionListener = createListenerMiddleware();

sessionListener.startListening({
  matcher: isAnyOf(sessionStarted, userUpdated),
  effect: (_action, { getState }) => {
    const { token, user } = getState().auth;
    storage.write(SESSION_KEY, { token, user });
  },
});

sessionListener.startListening({
  predicate: (action) => action.type === UNAUTHORIZED,
  effect: (_action, { dispatch }) => {
    dispatch(loggedOut());
  },
});

sessionListener.startListening({
  actionCreator: loggedOut,
  effect: (_action, { dispatch }) => {
    storage.remove(SESSION_KEY);
    dispatch(baseApi.util.resetApiState());
  },
});
