export type ProductInput = Omit<Product, "id">;

export interface Product {
  id: string;
  name: string;
  categoryId: number;
  price: number;
  image: string;
  description: string;
}

export interface ProductFilters {
  search: string;
  categoryId: number | null;
  page: number;
}

export interface PaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}