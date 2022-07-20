import { Table, DatePicker, Typography } from 'antd';
import { Moment } from 'moment';
import { FC, useState, useEffect } from 'react';

import { Modal } from '@/components';
import { getAllAttendanceList } from '@/features/attendance/attendanceSlice';
import { useAppDispatch, useAppSelector } from '@/store';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AttendanceRecordsModal: FC<Props> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch();
  const [searchDate, setSearchDate] = useState<null | Moment>(null);

  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getAllAttendanceList());
  }, [dispatch]);

  const status = useAppSelector((state) => state.attendance.status);

  const records = useAppSelector((state) =>
    state.attendance.allRecords.filter((record) =>
      record.user_id === currentUser?.user_id && searchDate
        ? record.date === searchDate.format('DD/MM/YYYY')
        : true
    )
  );

  const { Title } = Typography;

  return (
    <Modal
      title="Attendance Records"
      titleContent={
        <>
          <Title level={4}>{`${currentUser?.first_name} ${currentUser?.last_name}`}</Title>
          <DatePicker
            onChange={(val) => setSearchDate(val)}
            value={searchDate}
            placeholder="Select Date"
            format="DD/MM/YYYY"
            allowClear={false}
          />
        </>
      }
      visible={visible}
      onClose={onClose}
    >
      <Table
        loading={status === 'loading'}
        columns={[
          { title: 'Date', dataIndex: 'date', key: 'date' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
        ]}
        dataSource={records.map((record, i) => ({
          date: record.date,
          status: record.status,
          key: i.toString(),
        }))}
      />
    </Modal>
  );
};
