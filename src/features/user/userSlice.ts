import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USERS, STATS } from '@/utils/dummyData';

import { UserProfile } from '../auth/types';

import { AttendanceStat } from './types';

export interface UserState {
  stats: AttendanceStat[];
  users: UserProfile[];
}

const initialState: UserState = {
  stats: STATS,
  users: USERS,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addUser: (state, action: PayloadAction<UserProfile>) => {
      state.users.push(action.payload);
    },
  },
});

export const { addUser } = counterSlice.actions;

export default counterSlice.reducer;
