import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import attendanceReducer from '@/features/attendance/attendanceSlice';
import authReducer from '@/features/auth/authSlice';
import counterReducer from '@/features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    attendance: attendanceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
