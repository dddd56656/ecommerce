import React from 'react';
import { Spin, message, Button } from 'antd';
import { useProducts } from './hooks';
import ProductList from '@/components/product/ProductList';

export default function ProductListFeature() {
  const { products, loading, error, fetchProducts } = useProducts();

  if (error) message.error(error);

  return (
    <Spin spinning={loading}>
      <Button onClick={fetchProducts} type="primary" style={{ marginBottom: 12 }}>
        刷新
      </Button>
      <ProductList products={products} />
    </Spin>
  );
}
