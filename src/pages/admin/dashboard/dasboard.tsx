import { SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

// import { addAttendanceRecord } from '@/features/attendance/attendanceSlice';
import { DashboardLayout } from '@/layouts';
// import { useAppSelector, useAppDispatch } from '@/store';

import { AvailabilityModal, OverallStatsModal, SettingsModal } from './components';

export const AdminDasboard = () => {
  const [isAvailabilityModalVisible, setIsAvailabilityModalVisible] = useState(false);
  const [isOverallStatsModalVisible, setIsOverallStatsModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
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
      onClick: () => setIsOverallStatsModalVisible(true),
    },
  ];

  return (
    <DashboardLayout
      actionBtns={actionBtns}
      floatingBtn={<SettingOutlined onClick={() => setIsSettingsModalVisible(true)} />}
    >
      {isAvailabilityModalVisible && (
        <AvailabilityModal onClose={() => setIsAvailabilityModalVisible(false)} />
      )}
      {isOverallStatsModalVisible && (
        <OverallStatsModal onClose={() => setIsOverallStatsModalVisible(false)} />
      )}
      {isSettingsModalVisible && <SettingsModal onClose={() => setIsSettingsModalVisible(false)} />}
    </DashboardLayout>
  );
};
