import React, { useState } from 'react';

interface ApplyFormProps {
  jobId: string;
  onSubmit: (data: { name: string; email: string; resume: string }) => void;
}

const ApplyForm: React.FC<ApplyFormProps> = ({ jobId, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, resume });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Resume"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit Application
      </button>
    </form>
  );
};

export default ApplyForm;