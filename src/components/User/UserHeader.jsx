import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const UserHeader = () => {
  const [balance, setBalance] = useState(0);
  const [isTabActive, setIsTabActive] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchBalance = async () => {
    try {
      const username = localStorage.getItem('username');
      const response = await axios.get(`http://project.dubaisi.net/api/user/${username}`);
      if (response.data?.balance !== undefined) {
        setBalance(response.data.balance);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBalance();

    // Tab visibility listener (stop polling when tab is inactive)
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Smart polling (every 2 seconds, but only if tab is active)
    const pollingInterval = setInterval(() => {
      if (isTabActive) {
        fetchBalance();
      }
    }, 2000); // Check every 2 seconds

    // Cleanup
    return () => {
      clearInterval(pollingInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTabActive]); // Re-run effect when tab focus changes

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-button')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-black text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Logo - Now clickable to return home */}
      <NavLink to="/user" className="flex items-center space-x-2">
        <span className="material-icons bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent">directions_car</span>
        <h1 className="font-bold bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent text-xl">Car Service</h1>
      </NavLink>
      
      {/* Navigation Links - Desktop */}
      <nav className="space-x-6 hidden md:flex">
        <div className="relative inline-block pb-2">
          <NavLink 
            to="/user" 
            end 
            className={({ isActive }) => 
              isActive ? "text-cyan-200 font-medium" : "hover:text-cyan-200 font-medium"
            }
          >
            Home
            <span className={({ isActive }) => 
              isActive ? "absolute left-0 bottom-0 w-full h-1 rounded bg-gradient-to-r from-blue-500 to-cyan-400" : ""
            }></span>
          </NavLink>
        </div>
        
        <div className="relative inline-block pb-2">
          <NavLink 
            to="/user/insurance"
            className={({ isActive }) => 
              isActive ? "text-cyan-200 font-medium" : "hover:text-cyan-200 font-medium"
            }
          >
            Insurance
            <span className={({ isActive }) => 
              isActive ? "absolute left-0 bottom-0 w-full h-1 rounded bg-gradient-to-r from-blue-500 to-cyan-400" : ""
            }></span>
          </NavLink>
        </div>
        
        <div className="relative inline-block pb-2">
          <NavLink 
            to="/user/cars" 
            className={({ isActive }) => 
              isActive ? "text-cyan-200 font-medium" : "hover:text-cyan-200 font-medium"
            }
          >
            Cars
            <span className={({ isActive }) => 
              isActive ? "absolute left-0 bottom-0 w-full h-1 rounded bg-gradient-to-r from-blue-500 to-cyan-400" : ""
            }></span>
          </NavLink>
        </div>
        
        <div className="relative inline-block pb-2">
          <NavLink 
            to="/user/tolls" 
            className={({ isActive }) => 
              isActive ? "text-cyan-200 font-medium" : "hover:text-cyan-200 font-medium"
            }
          >
            Tolls
            <span className={({ isActive }) => 
              isActive ? "absolute left-0 bottom-0 w-full h-1 rounded bg-gradient-to-r from-blue-500 to-cyan-400" : ""
            }></span>
          </NavLink>
        </div>
        
        <div className="relative inline-block pb-2">
          <NavLink 
            to="/user/violations" 
            className={({ isActive }) => 
              isActive ? "text-cyan-200 font-medium" : "hover:text-cyan-200 font-medium"
            }
          >
            Violations
            <span className={({ isActive }) => 
              isActive ? "absolute left-0 bottom-0 w-full h-1 rounded bg-gradient-to-r from-blue-500 to-cyan-400" : ""
            }></span>
          </NavLink>
        </div>
        
        <div className="relative inline-block pb-2">
          <NavLink 
            to="/user/parking" 
            className={({ isActive }) => 
              isActive ? "text-cyan-200 font-medium" : "hover:text-cyan-200 font-medium"
            }
          >
            Parking
            <span className={({ isActive }) => 
              isActive ? "absolute left-0 bottom-0 w-full h-1 rounded bg-gradient-to-r from-blue-500 to-cyan-400" : ""
            }></span>
          </NavLink>
        </div>
      </nav>

      {/* User Icons and Balance */}
      <div className="flex items-center space-x-4">
        <NavLink to="/user/wallet">
          <span className="material-icons text-cyan-400 hover:text-cyan-200 cursor-pointer">
            credit_card
          </span>
        </NavLink>

        <div className="flex items-center space-x-1 bg-gray-800 px-3 py-1 rounded-full">
          <img
            src={require('../../assets/Saudi_Riyal_Symbol-1.png')}
            alt="SAR"
            className="h-4 w-4"
          />
          <span className="font-medium">{balance.toFixed(2)}</span>
        </div>

        <NavLink to="/user/profile">
          <span className="material-icons bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent text-cyan-400 hover:text-cyan-200 cursor-pointer">
            person
          </span>
        </NavLink>
      </div>

      {/* Hamburger Icon for Mobile */}
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu absolute top-16 right-0 left-0 bg-gray-900 border-t border-gray-800 shadow-lg z-50">
          <div className="flex flex-col p-4">
            <NavLink 
              to="/user" 
              end
              className={({ isActive }) => 
                isActive 
                  ? "text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800"
                  : "hover:text-cyan-200 font-medium p-3 hover:bg-gray-800"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="material-icons">home</span>
                <span>Home</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/user/insurance"
              className={({ isActive }) => 
                isActive 
                  ? "text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800"
                  : "hover:text-cyan-200 font-medium p-3 hover:bg-gray-800"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="material-icons">verified_user</span>
                <span>Insurance</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/user/cars"
              className={({ isActive }) => 
                isActive 
                  ? "text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800"
                  : "hover:text-cyan-200 font-medium p-3 hover:bg-gray-800"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="material-icons">directions_car</span>
                <span>Cars</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/user/tolls"
              className={({ isActive }) => 
                isActive 
                  ? "text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800"
                  : "hover:text-cyan-200 font-medium p-3 hover:bg-gray-800"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="material-icons">toll</span>
                <span>Tolls</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/user/violations"
              className={({ isActive }) => 
                isActive 
                  ? "text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800"
                  : "hover:text-cyan-200 font-medium p-3 hover:bg-gray-800"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="material-icons">gavel</span>
                <span>Violations</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/user/parking"
              className={({ isActive }) => 
                isActive 
                  ? "text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800"
                  : "hover:text-cyan-200 font-medium p-3 hover:bg-gray-800"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="material-icons">local_parking</span>
                <span>Parking</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/user/wallet"
              className={({ isActive }) => 
                isActive 
                  ? "text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800"
                  : "hover:text-cyan-200 font-medium p-3 hover:bg-gray-800"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="material-icons bg-[linear-gradient(60deg,#0095FF,#00FFCC)] bg-clip-text text-transparent">credit_card</span>
                <span>Wallet</span>
              </div>
            </NavLink>
            
            <NavLink 
              to="/user/profile"
              className={({ isActive }) => 
                isActive 
                  ? "text-cyan-200 font-medium p-3 border-l-4 border-cyan-400 bg-gray-800"
                  : "hover:text-cyan-200 font-medium p-3 hover:bg-gray-800"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="material-icons">person</span>
                <span>Profile</span>
              </div>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;