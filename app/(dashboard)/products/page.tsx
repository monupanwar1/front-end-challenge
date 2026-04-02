'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/products/product-card';
import { Product } from '@/lib/mock-data';
import { useAuthStore } from '@/store/auth-store';
import { AddProductForm } from '@/components/products/add-product-form';
import { useProducts } from '@/hooks/use-product';

export default function ProductsPage() {
  const { products, create, update } = useProducts();
  const user = useAuthStore((s) => s.user);

  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // UPDATE
  const handleUpdate = () => {
    if (!editing) return;
    update(editing.id, editing);
    setEditing(null);
  };

  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Products</h1>

      {/* ADD BUTTON */}
      {user?.role === 'manager' && (
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className='mb-4 bg-black text-white px-3 py-2 rounded'
        >
          {showForm ? 'Close' : 'Add Product'}
        </button>
      )}

      {/* ADD FORM */}
      {showForm && user?.role === 'manager' && (
        <AddProductForm
          onAdd={(data) => {
            create(data);
            setShowForm(false);
          }}
        />
      )}

      {/* EDIT FORM */}
      {editing && (
        <div className='mb-4 border p-4 rounded flex flex-col gap-2'>
          <input
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className='border p-2'
          />

          <input
            type='number'
            value={editing.price}
            onChange={(e) =>
              setEditing({
                ...editing,
                price: Number(e.target.value),
              })
            }
            className='border p-2'
          />

          <button
            onClick={handleUpdate}
            className='bg-green-500 text-white px-3 py-1 rounded'
          >
            Save
          </button>
        </div>
      )}

      {/* GRID */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onEdit={setEditing} />
        ))}
      </div>
    </div>
  );
}
