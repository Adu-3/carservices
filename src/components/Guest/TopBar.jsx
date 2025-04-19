import { useState } from 'react';

function TopBar() {
  const [activePart, setActivePart] = useState("home");
    return (
        <header className="bg-black text-white p-4 flex justify-between items-center shadow-md">
          {/* Logo */}
          <div className="flex items-center space-x-2">
          <span className="material-icons bg-gradient-to-br from-[#0095FF] to-[#00FFCC] bg-clip-text text-transparent">directions_car</span>
            <h1 className="font-bold bg-gradient-to-r from-[#0095FF] to-[#00FFCC] bg-clip-text text-transparent text-xl">Car Service</h1>
          </div>
    
          {/* Navigation Links */}
          <nav className="space-x-6 hidden md:flex">
            <div className='relative inline-block pb-2'>
            <a onClick={() => setActivePart("home")} href="#home" className="hover:text-cyan-200 font-medium">
              Home
            </a>
            <span className={`absolute left-0 bottom-0 w-full h-1 rounded ${activePart === "home" ? "bg-gradient-to-r from-[#0095FF] to-[#00FFCC]" : ""}`}></span>
            </div>
            <div className='relative inline-block pb-2'>
            <a onClick={() => setActivePart("services")} href="#services" className="hover:text-cyan-200 font-medium">
              Services
            </a>
            <span className={`absolute left-0 bottom-0 w-full h-1 rounded ${activePart === "services" ? "bg-gradient-to-r from-[#0095FF] to-[#00FFCC]" : ""}`}></span>
            </div>
            <div className='relative inline-block pb-2'>
            <a onClick={() => setActivePart("about")} href="#about" className="hover:text-cyan-200 font-medium">
              About
            </a>
            <span className={`absolute left-0 bottom-0 w-full h-1 rounded ${activePart === "about" ? "bg-gradient-to-r from-[#0095FF] to-[#00FFCC]" : ""}`}></span>
            </div>
            <div className='relative inline-block pb-2'>
            <a onClick={() => setActivePart("contact")} href="#contact" className="hover:text-cyan-200 font-medium">
              Contact
            </a>
            <span className={`absolute left-0 bottom-0 w-full h-1 rounded ${activePart === "contact" ? "bg-gradient-to-r from-[#0095FF] to-[#00FFCC]" : ""}`}></span>
            </div>
          </nav>
    
          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button className="text-white focus:outline-none text-2xl">☰</button>
          </div>
        </header>
      );
};
export default TopBar;