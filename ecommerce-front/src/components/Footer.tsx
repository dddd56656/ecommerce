import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

/**
 * AppFooter 组件
 * - 背景色为淡灰色，字体为次要灰
 * - 居中显示版权信息
 * - 可作为所有页面统一的页脚使用
 */
const AppFooter: React.FC = () => (
  <Footer
    style={{
      textAlign: "center",
      backgroundColor: "#f5f6fa", // 更柔和的灰底色
      fontSize: 14,
      color: "#666",             // 稍深一点提高可读性
      borderTop: "1px solid #e5e7eb", // 与主内容视觉分割
    }}
  >
    © {new Date().getFullYear()} sww商城. All rights reserved.
  </Footer>
);

export default AppFooter;
