import React, { useEffect, useState } from "react";
import { fetchProductCategories, fetchProductsByFilter, Category, Product } from "@/api/product";
import { Select, Spin, Typography } from "antd";
import ProductList from "@/components/product/ProductList";

const ProductCategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProductCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    fetchProductsByFilter({ categories: [selected] })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [selected]);

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={3}>按分类浏览</Typography.Title>
      <Select
        style={{ minWidth: 180, marginBottom: 24 }}
        placeholder="选择分类"
        options={categories.map(c => ({ value: c._id, label: c.name }))}
        onChange={v => setSelected(v)}
      />
      <Spin spinning={loading}>
        <ProductList products={products} />
      </Spin>
    </div>
  );
};
export default ProductCategoryPage;
