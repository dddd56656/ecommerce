import React, { useState } from "react";
import { fetchProductSearch, Product } from "@/api/product";
import { Input, Spin, Typography } from "antd";
import ProductList from "@/components/product/ProductList";

const ProductSearchPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const onSearch = async (v: string) => {
    setLoading(true);
    try {
      const data = await fetchProductSearch({ search: v });
      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3}>搜索商品</Typography.Title>
      <Input.Search
        value={value}
        onChange={e => setValue(e.target.value)}
        onSearch={onSearch}
        placeholder="输入商品关键词"
        enterButton
        style={{ maxWidth: 360, marginBottom: 32 }}
      />
      <Spin spinning={loading}>
        <ProductList products={products} />
      </Spin>
    </div>
  );
};
export default ProductSearchPage;
