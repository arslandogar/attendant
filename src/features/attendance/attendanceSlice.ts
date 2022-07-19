import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import moment from 'moment';

import { AttendanceRecord } from './types';

export interface AttendanceState {
  records: AttendanceRecord[];
}

const initialState: AttendanceState = {
  records: [],
};

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    addAttendanceRecord: (state, action: PayloadAction<Omit<AttendanceRecord, 'id' | 'date'>>) => {
      const currentDate = moment().format('DD/MM/YYYY');
      const existingRecord = state.records.find(
        (record) => record.userId === action.payload.userId && record.date === currentDate
      );
      if (existingRecord) {
        notification.error({
          message: 'Error',
          description: `You already marked your attendance for today as ${existingRecord.status}`,
        });
        return;
      }
      state.records.push({
        id: state.records.length.toString(),
        userId: action.payload.userId,
        date: currentDate,
        status: action.payload.status,
      });
      notification.success({
        message: 'Attendance marked',
        description: `You marked your attendance as ${action.payload.status}`,
      });
    },
  },
});

export const { addAttendanceRecord } = attendanceSlice.actions;

export default attendanceSlice.reducer;
