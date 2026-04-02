import { create } from 'zustand';

type Role = 'manager' | 'store';

type User = {
  id: number;
  email: string;
  role: Role;
};

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (user) => set({ user }),

  logout: () => set({ user: null }),
}));
