import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Table, Input, Space, Button } from 'antd';
import { FC, useState } from 'react';

import { Modal } from '@/components';
import { useAppSelector } from '@/store';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const SettingsModal: FC<Props> = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');

  const users = useAppSelector((state) => state.user.users);
  const stats = useAppSelector((state) => state.user.stats);

  const data = users.map((user) => {
    const { first_name, last_name, user_id } = user;
    const userStats = stats.find((stat) => stat.user_id === user_id);
    return {
      key: userStats?.id,
      name: `${first_name} ${last_name}`,
      email: `${first_name}.${last_name}@test.com`,
      position: user.position,
      ...userStats,
    };
  });

  const filteredData = data.filter((user) => {
    const { name } = user;
    return name.toLowerCase().includes(searchText.toLowerCase());
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
      <Table
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
                <Button icon={<DeleteFilled />} size="small" danger>
                  Delete
                </Button>
                <Button icon={<EditFilled />} size="small" type="primary">
                  Edit
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={filteredData}
      />
    </Modal>
  );
};
