// src/api/auth.ts
import { api } from './client';

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post('/api/signin', data); // ⭐ 必须是相对路径 /api/...
  return res.data; // { token, user }
};

export const register = async (data: { name: string; email: string; password: string }) => {
  const res = await api.post('/api/signup', data);
  return res.data;
};

export const logout = async () => {
  const res = await api.get('/api/signout');
  return res.data;
};
