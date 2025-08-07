import React from "react";
import { Empty } from "antd";

type EmptyStateProps = {
  description?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({ description }) => (
  <Empty description={description || "暂无数据"} />
);

export default EmptyState;
