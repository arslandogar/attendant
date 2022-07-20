import { SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

// import { addAttendanceRecord } from '@/features/attendance/attendanceSlice';
import { DashboardLayout } from '@/layouts';
// import { useAppSelector, useAppDispatch } from '@/store';

import { AvailabilityModal } from './components';

export const AdminDasboard = () => {
  const [isAvailabilityModalVisible, setIsAvailabilityModalVisible] = useState(false);
  // const dispatch = useAppDispatch();
  // const currentUser = useAppSelector((state) => state.auth.user);

  // const { user_id } = currentUser || {};

  const actionBtns = [
    {
      text: "Today's Availability",
      onClick: () => setIsAvailabilityModalVisible(true),
    },
    {
      text: 'Overall Stats',
      onClick: () => null,
    },
  ];

  return (
    <DashboardLayout
      actionBtns={actionBtns}
      floatingBtn={<SettingOutlined onClick={() => console.log('Hello')} />}
    >
      <AvailabilityModal
        visible={isAvailabilityModalVisible}
        onClose={() => setIsAvailabilityModalVisible(false)}
      />
    </DashboardLayout>
  );
};
