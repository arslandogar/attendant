import { Input, Row } from 'antd';
import { FC, useState } from 'react';

import { Modal } from '@/components';

import { useFilteredUsers } from '../hooks';

import { AvailabilityList } from './availabilityList';

interface Props {
  onClose: () => void;
}

export const AvailabilityModal: FC<Props> = ({ onClose }) => {
  const [searchText, setSearchText] = useState('');
  const filteredUsers = useFilteredUsers(searchText);

  const userNames = filteredUsers.map((user) => {
    const { first_name, last_name } = user;
    return `${first_name} ${last_name}`;
  });

  const lists = [
    {
      title: 'Availability',
      data: userNames,
    },
    {
      title: 'On Leave',
      data: userNames,
    },
    {
      title: 'Absent',
      data: userNames,
    },
  ];

  return (
    <Modal
      title="Today's Availability"
      titleContent={
        <Input
          placeholder="Search Here..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      }
      onClose={onClose}
    >
      <Row gutter={[16, 16]} align="middle" justify="center">
        {lists.map((list, index) => (
          <AvailabilityList key={index} title={list.title} data={list.data} />
        ))}
      </Row>
    </Modal>
  );
};
