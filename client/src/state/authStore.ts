
import { create } from 'zustand';

interface AuthState {
  userId: string;
  setUserId: (id: string) => void;
}

export const useAuth = create<AuthState>((set) => ({
  userId: '',
  setUserId: (id) => set({ userId: id }),
}));
