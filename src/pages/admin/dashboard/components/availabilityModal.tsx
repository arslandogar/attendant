import { Input, Row } from 'antd';
import { FC, useState } from 'react';

import { Modal } from '@/components';
import { useAppSelector } from '@/store';

import { AvailabilityList } from './availabilityList';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AvailabilityModal: FC<Props> = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');

  const users = useAppSelector((state) => state.user.users);

  const filteredUsers = users.filter((user) => {
    const { first_name, last_name } = user;
    const name = `${first_name} ${last_name}`;
    return name.toLowerCase().includes(searchText.toLowerCase());
  });

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
      visible={visible}
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
