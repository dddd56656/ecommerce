import React from "react";
import { Row, Col, Empty } from "antd";
import ProductCard, { Product } from "./ProductCard";

type ProductListProps = {
  products: Product[];
  loading?: boolean;
  onItemClick?: (id: string) => void;
};

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading = false,
  onItemClick,
}) => {
  if (!loading && products.length === 0) {
    return <Empty description="暂无商品" />;
  }
  return (
    <Row gutter={[16, 16]} justify="start">
      {products.map((p) => (
        <Col key={p._id} xs={24} sm={12} md={8} lg={6} xl={4}>
          <ProductCard product={p} onClick={onItemClick} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
