// src/pages/DashboardPage.tsx
import React from 'react';
import { Card, Typography, Tag } from 'antd';
import { useAuthStore } from '@/store/authStore';

const DashboardPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) return <div>未登录</div>;

  return (
    <Card title="首页" style={{ maxWidth: 600, margin: '50px auto' }}>
      <Typography.Text>欢迎，{user.name}</Typography.Text>
      <br />
      <Typography.Text>邮箱：{user.email}</Typography.Text>
      <br />
      <Typography.Text>
        角色：
        {user.role === 1 ? <Tag color="green">管理员</Tag> : <Tag>普通用户</Tag>}
      </Typography.Text>
    </Card>
  );
};

export default DashboardPage;
