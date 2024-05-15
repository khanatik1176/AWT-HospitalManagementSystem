// /admin/components/Header.tsx

import React from 'react';
import { useTheme } from '@daisyui/react';
import { FaUser, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import { SunIcon, MoonIcon } from '@heroicons/react/solid'; // Importing theme icons

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark'? 'light' : 'dark');
  };

  return (
    <header className="header bg-gray-800 text-white p-4">
      <h1 className="text-xl">Admin Dashboard</h1>
      <button onClick={toggleTheme} className="ml-auto">
        {theme === 'dark'? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
      </button>
      <button className="ml-4">
        <FaUser className="w-6 h-6" />
      </button>
      <button className="ml-4">
        <FaSignOutAlt className="w-6 h-6" />
      </button>
    </header>
  );
};

export default Header;
