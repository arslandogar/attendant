export type AttendanceRecord = {
  id: string;
  userId: string;
  date: string;
  status: 'absent' | 'present' | 'leave';
};
