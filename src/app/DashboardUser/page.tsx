'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Application {
    id: number;
    fullName: string;
    email: string;
    resume: string;
    status: string;
    job: {
        title: string;
    };
}

const PendingApplications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPendingApplications = async () => {
            try {
                const response = await fetch('/api/getapplication');
                if (!response.ok) {
                    throw new Error('Failed to fetch pending applications');
                }
                const data = await response.json();
                setApplications(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingApplications();
    }, []);

    if (loading) {
        return <p className="text-gray-500">Loading...</p>;
    }

    return (
        <div className="container mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Requests</h2>

            {applications.length > 0 ? (
                applications.map(app => (
                    <div 
                        key={app.id} 
                        className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                    >
                        <p className="text-lg font-bold text-gray-700">
                            Applied for: <span className="italic">{app.job?.title}</span>
                        </p>
                        <p className="text-gray-600 mb-2">
                            Status: <span className="font-medium">{app.status}</span>
                        </p>
                        <a 
                            href={app.resume} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 underline"
                        >
                            View Resume
                        </a>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No pending applications found.</p>
            )}
        </div>
    );
};

export default function Dashboard() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        {/* Dashboard Container */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-8">
          
          {/* Header Section */}
          <header className="flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
          </header>

          {/* Stats or Info */}
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Your Activity</h3>
                <p className="text-gray-500">Keep track of your latest activities and progress.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Notifications</h3>
                <p className="text-gray-500">Stay updated with the latest notifications.</p>
              </div>
            </div>

            {/* Pending Applications Section */}
            <PendingApplications />
          </section>

          {/* Apply Button */}
          <section className="flex justify-center">
            <Link href="/jobs">
              <button className="px-8 py-3 bg-gray-800 text-white font-bold rounded-xl shadow-md hover:bg-gray-900 transition-all duration-300">
                Go to Apply 
              </button>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
