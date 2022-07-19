import { Modal, Table, DatePicker, Typography, Row, Col } from 'antd';
import { Moment } from 'moment';
import { FC, useState } from 'react';

import { useAppSelector } from '@/store';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AttendanceRecordsModal: FC<Props> = ({ visible, onClose }) => {
  const [searchDate, setSearchDate] = useState<null | Moment>(null);

  const currentUser = useAppSelector((state) => state.auth.user);
  const records = useAppSelector((state) =>
    state.attendance.records.filter((record) =>
      record.userId === currentUser?.user_id && searchDate
        ? record.date === searchDate.format('DD/MM/YYYY')
        : true
    )
  );

  return (
    <Modal
      title={
        <ModalTitle
          userName={`${currentUser?.first_name} ${currentUser?.last_name}`}
          value={searchDate}
          onChange={(val) => setSearchDate(val)}
        />
      }
      width="80%"
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
    >
      <Table
        columns={[
          { title: 'Date', dataIndex: 'date', key: 'date' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
        ]}
        dataSource={records.map((record) => ({
          ...record,
          key: record.id,
        }))}
      />
    </Modal>
  );
};

interface ModalTitleProps {
  value: null | Moment;
  onChange: (val: null | Moment) => void;
  userName: string;
}

const ModalTitle: FC<ModalTitleProps> = ({ userName, value, onChange }) => {
  const { Title } = Typography;
  return (
    <Row align="middle" justify="center">
      <Col>
        <Title level={3} type="secondary">
          Attendance Record
        </Title>
        <Title level={4}>{userName}</Title>
        <DatePicker
          onChange={onChange}
          value={value}
          placeholder="Select Date"
          format="DD/MM/YYYY"
          allowClear={false}
        />
      </Col>
    </Row>
  );
};
