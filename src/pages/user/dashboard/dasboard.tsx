import { Avatar, Typography, Row, Col } from 'antd';
import { useState } from 'react';

import { addAttendanceRecord } from '@/features/attendance/attendanceSlice';
import { useAppSelector, useAppDispatch } from '@/store';

import { BtnCol, AttendanceRecordsModal } from './components';
import './dashboard.scss';

export const UserDasboard = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const { Title } = Typography;

  const { first_name, last_name, user_id } = currentUser || {};

  return (
    <Col className="user-dashboard-container">
      <Avatar src="https://joeschmoe.io/api/v1/random" size={160} />
      <Title level={2}>{`Hi! ${first_name || ''} ${last_name || ''}`}</Title>
      <Row gutter={[16, 16]} align="middle" justify="center" style={{ height: 110 }}>
        <BtnCol
          text="Punch Attendance"
          onClick={() =>
            user_id ? dispatch(addAttendanceRecord({ userId: user_id, status: 'present' })) : null
          }
        />
        <BtnCol
          text="Apply For Leave"
          onClick={() =>
            user_id ? dispatch(addAttendanceRecord({ userId: user_id, status: 'leave' })) : null
          }
        />
        <BtnCol
          text="Watch Previous Record"
          onClick={() => {
            setVisible(true);
          }}
        />
      </Row>
      <AttendanceRecordsModal visible={visible} onClose={() => setVisible(false)} />
    </Col>
  );
};
