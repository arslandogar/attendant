import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { USERS, STATS, WORK_HOURS } from '@/utils/dummyData';

import { UserProfile } from '../auth/types';

import { AttendanceStat, WorkHours } from './types';

export interface UserState {
  stats: AttendanceStat[];
  users: UserProfile[];
  workingHours: WorkHours[];
}

const initialState: UserState = {
  stats: STATS,
  users: USERS,
  workingHours: WORK_HOURS,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Omit<UserProfile, 'user_id' | 'role'>>) => {
      const emailExists = state.users.find((user) => user.email === action.payload.email);
      if (emailExists) {
        notification.error({
          message: 'Error',
          description: `Email ${action.payload.email} already exists`,
        });
        return;
      }
      const user_id = String(Math.random());
      state.users.push({ ...action.payload, role: 'user', user_id });
      state.stats.push({
        id: user_id,
        user_id: user_id,
        totalHours: 0,
        dailyAvg: 0,
      });
      state.workingHours.push({
        id: user_id,
        user_id: user_id,
        start_time: '09:00',
        end_time: '18:00',
        hours: 8,
      });
      notification.success({
        message: 'Success',
        description: 'User added successfully',
      });
    },
    editUser: (state, action: PayloadAction<UserProfile>) => {
      const emailExists = state.users.find((user) => user.email === action.payload.email);
      if (emailExists && emailExists.user_id !== action.payload.user_id) {
        notification.error({
          message: 'Error',
          description: `Email ${action.payload.email} already exists`,
        });
        return;
      }
      const index = state.users.findIndex((user) => user.user_id === action.payload.user_id);
      state.users[index] = action.payload;
      notification.success({
        message: 'Success',
        description: 'User updated successfully',
      });
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.user_id !== action.payload);
      notification.success({
        message: 'Success',
        description: 'User removed successfully',
      });
    },
    updateWorkHours: (state, action: PayloadAction<WorkHours>) => {
      const index = state.workingHours.findIndex(
        (workHours) => workHours.user_id === action.payload.user_id
      );
      state.workingHours[index] = action.payload;
      notification.success({
        message: 'Success',
        description: 'Work hours updated successfully',
      });
    },
  },
});

export const { addUser, editUser, removeUser, updateWorkHours } = counterSlice.actions;

export default counterSlice.reducer;
