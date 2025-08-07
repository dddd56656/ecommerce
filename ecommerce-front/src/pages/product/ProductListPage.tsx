import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductCategories,
  fetchProductSearch,
  Product,
  Category,
} from "@/api/product";
import { Spin, Typography, message, Input, Select, Row, Col, Pagination } from "antd";
import ProductCard from "@/components/product/ProductCard";

const PAGE_SIZE = 16;

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [page, setPage] = useState(1);

  // 分类拉取
  useEffect(() => {
    fetchProductCategories()
      .then(setCategories)
      .catch(() => message.error("分类加载失败"));
  }, []);

  // 列表/搜索/筛选
  const loadProducts = async () => {
    setLoading(true);
    try {
      let data: Product[] = [];
      if (search) {
        // 搜索接口
        data = await fetchProductSearch({ search, category: selectedCategory });
      } else {
        // 全部商品（可扩展分页/分类筛选等）
        data = await fetchProducts();
        if (selectedCategory) {
          data = data.filter((p) => p.category === selectedCategory);
        }
      }
      setProducts(data);
    } catch {
      message.error("商品加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line
  }, [search, selectedCategory]);

  // 分页切片
  const showProducts = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div style={{ padding: 24 }}>
      <Typography.Title level={2}>商品列表</Typography.Title>
      {/* 搜索+分类筛选 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col flex="1 1 200px">
          <Input.Search
            allowClear
            placeholder="搜索商品"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onSearch={v => setSearch(v)}
            style={{ width: "100%" }}
          />
        </Col>
        <Col>
          <Select
            allowClear
            placeholder="选择分类"
            style={{ width: 180 }}
            value={selectedCategory}
            onChange={v => setSelectedCategory(v)}
            options={categories.map(c => ({ label: c.name, value: c._id }))}
          />
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          {showProducts.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={products.length}
            onChange={setPage}
            showSizeChanger={false}
          />
        </div>
      </Spin>
    </div>
  );
};

export default ProductListPage;
