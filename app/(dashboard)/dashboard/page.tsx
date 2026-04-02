'use client';

import { StatCard } from '@/components/ui/stat-card';
import { useProducts } from '@/hooks/use-product';
import { useAuthStore } from '@/store/auth-store';

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const { products } = useProducts();

  // 🔢 stats
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const activeProducts = products.filter((p) => p.status === 'active').length;

  if (!user || user.role !== 'manager') {
    return <p className='p-6'>Unauthorized</p>;
  }

  return (
    <div className='p-6 flex flex-col gap-6'>
      {/* 👤 User Info */}
      <div className='border p-4 rounded-xl shadow-sm'>
        <h2 className='text-lg font-semibold'>Welcome, {user.email}</h2>
        <p className='text-sm text-gray-500'>Role: {user.role}</p>
      </div>

      {/* 📊 Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <StatCard title='Total Products' value={totalProducts} />
        <StatCard title='Active Products' value={activeProducts} />
        <StatCard title='Total Stock' value={totalStock} />
        <StatCard title='Inventory Value' value={`₹ ${totalValue}`} />
      </div>

      {/* 📦 Recent Products */}
      <div>
        <h2 className='text-lg font-semibold mb-3'>Recent Products</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {products.slice(0, 3).map((p) => (
            <div key={p.id} className='border p-3 rounded-lg shadow-sm'>
              <h3 className='font-medium'>{p.title}</h3>
              <p className='text-sm text-gray-500'>₹ {p.price}</p>
              <p className='text-xs text-gray-400'>Stock: {p.stock}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
