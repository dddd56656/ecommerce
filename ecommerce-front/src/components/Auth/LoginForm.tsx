import React from 'react';
import { Form, Input, Button } from 'antd';

export interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
  error?: string;
}

const LoginForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
