'use client';

import { useForm } from 'react-hook-form';
import { Product } from '@/lib/mock-data';

type FormData = {
  title: string;
  description: string;
  price: number;
};

export function AddProductForm({
  onAdd,
}: {
  onAdd: (product: Product) => void;
}) {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const newProduct: Product = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      price: Number(data.price),
      costPrice: 0,
      stock: 10,
      category: 'General',
      brand: 'Generic',
      sku: 'SKU-' + Date.now(),
      image: 'https://via.placeholder.com/150',
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    onAdd(newProduct);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='border p-4 rounded mb-4 flex flex-col gap-3'
    >
      <h2 className='font-semibold'>Add Product</h2>

      <input
        {...register('title', { required: true })}
        placeholder='Product Name'
        className='border p-2 rounded'
      />

      <input
        {...register('description', { required: true })}
        placeholder='Description'
        className='border p-2 rounded'
      />

      <input
        type='number'
        {...register('price', { required: true })}
        placeholder='Price'
        className='border p-2 rounded'
      />

      <button className='bg-black text-white py-2 rounded'>Add Product</button>
    </form>
  );
}
