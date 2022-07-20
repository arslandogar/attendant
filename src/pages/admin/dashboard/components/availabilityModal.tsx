import { Input, Row } from 'antd';
import { FC, useState } from 'react';

import { Modal } from '@/components';

import { AvailabilityList } from './availabilityList';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AvailabilityModal: FC<Props> = ({ visible, onClose }) => {
  const [searchText, setSearchText] = useState('');

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
        <AvailabilityList title="Present" data={['Available', 'Available', 'Available']} />
        <AvailabilityList title="On Leave" data={['Available', 'Available', 'Available']} />
        <AvailabilityList title="Absent" data={['Available', 'Available', 'Available']} />
      </Row>
    </Modal>
  );
};
