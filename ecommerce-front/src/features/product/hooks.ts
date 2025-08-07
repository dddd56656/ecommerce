// src/features/product/hooks.ts
import { useProductStore } from '@/store/productStore';
import { useEffect } from 'react';

// 用于组件自动加载商品
export function useProducts(auto = true) {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    if (auto) fetchProducts();
  }, [auto, fetchProducts]);

  return { products, loading, error, fetchProducts };
}
