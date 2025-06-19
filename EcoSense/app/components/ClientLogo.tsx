'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function ClientLogo() {
  // Added state and handlers related to the profile dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
    // Example: Redirect to login page or clear authentication state
    // window.location.href = '/login';
    // For now, let's redirect to the homepage as a placeholder logout action:
    window.location.href = '/';
  };

  // Placeholder for user email - replace with actual user data fetching
  const userEmail = 'user@example.com'; 

  return (
    <header className="fixed top-0 left-0 w-full bg-green-100 bg-opacity-90 backdrop-filter backdrop-blur-sm px-6 py-3 z-50 flex items-center justify-between shadow-md">
      {/* Logo */}
      <Link 
        href="/"
        className="text-xl md:text-2xl font-bold text-green-800 hover:text-green-900 transition-colors cursor-pointer flex items-center"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Client-side event handler
      >
        EcoSense <span className="ml-2 text-lg"></span>
      </Link>

      {/* User Profile Section */}
      <div className="relative">
        <button 
          onClick={toggleDropdown}
          className="flex items-center text-green-800 hover:text-green-900 hover:bg-green-200 rounded-full p-1 transition-colors focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          aria-label="User profile menu"
        >
          {/* Placeholder User Icon or Initials */}
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
            U
          </div>
          {/* Optional: User Name/Email Preview */}
          {/* <span className="hidden md:inline text-sm ml-2">{userEmail}</span> */}
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-green-200" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
            {/* User Email */}
            <div className="block px-4 py-2 text-sm text-gray-700 border-b border-green-100 truncate" role="menuitem">
              {userEmail}
            </div>
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50" role="menuitem"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
} 