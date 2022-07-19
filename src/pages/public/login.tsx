import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Row } from 'antd';

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
      <Card title="Sign In">
        <Form name="login" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
              { type: 'email', message: 'Please input a valid Email!' },
            ]}
          >
            <Input addonBefore={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password addonBefore={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Row justify="center">
              <Button
                loading={authStatus === 'loading'}
                size="large"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
