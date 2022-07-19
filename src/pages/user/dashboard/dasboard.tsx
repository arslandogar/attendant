import { Avatar, Typography, Row, Col } from 'antd';

import { useAppSelector } from '@/store';

import { BtnCol } from './components';
import './dashboard.scss';

export const UserDasboard = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  const { Title } = Typography;

  return (
    <Col className="user-dashboard-container">
      <Avatar src="https://joeschmoe.io/api/v1/random" size={160} />
      <Title level={2}>{`Hi! ${currentUser?.first_name} ${currentUser?.last_name}`}</Title>
      <Row gutter={[16, 16]} align="middle" justify="center" style={{ height: 110 }}>
        <BtnCol text="Punch Attendance" onClick={() => {}} />
        <BtnCol text="Apply For Leave" onClick={() => {}} />
        <BtnCol text="Watch Previous Record" onClick={() => {}} />
      </Row>
    </Col>
  );
};
