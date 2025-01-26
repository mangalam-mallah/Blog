import React, { useState } from 'react';
import { Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isMenuOpen, setIsMenuOpen] = useState(false);  // State to toggle menu visibility

  const navItems = [
    { name: 'Home', slug: '/' },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  const activeNavItems = navItems.filter((item) => item.active !== false);

  return (
    <header className="py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <nav className="container mx-auto flex items-center px-6">
        {/* Logo Section */}
        <div className="mr-6 mb-4 md:mb-0">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>

        {/* Desktop Navigation Links (visible on large screens) */}
        <ul className="hidden md:flex md:ml-auto items-center space-x-6 w-full md:w-auto md:flex-row flex-col md:space-x-6">
          {activeNavItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.slug}
                className="text-white font-medium text-lg px-4 py-2 rounded-full bg-white/20 hover:bg-white/40 duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>

        {/* Mobile Menu Button (Three Dots) */}
        <div className="ml-auto flex md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-1/2 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50 transition-transform duration-300 ${isMenuOpen ? 'transform-none' : 'transform -translate-x-full'}`}
      >
        <div className="flex flex-col justify-between h-full pt-6 space-y-4">
          {/* Fixed Box for Navigation Options */}
          <div className="w-full px-4 py-6 rounded-t-lg">
            <h2 className="text-center text-white text-2xl mb-4">Menu</h2>
            
            {/* Individual Navigation Items in Separate Boxes */}
            {activeNavItems.map((item) => (
              <div key={item.name} className="w-full px-4 py-3 mb-2 bg-white/30 rounded-lg hover:bg-white/40 transition-all duration-200">
                <Link
                  to={item.slug}
                  className="block text-white font-medium text-lg text-center"
                  onClick={() => setIsMenuOpen(false)} // Close menu on item click (for mobile)
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Logout Button at the Bottom */}
          {authStatus && (
            <div className="w-full px-4 py-3 mb-2 rounded-lg hover:bg-white/40 transition-all duration-200">
              <LogoutBtn />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
