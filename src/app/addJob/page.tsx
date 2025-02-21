"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
export default function AddJob() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    salary: '',
    postedById: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/jobs');
      } else {
        console.error('Failed to submit');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='p-2'>
      <h1 className='text-center font-bold'>Add Job</h1>
      <form onSubmit={handleSubmit} className='p-2'>
        {['title', 'description', 'category', 'location', 'salary'].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            required={field !== 'postedById'}
            className="border p-2 mb-2 w-full"
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Job</button>
      </form>
    </div>
  );
}