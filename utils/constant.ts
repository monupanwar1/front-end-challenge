type Role = 'manager' | 'store';

type MockUser = {
  id: number;
  email: string;
  password: string;
  role: Role;
};

export const mockUsers: MockUser[] = [
  {
    id: 1,
    email: 'manager@slooze.com',
    password: '123456',
    role: 'manager',
  },
  {
    id: 2,
    email: 'store@slooze.com',
    password: '123456',
    role: 'store',
  },
];
