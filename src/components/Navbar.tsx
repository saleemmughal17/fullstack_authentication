'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/AuthContext';

const LogoutButton = () => {
    const router = useRouter();
    const { logout}= useUser()
    
    // console.log('herder user', user)
    
    const handleLogout = async () => {
      logout()
        
        
        // Call backend API to handle server-side logout
        await fetch('api/auth/logout', {
          method: 'POST',
        });
        
        // Redirect to login page
        router.push('/');
    };

    return (
      <button 
      onClick={handleLogout} 
      className="p-2 bg-red-500 text-white rounded"
      >
            Logout
        </button>
    );
  };
  
  const Navbar: React.FC = () => {
  const {user}=useUser()
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('user');

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Job Board
                </Link>
                <div className="flex gap-4">
                    {user ? (
                        <LogoutButton />
                    ) : (
                        <>
                            <Link href="/login">Login</Link>
                            <Link href="/signup">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
