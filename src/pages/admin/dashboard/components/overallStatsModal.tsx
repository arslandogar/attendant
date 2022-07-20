import { Table, Input } from 'antd';
import { FC, useState } from 'react';

import { Modal } from '@/components';
import { useAppSelector } from '@/store';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const OverallStatsModal: FC<Props> = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');

  const users = useAppSelector((state) => state.user.users);
  const stats = useAppSelector((state) => state.user.stats);

  const data = users.map((user) => {
    const { first_name, last_name, user_id } = user;
    const userStats = stats.find((stat) => stat.user_id === user_id);
    return {
      key: userStats?.id,
      name: `${first_name} ${last_name}`,
      ...userStats,
    };
  });

  const filteredData = data.filter((user) => {
    const { name } = user;
    return name.toLowerCase().includes(searchText.toLowerCase());
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
      visible={visible}
      onClose={onClose}
    >
      <Table
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Total Hours', dataIndex: 'totalHours', key: 'totalHours' },
          { title: 'Daily Avg.', dataIndex: 'dailyAvg', key: 'dailyAvg' },
        ]}
        dataSource={filteredData}
      />
    </Modal>
  );
};
