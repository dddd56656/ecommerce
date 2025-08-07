// src/api/product.ts
import { api } from './client';

// 商品类型
export type Product = {
  _id: string;
  photo?: string;
  // 只定义有的字段，扩展时添加
};

export type Category = {
  _id: string;
  name: string;
};

export type ProductFilterParams = {
  categories?: string[];
  priceRange?: [number, number];
  // 可扩展：其它过滤条件
};

export type ProductSearchParams = {
  search: string;
  category?: string;
};

export type RelatedProductParams = {
  productId: string;
};

export type UserId = string;

// === 1. 获取商品列表 ===
export const fetchProducts = () =>
  api.get<Product[]>('/api/products').then(res => res.data);

// === 2. 获取相关商品 ===
export const fetchRelatedProducts = (productId: string) =>
  api.get<Product[]>(`/api/products/related/${productId}`).then(res => res.data);

// === 3. 根据id获取商品 ===
export const fetchProductById = (id: string) =>
  api.get<Product>(`/api/product/${id}`).then(res => res.data);

// === 4. 获取商品分类 ===
export const fetchProductCategories = () =>
  api.get<Category[]>('/api/categories').then(res => res.data);

// === 5. 商品搜索 ===
export const fetchProductSearch = (params: ProductSearchParams) =>
  api.get<Product[]>('/api/products/search', { params }).then(res => res.data);

// === 6. 搜索过滤 ===
export const fetchProductsByFilter = (params: ProductFilterParams) =>
  api.post<Product[]>('/api/products/filter', params).then(res => res.data);

// === 7. 获取商品图片 ===
// 通常 photo 字段是 url，如果后端是二进制文件可返回 blob
export const fetchProductPhoto = (productId: string) =>
  api.get<Blob>(`/api/product/photo/${productId}`, { responseType: 'blob' }).then(res => res.data);

// === 8. 新增商品 ===
export const createProduct = (userId: UserId, product: Omit<Product, '_id'>) =>
  api.post<Product>(`/api/product/create/${userId}`, product).then(res => res.data);

// === 9. 删除商品 ===
export const deleteProduct = (productId: string, userId: UserId) =>
  api.delete(`/api/product/${productId}/${userId}`).then(res => res.data);

// === 10. 更新商品 ===
export const updateProduct = (productId: string, userId: UserId, product: Partial<Product>) =>
  api.put<Product>(`/api/product/${productId}/${userId}`, product).then(res => res.data);

