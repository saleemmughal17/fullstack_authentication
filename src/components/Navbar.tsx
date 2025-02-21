import React from 'react';
import Link from 'next/link';
 
const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Job Board
        </Link>
        <div className="flex gap-4">
        
          <Link href="/login">Login</Link>
          <Link href="/signup">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;