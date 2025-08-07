import React from "react";
import { Card } from "antd";
import ProductPhoto from "./ProductPhoto";

export type Product = {
  _id: string;
  photo?: string; // 图片URL或base64
};

type ProductCardProps = {
  product: Product;
  onClick?: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <Card
      hoverable
      style={{ width: 220, borderRadius: 16, margin: 8 }}
      onClick={() => onClick?.(product._id)}
      bodyStyle={{ padding: 0 }}
      cover={
        <ProductPhoto
          src={product.photo}
          alt={`商品-${product._id}`}
          width={220}
          height={220}
        />
      }
    />
  );
};

export default ProductCard;
