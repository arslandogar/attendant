import { useState } from 'react';

import { addAttendanceRecord } from '@/features/attendance/attendanceSlice';
import { DashboardLayout } from '@/layouts';
import { useAppSelector, useAppDispatch } from '@/store';

import { AttendanceRecordsModal } from './components';

export const UserDasboard = () => {
  const [isAttendanceRecordsModalVisible, setIsAttendanceRecordsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const { user_id } = currentUser || {};

  const actionBtns = [
    {
      text: 'Punch Attendance',
      onClick: () =>
        user_id ? dispatch(addAttendanceRecord({ userId: user_id, status: 'present' })) : null,
    },
    {
      text: 'Apply For Leave',
      onClick: () =>
        user_id ? dispatch(addAttendanceRecord({ userId: user_id, status: 'leave' })) : null,
    },
    {
      text: 'View Attendance Records',
      onClick: () => setIsAttendanceRecordsModalVisible(true),
    },
  ];

  return (
    <DashboardLayout actionBtns={actionBtns}>
      <AttendanceRecordsModal
        visible={isAttendanceRecordsModalVisible}
        onClose={() => setIsAttendanceRecordsModalVisible(false)}
      />
    </DashboardLayout>
  );
};
