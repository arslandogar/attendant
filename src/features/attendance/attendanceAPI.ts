import moment from 'moment';

import { axios } from '@/services/axios';
import { FireStoreResponseItem, FireStoreResponseList } from '@/types';
import { DATE_FORMAT } from '@/utils/constants';

import { AttendanceRecord, AddAttendanceRecordDTO } from './types';

export const getAttendanceListRequest = async (): Promise<
  FireStoreResponseList<Omit<AttendanceRecord, 'id'>>
> => {
  return axios.get(
    `https://firestore.googleapis.com/v1/projects/${process.env.REACT_APP_FB_PROJECT_ID}/databases/(default)/documents/attendance/`
  );
};

export const addAttendanceRecordRequest = async (
  data: AddAttendanceRecordDTO
): Promise<FireStoreResponseItem<AttendanceRecord>> => {
  const requestData = {
    fields: {
      status: {
        stringValue: data.status,
      },
      user_id: {
        stringValue: data.user_id,
      },
      first_name: {
        stringValue: data.first_name,
      },
      last_name: {
        stringValue: data.last_name,
      },
      date: {
        stringValue: moment().format(DATE_FORMAT),
      },
      start_time: {
        stringValue: data.status === 'present' ? moment().format('HH:mm') : '',
      },
      end_time: {
        stringValue: '',
      },
    },
  };
  return axios.post(
    `https://firestore.googleapis.com/v1/projects/${process.env.REACT_APP_FB_PROJECT_ID}/databases/(default)/documents/attendance/`,
    requestData
  );
};
