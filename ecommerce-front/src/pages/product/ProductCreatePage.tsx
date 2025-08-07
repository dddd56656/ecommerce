import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  fetchProductPhoto,
  fetchRelatedProducts,
  Product,
} from "@/api/product";
import { Card, Typography, Spin, Row, Col, message } from "antd";
import ProductPhoto from "@/components/product/ProductPhoto";
import ProductList from "@/components/product/ProductList";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then(data => setProduct(data))
      .catch(() => message.error("商品加载失败"));
    fetchRelatedProducts(id)
      .then(setRelated)
      .catch(() => {});
    setLoading(false);
  }, [id]);

  return (
    <div style={{ padding: 24 }}>
      <Spin spinning={loading}>
        <Card>
          <Row gutter={24}>
            <Col>
              <ProductPhoto src={product?.photo} width={240} height={240} />
            </Col>
            <Col>
              <Typography.Title level={4}>商品ID: {product?._id}</Typography.Title>
            </Col>
          </Row>
        </Card>
        <Typography.Title level={5} style={{ marginTop: 40 }}>
          相关商品
        </Typography.Title>
        <ProductList products={related} />
      </Spin>
    </div>
  );
};
export default ProductDetailPage;
