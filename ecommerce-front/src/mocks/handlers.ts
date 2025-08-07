// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  // 注册
  http.post('/api/signup', async ({ request }) => {
    const body = (await request.json()) as {
      name: string; email: string; password: string;
    };
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return HttpResponse.json({ error: '字段不能为空' }, { status: 400 });
    }
    if (email === 'existing@example.com') {
      return HttpResponse.json({ error: '用户已存在' }, { status: 400 });
    }

    return HttpResponse.json({
      _id: 'mock123',
      name,
      email,
      role: 0,
    });
  }),

  // 登录
  http.post('/api/signin', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const { email, password } = body;

    if (email !== 'admin@example.com' || password !== '123456') {
      return HttpResponse.json({ error: '邮箱和密码不匹配' }, { status: 401 });
    }

    return HttpResponse.json({
      token: 'mock-token',
      user: {
        _id: 'admin123',
        name: 'Admin User',
        email,
        role: 0,
      },
    });
  }),

  // 登出
  http.get('/api/signout', () => {
    return HttpResponse.json({ message: '退出成功' });
  }),
];
