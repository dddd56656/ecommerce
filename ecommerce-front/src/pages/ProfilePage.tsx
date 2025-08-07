// src/pages/ProfilePage.tsx
import React from 'react';
import { Descriptions, Card } from 'antd';
import { useAuthStore } from '@/store/authStore';

const ProfilePage: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) return <div>未登录</div>;

  return (
    <Card title="个人资料" style={{ maxWidth: 600, margin: '50px auto' }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="用户名">{user.name}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{user.email}</Descriptions.Item>
        <Descriptions.Item label="用户 ID">{user._id}</Descriptions.Item>
        <Descriptions.Item label="角色">
          {user.role === 1 ? '管理员' : '普通用户'}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ProfilePage;
