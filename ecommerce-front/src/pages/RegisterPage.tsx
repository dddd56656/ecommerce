// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Card, message } from 'antd';
import RegisterForm, { RegisterFormValues } from '@/components/Auth/RegisterForm';
import { useNavigate } from 'react-router-dom';
import { useRegister } from '@/features/auth/useRegister';

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { registerUser } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    setError('');
    try {
      const user = await registerUser(values.name, values.email, values.password);
      message.success(`注册成功，欢迎 ${user.name}`);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.error || '注册失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="注册" style={{ maxWidth: 400, margin: '100px auto' }}>
      <RegisterForm onSubmit={handleSubmit} loading={loading} error={error} />
    </Card>
  );
};

export default RegisterPage;
