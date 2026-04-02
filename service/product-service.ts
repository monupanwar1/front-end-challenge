import { mockProducts, Product } from "@/lib/mock-data";


const KEY = 'products';

export const getProducts = (): Product[] => {
  
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(KEY);

  // First time → seed data
  if (!stored) {
    localStorage.setItem(KEY, JSON.stringify(mockProducts));
    return mockProducts;
  }

  return JSON.parse(stored);
};

/**
 * Save products
 */
export const saveProducts = (products: Product[]) => {
  localStorage.setItem(KEY, JSON.stringify(products));
};

/**
 * Add product
 */
export const addProduct = (product: Product) => {
  const products = getProducts();
  const updated = [...products, product];
  saveProducts(updated);
};

/**
 * Update product
 */
export const updateProduct = (id: number, data: Partial<Product>) => {
  const products = getProducts();

  const updated = products.map((p) => (p.id === id ? { ...p, ...data } : p));

  saveProducts(updated);
};
