// src/features/auth/useRegister.ts
import { register } from '@/api/auth';
import { useLogin } from './useLogin';

export const useRegister = () => {
  const { loginUser } = useLogin();

  const registerUser = async (name: string, email: string, password: string) => {
    await register({ name, email, password });
    // 注册成功后直接登录
    return loginUser(email, password);
  };

  return { registerUser };
};
