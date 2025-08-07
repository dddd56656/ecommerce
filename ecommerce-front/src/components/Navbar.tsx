// src/components/Navbar.tsx
import React from "react";
import { Menu, Layout, Dropdown, Avatar, Typography } from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogout } from "@/features/auth/useLogout";
import { useAuthStore } from "@/store/authStore";

const { Header } = Layout;
const { Text } = Typography;

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser } = useLogout();
  const user = useAuthStore((s) => s.user);
  const role = user?.role ?? 0;           // 1=管理员, 0=普通
  const isAdmin = role === 1;

  const selectedKey = location.pathname;

  // 原来的菜单
  const menuItems: MenuProps["items"] = [
    { key: "/dashboard",          icon: <HomeOutlined />,        label: <Link to="/">首页</Link> },
    { key: "/products",  icon: <AppstoreOutlined />,    label: <Link to="/products">商品</Link> },
    { key: "/cart",      icon: <ShoppingCartOutlined />,label: <Link to="/cart">购物车</Link> },
    { key: "/profile",   icon: <UserOutlined />,        label: <Link to="/profile">个人中心</Link> },
  ];

  // 管理员隐藏菜单 -> 不渲染 Menu；普通用户显示
  const shouldShowMenu = !isAdmin;

  const rightArea = (
    <Dropdown
      menu={{
        items: [
          { key: "profile", label: "个人中心", onClick: () => navigate("/profile") },
          { type: "divider" },
          { key: "logout", danger: true, label: "退出登录", onClick: () => logoutUser().then(() => navigate("/login", { replace: true })) },
        ],
      }}
      trigger={["click"]}
    >
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 8 }}>
        <Avatar size={32} src="https://i.pravatar.cc/64" alt={user?.name || "User"} />
        <Text style={{ maxWidth: 140 }} ellipsis>
          {user?.name || "未登录"}
        </Text>
      </div>
    </Dropdown>
  );

  return (
    <Header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f0f0f0",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}
    >
      {/* 左侧品牌（保留，若也想隐藏可加条件 !isAdmin） */}
      <div style={{ fontWeight: "bold", fontSize: 20, color: "#1677ff" }}>sww商城</div>

      {/* 中间导航：管理员隐藏，普通用户显示 */}
      {shouldShowMenu ? (
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(String(key))}
          style={{
            flex: 1,
            justifyContent: "center",
            background: "transparent",
            borderBottom: "none",
          }}
        />
      ) : (
        <div style={{ flex: 1 }} /> // 占位，让头像靠右
      )}

      {/* 右侧头像区域（始终显示） */}
      {rightArea}
    </Header>
  );
};

export default Navbar;
