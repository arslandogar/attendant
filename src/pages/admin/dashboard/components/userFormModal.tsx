import { FormRule, Input, Card, Form, Button, Row, Modal } from 'antd';
import { FC } from 'react';

import { UserProfile } from '@/features/auth/types';
import { addUser, editUser } from '@/features/user/userSlice';
import { useAppSelector, useAppDispatch } from '@/store';

export interface UserFormModalProps {
  userId: string | null | undefined;
  visible: boolean;
  onClose: () => void;
}

export const UserFormModal: FC<UserFormModalProps> = ({ visible, onClose, userId }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);

  const initialValue = users.find((user) => user.user_id === userId) as UserProfile;

  const onFinish = (values: UserProfile) => {
    dispatch(
      initialValue ? editUser({ ...values, user_id: initialValue.user_id }) : addUser(values)
    );
    onClose();
  };

  const fields = [
    {
      initialValue: initialValue?.first_name,
      name: 'first_name',
      placeHolder: 'First Name',
      rules: [
        {
          required: true,
          message: "Please input user's First Name!",
        },
      ],
    },
    {
      initialValue: initialValue?.last_name,
      name: 'last_name',
      placeHolder: 'Last Name',
      rules: [
        {
          required: true,
          message: "Please input user's Last Name!",
        },
      ],
    },
    {
      initialValue: initialValue?.department,
      name: 'department',
      placeHolder: 'Department',
      rules: [
        {
          required: true,
          message: "Please input user's Department!",
        },
      ],
    },
    {
      initialValue: initialValue?.position,
      name: 'position',
      placeHolder: 'Position',
      rules: [
        {
          required: true,
          message: "Please input user's Position!",
        },
      ],
    },
    {
      initialValue: initialValue?.email,
      name: 'email',
      placeHolder: 'Email',
      rules: [
        { required: true, message: "Please input user's Email!" },
        { type: 'email', message: 'Please input a valid Email!' },
      ] as FormRule[],
    },
  ];

  return (
    <Modal
      title={initialValue ? 'Edit Info' : 'Add Employee'}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
      wrapClassName="user-form-modal"
    >
      <Card>
        <Form name="save-user" onFinish={onFinish}>
          {fields.map((field) => (
            <Form.Item
              key={field.name}
              initialValue={field.initialValue}
              name={field.name}
              rules={field.rules}
            >
              <Input placeholder={field.placeHolder} />
            </Form.Item>
          ))}
          <Form.Item>
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
