import { Table, Input, Space, Button } from 'antd';
import { FC, useState } from 'react';

import { Modal } from '@/components';
import { removeUser } from '@/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/store';

import { useFilteredUsers } from '../hooks';

import { UserFormModal } from './userFormModal';
import { WorkHoursFormModal } from './workHoursFormModal';

interface Props {
  onClose: () => void;
}

export const SettingsModal: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState('');
  const filteredUsers = useFilteredUsers(searchText);

  const [isUserFormModalVisible, setIsUserFormModalVisible] = useState(false);
  const [isWorkHoursFormModalVisible, setIsWorkHoursFormModalVisible] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null | undefined>(null);

  const stats = useAppSelector((state) => state.user.stats);

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
      onClose={onClose}
    >
      <Space>
        <Button
          type="text"
          onClick={() => {
            setIsUserFormModalVisible(true);
            setSelectedUserId(null);
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
                  size="small"
                  type="primary"
                  shape="round"
                  danger
                  onClick={() => {
                    record.user_id ? dispatch(removeUser(record.user_id)) : null;
                  }}
                >
                  Delete
                </Button>
                <Button
                  size="small"
                  type="primary"
                  shape="round"
                  onClick={() => {
                    setSelectedUserId(record.user_id);
                    setIsUserFormModalVisible(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  type="primary"
                  shape="round"
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
        size="small"
      />
      <UserFormModal
        userId={selectedUserId}
        visible={isUserFormModalVisible}
        onClose={() => {
          setIsUserFormModalVisible(false);
          setSelectedUserId(null);
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
