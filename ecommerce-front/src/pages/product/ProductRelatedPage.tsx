import React, { useEffect, useState } from "react";
import { fetchRelatedProducts, Product } from "@/api/product";
import { useParams } from "react-router-dom";
import ProductList from "@/components/product/ProductList";
import { Typography, Spin } from "antd";

const ProductRelatedPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchRelatedProducts(id)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3}>相关商品</Typography.Title>
      <Spin spinning={loading}>
        <ProductList products={products} />
      </Spin>
    </div>
  );
};
export default ProductRelatedPage;
