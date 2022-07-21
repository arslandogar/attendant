import { Input, Card, Form, Button, Row, Modal } from 'antd';
import { FC } from 'react';

import { UserProfile } from '@/features/auth/types';
import { addUser, editUser } from '@/features/user/userSlice';
import { useAppDispatch } from '@/store';

export interface UserFormModalProps {
  initialValue: UserProfile | null | undefined;
  visible: boolean;
  onClose: () => void;
}

export const UserFormModal: FC<UserFormModalProps> = ({ visible, onClose, initialValue }) => {
  const dispatch = useAppDispatch();

  const onFinish = (values: UserProfile) => {
    dispatch(
      initialValue ? editUser({ ...values, user_id: initialValue.user_id }) : addUser(values)
    );
    onClose();
  };

  return (
    <Modal
      title={initialValue ? 'Edit User' : 'Add User'}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
    >
      <Card>
        <Form name="login" labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            initialValue={initialValue?.first_name}
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "Please input user's First Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={initialValue?.last_name}
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please input user's Last Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={initialValue?.department}
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please input user's Department!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={initialValue?.position}
            label="Position"
            name="position"
            rules={[{ required: true, message: "Please input user's Position!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={initialValue?.email}
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input user's Email!" },
              { type: 'email', message: 'Please input a valid Email!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Row justify="center">
              <Button size="large" type="primary" htmlType="submit">
                Save
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};
