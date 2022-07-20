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
    <Col className="user-dashboard-container">
      <Row>
        <Avatar src="https://joeschmoe.io/api/v1/random" size={160} />
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
      <Title level={2}>{`Hi! ${first_name || ''} ${last_name || ''}`}</Title>
      <Row gutter={[16, 16]} align="middle" justify="center" style={{ height: 110 }}>
        {actionBtns.map((btn: BtnColProps, index: number) => (
          <BtnCol key={index} text={btn.text} onClick={btn.onClick} />
        ))}
      </Row>
      {children}
    </Col>
  );
};
