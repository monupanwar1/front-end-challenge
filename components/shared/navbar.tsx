'use client';

import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '../theme/theme';

export function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className='flex items-center justify-between px-6 py-4 border-b'>
      <Link href='/' className='text-xl font-bold tracking-wide'>
        Slooze
      </Link>

      <div className='flex items-center gap-6'>
        {user?.role === 'manager' && (
          <Link href='/dashboard' className='font-medium'>
            Dashboard
          </Link>
        )}

        <Link href='/products' className='font-medium'>
          Products
        </Link>

        {user ? (
          <>
            <span className='text-sm text-gray-500'>
              {user.email} ({user.role})
            </span>

            <button
              onClick={handleLogout}
              className='bg-black text-white px-3 py-1 rounded-lg'
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href='/login'>Login</Link>
            <ModeToggle />
          </>
        )}
      </div>
    </nav>
  );
}
