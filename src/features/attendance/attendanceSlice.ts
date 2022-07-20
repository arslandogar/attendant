import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd';

import { RootState } from '@/store';

import {
  addAttendanceRecordRequest,
  getAttendanceListRequest,
  updateAttendanceTimeoutRequest,
} from './attendanceAPI';
import { AttendanceRecord, AddAttendanceRecordDTO } from './types';

export interface AttendanceState {
  allRecords: AttendanceRecord[];
  userRecords: AttendanceRecord[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AttendanceState = {
  allRecords: [],
  userRecords: [],
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
      (record) => record.user_id === data.user_id
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

export const updateAttendanceRecord = createAsyncThunk(
  'attendance/update',
  async (docId: string, { getState }) => {
    const state = getState() as RootState;

    const existingRecord = state.attendance.allRecords.find(
      (record) => record.id === docId && record.end_time !== ''
    );
    if (existingRecord) {
      notification.error({
        message: 'Error',
        description: "You can't update your attendance after you've marked your time out",
      });
      return;
    }
    const response = await updateAttendanceTimeoutRequest(docId);
    notification.success({
      message: 'Success',
      description: 'Your time out has been marked',
    });
    return response.fields;
  }
);

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},

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
      })
      .addCase(updateAttendanceRecord.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAttendanceRecord.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(updateAttendanceRecord.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
// export const { addAttendanceRecord } = attendanceSlice.actions;

export default attendanceSlice.reducer;
