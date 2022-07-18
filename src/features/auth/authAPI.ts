import { axios } from '@/services/axios';

import { UserResponse, UserProfileResponse } from './types';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailPassword = async (data: LoginCredentialsDTO): Promise<UserResponse> => {
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FB_API_KEY}`,
    data
  );
};

export const getUserProfile = async (userId: string): Promise<UserProfileResponse> => {
  return axios.get(
    `https://firestore.googleapis.com/v1/projects/${process.env.REACT_APP_FB_PROJECT_ID}/databases/(default)/documents/users/${userId}`
  );
};

export const signUpWithEmailPassword = async (email: string): Promise<UserResponse> => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FB_API_KEY}`,
    { email, password: '0000' }
  );
  return response.data;
};
