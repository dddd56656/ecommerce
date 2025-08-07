// src/store/productStore.ts
import { create } from 'zustand';
import { Product, getProducts, createProduct, deleteProduct, updateProduct } from '@/api/product';

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  addProduct: (data: Omit<Product, '_id'>) => Promise<void>;
  removeProduct: (id: string) => Promise<void>;
  editProduct: (id: string, data: Partial<Product>) => Promise<void>;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await getProducts();
      set({ products, loading: false });
    } catch (e: any) {
      set({ error: e.message || '获取商品失败', loading: false });
    }
  },

  addProduct: async (data) => {
    set({ loading: true, error: null });
    try {
      await createProduct(data);
      // 刷新商品列表
      const products = await getProducts();
      set({ products, loading: false });
    } catch (e: any) {
      set({ error: e.message || '新增失败', loading: false });
    }
  },

  removeProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteProduct(id);
      const products = await getProducts();
      set({ products, loading: false });
    } catch (e: any) {
      set({ error: e.message || '删除失败', loading: false });
    }
  },

  editProduct: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateProduct(id, data);
      const products = await getProducts();
      set({ products, loading: false });
    } catch (e: any) {
      set({ error: e.message || '更新失败', loading: false });
    }
  },
}));
