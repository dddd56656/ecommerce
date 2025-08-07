// Sidebar 组件（Ant Design Menu 实现）：企业级侧边导航，自动高亮，图标支持，响应式友好

import React from "react";
import { Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  ShoppingOutlined,
  DropboxOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 当前选中的菜单项
  const selectedKey = location.pathname;

  // 菜单项配置
  const items: MenuProps["items"] = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "首页",
    },
    {
      key: "/products",
      icon: <ShoppingOutlined />,
      label: "商品管理",
    },
    {
      key: "/orders",
      icon: <DropboxOutlined />,
      label: "订单管理",
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      label: "用户中心",
    },
  ];

  return (
    <div
      style={{
        width: 220,
        height: "100%",
        backgroundColor: "#f9fafb",
        borderRight: "1px solid #e5e7eb",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={items}
        onClick={({ key }) => navigate(key)} // 点击跳转路由
        style={{
          height: "100%",
          borderRight: 0,
          padding: "32px 0",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};

export default Sidebar;
