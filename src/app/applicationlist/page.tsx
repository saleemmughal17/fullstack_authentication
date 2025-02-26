'use client';
import React from 'react';

const ApplicationList = ({ applications, handleStatusChange }) => {
    return (
        <div className="space-y-4 mt-5">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Apply Status</h2>
            
            {applications.length > 0 ? (
                applications.map(app => (

                    <div 
                        key={app.id} 
                        className="p-4 bg-white shadow-md rounded-lg border border-gray-200"
                    >
                        <p className="text-lg font-bold text-gray-700">
                            {app.fullName} applied for <span className="italic">{app.job?.title}</span>
                        </p>
                        <p className="text-gray-600 mb-2">Status: <span className="font-medium">{app.status}</span></p>
                        
                        <a 
                            href={app.resume} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 underline"
                        >
                            View Resume
                        </a>

                        <div className="mt-4 space-x-2">
                            <button 
                                onClick={() => handleStatusChange(app.id, 'accepted')} 
                                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
                            >
                                Accept
                            </button>
                            <button 
                                onClick={() => handleStatusChange(app.id, 'rejected')} 
                                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No applications found.</p>
            )}
        </div>
    );
};

export default ApplicationList;
