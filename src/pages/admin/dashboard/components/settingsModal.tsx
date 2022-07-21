import { DeleteFilled, EditFilled, UserAddOutlined, ClockCircleFilled } from '@ant-design/icons';
import { Table, Input, Space, Button } from 'antd';
import { FC, useState } from 'react';

import { Modal } from '@/components';
import { removeUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { UserFormModal, UserFormModalProps } from './userFormModal';
import { WorkHoursFormModal } from './workHoursFormModal';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const SettingsModal: FC<Props> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch();
  const [isUserFormModalVisible, setIsUserFormModalVisible] = useState(false);
  const [isWorkHoursFormModalVisible, setIsWorkHoursFormModalVisible] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [initialUserValue, setInitialUserValues] =
    useState<UserFormModalProps['initialValue']>(null);

  const [searchText, setSearchText] = useState('');

  const users = useAppSelector((state) => state.user.users);
  const stats = useAppSelector((state) => state.user.stats);

  const filteredUsers = users.filter((user) => {
    const { first_name, last_name } = user;
    return `${first_name} ${last_name}`.toLowerCase().includes(searchText.toLowerCase());
  });

  const data = filteredUsers.map((user) => {
    const { first_name, last_name, user_id } = user;
    const userStats = stats.find((stat) => stat.user_id === user_id);
    return {
      key: userStats?.id,
      name: `${first_name} ${last_name}`,
      email: user.email,
      position: user.position,
      ...userStats,
    };
  });

  return (
    <Modal
      title="Settings"
      titleContent={
        <Input
          placeholder="Search Here..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      }
      visible={visible}
      onClose={onClose}
    >
      <Space>
        <Button
          icon={<UserAddOutlined />}
          onClick={() => {
            setIsUserFormModalVisible(true);
            setInitialUserValues(null);
          }}
        >
          Add User
        </Button>
      </Space>
      <Table
        scroll={{ x: 'max-content' }}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Position', dataIndex: 'position', key: 'position' },
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'Total Hours', dataIndex: 'totalHours', key: 'totalHours' },
          { title: 'Daily Avg.', dataIndex: 'dailyAvg', key: 'dailyAvg' },
          {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button
                  icon={<DeleteFilled />}
                  size="small"
                  danger
                  onClick={() => {
                    record.user_id ? dispatch(removeUser(record.user_id)) : null;
                  }}
                >
                  Delete
                </Button>
                <Button
                  icon={<EditFilled />}
                  size="small"
                  type="primary"
                  onClick={() => {
                    setInitialUserValues(filteredUsers.find((user) => user.user_id === record.key));
                    setIsUserFormModalVisible(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  icon={<ClockCircleFilled />}
                  size="small"
                  type="primary"
                  onClick={() => {
                    record.user_id ? setSelectedUserId(record.user_id) : null;
                    setIsWorkHoursFormModalVisible(true);
                  }}
                >
                  Work Hours
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={data}
      />
      <UserFormModal
        initialValue={initialUserValue}
        visible={isUserFormModalVisible}
        onClose={() => {
          setIsUserFormModalVisible(false);
          setInitialUserValues(null);
        }}
      />
      <WorkHoursFormModal
        userId={selectedUserId}
        visible={isWorkHoursFormModalVisible}
        onClose={() => {
          setIsWorkHoursFormModalVisible(false);
          setSelectedUserId(null);
        }}
      />
    </Modal>
  );
};
