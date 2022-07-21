export type AttendanceStat = {
  id: string;
  user_id: string;
  totalHours: number;
  dailyAvg: number;
};

export type WorkHours = {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  hours: number;
};
