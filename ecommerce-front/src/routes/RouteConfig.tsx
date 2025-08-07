// src/routes/RouteConfig.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProtectedRoute from '@/pages/ProtectedRoute';
import MainLayout from '@/layouts/MainLayout';

export default function RouteConfig() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* 公共页面 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 受保护区域 + 布局 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* 根路径重定向到 dashboard（已登录时）；
             未登录时会被 ProtectedRoute 重定向到 /login */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
}
