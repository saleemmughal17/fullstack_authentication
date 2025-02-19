"use client"
import React from 'react';
import JobCard from '../../components/JobCard';
import SearchBar from '../../components/SearchBar';

const HomePage: React.FC = () => {
  const jobs = [
    { id: '1', title: 'Frontend Developer', company: 'Tech Corp', location: 'Remote', description: 'Join our team!' },
    { id: '2', title: 'Backend Developer', company: 'Abc', location: 'Remote', description: 'Join our team!' },
    { id: '3', title: 'Frontend Developer', company: 'Tech Corp', location: 'Remote', description: 'Join our team!' },
    { id: '4', title: 'Frontend Developer', company: 'Tech Corp', location: 'Remote', description: 'Join our team!' },
  ];

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-4 space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
            onApply={() => console.log('Applying to:', job.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;