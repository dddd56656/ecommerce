// src/api/client.ts （统一出口，axios 示例）
import axios from 'axios';

const isMock = import.meta.env.VITE_USE_MOCK === 'true';
export const api = axios.create({
  baseURL: isMock ? '' : import.meta.env.VITE_API_URL, // ⭐ mock 时必须为空，相对路径
  withCredentials: true,
});
