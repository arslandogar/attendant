import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import storage from '@/utils/storage';

import { loginWithEmailPassword, LoginCredentialsDTO, getUserProfile } from './authAPI';
import { UserProfile, JWTPayload } from './types';

export interface AuthState {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  isInitialized: false,
  user: null,
  isLoggedIn: false,
  status: 'idle',
};

export const initAuth = createAsyncThunk('auth/init', async () => {
  const token = storage.getToken();
  if (token) {
    const decoded = jwt_decode<JWTPayload>(token);
    const user = await getUserProfile(decoded.user_id);
    return user.fields;
  }
  return null;
});

export const login = createAsyncThunk('auth/login', async (data: LoginCredentialsDTO) => {
  const loginResponse = await loginWithEmailPassword(data);
  const profileResponse = await getUserProfile(loginResponse.localId);
  storage.setToken(loginResponse.idToken);
  return profileResponse.fields;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      storage.clearToken();
      state.user = null;
      state.isLoggedIn = false;
      window.location.assign(window.location.origin as unknown as string);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(initAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.isInitialized = true;
        state.isLoggedIn = action.payload ? true : false;
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(initAuth.rejected, (state) => {
        state.isInitialized = true;
        state.isLoggedIn = false;
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
