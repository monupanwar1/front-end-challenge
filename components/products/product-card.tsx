'use client';

import { Product } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth-store';

export function ProductCard({
  product,
  onEdit,
}: {
  product: Product;
  onEdit: (product: Product) => void;
}) {
  const user = useAuthStore((s) => s.user);

  return (
    <div className='border rounded-xl p-4 shadow-sm flex flex-col gap-3'>
      <img
        src={product.image}
        alt={product.title}
        className='h-32 w-full object-cover rounded'
      />

      <h2 className='font-semibold'>{product.title}</h2>
      <p className='text-sm text-gray-500'>{product.description}</p>

      <p>₹ {product.price}</p>

      {user?.role === 'manager' && (
        <button
          onClick={() => onEdit(product)}
          className='bg-blue-500 text-white px-2 py-1 rounded'
        >
          Edit
        </button>
      )}
    </div>
  );
}
