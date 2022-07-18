import { Button } from 'antd';

import { logout } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store';

export const AdminDasboard = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>{`Logged in as admin`}</h1>
      <Button onClick={() => dispatch(logout())}>Logout</Button>
    </div>
  );
};
