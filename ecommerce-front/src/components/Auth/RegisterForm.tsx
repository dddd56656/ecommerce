import React from 'react';
import { Form, Input, Button } from 'antd';

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

interface Props {
  onSubmit: (values: RegisterFormValues) => void;
  loading?: boolean;
  error?: string;
}

const RegisterForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
