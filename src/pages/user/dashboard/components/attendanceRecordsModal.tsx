import { Table, DatePicker, Typography } from 'antd';
import { Moment } from 'moment';
import { FC, useState, useEffect } from 'react';

import { Modal } from '@/components';
import { getAllAttendanceList } from '@/features/attendance/attendanceSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import { DATE_FORMAT } from '@/utils/constants';

interface Props {
  onClose: () => void;
}

export const AttendanceRecordsModal: FC<Props> = ({ onClose }) => {
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
        ? record.date === searchDate.format(DATE_FORMAT)
        : true
    )
  );

  const { Title } = Typography;

  return (
    <Modal
      title="Attendance Records"
      titleContent={
        <>
          <Title level={5}>{`${currentUser?.first_name} ${currentUser?.last_name}`}</Title>
          <DatePicker
            size="large"
            onChange={(val) => setSearchDate(val)}
            value={searchDate}
            placeholder="Search by Date..."
            format={DATE_FORMAT}
            allowClear={false}
          />
        </>
      }
      onClose={onClose}
      wrapClassName="user-dashboard"
    >
      <Table
        loading={status === 'loading'}
        size="small"
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
