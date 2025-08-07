import React, { useState } from "react";
import { fetchProductsByFilter, Product } from "@/api/product";
import { Button, Input, Spin, Typography } from "antd";
import ProductList from "@/components/product/ProductList";

const ProductFilterPage: React.FC = () => {
  const [priceMin, setPriceMin] = useState<string>();
  const [priceMax, setPriceMax] = useState<string>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const onFilter = async () => {
    setLoading(true);
    try {
      const data = await fetchProductsByFilter({
        priceRange: [
          priceMin ? Number(priceMin) : 0,
          priceMax ? Number(priceMax) : 100000,
        ],
      });
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3}>筛选商品</Typography.Title>
      <Input
        placeholder="最低价"
        value={priceMin}
        onChange={e => setPriceMin(e.target.value)}
        style={{ width: 120, marginRight: 12 }}
      />
      <Input
        placeholder="最高价"
        value={priceMax}
        onChange={e => setPriceMax(e.target.value)}
        style={{ width: 120, marginRight: 12 }}
      />
      <Button type="primary" onClick={onFilter}>
        筛选
      </Button>
      <Spin spinning={loading} style={{ display: "block", marginTop: 24 }}>
        <ProductList products={products} />
      </Spin>
    </div>
  );
};
export default ProductFilterPage;
