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
        <AvailabilityList title="Present" data={userNames} />
        <AvailabilityList title="On Leave" data={userNames} />
        <AvailabilityList title="Absent" data={userNames} />
      </Row>
    </Modal>
  );
};

// const getRandom = (arr: any[], n: number) => {
//   const result = new Array(n);
//   let len = arr.length;
//   const taken = new Array(len);
//   if (n > len) throw new RangeError('getRandom: more elements taken than available');
//   while (n--) {
//     const x = Math.floor(Math.random() * len);
//     result[n] = arr[x in taken ? taken[x] : x];
//     taken[x] = --len in taken ? taken[len] : len;
//   }
//   return result;
// };
