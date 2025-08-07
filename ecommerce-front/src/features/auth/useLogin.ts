// src/features/auth/useLogin.ts
import { login } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

export const useLogin = () => {
  const setUser = useAuthStore((s) => s.setUser);

  const loginUser = async (email: string, password: string) => {
    const { token, user } = await login({ email, password });
    setUser(user, token);
    return user;
  };

  return { loginUser };
};
