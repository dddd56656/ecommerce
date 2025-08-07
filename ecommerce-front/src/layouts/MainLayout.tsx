// layouts/MainLayout.tsx

import React from "react";
import { Layout } from "antd";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import AppFooter from "@/components/Footer"; // 避免 Footer 命名冲突
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const { Header, Sider, Content, Footer } = Layout;

/**
 * MainLayout
 * - 管理员：显示 Navbar + Sidebar
 * - 普通用户：隐藏 Navbar & Sidebar，仅保留内容区和底栏
 */
const MainLayout: React.FC = () => {
  const role = useAuthStore((s) => s.user?.role ?? 0); // 1=管理员, 0=普通
  const isAdmin = role === 1;

  return (
    <Layout style={{ minHeight: "100vh", flexDirection: "column" }}>
      {/* 显示顶栏 */}
      {
        <Header style={{ padding: 0, background: "#fff", boxShadow: "0 2px 8px #f0f1f2" }}>
          <Navbar />
        </Header>
      }

      <Layout style={{ flex: 1 }}>
        {/* 仅管理员显示侧边栏（避免空 Sider 包裹导致空白边） */}
        {isAdmin && (
          <Sider
            width={220}
            style={{ background: "#f5f6fa", borderRight: "1px solid #eee", padding: 0 }}
            breakpoint="md"
            collapsedWidth={0}
          >
            <Sidebar />
          </Sider>
        )}

        <Content style={{ padding: 24, background: "#f5f6fa", overflow: "auto" }}>
          <Outlet />
        </Content>
      </Layout>

      <Footer style={{ padding: 0, background: "#fff", fontSize: 14, color: "#888" }}>
        <AppFooter />
      </Footer>
    </Layout>
  );
};

export default MainLayout;
