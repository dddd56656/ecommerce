import React from "react";
import { List, Skeleton } from "antd";
import ProductPhoto from "./ProductPhoto";
import { Product } from "./ProductCard";

type ProductGalleryProps = {
  products: Product[];
  loading?: boolean;
};

const ProductGallery: React.FC<ProductGalleryProps> = ({
  products,
  loading = false,
}) => (
  <List
    grid={{ gutter: 16, column: 5 }}
    dataSource={products}
    loading={loading}
    renderItem={item =>
      <List.Item>
        <ProductPhoto src={item.photo} alt={`商品-${item._id}`} width={180} height={180} loading={loading} />
      </List.Item>
    }
  />
);

export default ProductGallery;
