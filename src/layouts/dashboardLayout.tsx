import { Avatar, Typography, Row, Col, Button, Space } from 'antd';
import { ReactNode, FC } from 'react';

import { BtnCol, BtnColProps } from '@/components';
import { logout } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store';
const { Title } = Typography;

interface Props {
  children: ReactNode;
  floatingBtn?: ReactNode;
  actionBtns: BtnColProps[];
}

export const DashboardLayout: FC<Props> = ({ actionBtns, floatingBtn, children }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const { first_name, last_name } = currentUser || {};

  return (
    <Col className="app-dashboard-container">
      <Row>
        <Col>
          <Avatar src="https://joeschmoe.io/api/v1/random" size={160} />
          <Title level={2}>{`Hi! ${first_name || ''} ${last_name || ''}`}</Title>
        </Col>
        <Space align="start">
          <Button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </Button>
          {floatingBtn}
        </Space>
      </Row>

      <Row gutter={[16, 16]} align="middle" justify="center" style={{ height: 95 }}>
        {actionBtns.map((btn: BtnColProps, index: number) => (
          <BtnCol key={index} {...btn} />
        ))}
      </Row>
      {children}
    </Col>
  );
};
