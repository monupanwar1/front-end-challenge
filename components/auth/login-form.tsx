'use client';

import { useAuthStore } from '@/store/auth-store';
import { mockUsers } from '@/utils/constant';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type LoginFormData = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();

  const login = useAuthStore((s) => s.login);

  const onSubmit = (data: LoginFormData) => {
    
    const user = mockUsers.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase().trim() &&
        u.password === data.password.trim(),
    );

    if (!user) {
      alert('Invalid user');
      return;
    }

    login(user);

    if (user.role === 'manager') {
      router.push('/dashboard');
    } else {
      router.push('/products');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 max-w-md mx-auto mt-20'
    >
      <input
        {...register('email', { required: true })}
        placeholder='Email'
        className='border rounded-lg p-2'
      />

      <input
        type='password'
        {...register('password', { required: true })}
        placeholder='Password'
        className='border rounded-lg p-2'
      />

      <button className='bg-black text-white p-2 rounded-lg'>Login</button>

      <p className='text-lg text-gray-500 mt-2'>
        Manager: manager@slooze.com / 123456 <br />
        Store: store@slooze.com / 123456
      </p>
    </form>
  );
}
