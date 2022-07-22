import moment from 'moment';
import { useState, useEffect } from 'react';

import {
  addAttendanceRecord,
  getAllAttendanceList,
  updateAttendanceRecord,
} from '@/features/attendance/attendanceSlice';
import { DashboardLayout } from '@/layouts';
import { useAppSelector, useAppDispatch } from '@/store';
import { DATE_FORMAT } from '@/utils/constants';

import { AttendanceRecordsModal } from './components';

export const UserDasboard = () => {
  const currentDate = moment().format(DATE_FORMAT);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllAttendanceList());
  }, [dispatch]);

  const [isAttendanceRecordsModalVisible, setIsAttendanceRecordsModalVisible] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.user);
  const attendance = useAppSelector((state) => state.attendance);

  const { first_name, last_name, user_id } = currentUser || {};

  const addAttendanceData = {
    user_id: user_id || '',
    first_name: first_name || '',
    last_name: last_name || '',
  };

  const todayAttendance = attendance.allRecords.find(
    (record) => record.user_id === user_id && record.date === currentDate
  );

  console.log(attendance.status);

  const handlePunchAttendance = () => {
    if (todayAttendance) {
      dispatch(updateAttendanceRecord(todayAttendance.id));
    } else {
      dispatch(addAttendanceRecord({ ...addAttendanceData, status: 'present' }));
    }
  };

  const actionBtns = [
    {
      loading: attendance.status === 'loading',
      text: todayAttendance ? 'Punch Out Attendance' : 'Punch Attendance',
      onClick: handlePunchAttendance,
    },
    {
      loading: attendance.status === 'loading',
      text: 'Apply For Leave',
      onClick: () =>
        user_id ? dispatch(addAttendanceRecord({ ...addAttendanceData, status: 'leave' })) : null,
    },
    {
      text: 'View Attendance Records',
      onClick: () => setIsAttendanceRecordsModalVisible(true),
    },
  ];

  return (
    <DashboardLayout actionBtns={actionBtns}>
      {isAttendanceRecordsModalVisible && (
        <AttendanceRecordsModal onClose={() => setIsAttendanceRecordsModalVisible(false)} />
      )}
    </DashboardLayout>
  );
};
