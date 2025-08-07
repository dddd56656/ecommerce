// src/features/auth/useLogout.ts
import { logout } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

export const useLogout = () => {
  const clearUser = useAuthStore((s) => s.clearUser);

  const logoutUser = async () => {
    await logout();
    clearUser();
  };

  return { logoutUser };
};
