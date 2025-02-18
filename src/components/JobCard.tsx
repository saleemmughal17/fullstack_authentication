import React from 'react';


interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  onApply: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location, description, onApply }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600">{company} - {location}</p>
      <p className="mt-2">{description}</p>
      <button
        onClick={onApply}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;