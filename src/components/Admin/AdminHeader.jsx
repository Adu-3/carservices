import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const AdminHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        mobileMenuOpen &&
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('.hamburger-button')
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [mobileMenuOpen]);

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <NavLink to="/admin" className="flex items-center space-x-2">
        <span className="material-icons bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent">
        directions_car
        </span>
        <h1 className="font-bold bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent text-xl">
          Car Service
        </h1>
      </NavLink>

      {/* Desktop Navigation */}
      <nav className="space-x-6 hidden md:flex">
        {[
          { path: '/admin', label: 'Home', exact: true },
          { path: '/admin/users', label: 'Users' },
          { path: '/admin/service-providers', label: 'Service Providers' },
          { path: '/admin/forms', label: 'Forms' },
          { path: '/admin/send-email', label: 'Mail' }
        ].map(({ path, label, exact }) => (
          <div key={path} className="relative inline-block pb-2">
            <NavLink
              to={path}
              end={exact}
              className={({ isActive }) =>
                isActive
                  ? 'text-cyan-200 font-medium'
                  : 'hover:text-cyan-200 font-medium'
              }
            >
              {label}
              <span
                className={({ isActive }) =>
                  isActive
                    ? 'absolute left-0 bottom-0 w-full h-1 rounded bg-gradient-to-r from-blue-500 to-cyan-400'
                    : ''
                }
              ></span>
            </NavLink>
          </div>
        ))}
      </nav>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        <NavLink to="/admin/profile">
          <span className="material-icons text-cyan-400 hover:text-cyan-200 cursor-pointer bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent">
          admin_panel_settings
          </span>
        </NavLink>
      </div>

      {/* Hamburger Menu Button */}
      <div className="md:hidden">
        <button
          className="text-white focus:outline-none text-2xl hamburger-button"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <span className="material-icons">close</span>
          ) : (
            <span>☰</span>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu absolute top-16 right-0 left-0 bg-gray-900 border-t border-gray-800 shadow-lg z-50">
          <div className="flex flex-col p-4">
            {[
              { path: '/admin', label: 'Home', icon: 'home', exact: true },
              { path: '/admin/users', label: 'Users', icon: 'group' },
              { path: '/admin/service-providers', label: 'Service Providers', icon: 'engineering' },
              { path: '/admin/forms', label: 'Forms', icon: 'description' },
              { path: '/admin/send-email', label: 'Mail', icon: 'email' },
              { path: '/admin/profile', label: 'Profile', icon: 'person' }
            ].map(({ path, label, icon, exact }) => (
              <NavLink
                key={path}
                to={path}
                end={exact}
                className={({ isActive }) =>
                  isActive
                    ? 'text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800'
                    : 'hover:text-cyan-200 font-medium p-3 hover:bg-gray-800'
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="flex items-center space-x-2">
                  <span className="material-icons">{icon}</span>
                  <span>{label}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;