// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { Card, message, Button, Divider, Typography } from 'antd';
import LoginForm, { LoginFormValues } from '@/components/Auth/LoginForm';
import { useLogin } from '@/features/auth/useLogin';
import { useNavigate } from 'react-router-dom';

const { Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { loginUser } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError('');
    try {
      const user = await loginUser(values.email, values.password);
      message.success(`欢迎回来，${user.name}`);
      navigate('/dashboard');
    } catch (err: any) {
      // 兼容 fetch/axios 两种错误格式
      const msg =
        err?.response?.data?.error ||
        err?.message ||
        '登录失败';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="登录" style={{ maxWidth: 400, margin: '100px auto' }}>
      <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />

      <Divider plain>或者</Divider>
      <Button block type="default" onClick={() => navigate('/register')}>
        没有账号？去注册
      </Button>

      {/* 可选：给出 mock 账号提示，便于联调 */}
      <Paragraph type="secondary" style={{ marginTop: 8, textAlign: 'center' }}>
        测试账号（MSW）：admin@example.com / 123456
      </Paragraph>
    </Card>
  );
};

export default LoginPage;
