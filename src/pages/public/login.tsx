import { Button, Form, Input, Typography, Row } from 'antd';

import { login } from '@/features/auth/authSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

export const Login: React.FC = () => {
  const authStatus = useAppSelector((state) => state.auth.status);
  const dispatch = useAppDispatch();
  const onFinish = (values: any) => {
    dispatch(login(values));
  };

  return (
    <div className="full-page-container">
      <Typography.Title level={2}>Sign In</Typography.Title>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your Email!' },
            { type: 'email', message: 'Please input a valid Email!' },
          ]}
        >
          <Input size="large" prefix={<i className="fa-solid fa-user"></i>} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            prefix={<i className="fa-solid fa-lock"></i>}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Row justify="center">
            <Button
              loading={authStatus === 'loading'}
              size="large"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};
