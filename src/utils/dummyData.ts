import { UserProfile } from '@/features/auth/types';
import { AttendanceStat, WorkHours } from '@/features/user/types';

export const USERS = [
  {
    user_id: '1',
    first_name: 'john',
    last_name: 'wick',
    email: 'john.wick@test.com',
    department: 'IT',
    position: 'developer',
    role: 'user',
  },
  {
    user_id: '2',
    first_name: 'jane',
    last_name: 'vane',
    email: 'jane.vane@test.com',
    department: 'IT',
    position: 'developer',
    role: 'user',
  },
  {
    user_id: '3',
    first_name: 'joe',
    last_name: 'quinn',
    email: 'joe.quinn@test.com',
    department: 'IT',
    position: 'developer',
    role: 'user',
  },
  {
    user_id: '4',
    first_name: 'jill',
    last_name: 'smith',
    email: 'jill.smith@test.com',
    department: 'IT',
    position: 'developer',
    role: 'user',
  },
  {
    user_id: '5',
    first_name: 'jake',
    last_name: 'adam',
    email: 'jake.adam@test.com',
    department: 'IT',
    position: 'developer',
    role: 'user',
  },
] as UserProfile[];

export const STATS = [
  {
    id: '1',
    user_id: '1',
    totalHours: 123,
    dailyAvg: 7,
  },
  {
    id: '2',
    user_id: '2',
    totalHours: 180,
    dailyAvg: 8.5,
  },
  {
    id: '3',
    user_id: '3',
    totalHours: 120,
    dailyAvg: 7,
  },
  {
    id: '4',
    user_id: '4',
    totalHours: 150,
    dailyAvg: 8,
  },
  {
    id: '5',
    user_id: '5',
    totalHours: 140,
    dailyAvg: 7,
  },
] as AttendanceStat[];

export const WORK_HOURS = [
  {
    id: '1',
    user_id: '1',
    start_time: '09:00',
    end_time: '17:00',
    hours: 8,
  },
  {
    id: '2',
    user_id: '2',
    start_time: '09:00',
    end_time: '17:00',
    hours: 8,
  },
  {
    id: '3',
    user_id: '3',
    start_time: '09:00',
    end_time: '17:00',
    hours: 8,
  },
  {
    id: '4',
    user_id: '4',
    start_time: '09:00',
    end_time: '17:00',
    hours: 8,
  },
  {
    id: '5',
    user_id: '5',
    start_time: '09:00',
    end_time: '17:00',
    hours: 8,
  },
] as WorkHours[];
