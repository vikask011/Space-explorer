// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full absolute top-0 z-20 flex items-center justify-between px-6 py-4 bg-black/50 text-white">
      <div className="flex items-center space-x-3">
        <Link to="/" ><span className="text-2xl font-bold">Space Explorer</span></Link>
      </div>

      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-purple-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-purple-400 transition">
            About
          </Link>
        </li>
        <li>
          <Link to="/chatbot" className="hover:text-purple-400 transition">
            Chat
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
