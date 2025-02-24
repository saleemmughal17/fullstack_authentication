"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplicationList from '../applicationlist/page';

export default function Dashboard() {
  const [applications, setApplications] = useState([]);

  // Fetch Applications for Admin
  useEffect(() => {
    axios.get('/api/applications')
      .then((res) => {
        console.log(res.data.applications);
        setApplications(res.data.applications);
      })
      .catch(err => console.error(err));
  }, []);

  // Handle Status Change (Accept/Reject)
  const handleStatusChange = (id, status) => {
    console.log(id);

    // Corrected the URL with proper syntax and parameters
    axios.put(`/api/update2?id=${id}&status=${status}`)
      .then(() => {
        // Update the status locally after the API call
        setApplications(prev =>
          prev.map(app => app.id === id ? { ...app, status } : app)
        );
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-between">

      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-2">Hi Admin </h1>
      </header>
      
      <div className="w-full bg-white rounded-lg shadow-md p-8 space-y-6" style={{ margin: '4%', minHeight: 'calc(100vh - 8%)' }}>
        <section className="flex flex-col sm:flex-row justify-between w-full px-4 space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/addJob"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
          >
            Add Jobs here
          </Link>
          
          <Link
            href="/jobs"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200 w-full sm:w-auto"
          >
            Jobs Offering
          </Link>
        </section>

        <section className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">Your Activity</h3>
              <p className="text-gray-500">Details about your activity here.</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">Notifications</h3>
              <p className="text-gray-500">Check your recent notifications here.</p>
            </div>
          </div>
        </section>

        {/* Application List for Admin */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4"></h2>
          <ApplicationList
            applications={applications}
            handleStatusChange={handleStatusChange}
          />
        </section>

      </div>
    </div>
  );
}
