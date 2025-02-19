import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoBagCheckOutline } from "react-icons/io5";
import React from 'react'

const page = () => {
  return (
    // <div>
    //   <h1>hello</h1>
    //     {/* Hero Section */}
    //     <section className="text-center my-10">
    //     <h2 className="text-4xl font-bold text-gray-900">Find Your Dream Job</h2>
    //     <p className="text-gray-600 mt-2">Browse thousands of job opportunities that match your skills.</p>
        
    //   </section>

    // </div>

    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold text-gray-800">JobFinder</h1>
        <button className="text-2xl hover:text-blue-500">
        
      <IoBagCheckOutline />
      
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center my-10 bg-blue-500 text-white p-10 rounded-xl">
        <h2 className="text-4xl font-bold">Welcome to JobFinder</h2>
        <p className="text-lg mt-2">Your one-stop platform to discover, apply, and land your dream job. Browse thousands of job listings and find the perfect opportunity that matches your skills and passion.</p>
       
      </section>


      <section className="bg-white p-6 rounded-xl shadow-lg my-10">
        <h2 className="text-3xl font-bold text-gray-800">About JobFinder</h2>
        <p className="text-gray-600 mt-4">
          JobFinder was founded with the mission to connect talented individuals with top companies across the world. 
          Over the years, we have helped thousands of job seekers find their ideal roles and assisted companies in hiring 
          the best candidates for their teams. Our platform leverages advanced AI-driven algorithms to match job seekers 
          with the most relevant job opportunities, making job searching seamless and efficient.
        </p>
      </section>
       {/* Photography Section */}
       <section className="bg-gray-200 p-6 rounded-xl shadow-lg my-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center">History & Memories</h2>
        <p className="text-gray-600 text-center mt-4">A glimpse into the journey of job seekers and career milestones.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <img src="/images/job-history-1.jpg" alt="Historical Job Moments" className="rounded-lg shadow-md w-full h-64 object-cover" />
          <img src="/images/job-history-2.jpg" alt="Career Growth" className="rounded-lg shadow-md w-full h-64 object-cover" />
          <img src="/images/job-history-3.jpg" alt="Team Collaboration" className="rounded-lg shadow-md w-full h-64 object-cover" />
        </div>
      </section>

      </div>
  )
}

export default page
