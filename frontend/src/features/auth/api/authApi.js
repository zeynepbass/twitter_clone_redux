import { baseApi } from '../../../shared/api/baseApi';
import { sessionStarted } from '../model/authSlice';

const startSession = async (_arg, { dispatch, queryFulfilled }) => {
  try {
    const { data } = await queryFulfilled;
    dispatch(sessionStarted(data));
  } catch {
    return;
  }
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      onQueryStarted: startSession,
    }),
    register: build.mutation({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
      onQueryStarted: startSession,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
