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

// 商品相关业务页面
import ProductListPage from '@/pages/product/ProductListPage';
import ProductDetailPage from '@/pages/product/ProductDetailPage';
import ProductCreatePage from '@/pages/product/ProductCreatePage';
import ProductEditPage from '@/pages/product/ProductEditPage';
import ProductSearchPage from '@/pages/product/ProductSearchPage';
import ProductCategoryPage from '@/pages/product/ProductCategoryPage';
import ProductFilterPage from '@/pages/product/ProductFilterPage';
import ProductRelatedPage from '@/pages/product/ProductRelatedPage';

export default function RouteConfig() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* 公共页面 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 受保护区域 + 主布局 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* 主页重定向 */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />

          {/* 商品业务页 */}
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/search" element={<ProductSearchPage />} />
          <Route path="products/filter" element={<ProductFilterPage />} />
          <Route path="products/categories" element={<ProductCategoryPage />} />
          {/* 详情和相关商品 */}
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="product/:id/related" element={<ProductRelatedPage />} />

          {/* 商品新增/编辑页，实际可做权限拦截 */}
          <Route path="products/create" element={
              <ProductCreatePage />
          } />
          <Route path="product/:id/edit" element={
              <ProductEditPage />
          } />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
}
