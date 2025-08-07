import React from "react";
import { Image, Skeleton } from "antd";

type ProductPhotoProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  loading?: boolean;
};

const ProductPhoto: React.FC<ProductPhotoProps> = ({
  src,
  alt = "商品图片",
  width = 180,
  height = 180,
  loading = false,
}) => {
  if (loading) {
    return <Skeleton.Image style={{ width, height }} active />;
  }
  return (
    <Image
      width={width}
      height={height}
      src={src}
      alt={alt}
      style={{ objectFit: "cover", borderRadius: 12 }}
      placeholder
      fallback="/assets/placeholder.png" // 兜底图
    />
  );
};

export default ProductPhoto;
