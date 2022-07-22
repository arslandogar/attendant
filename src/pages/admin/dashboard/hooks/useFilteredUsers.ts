import { useAppSelector } from '@/store';

export const useFilteredUsers = (searchText: string) => {
  const users = useAppSelector((state) => state.user.users);
  const filteredUsers = users.filter((user) => {
    const name = `${user.first_name} ${user.last_name}`;
    return name.includes(searchText.toLowerCase()) || user.email.includes(searchText.toLowerCase());
  });
  return filteredUsers;
};
