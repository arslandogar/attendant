import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notification } from 'antd';
import moment from 'moment';

import { RootState } from '@/store';
import { DATE_FORMAT } from '@/utils/constants';

import { addAttendanceRecordRequest, getAttendanceListRequest } from './attendanceAPI';
import { AttendanceRecord, AddAttendanceRecordDTO } from './types';

export interface AttendanceState {
  allRecords: AttendanceRecord[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AttendanceState = {
  allRecords: [],
  status: 'idle',
};

export const getAllAttendanceList = createAsyncThunk('attendance/list', async () => {
  const attendanceListResponse = await getAttendanceListRequest();
  return attendanceListResponse.documents.map((record) => ({
    id: record.name.split('/').at(-1) as string,
    ...record.fields,
  }));
});

export const addAttendanceRecord = createAsyncThunk(
  'attendance/add',
  async (data: AddAttendanceRecordDTO, { getState }) => {
    const state = getState() as RootState;

    const existingRecord = state.attendance.allRecords.find(
      (record) => record.user_id === data.user_id && record.date === moment().format(DATE_FORMAT)
    );
    if (existingRecord) {
      notification.error({
        message: 'Error',
        description: `You already marked your attendance for today as ${existingRecord.status}`,
      });
      return;
    }
    const response = await addAttendanceRecordRequest(data);
    notification.success({
      message: 'Success',
      description: 'Your time in has been marked',
    });
    return response.fields;
  }
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    updateAttendanceRecord: (state, action: PayloadAction<string>) => {
      const existingRecord = state.allRecords.find(
        (record) => record.id === action.payload && record.end_time !== ''
      );
      if (existingRecord) {
        notification.error({
          message: 'Error',
          description: "You can't update your attendance after you've marked your time out",
        });
        return;
      }
      state.allRecords = state.allRecords.map((record) => {
        if (record.id === action.payload) {
          return {
            ...record,
            end_time: moment().format('HH:mm'),
          };
        }
        return record;
      });
      notification.success({
        message: 'Success',
        description: 'Your time out has been marked',
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllAttendanceList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllAttendanceList.fulfilled, (state, action) => {
        state.allRecords = action.payload;
        state.status = 'idle';
      })
      .addCase(getAllAttendanceList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addAttendanceRecord.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAttendanceRecord.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.allRecords.push(action.payload);
        }
      })
      .addCase(addAttendanceRecord.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { updateAttendanceRecord } = attendanceSlice.actions;

export default attendanceSlice.reducer;
