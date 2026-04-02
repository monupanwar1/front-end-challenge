import { Product } from '@/lib/mock-data';
import {
  addProduct,
  getProducts,
  updateProduct,
} from '@/service/product-service';
import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const create = (data: Product) => {
    addProduct(data);
    setProducts(getProducts());
  };

  const update = (id: number, data: Partial<Product>) => {
    updateProduct(id, data);
    setProducts(getProducts());
  };

  return { products, create, update };
};
