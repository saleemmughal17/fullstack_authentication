"use client"
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Dashboard Container */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 space-y-6">
        
        {/* Header Section */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Admin Dashboard</h1>
        </header>

        {/* Stats or Info */}
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

        {/* Apply Button */}
        <section className="flex justify-center">
         
            <Link href={"/addJob"} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
              Add Jobs here
            </Link>
          
        </section>
      </div>
    </div>
  )
}
