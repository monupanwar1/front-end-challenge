export function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className='border rounded-xl p-4 shadow-sm'>
      <p className='text-sm text-gray-500'>{title}</p>
      <h2 className='text-xl font-semibold'>{value}</h2>
    </div>
  );
}
