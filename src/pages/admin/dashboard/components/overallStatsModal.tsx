import { Table, Input } from 'antd';
import { FC, useState } from 'react';

import { Modal } from '@/components';
import { useAppSelector } from '@/store';

import { useFilteredUsers } from '../hooks';

interface Props {
  onClose: () => void;
}

export const OverallStatsModal: FC<Props> = ({ onClose }) => {
  const [searchText, setSearchText] = useState('');
  const filteredUsers = useFilteredUsers(searchText);

  const stats = useAppSelector((state) => state.user.stats);

  const data = filteredUsers.map((user) => {
    const { first_name, last_name, user_id } = user;
    const userStats = stats.find((stat) => stat.user_id === user_id);
    return {
      key: userStats?.id,
      name: `${first_name} ${last_name}`,
      ...userStats,
    };
  });

  return (
    <Modal
      title="Overall Stats"
      titleContent={
        <Input
          placeholder="Search Here..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      }
      onClose={onClose}
    >
      <Table
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Total Hours', dataIndex: 'totalHours', key: 'totalHours' },
          { title: 'Daily Avg.', dataIndex: 'dailyAvg', key: 'dailyAvg' },
        ]}
        dataSource={data}
        size="small"
      />
    </Modal>
  );
};
