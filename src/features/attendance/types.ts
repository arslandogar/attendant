export type AttendanceRecord = {
  id: string;
  date: string;
  status: 'absent' | 'present' | 'leave';
  start_time: string;
  end_time: string;
  user_id: string;
  first_name: string;
  last_name: string;
};

export type AddAttendanceRecordDTO = Pick<
  AttendanceRecord,
  'status' | 'user_id' | 'first_name' | 'last_name'
>;
